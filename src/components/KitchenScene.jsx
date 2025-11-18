import React from "react";

const Bubble = ({ x, y, r, hue = 210, sat = 80, light = 100, opacity = 0.7 }) => {
  const id = `g-${x}-${y}-${r}-${Math.round(hue)}`.replace(/\./g, "_");
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <radialGradient id={`fill-${id}`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={`hsla(${hue}, ${sat}%, ${light}%, ${opacity * 0.25})`} />
          <stop offset="45%" stopColor={`hsla(${hue}, ${sat}%, ${light - 10}%, ${opacity * 0.15})`} />
          <stop offset="100%" stopColor={`hsla(${hue}, ${sat}%, ${light - 30}%, ${opacity * 0.05})`} />
        </radialGradient>
        <radialGradient id={`rim-${id}`} cx="50%" cy="50%" r="65%">
          <stop offset="70%" stopColor={`hsla(${hue + 40}, ${sat}%, ${light}%, 0)`} />
          <stop offset="100%" stopColor={`hsla(${hue}, ${sat}%, ${light}%, ${opacity * 0.55})`} />
        </radialGradient>
      </defs>

      {/* soft shadow */}
      <ellipse cx={r * 0.1} cy={r * 0.22} rx={r * 0.78} ry={r * 0.32} fill="rgba(0,0,0,0.06)" />

      {/* main bubble */}
      <circle r={r} fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth={Math.max(1, r * 0.06)} />

      {/* iridescent sheen arcs */}
      <path d={`M ${-r * 0.6} ${-r * 0.2} A ${r * 0.8} ${r * 0.8} 0 0 1 ${r * 0.2} ${-r * 0.6}`} stroke={`hsla(${hue + 120}, 90%, 85%, ${opacity * 0.7})`} strokeWidth={Math.max(0.6, r * 0.05)} fill="none" />
      <path d={`M ${-r * 0.2} ${r * 0.5} A ${r * 0.7} ${r * 0.7} 0 0 0 ${r * 0.65} ${r * 0.2}`} stroke={`hsla(${hue - 40}, 90%, 88%, ${opacity * 0.55})`} strokeWidth={Math.max(0.5, r * 0.045)} fill="none" />

      {/* highlight droplets */}
      <circle cx={-r * 0.25} cy={-r * 0.35} r={r * 0.14} fill="white" opacity={0.5} />
      <circle cx={-r * 0.4} cy={-r * 0.15} r={r * 0.06} fill="white" opacity={0.8} />
    </g>
  );
};

const DigitGroup = ({ x, y, scale = 1, points }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {points.map((p, i) => (
      <Bubble key={i} x={p[0]} y={p[1]} r={p[2]} />
    ))}
  </g>
);

