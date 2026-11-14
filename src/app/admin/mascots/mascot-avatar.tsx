"use client";

import React from "react";
import { Bot } from "lucide-react";

export const DEFAULT_MASCOT_SVGS: Record<string, string> = {
  ash: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0, 20)">
    <path d="M 30 90 Q 40 40 100 40 Q 160 40 170 90 Q 180 170 100 160 Q 20 170 30 90 Z" fill="#a0aec0" />
    <rect x="130" y="110" width="25" height="25" rx="3" fill="#cbd5e0" transform="rotate(15 130 110)" />
    <line x1="125" y1="120" x2="160" y2="125" stroke="#4a5568" stroke-width="2" />
    <line x1="135" y1="110" x2="140" y2="140" stroke="#4a5568" stroke-width="2" />
    <line x1="145" y1="112" x2="150" y2="142" stroke="#4a5568" stroke-width="2" />
    <rect x="40" y="90" width="20" height="8" fill="#fbd38d" transform="rotate(-20 40 90)" />
    <rect x="45" y="85" width="8" height="20" fill="#fbd38d" transform="rotate(-20 45 85)" />
    <ellipse cx="65" cy="85" rx="16" ry="8" fill="#4a5568" opacity="0.3" />
    <ellipse cx="135" cy="85" rx="16" ry="8" fill="#4a5568" opacity="0.3" />
    <g transform="translate(65, 75)">
      <circle cx="0" cy="0" r="14" fill="#e2e8f0" />
      <path d="M -15 -5 Q 0 5 15 -5 L 15 -15 L -15 -15 Z" fill="#a0aec0" />
      <circle cx="2" cy="2" r="5" fill="#2d3748" />
    </g>
    <g transform="translate(135, 75)">
      <circle cx="0" cy="0" r="14" fill="#e2e8f0" />
      <path d="M -15 -5 Q 0 5 15 -5 L 15 -15 L -15 -15 Z" fill="#a0aec0" />
      <circle cx="-2" cy="2" r="5" fill="#2d3748" />
    </g>
    <path d="M 88 100 Q 95 95 100 100 T 112 100" fill="none" stroke="#2d3748" stroke-width="3" stroke-linecap="round" />
    <path d="M 170 30 L 150 50 M 160 20 L 150 40 M 175 40 L 155 45" stroke="#e2e8f0" stroke-width="1" />
    <circle cx="160" cy="15" r="2" fill="#2d3748" />
  </g>
