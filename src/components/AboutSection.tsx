import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section className="relative py-28 px-6 overflow-hidden bg-obsidian" id="about">
      {/* Huge Watermark "ABOUT" Outline Typography in Background */}
      <div
        className="absolute top-10 right-4 lg:right-16 text-stroke-watermark-lg font-syne text-[110px] sm:text-[180px] lg:text-[230px] font-black leading-none pointer-events-none select-none z-0 opacity-40"
        aria-hidden="true"
      >
        ABOUT
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Content & Overview */}
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-cyanAccent uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyanAccent shadow-[0_0_8px_#23A9BD]" />
            <span>WHO WE ARE</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-syne tracking-tight leading-[1.15] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              lineHeight: 1.15,
              fontWeight: 800,
            }}
          >
            Providing comprehensive offline guidance and reactive navigation tailored for festival pilgrims.
          </h2>

          {/* Action Pill */}
          <div className="pt-4">
            <a
              className="inline-flex items-center bg-white/10 hover:bg-white/20 border border-white/20 hover:border-cyanAccent p-1.5 rounded-full transition-all group shadow-[0_0_20px_rgba(35,169,189,0.15)] hover:shadow-[0_0_25px_rgba(35,169,189,0.35)]"
              href="#capabilities"
            >
              <span className="px-5 py-2 text-xs font-bold tracking-widest uppercase text-white group-hover:text-cyanAccent transition-colors">
                EXPLORE FEATURES
              </span>
              <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-cyanAccent group-hover:scale-105 transition-all">
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Section index indicator: 01 */}
      <div className="max-w-7xl mx-auto mt-20 flex items-center justify-end gap-3 text-xs font-mono text-white/40">
        <span className="text-cyanAccent font-bold">01</span>
        <span className="w-12 h-[1px] bg-cyanAccent/50" />
        <span className="w-4 h-[1px] bg-white/10" />
        <span className="w-4 h-[1px] bg-white/10" />
      </div>
    </section>
  );
};
