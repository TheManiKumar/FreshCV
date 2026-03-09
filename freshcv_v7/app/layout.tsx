import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FreshCV — Turn Your Resume Into a Job-Matched Resume",
  description:
    "Paste your resume and job description to instantly improve bullet points, detect missing keywords, and get a smart match score. Built for freshers and early-career job seekers.",
  keywords: ["resume", "AI", "job matching", "freshers", "career", "keywords", "match score"],
  openGraph: {
    title: "FreshCV — AI Resume Tailoring",
    description: "Instantly improve your resume for any job description.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