</svg>`,
  penny: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0, 20)">
    <path d="M 40 80 Q 40 30 100 30 Q 160 30 160 80 Q 170 160 100 160 Q 30 160 40 80 Z" fill="#fefcbf" />
    <path d="M 60 130 Q 100 160 140 130" fill="none" stroke="#ed8936" stroke-width="12" stroke-linecap="round" />
    <g transform="translate(70, 75)">
      <circle cx="0" cy="0" r="18" fill="#ffffff" />
      <circle cx="3" cy="3" r="8" fill="#2d3748" />
      <circle cx="5" cy="1" r="3" fill="#ffffff" />
    </g>
    <g transform="translate(130, 75)">
      <circle cx="0" cy="0" r="18" fill="#ffffff" />
      <circle cx="-3" cy="3" r="8" fill="#2d3748" />
      <circle cx="-1" cy="1" r="3" fill="#ffffff" />
    </g>
    <path d="M 92 100 Q 100 95 108 100" fill="none" stroke="#2d3748" stroke-width="3" stroke-linecap="round" />
    <rect x="96" y="100" width="8" height="4" rx="2" fill="#fff" stroke="#2d3748" stroke-width="1" />
    <path d="M 155 45 Q 160 55 155 60 Q 150 55 155 45 Z" fill="#63b3ed" opacity="0.8" />
    <g transform="translate(100, 140)">
      <circle cx="-25" cy="-5" r="8" fill="#f6ad55" />
      <circle cx="25" cy="-5" r="8" fill="#f6ad55" />
      <circle cx="0" cy="0" r="22" fill="#ecc94b" stroke="#d69e2e" stroke-width="4" />
      <text x="0" y="6" font-family="'Outfit', sans-serif" font-weight="900" font-size="18" fill="#b7791f" text-anchor="middle">₫</text>
      <circle cx="-15" cy="10" r="8" fill="#f6ad55" />
      <circle cx="15" cy="10" r="8" fill="#f6ad55" />
    </g>
  </g>
</svg>`,
  sage: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0, 20)">
    <path d="M 45 75 Q 45 25 100 25 Q 155 25 155 75 Q 165 155 100 155 Q 35 155 45 75 Z" fill="#e6fffa" />
    <path d="M 60 110 L 140 110 L 130 160 L 70 160 Z" fill="#b2f5ea" />
    <g transform="translate(70, 75)">
      <circle cx="0" cy="0" r="14" fill="#ffffff" />
      <circle cx="0" cy="-2" r="7" fill="#2d3748" />
      <path d="M -5 -8 Q 0 -15 5 -8" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" />
    </g>
    <g transform="translate(130, 75)">
      <circle cx="0" cy="0" r="14" fill="#ffffff" />
      <circle cx="0" cy="-2" r="7" fill="#2d3748" />
      <path d="M -5 -8 Q 0 -15 5 -8" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" />
    </g>
    <ellipse cx="50" cy="90" rx="10" ry="6" fill="#ff8a80" opacity="0.4" />
    <ellipse cx="150" cy="90" rx="10" ry="6" fill="#ff8a80" opacity="0.4" />
    <path d="M 90 95 Q 100 110 110 95" fill="none" stroke="#2d3748" stroke-width="4" stroke-linecap="round" />
    <g transform="translate(100, 135)">
      <path d="M -15 15 L 15 15 L 10 -5 L -10 -5 Z" fill="#ed8936" />
      <ellipse cx="0" cy="-5" rx="10" ry="3" fill="#744210" />
      <path d="M 0 -5 Q -15 -20 -5 -25 Q 5 -15 0 -5" fill="#48bb78" />
      <path d="M 0 -5 Q 15 -15 20 -5 Q 10 5 0 -5" fill="#38a169" />
      <circle cx="-15" cy="5" r="7" fill="#81e6d9" />
      <circle cx="15" cy="5" r="7" fill="#81e6d9" />
    </g>
  </g>
