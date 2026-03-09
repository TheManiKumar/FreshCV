import Stripe from "stripe";

// Lazy singleton — only instantiated when actually used in an API route.
// This prevents the server from crashing at startup when the key is missing.
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key === "YOUR_STRIPE_SECRET_KEY") {
    throw new Error("STRIPE_SECRET_KEY is not configured in .env.local");
  }

  _stripe = new Stripe(key, { apiVersion: "2024-06-20", typescript: true });
  return _stripe;
}

export default getStripe;
