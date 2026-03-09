"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/lib/types";
import ScoreRing from "./ScoreRing";

// ─── Shared card shell ────────────────────────────────────────────────────────

function ResultCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#F7F7FA] rounded-2xl border border-black/[0.05] ${className}`}>
      {children}
    </div>
  );
}

// ─── Card label + badge ───────────────────────────────────────────────────────

function CardLabel({
  label,
  badge,
  badgeColor = "blue",
}: {
  label: string;
  badge?: string;
  badgeColor?: "blue" | "green" | "amber";
}) {
  const styles: Record<string, string> = {
    blue:  "bg-[#0071E3]/[0.09] text-[#0071E3] border-[#0071E3]/[0.18]",
    green: "bg-[#34C759]/[0.10] text-[#1a9e40] border-[#34C759]/[0.22]",
    amber: "bg-[#FF9F0A]/[0.10] text-[#b87000] border-[#FF9F0A]/[0.22]",
  };
  return (
    <div className="flex items-center justify-between mb-3.5">
      <p className="text-[11px] font-bold uppercase tracking-[0.7px] text-[#86868B]">{label}</p>
      {badge && (
        <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full border ${styles[badgeColor]}`}>
          {badge}
        </span>
      )}
    </div>
  );
}

// ─── Copy button — reusable ───────────────────────────────────────────────────

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg border
                  transition-all duration-200 flex-shrink-0
                  ${copied
                    ? "border-[#34C759]/40 text-[#1a9e40] bg-[#34C759]/[0.07]"
                    : "border-black/[0.1] text-[#86868B] bg-white hover:border-[#0071E3] hover:text-[#0071E3]"
                  }`}
    >
      {copied ? (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {/* Status pulse */}
      <div className="flex items-center gap-2.5 bg-[#F2F2F7] border border-black/[0.04] rounded-xl px-4 py-3">
        <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse flex-shrink-0" />
        <p className="text-[13px] text-[#86868B]">Analyzing your resume against the job description…</p>
      </div>
      {/* Skeleton blocks */}
      {[{ h: 110 }, { h: 190 }, { h: 90 }].map((s, i) => (
        <div key={i} className="bg-[#F7F7FA] rounded-2xl border border-black/[0.05] p-5" style={{ minHeight: s.h }}>
          <div className="skeleton h-3 w-28 rounded-lg mb-4" />
          {[100, 90, 80].map((w, j) => (
            <div key={j} className="skeleton h-3 rounded-lg mb-2.5" style={{ width: `${w}%`, opacity: 1 - j * 0.15 }} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Idle placeholder ─────────────────────────────────────────────────────────

function IdlePlaceholder() {
  const items = [
    { icon: "📊", label: "Match Score",      sub: "0 – 100 rating" },
    { icon: "✦",  label: "Improved Bullets", sub: "5 AI rewrites"  },
    { icon: "🔍", label: "Missing Keywords", sub: "ATS gap analysis" },
    { icon: "💡", label: "Suggestions",      sub: "5 actionable tips" },
  ];
  return (
    <div className="flex flex-col items-center text-center py-8 sm:py-10 px-2">
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-[#0071E3]/[0.07] flex items-center justify-center text-[22px] mb-5">
        ✦
      </div>
      <h3 className="text-[16px] font-bold text-[#1D1D1F] mb-2 tracking-tight">
        Ready to Analyze
      </h3>
      <p className="text-[13.5px] text-[#86868B] leading-relaxed max-w-[260px] mb-7">
        Fill in your resume, job description, and role name — then click{" "}
        <span className="font-semibold text-[#1D1D1F]">Analyze Resume</span> to see your full report.
      </p>
      {/* Preview grid */}
      <div className="w-full max-w-[320px] grid grid-cols-2 gap-2">
        {items.map((p) => (
          <div
            key={p.label}
            className="bg-[#F7F7FA] border border-black/[0.05] rounded-xl px-3.5 py-3 text-left
                       hover:border-black/[0.1] transition-colors"
          >
            <span className="text-base block mb-1.5">{p.icon}</span>
            <p className="text-[12px] font-semibold text-[#1D1D1F] leading-tight">{p.label}</p>
            <p className="text-[11px] text-[#86868B] mt-0.5">{p.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface ResultsDashboardProps {
  result:    AnalysisResult | null;
  isLoading: boolean;
}

export default function ResultsDashboard({ result, isLoading }: ResultsDashboardProps) {
  if (!isLoading && !result) return <IdlePlaceholder />;
  if (isLoading) return <LoadingSkeleton />;
  if (!result)   return null;

  const scoreColor =
    result.matchScore >= 75 ? "#34C759"
    : result.matchScore >= 50 ? "#FF9F0A"
    : "#FF3B30";

  const bulletsText  = result.improvedBullets.map((b) => `• ${b}`).join("\n");
  const keywordsText = result.missingKeywords.join(", ");

  return (
    <div className="flex flex-col gap-3 animate-fade-up-1">

      {/* ── 1. Match Score ── */}
      <ResultCard>
        <div className="p-5">
          <CardLabel
            label="Match Score"
            badge={result.matchLabel}
            badgeColor={result.matchScore >= 75 ? "green" : result.matchScore >= 50 ? "amber" : "amber"}
          />
          <div className="flex items-center gap-5">
            <div className="flex-shrink-0">
              <ScoreRing score={result.matchScore} size={88} strokeWidth={6} />
            </div>
            <div className="flex-1 min-w-0">
              {/* Score bar */}
              <div className="w-full h-1.5 bg-black/[0.06] rounded-full mb-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${result.matchScore}%`, background: scoreColor }}
                />
              </div>
              <p className="text-[13px] text-[#86868B] leading-relaxed">{result.matchDescription}</p>
            </div>
          </div>
        </div>
      </ResultCard>

      {/* ── 2. Improved Bullets ── */}
      <ResultCard>
        <div className="p-5 pb-3">
          <div className="flex items-center justify-between mb-3.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.7px] text-[#86868B]">
              Improved Resume Bullets
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full border bg-[#0071E3]/[0.09] text-[#0071E3] border-[#0071E3]/[0.18]">
                {result.improvedBullets.length} rewrites
              </span>
              <CopyButton text={bulletsText} label="Copy All" />
            </div>
          </div>
          <ul className="flex flex-col divide-y divide-black/[0.04]">
            {result.improvedBullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                <span className="flex-shrink-0 w-[17px] h-[17px] rounded-full bg-[#34C759]/[0.12]
                                 flex items-center justify-center mt-[2px]">
                  <svg className="w-2.5 h-2.5 text-[#34C759]" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                  </svg>
                </span>
                <p className="text-[13px] text-[#1D1D1F] leading-relaxed">{bullet}</p>
              </li>
            ))}
          </ul>
        </div>
      </ResultCard>

      {/* ── 3 & 4 — side by side on sm+ ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

        {/* Missing Keywords */}
        <ResultCard>
          <div className="p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-3.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.7px] text-[#86868B]">
                Missing Keywords
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full border bg-[#FF9F0A]/[0.10] text-[#b87000] border-[#FF9F0A]/[0.22]">
                  {result.missingKeywords.length} gaps
                </span>
                <CopyButton text={keywordsText} label="Copy" />
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {result.missingKeywords.map((kw) => (
                <span
                  key={kw}
                  className="text-[12px] font-semibold text-[#0071E3] bg-white
                             border border-[#0071E3]/[0.18] px-2.5 py-1 rounded-full"
                >
                  {kw}
                </span>
              ))}
            </div>
            <p className="text-[11.5px] text-[#86868B] leading-relaxed mt-3 pt-3 border-t border-black/[0.05]">
              Add these naturally into your bullets to improve ATS ranking.
            </p>
          </div>
        </ResultCard>

        {/* Suggestions */}
        <ResultCard>
          <div className="p-5 flex flex-col h-full">
            <CardLabel label="Suggestions" badge={`${result.suggestions.length} tips`} badgeColor="green" />
            <ol className="flex flex-col gap-2.5 flex-1">
              {result.suggestions.map((s, i) => (
                <li key={s.id} className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0071E3]/[0.09] flex items-center
                                   justify-center text-[10px] font-bold text-[#0071E3] mt-[1px]">
                    {i + 1}
                  </span>
                  <p className="text-[12.5px] text-[#1D1D1F] leading-relaxed">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </ResultCard>

      </div>
    </div>
  );
}