</svg>`,
  nora: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0, 20)">
    <circle cx="100" cy="90" r="80" fill="#ebf4ff" opacity="0.6" />
    <path d="M 40 80 Q 40 30 100 30 Q 160 30 160 80 Q 165 160 100 160 Q 35 160 40 80 Z" fill="#0072d5" />
    <rect x="50" y="50" width="100" height="70" rx="35" fill="#ffffff" stroke="#f7fcff" stroke-width="4" />
    <g transform="translate(75, 80)">
      <circle cx="0" cy="0" r="10" fill="#0055a9" />
      <circle cx="2" cy="-2" r="3" fill="#fff" />
    </g>
    <g transform="translate(125, 80)">
      <circle cx="0" cy="0" r="10" fill="#0055a9" />
      <circle cx="2" cy="-2" r="3" fill="#fff" />
    </g>
    <path d="M 92 98 Q 100 104 108 98" fill="none" stroke="#0055a9" stroke-width="3" stroke-linecap="round" />
    <g transform="translate(145, 30)">
      <path d="M 0 10 Q -10 10 -10 20 Q -10 10 -20 10 Q -10 10 -10 0 Q -10 10 0 10 Z" fill="#f6e05e" />
    </g>
    <g transform="translate(57, 120)">
      <path d="M 0 10 Q -10 10 -10 20 Q -10 10 -20 10 Q -10 10 -10 0 Q -10 10 0 10 Z" fill="#f6e05e" transform="scale(0.6)" />
    </g>
    <path d="M 70 120 L 130 120 L 120 140 L 80 140 Z" fill="#fff" opacity="0.3" />
    <g transform="translate(100, 140)">
      <circle cx="-24" cy="-4" r="9" fill="#d9e6ff" />
      <circle cx="24" cy="-4" r="9" fill="#d9e6ff" />
      <g transform="translate(0, 0) scale(0.72)">
        <rect x="-24" y="-16" width="48" height="32" rx="6" fill="#ffffff" stroke="#b8c2d4" stroke-width="4" />
        <rect x="-24" y="-16" width="48" height="13" rx="6" fill="#0072d5" />
        <rect x="-24" y="-3" width="48" height="4" fill="#c9d3e2" />
        <rect x="-16" y="-9" width="10" height="8" rx="2" fill="#f5c04a" />
        <circle cx="8" cy="-7" r="1.6" fill="#8892a6" />
        <circle cx="15" cy="-7" r="1.6" fill="#8892a6" />
        <circle cx="22" cy="-7" r="1.6" fill="#8892a6" />
      </g>
    </g>
  </g>
</svg>`,
  jade: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0, 20)">
    <path d="M 40 80 Q 40 30 100 30 Q 160 30 160 80 Q 170 160 100 160 Q 30 160 40 80 Z" fill="#38a169" />
    <path d="M 40 100 L 100 150 L 160 100 L 170 160 L 30 160 Z" fill="#22543d" />
    <path d="M 80 100 L 100 140 L 120 100 Z" fill="#fff" />
    <rect x="55" y="65" width="40" height="28" rx="6" fill="#fff" opacity="0.9" stroke="#1a202c" stroke-width="4" />
    <rect x="105" y="65" width="40" height="28" rx="6" fill="#fff" opacity="0.9" stroke="#1a202c" stroke-width="4" />
    <line x1="95" y1="79" x2="105" y2="79" stroke="#1a202c" stroke-width="4" />
    <g transform="translate(75, 79)">
      <circle cx="0" cy="0" r="6" fill="#2d3748" />
      <circle cx="2" cy="-2" r="2" fill="#fff" />
    </g>
    <g transform="translate(125, 79)">
      <circle cx="0" cy="0" r="6" fill="#2d3748" />
      <circle cx="2" cy="-2" r="2" fill="#fff" />
    </g>
    <path d="M 90 105 Q 100 110 112 100" fill="none" stroke="#2d3748" stroke-width="3" stroke-linecap="round" />
    <g transform="translate(110, 110) rotate(10)">
      <rect x="0" y="0" width="40" height="50" rx="4" fill="#f7fafc" stroke="#2d3748" stroke-width="2" />
      <path d="M 5 40 L 15 30 L 25 35 L 35 15 L 35 45 Z" fill="#48bb78" opacity="0.5" />
      <path d="M 5 40 L 15 30 L 25 35 L 35 15" fill="none" stroke="#2f855a" stroke-width="3" stroke-linejoin="round" />
      <circle cx="0" cy="40" r="6" fill="#48bb78" />
    </g>
  </g>
