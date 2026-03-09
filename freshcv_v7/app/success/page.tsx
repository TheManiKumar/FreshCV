"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

type Status = "verifying" | "success" | "error";

function SuccessContent() {
  const router    = useRouter();
  const params    = useSearchParams();
  const sessionId = params.get("session_id");

  const [status,  setStatus]  = useState<Status>("verifying");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(5);

  // Step 1 — call verify-session to confirm payment + set cookie
  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setMessage("No session ID found. Please contact support if you were charged.");
      return;
    }

    fetch(`/api/verify-session?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
        } else {
          setStatus("error");
          setMessage(data.error ?? "Verification failed.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Network error during verification. Please try again.");
      });
  }, [sessionId]);

  // Step 2 — countdown then redirect to /pro
  useEffect(() => {
    if (status !== "success") return;
    if (countdown === 0) {
      router.push("/pro");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [status, countdown, router]);

  return (
    <main className="min-h-screen bg-[#F2F2F7] flex items-center justify-center px-5">
      <div className="w-full max-w-[480px]">

        {/* ── Verifying ── */}
        {status === "verifying" && (
          <div className="bg-white rounded-3xl p-10 border border-black/[0.05] shadow-card-md text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#0071E3]/[0.07] flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-[#0071E3] animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
            <h1 className="text-[22px] font-extrabold text-[#1D1D1F] tracking-tight mb-2">
              Verifying your payment…
            </h1>
            <p className="text-[14px] text-[#86868B] leading-relaxed">
              Please wait. This only takes a moment.
            </p>
          </div>
        )}

        {/* ── Success ── */}
        {status === "success" && (
          <div className="bg-white rounded-3xl p-10 border border-black/[0.05] shadow-card-md text-center">
            {/* Check mark */}
            <div className="w-16 h-16 rounded-full bg-[#34C759]/[0.12] flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#34C759]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-[#34C759]/[0.10] border border-[#34C759]/[0.2] text-[#1a9e40] text-[11px] font-bold px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
              Payment Confirmed
            </div>

            <h1 className="text-[28px] font-extrabold tracking-tight text-[#1D1D1F] mb-3 leading-tight">
              Welcome to<br />FreshCV Pro
            </h1>
            <p className="text-[15px] text-[#86868B] leading-relaxed mb-8">
              Your account has been upgraded successfully. You now have access to unlimited analyses, advanced AI rewrites, and the full Pro dashboard.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {["Unlimited Analyses", "Advanced AI", "Priority Processing", "Export Results"].map((f) => (
                <span key={f} className="text-[12px] font-semibold text-[#0071E3] bg-[#0071E3]/[0.08] border border-[#0071E3]/[0.18] px-3 py-1.5 rounded-full">
                  {f}
                </span>
              ))}
            </div>

            <button
              onClick={() => router.push("/pro")}
              className="w-full bg-[#0071E3] text-white font-bold text-[15px] py-4 rounded-xl
                         hover:bg-[#0062c4] hover:shadow-card-blue transition-all duration-150 mb-3"
            >
              Go to Pro Dashboard →
            </button>
            <p className="text-[12px] text-[#86868B]">
              Redirecting automatically in {countdown}s…
            </p>
          </div>
        )}

        {/* ── Error ── */}
        {status === "error" && (
          <div className="bg-white rounded-3xl p-10 border border-black/[0.05] shadow-card-md text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h1 className="text-[22px] font-extrabold text-[#1D1D1F] tracking-tight mb-3">
              Something went wrong
            </h1>
            <p className="text-[14px] text-[#86868B] leading-relaxed mb-7">{message}</p>
            <button
              onClick={() => router.push("/#pricing")}
              className="w-full border border-black/[0.12] text-[#1D1D1F] font-semibold text-[14px] py-3.5 rounded-xl hover:border-[#1D1D1F] transition-colors"
            >
              Back to Pricing
            </button>
          </div>
        )}

      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
