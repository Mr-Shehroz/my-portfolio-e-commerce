// app/api/create-checkout-session/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image"; // ✅ Import urlFor

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20", // ⚠️ Use a valid version (not future one)
});

export async function POST(req: NextRequest) {
  try {
    const { products } = await req.json();

    // Validate and fetch full product data
    const productIds = products.map((p: any) => p._id);
    const sanityProducts = await client.fetch(
      `*[_type == "product" && _id in $ids]{
        _id,
        name,
        price,
        "imageUrl": images[0].asset->url // ✅ Get actual URL
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

    // Build line items with valid image URLs
    const lineItems = products.map((item: any) => {
      const sanityProduct = productMap.get(item._id) as any;
      const imageUrl = sanityProduct?.imageUrl 
        ? urlFor(sanityProduct.imageUrl).url() // ✅ Generate full URL
        : "https://via.placeholder.com/200"; // fallback

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [imageUrl], // ✅ Now a valid URL
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      metadata: {
        products: JSON.stringify(products),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}