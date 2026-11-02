import React, { useState } from 'react';
import { APP_CONFIG } from '../data/config';
import { triggerDirectApkDownload } from '../utils/downloadManager';

export const DownloadSection: React.FC = () => {
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'completed'>('idle');

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Initiate direct download with user's exact link
    setDownloadStatus('downloading');
    triggerDirectApkDownload(APP_CONFIG.APP_DOWNLOAD_URL, APP_CONFIG.apkFileName);

    setTimeout(() => {
      setDownloadStatus('completed');
      setTimeout(() => setDownloadStatus('idle'), 3000);
    }, 1200);
  };

  return (
    <section className="relative py-28 px-6 bg-obsidian" id="download">
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyanAccent/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-magentaNeon/10 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2
            className="text-3xl sm:text-5xl font-syne font-bold text-white leading-tight uppercase"
            style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.02em' }}
          >
            Download Naihati Nights APK
          </h2>
        </div>

        <div className="relative bg-glassCard backdrop-blur-xl border border-cyan-300/40 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-[0_0_35px_rgba(35,169,189,0.25)] hover:shadow-[0_0_50px_rgba(35,169,189,0.35)] transition-shadow duration-500 overflow-hidden group">
          {/* Ambient holographic glow backdrop inside card */}
          <div
            className="absolute -top-32 -right-32 w-80 h-80 bg-cyanAccent/15 rounded-full blur-[90px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 -left-32 w-80 h-80 bg-magentaNeon/15 rounded-full blur-[90px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Grand Grid Content: Specifications & CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Col (lg:col-span-7): Headline, Architecture description & Feature Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3
                  className="text-2xl sm:text-4xl font-syne font-bold text-white leading-tight"
                  style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.02em' }}
                >
                  Official Naihati Nights APK Release
                </h3>
              </div>

              {/* Feature Checklist Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-sans text-slate-300">
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl hover:border-cyanAccent/50 hover:bg-white/10 transition-all cursor-default group/item">
                  <span className="text-cyanAccent font-bold text-sm group-hover/item:scale-125 transition-transform">✓</span>
                  <span>Full Offline Pandal Maps</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl hover:border-cyanAccent/50 hover:bg-white/10 transition-all cursor-default group/item">
                  <span className="text-cyanAccent font-bold text-sm group-hover/item:scale-125 transition-transform">✓</span>
                  <span>Instant Suburban Rail Radar</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl hover:border-cyanAccent/50 hover:bg-white/10 transition-all cursor-default group/item">
                  <span className="text-cyanAccent font-bold text-sm group-hover/item:scale-125 transition-transform">✓</span>
                  <span>Emergency Mesh P2P SOS</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl hover:border-cyanAccent/50 hover:bg-white/10 transition-all cursor-default group/item">
                  <span className="text-cyanAccent font-bold text-sm group-hover/item:scale-125 transition-transform">✓</span>
                  <span>Sub-15ms Latency on Low-End</span>
                </div>
              </div>
            </div>

            {/* Right Col (lg:col-span-5): CTA Box & Mobile Direct QR / Download */}
            <div className="lg:col-span-5 flex flex-col gap-5 bg-black/40 border border-white/10 p-6 sm:p-7 rounded-2xl relative hover:border-cyanAccent/40 transition-colors">
              <div className="space-y-3">
                {/* Primary Big Download CTA with Exact User APK Link */}
                <a
                  className={`btn-reactive-cyan w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(35,169,189,0.35)] hover:scale-[1.02] duration-300 cursor-pointer ${
                    downloadStatus === 'completed'
                      ? 'bg-emerald-400 text-black shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                      : 'bg-cyanAccent hover:bg-cyan-400 text-black'
                  }`}
                  download={APP_CONFIG.apkFileName}
                  href={APP_CONFIG.APP_DOWNLOAD_URL}
                  onClick={handleDownloadClick}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg className={`w-5 h-5 shrink-0 ${downloadStatus === 'downloading' ? 'animate-bounce' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    {downloadStatus === 'completed' ? (
                      <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
                    ) : (
                      <path
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </svg>
                  <span>
                    {downloadStatus === 'downloading'
                      ? 'STARTING DOWNLOAD...'
                      : downloadStatus === 'completed'
                      ? 'DOWNLOAD STARTED ✓'
                      : `DOWNLOAD APK v${APP_CONFIG.version}`}
                  </span>
                </a>
              </div>

              {/* Mobile Quick Sideload Notice */}
              <div className="flex items-center gap-4 pt-3 border-t border-white/10 text-xs text-slate-400">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyanAccent shrink-0 shadow-[0_0_12px_rgba(35,169,189,0.15)]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path
                      d="M3 3h6v6H3V3zm12 0h6v6h-6V3zM3 15h6v6H3v-6zm14 2v4m-2-2h4m2-7v3h-3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-white font-semibold text-xs">Direct GitHub Release</div>
                  <div className="text-[11px] text-slate-400">
                    {APP_CONFIG.apkFileName} (~14.8 MB). Instant sideload, safe and signed.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