</svg>`,
  ruby: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0, 20)">
    <path d="M 35 80 Q 35 30 100 30 Q 165 30 165 80 Q 175 160 100 160 Q 25 160 35 80 Z" fill="#9b2c2c" />
    <path d="M 20 110 Q 50 80 100 100 Q 150 80 180 110 Q 170 140 100 130 Q 30 140 20 110 Z" fill="#fff5f5" />
    <path d="M 70 10 L 80 -15 L 100 5 L 120 -15 L 130 10 Z" fill="#ecc94b" />
    <circle cx="80" cy="-5" r="4" fill="#fc8181" />
    <circle cx="100" cy="5" r="5" fill="#fc8181" />
    <circle cx="120" cy="-5" r="4" fill="#fc8181" />
    <g transform="translate(70, 70)">
      <circle cx="0" cy="0" r="14" fill="#ffffff" />
      <path d="M -15 -5 Q 0 -10 15 -5 L 15 -15 L -15 -15 Z" fill="#742a2a" />
      <path d="M 12 -8 L 20 -12" stroke="#742a2a" stroke-width="3" stroke-linecap="round" />
      <circle cx="0" cy="3" r="6" fill="#2d3748" />
      <circle cx="2" cy="0" r="2" fill="#ffffff" />
    </g>
    <g transform="translate(130, 70)">
      <circle cx="0" cy="0" r="14" fill="#ffffff" />
      <path d="M -15 -5 Q 0 -10 15 -5 L 15 -15 L -15 -15 Z" fill="#742a2a" />
      <path d="M -12 -8 L -20 -12" stroke="#742a2a" stroke-width="3" stroke-linecap="round" />
      <circle cx="0" cy="3" r="6" fill="#2d3748" />
      <circle cx="2" cy="0" r="2" fill="#ffffff" />
    </g>
    <ellipse cx="50" cy="85" rx="10" ry="5" fill="#f56565" opacity="0.6" />
    <ellipse cx="150" cy="85" rx="10" ry="5" fill="#f56565" opacity="0.6" />
    <path d="M 90 95 Q 100 102 112 90" fill="none" stroke="#742a2a" stroke-width="4" stroke-linecap="round" />
    <path d="M 98 96 Q 100 93 102 96" fill="none" stroke="#f56565" stroke-width="3" stroke-linecap="round" />
    <path d="M 80 130 L 100 150 L 120 130" fill="none" stroke="#ecc94b" stroke-width="4" />
    <polygon points="90,150 110,150 100,170" fill="#63b3ed" />
  </g>
</svg>`,
  bellingham: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0, 20)">
    <g transform="translate(20, 20) rotate(-20)">
      <rect x="0" y="0" width="30" height="15" rx="2" fill="#d69e2e" />
      <rect x="2" y="2" width="26" height="6" rx="1" fill="#ecc94b" />
    </g>
    <g transform="translate(140, 50) rotate(15)">
      <rect x="0" y="0" width="30" height="15" rx="2" fill="#d69e2e" />
      <rect x="2" y="2" width="26" height="6" rx="1" fill="#ecc94b" />
    </g>
    <path d="M 30 80 Q 30 30 100 30 Q 170 30 170 80 Q 180 160 100 160 Q 20 160 30 80 Z" fill="#1a202c" />
    <line x1="60" y1="120" x2="50" y2="160" stroke="#4a5568" stroke-width="2" />
    <line x1="80" y1="120" x2="70" y2="160" stroke="#4a5568" stroke-width="2" />
    <line x1="120" y1="120" x2="130" y2="160" stroke="#4a5568" stroke-width="2" />
    <line x1="140" y1="120" x2="150" y2="160" stroke="#4a5568" stroke-width="2" />
    <path d="M 80 110 L 100 135 L 120 110 Z" fill="#fff" />
    <path d="M 95 115 L 105 115 L 100 155 Z" fill="#d69e2e" />
    <path d="M 60 25 L 140 25 L 130 -15 L 70 -15 Z" fill="#d69e2e" />
    <path d="M 50 25 L 150 25 L 150 35 L 50 35 Z" fill="#d69e2e" />
    <rect x="65" y="15" width="70" height="10" fill="#b7791f" />
    <g transform="translate(100, 70)">
      <path d="M -40 0 Q -20 -10 0 0 Q 20 -10 40 0 L 35 15 Q 20 25 5 10 L 0 5 L -5 10 Q -20 25 -35 15 Z" fill="#2d3748" />
      <path d="M -30 2 L -15 2" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.5" />
      <path d="M 15 2 L 30 2" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.5" />
      <path d="M -45 -2 Q 0 -15 45 -2" fill="none" stroke="#d69e2e" stroke-width="3" />
    </g>
    <path d="M 85 105 Q 100 112 115 98" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" />
    <line x1="150" y1="90" x2="165" y2="170" stroke="#d69e2e" stroke-width="6" stroke-linecap="round" />
    <circle cx="150" cy="90" r="8" fill="#fff" stroke="#d69e2e" stroke-width="2" />
    <circle cx="150" cy="110" r="7" fill="#1a202c" stroke="#4a5568" stroke-width="1" />
  </g>
