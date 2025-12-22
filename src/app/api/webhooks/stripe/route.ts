// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { writeClient } from '@/sanity/lib/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    // ✅ Get raw body as text - this is the KEY
    const body = await request.text();
    
    // ✅ Get headers using Next.js headers() function
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      console.error('❌ Missing stripe-signature header');
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    console.log('📦 Received webhook, body length:', body.length);
    console.log('🔑 Signature present:', signature.substring(0, 20) + '...');

    let event: Stripe.Event;

    try {
      // ✅ Construct event from raw body string
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
      console.log('✅ Webhook signature verified:', event.type);
    } catch (err: any) {
      console.error('❌ Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('✅ Processing checkout.session.completed:', session.id);

        // Extract data from session
        const clerkUserId = session.client_reference_id || '';
        const customerEmail = session.customer_details?.email || '';
        const customerName = session.customer_details?.name || 'Guest';
        const stripeCustomerId = session.customer as string;
        const paymentIntentId = session.payment_intent as string;
        
        // Parse products from metadata
        const products = session.metadata?.products 
          ? JSON.parse(session.metadata.products) 
          : [];

        // Calculate totals
        const totalAmount = session.amount_total ? session.amount_total / 100 : 0;
        const discountAmount = session.total_details?.amount_discount 
          ? session.total_details.amount_discount / 100 
          : 0;

        // Generate unique order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Prepare shipping address
        const shippingAddress = (session as any).shipping_details?.address
          ? {
              name: (session as any).shipping_details?.name || customerName,
              address: (session as any).shipping_details.address.line1 || '',
              city: (session as any).shipping_details.address.city || '',
              state: (session as any).shipping_details.address.state || '',
              zip: (session as any).shipping_details.address.postal_code || '',
            }
          : null;

        // Create order in Sanity
        const order = await writeClient.create({
          _type: 'order',
          orderNumber,
          stripeCheckoutSessionId: session.id,
          stripeCustomerId,
          clerkUserId,
          customerName,
          email: customerEmail,
          stripePaymentIntentId: paymentIntentId,
          products: products.map((p: any) => ({
            _key: `${p._id}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            product: {
              _type: 'reference',
              _ref: p._id,
            },
            quantity: p.quantity,
          })),
          totalPrice: totalAmount,
          currency: (session.currency || 'usd').toUpperCase(),
          amountDiscount: discountAmount,
          address: shippingAddress,
          status: 'paid',
          orderDate: new Date().toISOString(),
        });

        console.log('✅ Order created in Sanity:', order._id);
        console.log('📋 Order Number:', orderNumber);

        // Save address if provided
        if (shippingAddress && customerEmail) {
          try {
            const existingAddresses = await writeClient.fetch(
              `*[_type == "address" && email == $email]`,
              { email: customerEmail }
            );

            const addressExists = existingAddresses.some((addr: any) => 
              addr.address === shippingAddress.address &&
              addr.city === shippingAddress.city &&
              addr.zip === shippingAddress.zip
            );

            if (!addressExists) {
              await writeClient.create({
                _type: 'address',
                name: shippingAddress.name || 'Shipping Address',
                email: customerEmail,
                address: shippingAddress.address,
                city: shippingAddress.city,
                state: shippingAddress.state,
                zip: shippingAddress.zip,
                default: existingAddresses.length === 0,
                createdAt: new Date().toISOString(),
              });
              console.log('✅ Address saved for:', customerEmail);
            }
          } catch (error) {
            console.error('⚠️ Error saving address (non-critical):', error);
          }
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('✅ Payment succeeded:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error('❌ Payment failed:', paymentIntent.id);
        break;
      }

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('❌ Error in webhook handler:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}