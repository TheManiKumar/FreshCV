import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function ProPage() {
  const cookieStore = cookies();
  const isPro = cookieStore.get("freshcv_pro")?.value === "true";

  if (!isPro) {
    redirect("/#pricing");
  }

  return (
    <main className="min-h-screen bg-[#F2F2F7]">

      {/* ── Minimal Pro Navbar ── */}
      <nav className="sticky top-0 z-50 bg-[#F2F2F7]/90 backdrop-blur-xl border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-[19px] font-extrabold tracking-tight text-[#1D1D1F]">
            Fresh<span className="text-[#0071E3]">CV</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold bg-[#34C759]/[0.10] text-[#1a9e40] border border-[#34C759]/[0.2] px-3 py-1.5 rounded-full">
              ✦ Pro
            </span>
            <Link
              href="/"
              className="text-[13.5px] font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors"
            >
              ← Back to Analyzer
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[12px] font-bold uppercase tracking-[1px] text-[#0071E3] mb-3">Pro Dashboard</p>
          <h1 className="text-[40px] sm:text-[48px] font-extrabold tracking-[-2px] text-[#1D1D1F] leading-tight mb-4">
            Your Pro Workspace
          </h1>
          <p className="text-[17px] text-[#86868B] leading-relaxed max-w-[480px]">
            Welcome to FreshCV Pro. Run unlimited resume analyses, access advanced AI rewrites, and track your improvement over time.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {[
            {
              icon: "✦",
              title: "Unlimited Analyses",
              desc: "Run as many resume analyses as you need, with no monthly limits.",
              cta: "Analyze a Resume",
              href: "/#analyzer",
              accent: "bg-[#0071E3]/[0.07]",
              iconColor: "text-[#0071E3]",
            },
            {
              icon: "🔍",
              title: "Advanced Keyword Mapping",
              desc: "Deeper keyword detection with role-specific importance weighting.",
              cta: "Coming Soon",
              href: "#",
              accent: "bg-[#5856D6]/[0.07]",
              iconColor: "text-[#5856D6]",
            },
            {
              icon: "📊",
              title: "Analysis History",
              desc: "Review and compare all past resume analyses in one place.",
              cta: "Coming Soon",
              href: "#",
              accent: "bg-[#FF9F0A]/[0.08]",
              iconColor: "text-[#b87000]",
            },
            {
              icon: "📄",
              title: "Export Results",
              desc: "Download your improved bullets and suggestions as a formatted PDF.",
              cta: "Coming Soon",
              href: "#",
              accent: "bg-[#34C759]/[0.07]",
              iconColor: "text-[#1a9e40]",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-6 border border-black/[0.05] shadow-card
                         hover:-translate-y-1 hover:shadow-card-md transition-all duration-200"
            >
              <div className={`w-11 h-11 rounded-xl ${card.accent} flex items-center justify-center text-xl mb-4`}>
                {card.icon}
              </div>
              <h3 className="text-[15px] font-bold text-[#1D1D1F] mb-2 tracking-tight">{card.title}</h3>
              <p className="text-[14px] text-[#86868B] leading-relaxed mb-5">{card.desc}</p>
              <Link
                href={card.href}
                className={`inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors
                  ${card.href === "#"
                    ? "text-[#C7C7CC] cursor-default pointer-events-none"
                    : "text-[#0071E3] hover:text-[#0062c4]"
                  }`}
              >
                {card.cta}
                {card.href !== "#" && (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </Link>
            </div>
          ))}
        </div>

        {/* Quick action CTA */}
        <div className="bg-[#0071E3] rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.8px] text-white/60 mb-2">Ready to analyze</p>
            <h2 className="text-[22px] font-extrabold text-white tracking-tight mb-1">
              Analyze a resume now
            </h2>
            <p className="text-[14px] text-white/65">
              Paste your resume and job description for instant Pro-grade results.
            </p>
          </div>
          <Link
            href="/#analyzer"
            className="flex-shrink-0 bg-white text-[#0071E3] font-bold text-[14px] px-7 py-3.5 rounded-xl
                       hover:bg-white/90 transition-colors whitespace-nowrap"
          >
            Go to Analyzer →
          </Link>
        </div>

      </div>
    </main>
  );
}
