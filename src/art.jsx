import React from "react";

/* Las imágenes viven en /public. Si tus archivos NO son .png, cambia solo esta línea (por ejemplo "webp"). */
const EXT = "png";
const img = (n) => `/img(${n}).${EXT}`;

export const IMG = {
  globos: img(1),
  estrellasGlobo: img(2),
  disco: img(3),
  monoPlata: img(4),
  destelloA: img(5),
  destelloB: img(6),
  flor: img(8),
  monoAzul: img(9),
  carroza: img(10),
  hada: img(14),
  paloma: img(19),
  estrella: img(20),
};

const Pic = ({ src, className }) => (
  <img className={className} src={src} alt="" aria-hidden="true" draggable="false" />
);

/* ---------- Imágenes (mismos nombres y clases que antes, así main.jsx no cambia) ---------- */
export const Heart = ({ className }) => <Pic src={IMG.flor} className={className} />;
export const Bow = ({ className }) => <Pic src={IMG.monoAzul} className={className} />;
export const Balloons = ({ className }) => <Pic src={IMG.globos} className={className} />;
export const DiscoBall = ({ className }) => <Pic src={IMG.disco} className={className} />;
export const Clock = ({ className }) => <Pic src={IMG.hada} className={className} />;
export const Slipper = ({ className }) => <Pic src={IMG.paloma} className={className} />;
export const Carriage = ({ className }) => <Pic src={IMG.carroza} className={className} />;

// Estrellas: la "star-silver" usa las estrellas plateadas; las demás, la estrella azul
export const Star = ({ className = "" }) => (
  <Pic src={className.includes("star-silver") ? IMG.estrellasGlobo : IMG.estrella} className={className} />
);

// Destellos de 4 puntas: alterna entre las dos imágenes
export const Spark = ({ className = "" }) => {
  const b2 = className.includes("b2");
  const burst = className.includes("spark-burst");
  const useA = burst ? !b2 : b2;
  return <Pic src={useA ? IMG.destelloA : IMG.destelloB} className={className} />;
};

/* ---------- Se mantienen en SVG (no hay imagen para ellos) ---------- */
const Grad = ({ id, stops, x2 = 1, y2 = 1 }) => (
  <linearGradient id={id} x1="0" y1="0" x2={x2} y2={y2}>
    {stops.map(([o, c]) => (
      <stop key={o} offset={o} stopColor={c} />
    ))}
  </linearGradient>
);

const BLUE = [[0, "#e3f2ff"], [0.25, "#7caad6"], [0.6, "#326fca"], [1, "#3c4468"]];

export function Crown({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 80" aria-hidden="true">
      <defs><Grad id="gCrown" stops={BLUE} /></defs>
      <path d="M6 72 L12 18 L40 46 L60 6 L80 46 L108 18 L114 72 Z" fill="url(#gCrown)" stroke="#e8f4ff" strokeWidth="2" strokeLinejoin="round" />
      <rect x="6" y="62" width="108" height="12" rx="3" fill="url(#gCrown)" stroke="#e8f4ff" strokeWidth="2" />
      {[24, 42, 60, 78, 96].map((x) => <circle key={x} cx={x} cy="68" r="2.6" fill="#fff" />)}
      {[12, 60, 108].map((x, i) => <circle key={x} cx={x} cy={i === 1 ? 6 : 18} r="4" fill="#fff" />)}
    </svg>
  );
}

export function Castle({ className }) {
  const towers = [[40, 80, 50, 34], [150, 50, 60, 142], [260, 70, 80, 252], [390, 50, 60, 382], [510, 80, 50, 504]];
  return (
    <svg className={className} viewBox="0 0 600 180" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <defs><Grad id="gCastle" x2={0} y2={1} stops={[[0, "#e3f2ff"], [1, "#7caad6"]]} /></defs>
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
      <defs><Grad id="gWand" stops={[[0, "#fff"], [0.5, "#b5d6f0"], [1, "#7caad6"]]} /></defs>
      <line x1="14" y1="90" x2="62" y2="42" stroke="#7caad6" strokeWidth="5" strokeLinecap="round" />
      <polygon className="tw" points="70,6 76,24 94,24 80,35 85,52 70,42 55,52 60,35 46,24 64,24" fill="url(#gWand)" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}