</svg>`,
  ronaldo: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0, 20)">
    <path d="M 40 80 Q 40 30 100 30 Q 160 30 160 80 Q 165 160 100 160 Q 35 160 40 80 Z" fill="#8a1c14" />
    <path d="M 42 110 L 158 110 L 163 155 Q 100 163 37 155 Z" fill="#1e6f3e" />
    <rect x="50" y="46" width="100" height="70" rx="35" fill="#f6d0b1" />
    <g transform="translate(75, 76)">
      <circle cx="0" cy="0" r="10" fill="#1a202c" />
      <circle cx="2" cy="-2" r="3" fill="#fff" />
    </g>
    <g transform="translate(125, 76)">
      <circle cx="0" cy="0" r="10" fill="#1a202c" />
      <circle cx="2" cy="-2" r="3" fill="#fff" />
    </g>
    <path d="M 96 84 Q 109 83 106 90 Q 103 92 98 92 Q 103 94 106 97 Q 109 103 96 102" fill="none" stroke="#2d3748" stroke-width="3.5" stroke-linecap="round" />
    <text x="100" y="142" font-family="'Outfit', sans-serif" font-weight="900" font-size="28" fill="#f6e05e" text-anchor="middle">7</text>
    <g transform="translate(100, 140)">
      <circle cx="-24" cy="-4" r="9" fill="#f6d0b1" />
      <circle cx="24" cy="-4" r="9" fill="#f6d0b1" />
    </g>
    <g transform="translate(-2, 140) scale(0.55)">
      <circle cx="34" cy="14" r="25" fill="#fffaf0" stroke="#e2d9c5" stroke-width="2" />
      <circle cx="24" cy="10" r="3.5" fill="#2d3748" />
      <circle cx="46" cy="10" r="3.5" fill="#2d3748" />
    </g>
  </g>
</svg>`,
  messi: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0, 20)">
    <path d="M 40 80 Q 40 30 100 30 Q 160 30 160 80 Q 165 160 100 160 Q 35 160 40 80 Z" fill="#54a0de" />
    <path d="M 42 110 L 158 110 L 163 155 Q 100 163 37 155 Z" fill="#ffffff" />
    <rect x="50" y="46" width="100" height="70" rx="35" fill="#f6d0b1" />
    <path d="M 58 82 Q 65 118 100 116 Q 135 118 142 82" fill="none" stroke="#3a2b1e" stroke-width="5" stroke-linecap="round" />
    <g transform="translate(75, 76)">
      <circle cx="0" cy="0" r="10" fill="#1a202c" />
      <circle cx="-3" cy="-2" r="3" fill="#fff" />
    </g>
    <g transform="translate(125, 76)">
      <circle cx="0" cy="0" r="10" fill="#1a202c" />
      <circle cx="-3" cy="-2" r="3" fill="#fff" />
    </g>
    <path d="M 88 104 Q 100 96 112 104" fill="none" stroke="#2d3748" stroke-width="3.5" stroke-linecap="round" />
    <text x="100" y="142" font-family="'Outfit', sans-serif" font-weight="900" font-size="28" fill="#1c4e80" text-anchor="middle">10</text>
    <g transform="translate(100, 140)">
      <circle cx="-24" cy="-4" r="9" fill="#f6d0b1" />
      <circle cx="24" cy="-4" r="9" fill="#f6d0b1" />
    </g>
  </g>
