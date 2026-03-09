import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(_req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001";

  // Graceful fallback when Stripe is not yet configured
  let stripe;
  try {
    stripe = getStripe();
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Stripe not configured.";
    return NextResponse.json({ error: msg, code: "STRIPE_NOT_CONFIGURED" }, { status: 503 });
  }

  const priceId = process.env.STRIPE_PRO_PRICE_ID;
  if (!priceId || priceId === "YOUR_STRIPE_PRO_PRICE_ID") {
    return NextResponse.json(
      { error: "STRIPE_PRO_PRICE_ID is not configured in .env.local", code: "STRIPE_NOT_CONFIGURED" },
      { status: 503 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode:                 "subscription",
      payment_method_types: ["card"],
      line_items:           [{ price: priceId, quantity: 1 }],
      success_url:          `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:           `${appUrl}/#pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[checkout] Stripe error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
