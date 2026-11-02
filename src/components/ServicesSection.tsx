import React from 'react';
import { APP_CONFIG } from '../data/config';
import { triggerDirectApkDownload } from '../utils/downloadManager';

export const ServicesSection: React.FC = () => {
  const handleDownload = () => {
    triggerDirectApkDownload(APP_CONFIG.APP_DOWNLOAD_URL, APP_CONFIG.apkFileName);
  };

  return (
    <section className="relative py-28 px-6 bg-obsidian" id="capabilities">
      {/* Huge Watermark Outline "SERVICES" */}
      <div
        className="absolute top-4 right-6 lg:right-24 text-stroke-watermark-lg font-syne text-[90px] sm:text-[160px] lg:text-[210px] font-black leading-none pointer-events-none select-none z-0 opacity-40"
        aria-hidden="true"
      >
        SERVICES
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-14 space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-magentaNeon shadow-[0_0_8px_#d91b9b]" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-white/70 uppercase">
              WHAT WE DO
            </span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-syne font-bold text-white max-w-2xl leading-tight"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              lineHeight: 1.15,
              fontWeight: 800,
            }}
          >
            Elevate Your Festive Experience With Reactive Low-End Solutions
          </h2>
        </div>

        {/* 4-Card Translucent Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-glassCard backdrop-blur-xl border border-white/10 hover:border-cyanAccent/60 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(35,169,189,0.25)] group glass-reactive">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyanAccent group-hover:scale-110 group-hover:bg-cyanAccent/20 group-hover:border-cyanAccent/50 transition-all shadow-[0_0_15px_rgba(35,169,189,0.1)]">
                {/* Vector Map Icon */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white font-syne group-hover:text-cyanAccent transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Offline Vector GPS
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pre-rendered pandal vector geography compiled to byte-level geometry with zero continuous battery drain or cellular load.
              </p>
            </div>
            <div className="pt-8">
              <a
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-cyanAccent text-white hover:text-black px-4 py-2 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_15px_#23A9BD] cursor-pointer"
                download={APP_CONFIG.apkFileName}
                href={APP_CONFIG.APP_DOWNLOAD_URL}
                onClick={handleDownload}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>DISCOVER</span>
                <span className="text-xs transition-transform group-hover:translate-x-1">➔</span>
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-glassCard backdrop-blur-xl border border-white/10 hover:border-magentaNeon/60 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(217,27,155,0.25)] group glass-reactive">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-magentaNeon group-hover:scale-110 group-hover:bg-magentaNeon/20 group-hover:border-magentaNeon/50 transition-all shadow-[0_0_15px_rgba(217,27,155,0.1)]">
                {/* Telemetry Radar Icon */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white font-syne group-hover:text-magentaNeon transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Reactive Crowd Telemetry
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Local edge calculations estimate queue velocities and entry gate delays without sending telemetry data to external servers.
              </p>
            </div>
            <div className="pt-8">
              <a
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-magentaNeon text-white hover:text-black px-4 py-2 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_15px_#d91b9b] cursor-pointer"
                download={APP_CONFIG.apkFileName}
                href={APP_CONFIG.APP_DOWNLOAD_URL}
                onClick={handleDownload}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>DISCOVER</span>
                <span className="text-xs transition-transform group-hover:translate-x-1">➔</span>
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-glassCard backdrop-blur-xl border border-white/10 hover:border-purpleNeon/60 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(138,43,226,0.25)] group glass-reactive">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purpleNeon group-hover:scale-110 group-hover:bg-purpleNeon/20 group-hover:border-purpleNeon/50 transition-all shadow-[0_0_15px_rgba(138,43,226,0.1)]">
                {/* Transit Icon */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white font-syne group-hover:text-purpleNeon transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Transit &amp; Train Radar
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instant Sealdah-Ranaghat main line suburban special timetables and Hooghly River ferry crossing status synchronized offline.
              </p>
            </div>
            <div className="pt-8">
              <a
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-purpleNeon text-white hover:text-black px-4 py-2 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_15px_#8a2be2] cursor-pointer"
                download={APP_CONFIG.apkFileName}
                href={APP_CONFIG.APP_DOWNLOAD_URL}
                onClick={handleDownload}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>DISCOVER</span>
                <span className="text-xs transition-transform group-hover:translate-x-1">➔</span>
              </a>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-glassCard backdrop-blur-xl border border-white/10 hover:border-cyanAccent/60 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(35,169,189,0.25)] group glass-reactive">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyanAccent group-hover:scale-110 group-hover:bg-cyanAccent/20 group-hover:border-cyanAccent/50 transition-all shadow-[0_0_15px_rgba(35,169,189,0.1)]">
                {/* SOS Mesh Icon */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white font-syne group-hover:text-cyanAccent transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Emergency SOS Mesh
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct offline emergency beacons, medical tents, volunteer camp coordinates, and lost &amp; found channels operating peer-to-peer.
              </p>
            </div>
            <div className="pt-8">
              <a
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-cyanAccent text-white hover:text-black px-4 py-2 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_15px_#23A9BD] cursor-pointer"
                download={APP_CONFIG.apkFileName}
                href={APP_CONFIG.APP_DOWNLOAD_URL}
                onClick={handleDownload}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>DISCOVER</span>
                <span className="text-xs transition-transform group-hover:translate-x-1">➔</span>
              </a>
            </div>
          </div>
        </div>

        {/* Center Action Button */}
        <div className="mt-12 flex justify-center">
          <a
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 hover:border-cyanAccent/60 text-xs font-bold tracking-widest uppercase text-white transition-all hover:shadow-[0_0_20px_rgba(35,169,189,0.3)] group cursor-pointer"
            download={APP_CONFIG.apkFileName}
            href={APP_CONFIG.APP_DOWNLOAD_URL}
            onClick={handleDownload}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="group-hover:text-cyanAccent transition-colors">VIEW FULL APK SPECIFICATIONS</span>
            <span className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-cyanAccent group-hover:text-black flex items-center justify-center text-white transition-all">➔</span>
          </a>
        </div>

        {/* Section index indicator: 02 */}
        <div className="mt-16 flex items-center justify-start gap-3 text-xs font-mono text-white/40">
          <span className="w-4 h-[1px] bg-white/10" />
          <span className="w-4 h-[1px] bg-white/10" />
          <span className="w-12 h-[1px] bg-magentaNeon/50" />
          <span className="text-magentaNeon font-bold">02</span>
        </div>
      </div>
    </section>
  );
};
