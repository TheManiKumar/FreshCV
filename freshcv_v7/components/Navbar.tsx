"use client";

import { useState, useEffect } from "react";

interface NavbarProps {
  onTryClick: () => void;
}

export default function Navbar({ onTryClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F2F2F7]/90 backdrop-blur-xl border-b border-black/[0.06] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-1.5">
          <span className="text-[19px] font-extrabold tracking-tight text-[#1D1D1F]">
            Fresh<span className="text-[#0071E3]">CV</span>
          </span>
        </a>

        {/* Nav links — hidden on mobile */}
        <ul className="hidden md:flex items-center gap-8">
          {["Features", "How It Works", "Pricing"].map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                className="text-[13.5px] font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={onTryClick}
          className="bg-[#0071E3] text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-full 
                     hover:bg-[#0062c4] hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(0,113,227,0.35)] 
                     active:translate-y-0 transition-all duration-150"
        >
          Try FreshCV
        </button>
      </div>
    </nav>
  );
}
