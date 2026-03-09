// ─── Form Input ───────────────────────────────────────────────────────────────

export interface AnalyzeFormData {
  resume: string;
  jobDescription: string;
  roleName: string;
}

// ─── Analysis Result ──────────────────────────────────────────────────────────
// Shape must exactly match what /api/analyze returns.

export interface AnalysisResult {
  matchScore: number;                        // 0–100
  matchLabel: "Weak" | "Moderate" | "Strong";
  matchDescription: string;                  // 1–2 sentence explanation
  improvedBullets: string[];                 // 4–6 rewritten bullet points
  missingKeywords: string[];                 // keywords from JD absent in resume
  suggestions: Suggestion[];                 // 3–5 actionable tips
}

export interface Suggestion {
  id: number;
  text: string;
  type: "action" | "content" | "keyword" | "format";
}
