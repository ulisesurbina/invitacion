import React from "react";

const GOLD = "#d9b45a";

export function Slipper({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="gSlip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".5" stopColor="#bcd8f2" />
          <stop offset="1" stopColor="#6fa3d9" />
        </linearGradient>
      </defs>
      <path
        d="M10 14 Q18 24 30 24 C40 30 50 32 57 36 C62 40 60 44 54 45 C42 47 28 46 18 42 L13 58 L8 58 L11 38 Z"
        fill="url(#gSlip)" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"
      />
      <path d="M22 30 L36 34" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".85" />
      <path d="M50 12 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill="#f3dc9a" />
    </svg>
  );
}

export function Clock({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="gClock" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3dc9a" />
          <stop offset=".5" stopColor={GOLD} />
          <stop offset="1" stopColor="#b8923a" />
        </linearGradient>
      </defs>
      <circle cx="17" cy="11" r="6" fill="url(#gClock)" />
      <circle cx="47" cy="11" r="6" fill="url(#gClock)" />
      <circle cx="32" cy="35" r="25" fill="url(#gClock)" />
      <circle cx="32" cy="35" r="20" fill="#fff" />
      {[0, 90, 180, 270].map((a) => (
        <line key={a} x1="32" y1="18" x2="32" y2="21.5" stroke="#3f78b8" strokeWidth="2"
          strokeLinecap="round" transform={`rotate(${a} 32 35)`} />
      ))}
      <line x1="32" y1="35" x2="32" y2="25" stroke="#25507f" strokeWidth="3" strokeLinecap="round" />
      <line x1="32" y1="35" x2="32" y2="21" stroke="#3f78b8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="35" r="2.5" fill={GOLD} />
    </svg>
  );
}

export function Balloons({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M22 34 Q30 48 32 60 M42 30 Q36 46 32 60 M33 41 L32 60"
        stroke="#9aa7b5" strokeWidth="1.2" fill="none" />
      <ellipse cx="22" cy="20" rx="11" ry="14" fill="#8fb8e6" />
      <ellipse cx="42" cy="16" rx="11" ry="14" fill={GOLD} />
      <ellipse cx="33" cy="28" rx="10" ry="13" fill="#f2f6fb" stroke="#c8d0da" />
      <ellipse cx="18" cy="14" rx="3" ry="5" fill="#fff" opacity=".6" />
      <ellipse cx="38" cy="10" rx="3" ry="5" fill="#fff" opacity=".6" />
    </svg>
  );
}

export function Carriage({ className }) {
  return (
    <svg className={className} viewBox="0 0 96 72" aria-hidden="true">
      <defs>
        <linearGradient id="gCar" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".45" stopColor="#bcd8f2" />
          <stop offset="1" stopColor="#6fa3d9" />
        </linearGradient>
      </defs>
      <path d="M14 38 C14 16 32 10 48 10 C64 10 82 16 82 38 C82 50 72 52 48 52 C24 52 14 50 14 38 Z"
        fill="url(#gCar)" stroke="#fff" strokeWidth="1.5" />
      <path d="M30 14 C34 36 34 46 32 52 M48 10 L48 52 M66 14 C62 36 62 46 64 52"
        stroke={GOLD} strokeWidth="1.8" fill="none" />
      <ellipse cx="48" cy="30" rx="9" ry="8" fill="#fff" stroke={GOLD} strokeWidth="2" />
      <path d="M42 8 l3 -6 3 4 3 -4 3 6 z" fill={GOLD} />
      {[26, 70].map((cx) => (
        <g key={cx} stroke={GOLD} strokeWidth="2.5" fill="#fff">
          <circle cx={cx} cy="58" r="11" />
          {[0, 60, 120].map((a) => (
            <line key={a} x1={cx} y1="49" x2={cx} y2="67" strokeWidth="1.5"
              transform={`rotate(${a} ${cx} 58)`} />
          ))}
        </g>
      ))}
    </svg>
  );
}

export function Castle({ className }) {
  return (
    <svg className={className} viewBox="0 0 600 180" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <g fill="currentColor">
        <rect x="0" y="130" width="600" height="50" />
        <rect x="40" y="80" width="50" height="100" /><polygon points="34,80 65,30 96,80" />
        <rect x="150" y="50" width="60" height="130" /><polygon points="142,50 180,0 218,50" />
        <rect x="260" y="70" width="80" height="110" /><polygon points="252,70 300,10 348,70" />
        <rect x="390" y="50" width="60" height="130" /><polygon points="382,50 420,0 458,50" />
        <rect x="510" y="80" width="50" height="100" /><polygon points="504,80 535,30 566,80" />
      </g>
    </svg>
  );
}