const KitchenScene = () => {
  // Define bubble layouts for digits 2,0,2,6 using simple point clouds (x, y, radius)
  const d2 = [
    [0, 0, 26], [30, -18, 18], [55, -32, 14], [82, -28, 12], [98, -10, 14], [92, 12, 16], [72, 28, 14], [46, 40, 16], [18, 54, 18], [-6, 70, 16], [-18, 92, 18], [0, 112, 22], [28, 122, 18], [56, 124, 14], [82, 118, 12]
  ];
  const d0 = [
    [0, 0, 26], [28, -12, 18], [52, 4, 16], [64, 32, 18], [60, 64, 18], [44, 92, 18], [18, 108, 20], [-10, 98, 18], [-28, 72, 16], [-36, 38, 16], [-30, 6, 16]
  ];
  const d6 = [
    [20, 0, 22], [0, 16, 18], [-16, 40, 16], [-18, 70, 18], [-6, 96, 18], [18, 112, 20], [48, 106, 18], [66, 86, 16], [66, 58, 16], [54, 36, 16], [30, 30, 14]
  ];

  return (
    <div className="w-full min-h-screen bg-white text-slate-900">
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="mb-6 md:mb-10 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-800">Soap Bubbles "2026"</h1>
          <p className="text-slate-500">Minimal, bright, and Instagram-ready</p>
        </div>

        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.06)] bg-white">
          <svg viewBox="0 0 1200 900" className="w-full h-auto block">
            <defs>
              {/* soft sunlight gradient */}
              <radialGradient id="sun" cx="20%" cy="0%" r="80%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="60%" stopColor="#f7fafc" stopOpacity="1" />
                <stop offset="100%" stopColor="#eef2f7" stopOpacity="1" />
              </radialGradient>
              <linearGradient id="steel" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f7f9fc" />
                <stop offset="100%" stopColor="#e5eaf0" />
              </linearGradient>
              <linearGradient id="rimShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(0,0,0,0.12)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.02)" />
              </linearGradient>
            </defs>

            {/* background wall */}
            <rect x="0" y="0" width="1200" height="900" fill="url(#sun)" />

            {/* subtle window light streaks */}
            <g opacity="0.07">
              <rect x="80" y="40" width="220" height="900" fill="#fff" />
              <rect x="340" y="40" width="12" height="900" fill="#fff" />
              <rect x="370" y="40" width="12" height="900" fill="#fff" />
            </g>

            {/* countertop */}
            <rect x="0" y="420" width="1200" height="480" fill="#ffffff" />

            {/* sink cutout with soft inner shadow */}
            <g>
              <rect x="150" y="470" width="900" height="330" rx="28" fill="url(#steel)" />
              {/* inner shadow / bevel */}
              <rect x="170" y="500" width="860" height="290" rx="22" fill="#fdfefe" stroke="#dae2ea" strokeWidth="2" />
              <rect x="180" y="510" width="840" height="270" rx="20" fill="#f6fbff" />
            </g>

            {/* dish */}
            <g transform="translate(280 520)">
              <ellipse cx="300" cy="280" rx="300" ry="40" fill="rgba(0,0,0,0.07)" />
              <ellipse cx="300" cy="220" rx="300" ry="220" fill="#ffffff" />
              <ellipse cx="300" cy="220" rx="290" ry="210" fill="#ffffff" stroke="#e6edf4" strokeWidth="3" />
              {/* subtle dish gloss */}
              <ellipse cx="260" cy="150" rx="220" ry="120" fill="#ffffff" opacity="0.6" />
              <ellipse cx="380" cy="300" rx="180" ry="80" fill="#eaf3fb" opacity="0.25" />
            </g>

            {/* bubbles forming 2026 */}
            <g transform="translate(330 560)">
              <DigitGroup x={0} y={0} scale={1.2} points={d2} />
              <DigitGroup x={200} y={0} scale={1.2} points={d0} />
              <DigitGroup x={400} y={0} scale={1.2} points={d2} />
              <DigitGroup x={600} y={0} scale={1.2} points={d6} />
            </g>

            {/* stray bubbles around for realism */}
            <g transform="translate(280 500)">
              <Bubble x={40} y={60} r={10} />
              <Bubble x={760} y={120} r={12} />
              <Bubble x={720} y={40} r={8} />
              <Bubble x={120} y={220} r={9} />
              <Bubble x={620} y={260} r={11} />
            </g>

            {/* faucet hint */}
            <g opacity="0.25">
              <path d="M980,460 C980,420 940,390 900,390 L820,390" stroke="#9aa7b6" strokeWidth="10" fill="none" />
              <circle cx="820" cy="390" r="16" fill="#9aa7b6" />
            </g>
          </svg>
        </div>

        <div className="flex items-center justify-center gap-3 mt-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const svg = document.querySelector("svg");
              const serializer = new XMLSerializer();
              const source = serializer.serializeToString(svg);
              const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "soap-bubbles-2026.svg";
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-700 transition-colors shadow-sm"
          >
            Download SVG
          </a>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500">Share-ready at 1:1.33 aspect</span>
        </div>
      </div>
    </div>
  );
};

export default KitchenScene;
