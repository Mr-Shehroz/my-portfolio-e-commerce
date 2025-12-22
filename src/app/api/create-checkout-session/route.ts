// app/api/create-checkout-session/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { client } from "@/sanity/lib/client";
import { currentUser } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { products } = await req.json();
    
    // Get authenticated user
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to checkout." },
        { status: 401 }
      );
    }

    const userId = user.id;
    const userEmail = user.emailAddresses[0]?.emailAddress || "";
    const userName = user.firstName && user.lastName 
      ? `${user.firstName} ${user.lastName}` 
      : user.firstName || user.lastName || "Guest";

    // Validate products
    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: "No products in cart" },
        { status: 400 }
      );
    }

    // Validate and fetch full product data from Sanity
    const productIds = products.map((p: any) => p._id);
    const sanityProducts = await client.fetch(
      `*[_type == "product" && _id in $ids]{
        _id,
        name,
        price,
        "imageUrl": images[0].asset->url
      }`,
      { ids: productIds }
    );

    if (sanityProducts.length !== products.length) {
      return NextResponse.json(
        { error: "One or more products not found" },
        { status: 400 }
      );
    }

    // Create a map for quick lookup
    const productMap = new Map(
      sanityProducts.map((p: any) => [p._id, p])
    );

    // Build line items for Stripe
    const lineItems = products.map((item: any) => {
      const sanityProduct = productMap.get(item._id) as any;
      const imageUrl = sanityProduct?.imageUrl || "https://via.placeholder.com/200";

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [imageUrl],
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      client_reference_id: userId, // Clerk user ID
      customer_email: userEmail,
      shipping_address_collection: {
        allowed_countries: ["US", "PK", "CA", "GB", "AU", "DE", "FR", "IT", "ES"], 
      },
      billing_address_collection: "auto",
      metadata: {
        // ✅ Store product data as JSON string for webhook
        products: JSON.stringify(
          products.map((p: any) => ({
            _id: p._id,
            name: p.name,
            price: p.price,
            quantity: p.quantity,
          }))
        ),
        clerkUserId: userId,
        customerName: userName,
      },
      // Optional: Add phone number collection
      phone_number_collection: {
        enabled: true,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("❌ Stripe checkout error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}