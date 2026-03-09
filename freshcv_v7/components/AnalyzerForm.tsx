"use client";

import { useState } from "react";
import type { AnalyzeFormData } from "@/lib/types";

interface AnalyzerFormProps {
  onSubmit: (data: AnalyzeFormData) => void;
  onReset:  () => void;
  isLoading: boolean;
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <label className="text-[13px] font-semibold text-[#1D1D1F]">{label}</label>
        {hint && <span className="text-[11px] text-[#86868B]">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

const baseInputClass = `
  w-full bg-[#F7F7FA] border border-transparent rounded-xl px-4 py-3
  text-[14px] text-[#1D1D1F] placeholder-[#C0C0C7]
  focus:outline-none focus:border-[#0071E3] focus:bg-white
  focus:ring-4 focus:ring-[#0071E3]/[0.08]
  transition-all duration-150 font-[inherit]
`;

export default function AnalyzerForm({ onSubmit, onReset, isLoading }: AnalyzerFormProps) {
  const [resume,  setResume]  = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [role,    setRole]    = useState("");

  const isValid   = resume.trim().length > 20 && jobDesc.trim().length > 20 && role.trim().length > 1;
  const hasContent = resume.trim() || jobDesc.trim() || role.trim();

  const resumeWords = resume.trim() ? resume.trim().split(/\s+/).length : 0;
  const jdWords     = jobDesc.trim() ? jobDesc.trim().split(/\s+/).length : 0;

  const handleSubmit = () => {
    if (!isValid || isLoading) return;
    onSubmit({ resume, jobDescription: jobDesc, roleName: role });
  };

  const handleReset = () => {
    setResume("");
    setJobDesc("");
    setRole("");
    onReset();
  };

  return (
    <div className="flex flex-col gap-5">

      {/* Resume */}
      <Field label="Your Resume" hint={resumeWords > 0 ? `${resumeWords} words` : "Paste the full text"}>
        <textarea
          className={`${baseInputClass} resize-y min-h-[160px] sm:min-h-[180px] leading-relaxed`}
          placeholder="Paste your current resume text here. Include your experience, skills, projects, and education."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          disabled={isLoading}
        />
      </Field>

      {/* Job Description */}
      <Field label="Job Description" hint={jdWords > 0 ? `${jdWords} words` : "Paste the full JD"}>
        <textarea
          className={`${baseInputClass} resize-y min-h-[160px] sm:min-h-[180px] leading-relaxed`}
          placeholder="Paste the complete job description for the role you're applying to."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          disabled={isLoading}
        />
      </Field>

      {/* Role Name */}
      <Field label="Role Name" hint="Be specific">
        <input
          type="text"
          className={baseInputClass}
          placeholder="e.g. Data Analyst Intern, Frontend Developer, Marketing Associate"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={isLoading}
        />
      </Field>

      {/* Buttons */}
      <div className="flex flex-col gap-2.5 pt-1">
        {/* Primary — Analyze */}
        <button
          onClick={handleSubmit}
          disabled={!isValid || isLoading}
          className={`
            relative w-full py-4 rounded-xl font-bold text-[15px] text-white
            transition-all duration-200
            ${isValid && !isLoading
              ? "bg-[#0071E3] hover:bg-[#0062c4] hover:shadow-card-blue hover:-translate-y-px active:translate-y-0 cursor-pointer"
              : "bg-[#B0C8E8] cursor-not-allowed"
            }
          `}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2.5">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing…
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Analyze Resume
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          )}
        </button>

        {/* Secondary — Clear */}
        {hasContent && !isLoading && (
          <button
            onClick={handleReset}
            className="w-full py-3 rounded-xl border border-black/[0.1] text-[13.5px] font-semibold
                       text-[#86868B] hover:border-black/[0.2] hover:text-[#1D1D1F]
                       transition-all duration-150 flex items-center justify-center gap-2"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear & Reset
          </button>
        )}

        {/* Helper text */}
        <p className="text-center text-[12px] text-[#86868B] leading-snug">
          {isLoading
            ? "AI is reviewing your resume — this takes a few seconds."
            : !isValid
            ? "Fill in all three fields to enable analysis."
            : "Get improved bullets, missing keywords, and a role-fit score."}
        </p>
      </div>

      {/* Trust line */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-black/[0.06]" />
        <span className="text-[11px] text-[#86868B] whitespace-nowrap flex items-center gap-1.5">
          <svg className="w-3 h-3 text-[#34C759]" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
          </svg>
          Your data is never stored
        </span>
        <div className="h-px flex-1 bg-black/[0.06]" />
      </div>
    </div>
  );
}
