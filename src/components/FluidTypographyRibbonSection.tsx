import React from 'react';

export const FluidTypographyRibbonSection: React.FC = () => {
  const tickerItems = (
    <div className="flex items-center gap-6 shrink-0">
      <span className="font-syne font-bold text-sm tracking-[0.25em] text-white uppercase">
        WHERE NAVIGATION MEETS SPEED
      </span>
      <span className="text-cyanAccent text-sm drop-shadow-[0_0_8px_#23A9BD]">✦</span>
      <span className="font-mono text-xs font-bold tracking-[0.22em] text-cyanAccent uppercase px-3 py-1 rounded-full bg-cyanAccent/10 border border-cyan-300/30 shadow-[0_0_12px_rgba(35,169,189,0.2)]">
        60 FPS REACTIVE
      </span>
      <span className="text-cyanAccent text-sm drop-shadow-[0_0_8px_#23A9BD]">✦</span>
      <span className="font-syne font-bold text-sm tracking-[0.25em] text-white/90 uppercase">
        PURE OFFLINE ARCHITECTURE
      </span>
      <span className="text-cyanAccent text-sm drop-shadow-[0_0_8px_#23A9BD]">✦</span>
      <span className="font-mono text-xs font-bold tracking-[0.22em] text-white/80 uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10">
        ZERO BATTERY DRAIN
      </span>
      <span className="text-cyanAccent text-sm drop-shadow-[0_0_8px_#23A9BD]">✦</span>
      <span className="font-syne font-bold text-sm tracking-[0.25em] text-white uppercase">
        SUB-15MS ROUTE CALCULATION
      </span>
      <span className="text-cyanAccent text-sm drop-shadow-[0_0_8px_#23A9BD]">✦</span>
    </div>
  );

  return (
    <section className="relative py-6 overflow-hidden bg-obsidian/70 border-y border-cyan-300/30 backdrop-blur-md select-none">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-full max-w-5xl h-16 bg-gradient-to-r from-cyanAccent/10 via-purpleNeon/15 to-magentaNeon/10 blur-[70px] rounded-full opacity-40" />
      </div>

      {/* Sleek Cyber Ticker Bar */}
      <div className="relative z-10 overflow-hidden flex items-center">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap will-change-transform">
          {tickerItems}
          {tickerItems}
          {tickerItems}
          {tickerItems}
        </div>
      </div>
    </section>
  );
};
