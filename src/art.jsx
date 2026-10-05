import React from "react";

const Grad = ({ id, stops, x2 = 1, y2 = 1 }) => (
  <linearGradient id={id} x1="0" y1="0" x2={x2} y2={y2}>
    {stops.map(([o, c]) => (
      <stop key={o} offset={o} stopColor={c} />
    ))}
  </linearGradient>
);

const BLUE = [[0, "#dbe9ff"], [0.25, "#7ea2e6"], [0.6, "#2f4fa8"], [1, "#16286b"]];
const SILVER = [[0, "#ffffff"], [0.35, "#c9d1dc"], [0.65, "#f4f7fb"], [1, "#8d99ab"]];

export function Crown({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 80" aria-hidden="true">
      <defs><Grad id="gCrown" stops={BLUE} /></defs>
      <path d="M6 72 L12 18 L40 46 L60 6 L80 46 L108 18 L114 72 Z" fill="url(#gCrown)" stroke="#e8f0ff" strokeWidth="2" strokeLinejoin="round" />
      <rect x="6" y="62" width="108" height="12" rx="3" fill="url(#gCrown)" stroke="#e8f0ff" strokeWidth="2" />
      {[24, 42, 60, 78, 96].map((x) => <circle key={x} cx={x} cy="68" r="2.6" fill="#fff" />)}
      {[12, 60, 108].map((x, i) => <circle key={x} cx={x} cy={i === 1 ? 6 : 18} r="4" fill="#fff" />)}
    </svg>
  );
}

export function Heart({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 95" aria-hidden="true">
      <defs><Grad id="gHeart" stops={BLUE} /></defs>
      <path d="M50 90 C8 60 0 34 20 17 C35 6 48 14 50 26 C52 14 65 6 80 17 C100 34 92 60 50 90Z" fill="url(#gHeart)" stroke="#e8f0ff" strokeWidth="2" />
      <ellipse cx="30" cy="28" rx="9" ry="5" fill="#fff" opacity=".55" transform="rotate(-35 30 28)" />
    </svg>
  );
}

export function Star({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <defs><Grad id="gStar" stops={SILVER} /></defs>
      <polygon points="50,4 62,38 97,38 69,59 80,93 50,72 20,93 31,59 3,38 38,38" fill="url(#gStar)" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

// Destello de 4 puntas
export function Spark({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <defs><Grad id="gSpark" stops={SILVER} /></defs>
      <path d="M50 0 C54 36 64 46 100 50 C64 54 54 64 50 100 C46 64 36 54 0 50 C36 46 46 36 50 0Z" fill="url(#gSpark)" />
    </svg>
  );
}

export function Bow({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 70" aria-hidden="true">
      <defs><Grad id="gBow" stops={[[0, "#f1f6ff"], [0.5, "#aebfe6"], [1, "#6f86c4"]]} /></defs>
      <path d="M50 35 C30 0 4 4 2 22 C0 44 28 52 50 35 Z M50 35 C70 0 96 4 98 22 C100 44 72 52 50 35 Z" fill="url(#gBow)" stroke="#fff" strokeWidth="1.5" />
      <path d="M46 40 L34 68 L48 58 Z M54 40 L66 68 L52 58 Z" fill="url(#gBow)" stroke="#fff" strokeWidth="1.2" />
      <ellipse cx="50" cy="35" rx="8" ry="9" fill="url(#gBow)" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

export function Balloons({ className }) {
  const b = [[40, 40, "#9db8ee"], [78, 32, "#5f7fd0"], [60, 78, "#c7d6f5"]];
  return (
    <svg className={className} viewBox="0 0 110 160" aria-hidden="true">
      <defs>
        <radialGradient id="gBal" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".3" stopColor="#9db8ee" />
          <stop offset="1" stopColor="#2c459b" />
        </radialGradient>
      </defs>
      <path d="M40 78 Q50 120 58 158 M78 70 Q64 120 58 158 M60 114 L58 158" stroke="#9aa7b5" strokeWidth="1.2" fill="none" />
      {b.map(([cx, cy, c]) => (
        <g key={cx}>
          <ellipse cx={cx} cy={cy} rx="27" ry="34" fill="url(#gBal)" opacity=".95" />
          <ellipse cx={cx - 9} cy={cy - 14} rx="5" ry="9" fill="#fff" opacity=".6" />
        </g>
      ))}
    </svg>
  );
}

// Bola disco hecha con CSS (los espejos brillan y giran)
export function DiscoBall({ className }) {
  return (
    <div className={`disco ${className || ""}`} aria-hidden="true">
      <div className="disco-tiles" />
      <div className="disco-shine" />
      <span className="disco-glint">✦</span>
    </div>
  );
}