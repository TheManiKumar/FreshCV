"use client";

import { useState, useEffect, useCallback } from "react";

interface UpgradeModalProps {
  isOpen:  boolean;
  onClose: () => void;
}

type Plan          = "monthly" | "yearly";
type CheckoutState = "idle" | "loading" | "error" | "unconfigured";

const FEATURES = [
  "Unlimited resume analyses — no monthly cap",
  "Advanced bullet rewriting with stronger action verbs",
  "Better keyword matching with ATS-grade scoring",
  "More accurate match scores, role-specific analysis",
  "Priority AI processing — faster results",
  "Export results as a formatted PDF",
  "Save and review your full analysis history",
];

const PRICING: Record<Plan, { price: string; period: string; sub: string; save?: string }> = {
  monthly: { price: "₹99",  period: "/ month", sub: "Billed monthly. Cancel anytime." },
  yearly:  { price: "₹599", period: "/ year",  sub: "That's just ₹49.9/mo.", save: "Save 50%" },
};

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [plan,     setPlan]     = useState<Plan>("monthly");
  const [state,    setState]    = useState<CheckoutState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKey]);

  useEffect(() => {
    if (isOpen) { setState("idle"); setErrorMsg(""); }
  }, [isOpen]);

  const handleCheckout = async () => {
    setState("loading");
    setErrorMsg("");
    try {
      const res  = await fetch("/api/checkout", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ plan }),
      });
      const data = await res.json() as { url?: string; error?: string; code?: string };

      if (data.code === "STRIPE_NOT_CONFIGURED") {
        setState("unconfigured");
        return;
      }
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Could not start checkout. Please try again.");
      }
      window.location.href = data.url;
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Unexpected error.");
      setState("error");
    }
  };

  if (!isOpen) return null;

  const p = PRICING[plan];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-5"
      style={{ background: "rgba(0,0,0,0.48)", backdropFilter: "blur(10px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full sm:max-w-[480px] bg-white sm:rounded-3xl rounded-t-3xl
                   border border-black/[0.06] shadow-card-lg overflow-y-auto max-h-[96vh]
                   animate-fade-up-1"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center
                     justify-center text-[#86868B] hover:bg-[#E5E5EA] hover:text-[#1D1D1F] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="px-7 pt-7 pb-5 border-b border-black/[0.05]">
          <div className="inline-flex items-center gap-1.5 bg-[#0071E3]/[0.08] border border-[#0071E3]/[0.15]
                          text-[#0071E3] text-[11px] font-bold px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
            FreshCV Pro
          </div>
          <h2 className="text-[24px] font-extrabold tracking-tight text-[#1D1D1F] leading-tight mb-1.5">
            Upgrade to FreshCV Pro
          </h2>
          <p className="text-[14px] text-[#86868B] leading-relaxed">
            Unlock unlimited analyses, deeper AI insights, and the full Pro experience.
          </p>
        </div>

        {/* Plan toggle — like ChatGPT Plus */}
        <div className="px-7 py-5 border-b border-black/[0.05]">
          <p className="text-[11px] font-bold uppercase tracking-[0.7px] text-[#86868B] mb-3">
            Choose a plan
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {(["monthly", "yearly"] as Plan[]).map((p) => (
              <button
                key={p}
                onClick={() => setPlan(p)}
                className={`relative text-left px-4 py-4 rounded-2xl border-2 transition-all duration-150
                  ${plan === p
                    ? "border-[#0071E3] bg-[#0071E3]/[0.04]"
                    : "border-black/[0.08] bg-[#F7F7FA] hover:border-black/[0.16]"
                  }`}
              >
                {p === "yearly" && PRICING.yearly.save && (
                  <span className="absolute -top-2.5 right-3 bg-[#34C759] text-white text-[10px]
                                   font-bold px-2 py-0.5 rounded-full">
                    {PRICING.yearly.save}
                  </span>
                )}
                <p className="text-[12px] font-bold text-[#86868B] capitalize mb-1">{p}</p>
                <p className={`text-[22px] font-extrabold tracking-tight leading-none
                               ${plan === p ? "text-[#0071E3]" : "text-[#1D1D1F]"}`}>
                  {PRICING[p].price}
                </p>
                <p className="text-[11px] text-[#86868B] mt-1">{PRICING[p].period}</p>
              </button>
            ))}
          </div>
          {/* Selected plan callout */}
          <div className="mt-3 flex items-center justify-between px-1">
            <p className="text-[13px] text-[#86868B]">{p.sub}</p>
            {plan === "yearly" && (
              <p className="text-[12px] font-semibold text-[#34C759]">Best value</p>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="px-7 py-5 border-b border-black/[0.05]">
          <p className="text-[11px] font-bold uppercase tracking-[0.7px] text-[#86868B] mb-3.5">
            Everything included
          </p>
          <ul className="flex flex-col gap-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[#34C759]/[0.12] flex items-center justify-center flex-shrink-0 mt-[1px]">
                  <svg className="w-2.5 h-2.5 text-[#34C759]" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                  </svg>
                </span>
                <span className="text-[13px] text-[#1D1D1F] leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="px-7 py-6">

          {/* Error */}
          {state === "error" && (
            <div className="mb-4 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <p className="text-[13px] text-red-600">{errorMsg}</p>
            </div>
          )}

          {/* Stripe not configured — premium coming-soon state */}
          {state === "unconfigured" ? (
            <div className="mb-4 bg-[#F7F7FA] border border-black/[0.07] rounded-2xl px-5 py-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-[#0071E3]/[0.07] flex items-center justify-center
                              text-lg mx-auto mb-3">
                🔒
              </div>
              <p className="text-[14px] font-bold text-[#1D1D1F] mb-1">Payment coming soon</p>
              <p className="text-[13px] text-[#86868B] leading-relaxed">
                Pro checkout is being set up. Check back soon — pricing starts at just ₹99/month.
              </p>
            </div>
          ) : (
            <button
              onClick={handleCheckout}
              disabled={state === "loading"}
              className={`w-full flex items-center justify-center gap-2 font-bold text-[15px] py-4
                          rounded-xl text-white transition-all duration-150 mb-4
                          ${state === "loading"
                            ? "bg-[#B0C8E8] cursor-not-allowed"
                            : "bg-[#0071E3] hover:bg-[#0062c4] hover:shadow-card-blue hover:-translate-y-px active:translate-y-0"
                          }`}
            >
              {state === "loading" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Redirecting to payment…
                </>
              ) : (
                <>
                  Continue to Payment — {p.price}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          )}

          {/* Trust row */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {["Powered by Stripe", "Cancel anytime", "Secure & encrypted"].map((t) => (
              <span key={t} className="flex items-center gap-1 text-[11px] text-[#86868B]">
                <svg className="w-2.5 h-2.5 text-[#34C759]" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
