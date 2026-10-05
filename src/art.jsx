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

/* ===================== Cenicienta ===================== */
const GLASS = [[0, "#ffffff"], [0.5, "#bcd3f5"], [1, "#6f8fd8"]];
const GOLDY = [[0, "#fff"], [0.5, "#dfe7f5"], [1, "#8d99ab"]];

export function Slipper({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <defs><Grad id="gSlip" stops={GLASS} /></defs>
      <path d="M10 14 Q18 24 30 24 C40 30 50 32 57 36 C62 40 60 44 54 45 C42 47 28 46 18 42 L13 58 L8 58 L11 38 Z" fill="url(#gSlip)" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M22 30 L36 34" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".85" />
      <path className="tw" d="M50 8 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill="#fff" />
    </svg>
  );
}

export function Clock({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <defs><Grad id="gClock" stops={GOLDY} /></defs>
      <circle cx="17" cy="11" r="6" fill="url(#gClock)" />
      <circle cx="47" cy="11" r="6" fill="url(#gClock)" />
      <circle cx="32" cy="35" r="25" fill="url(#gClock)" />
      <circle cx="32" cy="35" r="20" fill="#fff" />
      {[0, 90, 180, 270].map((a) => (
        <line key={a} x1="32" y1="18" x2="32" y2="21.5" stroke="#2f4fa8" strokeWidth="2" strokeLinecap="round" transform={`rotate(${a} 32 35)`} />
      ))}
      <line className="hand-h" x1="32" y1="35" x2="32" y2="26" stroke="#16286b" strokeWidth="3" strokeLinecap="round" />
      <line className="hand-m" x1="32" y1="35" x2="32" y2="20" stroke="#2f4fa8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="35" r="2.5" fill="#7ea2e6" />
    </svg>
  );
}

export function Carriage({ className }) {
  return (
    <svg className={className} viewBox="0 0 96 72" aria-hidden="true">
      <defs><Grad id="gCar" stops={GLASS} /></defs>
      <path d="M14 38 C14 16 32 10 48 10 C64 10 82 16 82 38 C82 50 72 52 48 52 C24 52 14 50 14 38 Z" fill="url(#gCar)" stroke="#fff" strokeWidth="1.5" />
      <path d="M30 14 C34 36 34 46 32 52 M48 10 L48 52 M66 14 C62 36 62 46 64 52" stroke="#2f4fa8" strokeWidth="1.6" fill="none" opacity=".7" />
      <ellipse cx="48" cy="30" rx="9" ry="8" fill="#fff" stroke="#2f4fa8" strokeWidth="2" />
      <path d="M42 8 l3 -6 3 4 3 -4 3 6 z" fill="#dfe7f5" stroke="#fff" />
      {[26, 70].map((cx) => (
        <g key={cx} className="wheel" style={{ transformOrigin: `${cx}px 58px` }} stroke="#2f4fa8" strokeWidth="2.5" fill="#fff">
          <circle cx={cx} cy="58" r="11" />
          {[0, 60, 120].map((a) => (
            <line key={a} x1={cx} y1="49" x2={cx} y2="67" strokeWidth="1.5" transform={`rotate(${a} ${cx} 58)`} />
          ))}
        </g>
      ))}
    </svg>
  );
}

export function Castle({ className }) {
  const towers = [[40, 80, 50, 34], [150, 50, 60, 142], [260, 70, 80, 252], [390, 50, 60, 382], [510, 80, 50, 504]];
  return (
    <svg className={className} viewBox="0 0 600 180" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <defs><Grad id="gCastle" x2={0} y2={1} stops={[[0, "#e6eeff"], [1, "#7e98d8"]]} /></defs>
      <g fill="url(#gCastle)" stroke="#fff" strokeWidth="1.5">
        <rect x="0" y="130" width="600" height="50" />
        {towers.map(([x, y, w, px]) => (
          <g key={x}>
            <rect x={x} y={y} width={w} height={180 - y} />
            <polygon points={`${px},${y} ${x + w / 2},${y - 50} ${px + w + 12},${y}`} />
          </g>
        ))}
      </g>
      {[[65, 110], [180, 90], [300, 110], [420, 90], [535, 110]].map(([x, y], i) => (
        <rect key={x} className="win" style={{ animationDelay: `${i * 0.6}s` }} x={x - 4} y={y} width="8" height="14" rx="4" fill="#fff6c8" />
      ))}
    </svg>
  );
}

export function Wand({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <defs><Grad id="gWand" stops={GLASS} /></defs>
      <line x1="14" y1="90" x2="62" y2="42" stroke="#9aa7c8" strokeWidth="5" strokeLinecap="round" />
      <polygon className="tw" points="70,6 76,24 94,24 80,35 85,52 70,42 55,52 60,35 46,24 64,24" fill="url(#gWand)" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}