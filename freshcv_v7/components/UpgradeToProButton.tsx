"use client";

import { useState } from "react";
import UpgradeModal from "./UpgradeModal";

interface UpgradeToProButtonProps {
  variant?: "primary" | "secondary";
  label?: string;
  className?: string;
}

export default function UpgradeToProButton({
  variant  = "primary",
  label    = "Upgrade to Pro →",
  className = "",
}: UpgradeToProButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          variant === "primary"
            ? `w-full py-3.5 rounded-xl bg-white text-[#0071E3] text-[14px] font-bold
               hover:bg-white/90 active:scale-[0.98] transition-all duration-150 ${className}`
            : `w-full py-3.5 rounded-xl border border-black/[0.12] text-[#1D1D1F] text-[14px]
               font-semibold hover:border-[#0071E3] hover:text-[#0071E3] transition-colors ${className}`
        }
      >
        {label}
      </button>

      <UpgradeModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
