import React from 'react';
import { APP_CONFIG } from '../data/config';
import { triggerDirectApkDownload } from '../utils/downloadManager';

export const HeroSection: React.FC = () => {
  const handleDownload = () => {
    triggerDirectApkDownload(APP_CONFIG.APP_DOWNLOAD_URL, APP_CONFIG.apkFileName);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 px-6 flex flex-col justify-center overflow-hidden bg-obsidian"
    >
      {/* Atmospheric Background Ambient Glows */}
      <div
        className="absolute -top-40 -right-40 w-[620px] h-[620px] bg-purpleNeon/25 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-cyanAccent/15 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
        {/* Centered Hero Content Block */}
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-7">
          <h1
            className="text-5xl sm:text-7xl xl:text-8xl font-black font-syne tracking-tight text-white leading-none uppercase text-center"
            style={{ fontFamily: '"Gondens DEMO", Gondens, Syne, Montserrat, sans-serif', letterSpacing: '0.05em' }}
          >
            NAIHATI <br />
            <span className="tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-white/60 drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]">
              NIGHTS
            </span>
          </h1>

          {/* Hero Action Dual-Segmented Reactive Pill Button */}
          <div className="pt-3 flex justify-center items-center">
            <a
              href={APP_CONFIG.APP_DOWNLOAD_URL}
              download={APP_CONFIG.apkFileName}
              onClick={handleDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center bg-white/10 hover:bg-white/20 border border-white/20 hover:border-cyanAccent/70 p-1.5 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(217,27,155,0.25)] hover:shadow-[0_0_35px_rgba(35,169,189,0.4)] cursor-pointer"
              aria-label="Download Naihati Nights APK"
            >
              <span className="px-6 py-2.5 text-xs font-bold tracking-widest uppercase text-white group-hover:text-cyanAccent transition-colors">
                DOWNLOAD APK
              </span>
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-cyanAccent group-hover:text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          </div>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono tracking-wider text-slate-400 uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyanAccent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyanAccent shadow-[0_0_8px_#23A9BD]" />
            </span>
            <span>
              Crafted by{' '}
              <strong className="text-white font-bold tracking-widest hover:text-cyanAccent transition-colors cursor-pointer">
                VIDESH KARMAKAR
              </strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