</svg>`,
  huysun: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0, 20)">
    <path d="M 45 110 L 155 110 L 163 158 Q 100 168 37 158 Z" fill="#1a2b4c" />
    <path d="M 70 110 L 100 130 L 130 110 L 115 110 L 100 122 L 85 110 Z" fill="#ffffff" />
    <path d="M 45 85 Q 40 35 100 35 Q 160 35 155 85 Q 160 135 100 135 Q 40 135 45 85 Z" fill="#f6d0b1" />
    <ellipse cx="68" cy="98" rx="8" ry="4" fill="#ff7675" opacity="0.5" />
    <ellipse cx="132" cy="98" rx="8" ry="4" fill="#ff7675" opacity="0.5" />
    <path d="M 46 65 Q 42 28 100 25 Q 158 28 154 65 Z" fill="#1a1a1a" />
    <path d="M 46 65 Q 42 35 72 32 Q 100 28 154 58 Q 145 35 100 32 Q 60 35 46 65 Z" fill="#2d2d2d" />
    <g transform="translate(76, 80)">
      <circle cx="0" cy="0" r="12" fill="#ffffff" />
      <circle cx="1" cy="1" r="6.5" fill="#1a1a1a" />
      <circle cx="3" cy="-1.5" r="2.3" fill="#ffffff" />
    </g>
    <g transform="translate(124, 80)">
      <circle cx="0" cy="0" r="12" fill="#ffffff" />
      <circle cx="1" cy="1" r="6.5" fill="#1a1a1a" />
      <circle cx="3" cy="-1.5" r="2.3" fill="#ffffff" />
    </g>
    <path d="M 92 104 Q 100 112 108 104" fill="none" stroke="#2d3748" stroke-width="2.5" stroke-linecap="round" />
  </g>
</svg>`,
};

// Aliases
DEFAULT_MASCOT_SVGS["sterling"] = DEFAULT_MASCOT_SVGS["bellingham"];

export function resolveMascotSvg(
  tierName?: string,
  htmlContent?: string | null
): string | null {
  if (htmlContent) {
    const svgMatch = htmlContent.match(/<svg[\s\S]*?<\/svg>/i);
    if (svgMatch) {
      return svgMatch[0];
    }
  }

  if (tierName) {
    const key = tierName.trim().toLowerCase();
    if (DEFAULT_MASCOT_SVGS[key]) {
      return DEFAULT_MASCOT_SVGS[key];
    }
  }

  return null;
}

interface MascotAvatarProps {
  mascot: {
    tierName?: string;
    displayName?: string;
    htmlContent?: string | null;
    mascotAssetUrl?: string | null;
  };
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function MascotAvatar({
  mascot,
  size = "md",
  className = "",
}: MascotAvatarProps) {
  const sizeClass = {
    sm: "size-9 rounded-xl",
    md: "size-12 rounded-2xl",
    lg: "size-16 rounded-2xl",
    xl: "size-24 rounded-3xl",
  }[size];

  // 1. Asset URL takes precedence if present
  if (mascot.mascotAssetUrl) {
    return (
      <div
        className={`shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800 border border-border/50 p-1 flex items-center justify-center ${sizeClass} ${className}`}
      >
        <img
          src={mascot.mascotAssetUrl}
          alt={mascot.displayName || "Linh vật"}
          className="size-full object-contain"
        />
      </div>
    );
  }

  // 2. SVG resolution from htmlContent or built-in dictionary
  const svg = resolveMascotSvg(mascot.tierName, mascot.htmlContent);

  if (svg) {
    return (
      <div
        className={`shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800 border border-border/50 p-1 flex items-center justify-center [&>svg]:size-full [&>svg]:max-h-full [&>svg]:max-w-full [&>svg]:object-contain ${sizeClass} ${className}`}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }

  // 3. Fallback generic icon
  return (
    <div
      className={`shrink-0 flex items-center justify-center bg-primary/10 text-primary ${sizeClass} ${className}`}
    >
      <Bot className="size-1/2" />
    </div>
  );
}
