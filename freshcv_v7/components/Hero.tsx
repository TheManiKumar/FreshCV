"use client";

interface HeroProps {
  onTryClick: () => void;
  onDemoClick?: () => void;
}

// Mini product mockup shown on the right side of the hero
function ProductMockup() {
  return (
    <div className="relative w-full max-w-[440px] mx-auto">
      {/* Floating badge — keywords */}
      <div className="absolute -top-4 -right-2 sm:right-[-24px] z-10 bg-white rounded-2xl px-4 py-3 shadow-card-md border border-black/[0.05] animate-fade-up-2">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#86868B] mb-1">Keywords Found</p>
        <p className="text-xl font-extrabold text-[#1D1D1F] leading-none">14 / 18</p>
        <p className="text-[11px] text-[#86868B] mt-0.5">Good coverage</p>
      </div>

      {/* Floating badge — bullets */}
      <div className="absolute -bottom-2 -left-2 sm:left-[-24px] z-10 bg-white rounded-2xl px-4 py-3 shadow-card-md border border-black/[0.05] animate-fade-up-3">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#86868B] mb-1">Bullets Improved</p>
        <p className="text-xl font-extrabold text-[#1D1D1F] leading-none">5 rewrites</p>
        <p className="text-[11px] text-[#86868B] mt-0.5">Copy-ready output</p>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-3xl p-6 shadow-card-lg border border-black/[0.05] animate-fade-up-1">
        {/* Window chrome */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="ml-2 text-[11px] font-semibold text-[#86868B]">
            FreshCV — Analysis
          </span>
        </div>

        {/* Score row */}
        <div className="flex items-center gap-4 mb-5">
          {/* Score ring */}
          <div className="relative w-[68px] h-[68px] flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 68 68">
              <circle cx="34" cy="34" r="27" fill="none" stroke="#E5E5EA" strokeWidth="6" />
              <circle
                cx="34" cy="34" r="27" fill="none"
                stroke="#34C759" strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="169.6"
                strokeDashoffset="30.5"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[17px] font-extrabold text-[#1D1D1F] leading-none">82</span>
              <span className="text-[8px] font-bold text-[#86868B] mt-0.5">MATCH</span>
            </div>
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#1D1D1F]">Strong Match</p>
            <p className="text-[12px] text-[#86868B] leading-relaxed mt-0.5">
              Small improvements can push this to 90+
            </p>
          </div>
        </div>

        {/* Improved bullets */}
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#86868B] mb-2.5">
            Improved Bullets
          </p>
          {[
            "Led 3+ team projects with on-time delivery.",
            "Built a web app with optimized front-end performance.",
          ].map((b, i) => (
            <div key={i} className="flex gap-2 items-start mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] flex-shrink-0 mt-[6px]" />
              <p className="text-[12px] text-[#1D1D1F] leading-relaxed">{b}</p>
            </div>
          ))}
        </div>

        {/* Missing keywords */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#86868B] mb-2.5">
            Missing Keywords
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["SQL", "Excel", "Analysis", "Presentation", "Collaboration"].map((kw) => (
              <span
                key={kw}
                className="text-[11px] font-semibold text-[#0071E3] bg-[#0071E3]/[0.08] 
                           border border-[#0071E3]/[0.18] px-2.5 py-1 rounded-full"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ onTryClick, onDemoClick }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center pt-16 bg-[#F2F2F7]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* ── Left: Copy ── */}
          <div className="flex-1 max-w-[580px] text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#0071E3]/[0.08] border border-[#0071E3]/[0.18] text-[#0071E3] text-[12px] font-semibold px-4 py-2 rounded-full mb-7">
              <span className="w-2 h-2 rounded-full bg-[#34C759]" />
              AI-Powered Resume Tailoring
            </div>

            {/* Headline */}
            <h1 className="text-[42px] sm:text-[52px] lg:text-[58px] font-extrabold leading-[1.07] tracking-[-2px] text-[#1D1D1F] mb-5">
              Make Your Resume{" "}
              <span className="text-[#0071E3]">Match the Job</span>
            </h1>

            {/* Sub */}
            <p className="text-[17px] text-[#86868B] leading-relaxed max-w-[460px] mx-auto lg:mx-0 mb-9">
              Paste your resume and job description to instantly improve bullet
              points, detect missing keywords, and get a smart match score.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onTryClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0071E3] text-white 
                           font-semibold text-[15px] px-7 py-[14px] rounded-full
                           hover:bg-[#0062c4] hover:-translate-y-[2px] hover:shadow-card-blue
                           active:translate-y-0 transition-all duration-150"
              >
                Try FreshCV Free
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
              <button
                onClick={onDemoClick ?? onTryClick}
                className="w-full sm:w-auto border border-black/[0.12] text-[#1D1D1F] font-semibold 
                           text-[15px] px-7 py-[14px] rounded-full flex items-center justify-center gap-2
                           hover:border-[#1D1D1F] hover:-translate-y-px
                           transition-all duration-150"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M10 8l6 4-6 4V8z" />
                </svg>
                View Demo
              </button>
            </div>

            {/* Trust line */}
            <p className="mt-6 text-[13px] text-[#86868B] flex items-center justify-center lg:justify-start gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-[#34C759]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Built for freshers, internships, and entry-level roles.
            </p>
          </div>

          {/* ── Right: Product Mockup ── */}
          <div className="flex-1 w-full max-w-[480px] lg:max-w-none flex justify-center lg:justify-end px-6 lg:px-0">
            <ProductMockup />
          </div>

        </div>
      </div>
    </section>
  );
}
