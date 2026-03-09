"use client";

import { useEffect, useState } from "react";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  animate?: boolean;
}

function getScoreColor(score: number): string {
  if (score >= 75) return "#34C759";
  if (score >= 50) return "#FF9F0A";
  return "#FF3B30";
}

function getScoreLabel(score: number): string {
  if (score >= 75) return "Strong";
  if (score >= 50) return "Moderate";
  return "Weak";
}

export default function ScoreRing({
  score,
  size = 100,
  strokeWidth = 7,
  animate = true,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [offset, setOffset] = useState(circumference); // start empty

  useEffect(() => {
    if (!animate) {
      setOffset(circumference - (score / 100) * circumference);
      return;
    }
    // Tiny delay to trigger CSS transition after mount
    const t = setTimeout(() => {
      setOffset(circumference - (score / 100) * circumference);
    }, 80);
    return () => clearTimeout(t);
  }, [score, circumference, animate]);

  const color = getScoreColor(score);
  const label = getScoreLabel(score);
  const center = size / 2;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#E5E5EA"
            strokeWidth={strokeWidth}
          />
          {/* Fill */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="score-ring-animate"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-extrabold leading-none"
            style={{ fontSize: size * 0.22, color: "#1D1D1F" }}
          >
            {score}
          </span>
          <span
            className="font-bold uppercase tracking-wide"
            style={{ fontSize: size * 0.09, color: "#86868B", marginTop: 2 }}
          >
            / 100
          </span>
        </div>
      </div>
      {/* Label pill */}
      <span
        className="text-[11px] font-bold px-3 py-1 rounded-full"
        style={{
          background: `${color}18`,
          color,
          border: `1px solid ${color}30`,
        }}
      >
        {label} Match
      </span>
    </div>
  );
}
