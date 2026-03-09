"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnalyzerSection from "@/components/AnalyzerSection";
import UpgradeToProButton from "@/components/UpgradeToProButton";

function scrollToAnalyzer() {
  const el = document.getElementById("analyzer");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F2F2F7]">
      <Navbar onTryClick={scrollToAnalyzer} />
      <Hero onTryClick={scrollToAnalyzer} />
      <AnalyzerSection />

      {/* ── Value Strip ── */}
      <div className="bg-white border-y border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { icon: "🎓", label: "Built for Freshers" },
              { icon: "✦",  label: "AI Resume Tailoring" },
              { icon: "📊", label: "Smart Match Scoring" },
              { icon: "⚡", label: "Fast & Clear Suggestions" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0071E3]/[0.07] flex items-center justify-center text-base">
                  {item.icon}
                </div>
                <span className="text-[14px] font-semibold text-[#1D1D1F]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <section id="features" className="bg-[#F2F2F7] py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <p className="text-[12px] font-bold uppercase tracking-[1px] text-[#0071E3] mb-3">Features</p>
            <h2 className="text-[36px] sm:text-[42px] font-extrabold tracking-[-1.5px] text-[#1D1D1F] leading-tight">
              Everything your resume needs
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "✦", title: "Resume Bullet Improvement", desc: "Rewrites vague bullet points into specific, results-driven statements that align with the job description." },
              { icon: "🔍", title: "Missing Keyword Detection", desc: "Surfaces keywords from the job description that are absent in your resume before an ATS filter rejects you." },
              { icon: "📊", title: "Match Score Analysis", desc: "A 0–100 score showing how well your resume fits the role so you can prioritize the right improvements." },
              { icon: "💡", title: "Job-Specific Suggestions", desc: "Actionable, role-targeted recommendations — not generic tips that apply to every resume equally." },
              { icon: "🎓", title: "Fresher-Friendly Guidance", desc: "Designed for students and new graduates. Works even when your experience is limited." },
              { icon: "⚡", title: "Fast AI Review", desc: "Get your full analysis in under 5 seconds. No long forms, no waiting, no complexity." },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border border-black/[0.05] shadow-card
                           hover:-translate-y-1 hover:shadow-card-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0071E3]/[0.07] flex items-center justify-center text-lg mb-4">
                  {f.icon}
                </div>
                <h3 className="text-[15px] font-bold text-[#1D1D1F] mb-2 tracking-tight">{f.title}</h3>
                <p className="text-[14px] text-[#86868B] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <p className="text-[12px] font-bold uppercase tracking-[1px] text-[#0071E3] mb-3">How It Works</p>
            <h2 className="text-[36px] sm:text-[42px] font-extrabold tracking-[-1.5px] text-[#1D1D1F] mb-4 leading-tight">
              Four steps to a stronger resume
            </h2>
            <p className="text-[17px] text-[#86868B] max-w-[420px] mx-auto leading-relaxed">
              No complex setup. No learning curve. Start tailoring in under a minute.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                n: "01",
                icon: "📄",
                title: "Paste Your Resume",
                desc: "Copy and paste your current resume text — all sections, exactly as they are. No formatting required.",
                color: "bg-[#0071E3]",
                light: "bg-[#0071E3]/[0.06]",
              },
              {
                n: "02",
                icon: "🔎",
                title: "Paste Job Description",
                desc: "Add the full job description from the role you're applying to. The more complete, the better the results.",
                color: "bg-[#5856D6]",
                light: "bg-[#5856D6]/[0.06]",
              },
              {
                n: "03",
                icon: "✏️",
                title: "Enter Role Name",
                desc: "Tell FreshCV the specific job title you're targeting. This sharpens the AI's tailoring and keyword mapping.",
                color: "bg-[#FF9F0A]",
                light: "bg-[#FF9F0A]/[0.07]",
              },
              {
                n: "04",
                icon: "✦",
                title: "Get Smart Results",
                desc: "Receive 5 rewritten bullet points, missing keywords, a match score, and clear tips to improve your resume.",
                color: "bg-[#34C759]",
                light: "bg-[#34C759]/[0.07]",
              },
            ].map((step, i) => (
              <div
                key={step.n}
                className="relative bg-[#F2F2F7] rounded-2xl p-6 border border-black/[0.05] flex flex-col gap-4
                           hover:-translate-y-1 hover:shadow-card-md transition-all duration-200"
              >
                {/* Step number + connector line */}
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-extrabold tracking-widest px-2.5 py-1 rounded-full text-white ${step.color}`}>
                    {step.n}
                  </span>
                  {i < 3 && (
                    <span className="hidden lg:block text-[#C7C7CC] text-[18px] absolute -right-3 top-7 z-10">→</span>
                  )}
                </div>

                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl ${step.light} flex items-center justify-center text-xl`}>
                  {step.icon}
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-[15px] font-bold text-[#1D1D1F] mb-2 tracking-tight leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[13.5px] text-[#86868B] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA below steps */}
          <div className="mt-10 text-center">
            <button
              onClick={scrollToAnalyzer}
              className="inline-flex items-center gap-2 bg-[#0071E3] text-white font-semibold text-[14px]
                         px-7 py-3.5 rounded-full hover:bg-[#0062c4] hover:-translate-y-px
                         hover:shadow-card-blue transition-all duration-150"
            >
              Try It Now — It&apos;s Free
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── Before / After ── */}
      <section className="bg-[#F2F2F7] py-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-10">
            <p className="text-[12px] font-bold uppercase tracking-[1px] text-[#0071E3] mb-3">Before & After</p>
            <h2 className="text-[36px] sm:text-[42px] font-extrabold tracking-[-1.5px] text-[#1D1D1F] leading-tight">
              See the difference
            </h2>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-black/[0.05] shadow-card-md">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
              {/* Before */}
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                <p className="text-[10px] font-bold uppercase tracking-wider text-red-400 mb-3">Before FreshCV</p>
                <p className="text-[15px] text-[#1D1D1F] leading-relaxed italic">
                  &ldquo;Worked on college projects and team activities.&rdquo;
                </p>
              </div>
              {/* Arrow */}
              <div className="text-[22px] text-[#86868B] text-center lg:text-left">→</div>
              {/* After */}
              <div className="bg-[#34C759]/[0.05] border border-[#34C759]/[0.2] rounded-2xl p-6">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#1a9e40] mb-3">After FreshCV</p>
                <p className="text-[15px] text-[#1D1D1F] leading-relaxed">
                  &ldquo;Collaborated on 3+ academic and team-based projects, contributing to documentation, execution, and deadline-driven task delivery across cross-functional groups.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <p className="text-[12px] font-bold uppercase tracking-[1px] text-[#0071E3] mb-3">Pricing</p>
          <h2 className="text-[36px] sm:text-[42px] font-extrabold tracking-[-1.5px] text-[#1D1D1F] mb-4 leading-tight">
            Simple, honest pricing
          </h2>
          <p className="text-[17px] text-[#86868B] mb-14 max-w-[380px] mx-auto leading-relaxed">
            Start free. Upgrade when you need more.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[700px] mx-auto">
            {/* Free */}
            <div className="bg-[#F2F2F7] rounded-3xl p-8 border border-black/[0.05] text-left">
              <p className="text-[12px] font-bold uppercase tracking-wider text-[#86868B] mb-3">Free</p>
              <p className="text-[42px] font-extrabold text-[#1D1D1F] tracking-[-2px] leading-none mb-1">
                ₹0<span className="text-[16px] font-medium text-[#86868B] tracking-normal">/mo</span>
              </p>
              <p className="text-[14px] text-[#86868B] mb-7">3 resume analyses per month.</p>
              <ul className="flex flex-col gap-3 mb-8">
                {["3 analyses/month", "Match score", "Improved bullets", "Missing keywords", "Basic suggestions"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[14px] text-[#1D1D1F]">
                    <svg className="w-4 h-4 text-[#34C759] flex-shrink-0" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l3 3 7-7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToAnalyzer}
                className="w-full py-3.5 rounded-xl border border-black/[0.12] text-[14px] font-semibold text-[#1D1D1F] hover:border-[#1D1D1F] transition-colors"
              >
                Get Started Free
              </button>
            </div>
            {/* Pro */}
            <div className="bg-[#0071E3] rounded-3xl p-8 text-left relative overflow-hidden">
              <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 bg-[#34C759] text-white text-[11px] font-bold px-4 py-1.5 rounded-b-xl">
                Most Popular
              </div>
              <p className="text-[12px] font-bold uppercase tracking-wider text-white/60 mb-3 mt-2">Pro</p>
              <p className="text-[42px] font-extrabold text-white tracking-[-2px] leading-none mb-1">
                ₹299<span className="text-[16px] font-medium text-white/60 tracking-normal">/mo</span>
              </p>
              <p className="text-[14px] text-white/60 mb-7">Unlimited analyses. Full dashboard.</p>
              <ul className="flex flex-col gap-3 mb-8">
                {["Unlimited analyses", "Enhanced AI suggestions", "Better keyword mapping", "Full results dashboard", "Priority processing", "Copy-ready output"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[14px] text-white/90">
                    <svg className="w-4 h-4 text-white/80 flex-shrink-0" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l3 3 7-7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <UpgradeToProButton variant="primary" label="Upgrade to Pro →" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-[#1D1D1F] py-24 text-center">
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <p className="text-[12px] font-bold uppercase tracking-[1px] text-white/40 mb-4">Get Started</p>
          <h2 className="text-[38px] sm:text-[50px] font-extrabold tracking-[-2px] text-white leading-tight mb-5">
            Start Improving Your Resume Today
          </h2>
          <p className="text-[17px] text-white/50 leading-relaxed mb-10 max-w-[420px] mx-auto">
            Make your resume smarter, clearer, and more aligned with the jobs you want.
          </p>
          <button
            onClick={scrollToAnalyzer}
            className="bg-white text-[#1D1D1F] font-bold text-[15px] px-9 py-4 rounded-full
                       hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(255,255,255,0.18)]
                       active:translate-y-0 transition-all duration-150"
          >
            Try FreshCV Free →
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#1D1D1F] border-t border-white/[0.06] py-12">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
            <div>
              <p className="text-[19px] font-extrabold text-white mb-2 tracking-tight">
                Fresh<span className="text-[#4DA3FF]">CV</span>
              </p>
              <p className="text-[14px] text-white/40 max-w-[240px] leading-relaxed">
                AI-powered resume tailoring for freshers and early-career professionals.
              </p>
            </div>
            <div className="flex flex-wrap gap-12">
              {[
                { heading: "Product", links: ["Features", "How It Works", "Pricing"] },
                { heading: "Resources", links: ["Resume Tips", "Career Blog", "Templates"] },
                { heading: "Company", links: ["About", "Privacy Policy", "Contact"] },
              ].map((col) => (
                <div key={col.heading}>
                  <p className="text-[11px] font-bold uppercase tracking-[0.8px] text-white/40 mb-4">
                    {col.heading}
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[13px] text-white/30">© 2025 FreshCV. All rights reserved.</p>
            <p className="text-[13px] text-white/30">Made for job seekers everywhere.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
