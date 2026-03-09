"use client";

import { useState, useRef } from "react";
import type { AnalysisResult, AnalyzeFormData } from "@/lib/types";
import { analyzeResume } from "@/lib/analyzer";
import AnalyzerForm from "./AnalyzerForm";
import ResultsDashboard from "./ResultsDashboard";

// Human-readable error messages — never expose raw technical strings
function friendlyError(raw: string): string {
  if (!raw) return "Something went wrong. Please try again.";
  if (/network|fetch|failed to fetch/i.test(raw))
    return "Network error. Please check your connection and try again.";
  if (/timeout|timed out/i.test(raw))
    return "The request timed out. Please try again.";
  if (/500|server error/i.test(raw))
    return "Server error. Please try again in a moment.";
  if (/400|required/i.test(raw))
    return "Please make sure all three fields are filled in before analyzing.";
  // Strip internal error prefixes like "AI error: ..." for end users
  return raw.replace(/^(AI error:|Server error \d+\.?)\s*/i, "").trim() ||
    "Something went wrong. Please try again.";
}

export default function AnalyzerSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [result,    setResult]    = useState<AnalysisResult | null>(null);
  const [error,     setError]     = useState<string | null>(null);
  const resultsPanelRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async (data: AnalyzeFormData) => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        resultsPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }

    try {
      const res = await analyzeResume(data.resume, data.jobDescription, data.roleName);
      setResult(res);
      // Scroll results into view on all screen sizes after completion
      setTimeout(() => {
        resultsPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 80);
    } catch (err: unknown) {
      const raw = err instanceof Error ? err.message : "";
      console.error("[FreshCV analyze error]", raw);
      setError(friendlyError(raw));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <section id="analyzer" className="bg-[#F2F2F7] py-16 sm:py-20" style={{ scrollMarginTop: "64px" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-[12px] font-bold uppercase tracking-[1px] text-[#0071E3] mb-3">
            Resume Analyzer
          </p>
          <h2 className="text-[32px] sm:text-[42px] font-extrabold tracking-[-1.5px] text-[#1D1D1F] mb-4 leading-tight">
            Tailor Your Resume Instantly
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#86868B] leading-relaxed max-w-[480px] mx-auto">
            Paste your resume and job description. FreshCV analyzes, improves, and scores your resume in seconds.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

          {/* ── Left: Input Form ── */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.05] shadow-card-md">
            <div className="mb-5 sm:mb-6">
              <h3 className="text-[18px] sm:text-[19px] font-bold text-[#1D1D1F] tracking-tight">
                Analyze Your Resume
              </h3>
              <p className="text-[14px] text-[#86868B] mt-1 leading-relaxed">
                Paste your content below and get AI-powered improvements tailored to the role.
              </p>
            </div>
            <AnalyzerForm onSubmit={handleAnalyze} onReset={handleReset} isLoading={isLoading} />
          </div>

          {/* ── Right: Results Dashboard ── */}
          <div
            ref={resultsPanelRef}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.05] shadow-card-md lg:sticky lg:top-20"
          >
            {/* Dashboard header */}
            <div className="mb-5 sm:mb-6">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-[18px] sm:text-[19px] font-bold text-[#1D1D1F] tracking-tight">
                    Results Dashboard
                  </h3>
                  <p className="text-[14px] text-[#86868B] mt-0.5 truncate">
                    {result
                      ? `Analysis complete — ${result.matchScore}% match`
                      : isLoading
                      ? "Analyzing your resume…"
                      : "Your analysis will appear here"}
                  </p>
                </div>
                {result && (
                  <span className="flex-shrink-0 text-[11px] font-bold bg-[#34C759]/[0.1] text-[#1a9e40]
                                   px-3 py-1.5 rounded-full border border-[#34C759]/[0.2]">
                    ✓ Done
                  </span>
                )}
              </div>
            </div>

            {/* Error banner */}
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3.5 mb-4 flex items-start gap-3">
                <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                <div>
                  <p className="text-[13px] font-semibold text-red-700 mb-0.5">Analysis failed</p>
                  <p className="text-[12.5px] text-red-600 leading-relaxed">{error}</p>
                </div>
              </div>
            )}

            <ResultsDashboard result={result} isLoading={isLoading} />
          </div>

        </div>
      </div>
    </section>
  );
}
