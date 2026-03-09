import type { AnalysisResult } from "./types";

// Calls /api/analyze — all AI logic is server-side.
// Returns real OpenAI output when configured, smart mock data otherwise.
export async function analyzeResume(
  resume: string,
  jobDescription: string,
  roleName: string
): Promise<AnalysisResult> {
  const res = await fetch("/api/analyze", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ resume, jobDescription, roleName }),
  });

  const data = await res.json() as Partial<AnalysisResult> & { error?: string };

  if (!res.ok) {
    throw new Error(data.error ?? `Server error ${res.status}. Please try again.`);
  }

  return data as AnalysisResult;
}
