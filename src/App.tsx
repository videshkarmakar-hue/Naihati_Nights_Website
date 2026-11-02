import React, { useState } from 'react';
import { APP_CONFIG } from './data/config';
import { triggerDirectApkDownload } from './utils/downloadManager';
import { SplashScreen } from './components/SplashScreen';

export default function App() {
  const [downloading, setDownloading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const handleDownload = (e?: React.MouseEvent) => {
    if (e) {
      // Don't preventDefault so mobile browsers have native anchor intent as fallback
    }
    setDownloading(true);
    triggerDirectApkDownload(APP_CONFIG.APP_DOWNLOAD_URL, APP_CONFIG.apkFileName);
    setTimeout(() => setDownloading(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#010310] text-[#e2e8f0] font-sans flex flex-col items-center py-6 md:py-12 px-4 selection:bg-[#23A9BD]/20 selection:text-white relative overflow-x-hidden">
      {/* Website Splash Screen on Visit */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Ambient Backdrop Lighting */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#23A9BD]/15 via-[#1F5F63]/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#1F5F63]/10 blur-[130px] rounded-full" />
      </div>

      {/* Main Viewport Shell Container */}
      <main id="main-content" className="w-full max-w-4xl flex flex-col gap-6 md:gap-10">
        {/* BEGIN: TopHeroContainer */}
        <header className="curved-card p-6 md:p-12 pb-14 flex flex-col items-center text-center relative overflow-hidden">
          {/* Aesthetic Gradient Hero Background Image */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-[42px] pointer-events-none select-none">
            <img
              src="https://cdn.phototourl.com/member/2026-10-29-a76200c3-0403-452d-81b1-ca7b18a01116.jpg"
              alt=""
              className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-700"
            />
            {/* Deep rich aesthetic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#010310]/60 via-[#060f1c]/75 to-[#040f1a]/95" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#010310]/80 via-transparent to-[#23A9BD]/10" />
          </div>

          {/* Top Meta Navigation Bar */}
          <nav aria-label="Quick links" className="w-full flex flex-wrap items-center justify-end gap-3 text-xs tracking-tight mb-14 md:mb-20 relative z-10">
            {/* Right: Professional Profiles */}
            <div className="flex items-center gap-3 text-[12px] text-slate-400 font-medium ml-auto">
              <a
                className="hover:text-[#23A9BD] transition-colors"
                href="https://www.instagram.com/code.red_videsh/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Instagram
              </a>
              <span className="text-slate-600">/</span>
              <a
                className="hover:text-[#23A9BD] transition-colors"
                href="https://open.spotify.com/artist/2eJEzi0mzJB60zVJf0OjWP"
                rel="noopener noreferrer"
                target="_blank"
              >
                Spotify
              </a>
              <span className="text-slate-600">/</span>
              <a
                className="hover:text-[#23A9BD] transition-colors"
                href="https://www.youtube.com/@videshkarmakar2000"
                rel="noopener noreferrer"
                target="_blank"
              >
                YouTube
              </a>
            </div>
          </nav>

          {/* Main Hero Display Headline */}
          <h1
            className="text-white tracking-wide leading-none max-w-4xl mx-auto mb-6 uppercase text-5xl sm:text-6xl md:text-7xl font-black relative z-10 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
            style={{
              fontFamily: 'Montserrat, "Plus Jakarta Sans", sans-serif',
              fontWeight: 900,
              letterSpacing: '0.05em',
            }}
          >
            NAIHATI NIGHTS
          </h1>

          {/* Subtitle Description */}
          <p className="text-slate-300 text-sm sm:text-base font-normal max-w-lg leading-relaxed mb-9 relative z-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            Best Guidance App for Whole&nbsp; Naihati Kali Puja Pandel Hopping.
          </p>

          {/* Primary Action CTA Pill */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto relative z-10">
            <a
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#001722]/90 hover:bg-[#072433] text-white text-sm font-semibold tracking-wide border border-[#23A9BD]/40 shadow-[0_0_25px_rgba(35,169,189,0.25)] hover:shadow-[0_0_35px_rgba(35,169,189,0.4)] backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              href={APP_CONFIG.APP_DOWNLOAD_URL}
              download={APP_CONFIG.apkFileName}
              onClick={handleDownload}
              rel="noopener noreferrer"
              target="_blank"
              aria-label={`Download Naihati Nights APK version ${APP_CONFIG.version}`}
            >
              <span>{downloading ? 'Downloading APK...' : `Download APK (v${APP_CONFIG.version})`}</span>
              <svg
                className={`w-4 h-4 text-[#23A9BD] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  downloading ? 'animate-bounce' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17L17 7M17 7H9M17 7v8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.2"
                />
              </svg>
            </a>
          </div>
        </header>
        {/* END: TopHeroContainer */}


        {/* BEGIN: FeaturesCapabilitiesSection */}
        <section className="py-12 md:py-16 flex flex-col items-center text-center">
          {/* Section Title & Subheading */}
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-xl mb-6 tracking-tight leading-snug"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Crafted for seamless festival navigation across Naihati.
          </h2>

          {/* 4-Column Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left w-full">
            {/* Feature 1: Low-RAM Engine */}
            <article className="p-6 rounded-2xl bg-[#06101f]/70 border border-slate-800/80 hover:border-[#23A9BD]/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#001722] border border-[#23A9BD]/30 flex items-center justify-center text-[#23A9BD] mb-5 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                  </svg>
                </div>
                <h3
                  className="font-semibold text-white text-base mb-2"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Low-RAM Engine
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Optimized for 2GB RAM budget Android smartphones with zero thermal throttle during peak crowd usage.
                </p>
              </div>
            </article>

            {/* Feature 2: Pandal Radar */}
            <article className="p-6 rounded-2xl bg-[#06101f]/70 border border-slate-800/80 hover:border-[#23A9BD]/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#001722] border border-[#23A9BD]/30 flex items-center justify-center text-[#23A9BD] mb-5 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                  </svg>
                </div>
                <h3
                  className="font-semibold text-white text-base mb-2"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Pandal Radar
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Offline topological bypass routes for Baro Maa, Arabinda Pally, and packed station corridors.
                </p>
              </div>
            </article>

            {/* Feature 3: Battery Saver */}
            <article className="p-6 rounded-2xl bg-[#06101f]/70 border border-slate-800/80 hover:border-[#23A9BD]/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#001722] border border-[#23A9BD]/30 flex items-center justify-center text-[#23A9BD] mb-5 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                  </svg>
                </div>
                <h3
                  className="font-semibold text-white text-base mb-2"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Battery Saver
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  True pure-dark OLED optimization consuming under 1.2% battery per hour while navigating on foot.
                </p>
              </div>
            </article>

            {/* Feature 4: Devotee Mesh */}
            <article className="p-6 rounded-2xl bg-[#06101f]/70 border border-slate-800/80 hover:border-[#23A9BD]/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#001722] border border-[#23A9BD]/30 flex items-center justify-center text-[#23A9BD] mb-5 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                  </svg>
                </div>
                <h3
                  className="font-semibold text-white text-base mb-2"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Devotee Mesh
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Zero cellular dependency with pre-cached emergency medical camps, water points, and lost &amp; found spots.
                </p>
              </div>
            </article>
          </div>
        </section>
        {/* END: FeaturesCapabilitiesSection */}

        {/* BEGIN: BottomActionContainer */}
        <section className="curved-card p-8 md:p-14 flex flex-col items-center text-center">
          {/* Emblem Badge */}
          <div className="w-14 h-14 rounded-2xl bg-[#001722] border border-[#23A9BD]/30 flex items-center justify-center text-[#23A9BD] mb-6 shadow-inner overflow-hidden p-1.5">
            <img
              src="https://cdn.phototourl.com/member/2026-10-07-3560ff11-c4ca-4914-ada1-bb03390ea789.png"
              alt="Naihati Kali Emblem"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>

          {/* Action Headline */}
          <h2
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight max-w-md mb-8"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Get Naihati Nights for your next journey
          </h2>

          {/* Download Button Suite */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
            {/* Direct APK Link */}
            <a
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#001722] hover:bg-[#06202d] text-white text-xs font-semibold border border-[#23A9BD]/40 shadow-sm transition-all hover:scale-105 cursor-pointer"
              href={APP_CONFIG.APP_DOWNLOAD_URL}
              download={APP_CONFIG.apkFileName}
              onClick={handleDownload}
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg className="w-3.5 h-3.5 text-[#23A9BD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <span>Download Direct APK</span>
            </a>

            {/* Release Notes Button */}
            <a
              className="pill-capsule inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-slate-300 text-xs font-medium hover:text-white"
              href="https://videshkarmakar.carrd.co/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Release Notes</span>
              <span className="text-[10px] text-[#23A9BD]">v{APP_CONFIG.version}</span>
            </a>
          </div>

          {/* Developer Credit Sub-Box */}
          <div className="w-full max-w-md pt-8 border-t border-slate-800/80 flex flex-col items-center">
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-slate-400">
              <a
                className="hover:text-[#23A9BD] transition-colors"
                href="https://videshkarmakar.carrd.co/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Portfolio
              </a>
              <span className="text-slate-700">•</span>
              <a
                className="hover:text-[#23A9BD] transition-colors"
                href="https://open.spotify.com/artist/2eJEzi0mzJB60zVJf0OjWP"
                rel="noopener noreferrer"
                target="_blank"
              >
                Spotify
              </a>
              <span className="text-slate-700">•</span>
              <a
                className="hover:text-[#23A9BD] transition-colors"
                href="https://www.instagram.com/code.red_videsh/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Instagram
              </a>
              <span className="text-slate-700">•</span>
              <a
                className="hover:text-[#23A9BD] transition-colors"
                href="https://www.youtube.com/@videshkarmakar2000"
                rel="noopener noreferrer"
                target="_blank"
              >
                YouTube
              </a>
              <span className="text-slate-700">•</span>
              <a
                className="hover:text-[#23A9BD] transition-colors"
                href="https://www.facebook.com/gfx.videsh"
                rel="noopener noreferrer"
                target="_blank"
              >
                Facebook
              </a>
            </div>
          </div>
        </section>
        {/* END: BottomActionContainer */}
      </main>

      {/* BEGIN: Footer */}
      <footer className="w-full max-w-4xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
        <div>© {APP_CONFIG.copyright}</div>
        <div className="flex items-center gap-3">
          <span>
            Crafted by{' '}
            <a
              className="text-slate-300 hover:text-[#23A9BD] transition-colors font-semibold"
              href="https://videshkarmakar.carrd.co/"
              rel="noopener noreferrer"
              target="_blank"
            >
              VIDESH KARMAKAR
            </a>
          </span>
        </div>
      </footer>
      {/* END: Footer */}
    </div>
  );
}
