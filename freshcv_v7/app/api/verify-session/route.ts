import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  let stripe;
  try {
    stripe = getStripe();
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Stripe not configured.";
    return NextResponse.json({ error: msg, code: "STRIPE_NOT_CONFIGURED" }, { status: 503 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed." }, { status: 402 });
    }

    const res = NextResponse.json({ success: true });

    // Set a 1-year httpOnly Pro cookie
    res.cookies.set("freshcv_pro", "true", {
      path:     "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge:   60 * 60 * 24 * 365,
      secure:   process.env.NODE_ENV === "production",
    });

    return res;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[verify-session] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
