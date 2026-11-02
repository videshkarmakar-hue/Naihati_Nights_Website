import React from 'react';
import { APP_CONFIG, SOCIAL_LINKS } from '../data/config';

export const DeveloperSpotlightAndContact: React.FC = () => {
  const portfolioLink = SOCIAL_LINKS.find((s) => s.platform === 'Website')?.url || 'https://videshkarmakar.carrd.co/';
  const spotifyLink = SOCIAL_LINKS.find((s) => s.platform === 'Spotify')?.url || 'https://open.spotify.com/artist/2eJEzi0mzJB60zVJf0OjWP';
  const instagramLink = SOCIAL_LINKS.find((s) => s.platform === 'Instagram')?.url || 'https://www.instagram.com/code.red_videsh/';
  const youtubeLink = SOCIAL_LINKS.find((s) => s.platform === 'YouTube')?.url || 'https://www.youtube.com/@videshkarmakar2000';
  const facebookLink = SOCIAL_LINKS.find((s) => s.platform === 'Facebook')?.url || 'https://www.facebook.com/gfx.videsh';

  return (
    <section className="relative py-28 px-6 bg-obsidian" id="developer">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyanAccent uppercase">
            GET IN TOUCH
          </span>
          <h2
            className="text-3xl sm:text-5xl font-syne font-bold text-white"
            style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.02em' }}
          >
            Architect &amp; Developer Console
          </h2>
        </div>

        {/* Dedicated 4xl Centered Monograph Card */}
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-[#030919]/80 backdrop-blur-xl border border-cyan-300/40 hover:border-cyanAccent/70 p-8 sm:p-10 lg:p-12 rounded-3xl flex flex-col justify-between relative overflow-hidden group shadow-[0_0_35px_rgba(35,169,189,0.25)] hover:shadow-[0_0_50px_rgba(35,169,189,0.4)] transition-all duration-500">
            {/* Ambient Background Glows */}
            <div
              className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-magentaNeon/20 via-purpleNeon/25 to-transparent rounded-full blur-[70px] pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyanAccent/15 rounded-full blur-[70px] pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(35,169,189,0.08),transparent_65%)] pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8">
                {/* Developer Avatar with Cyber Glowing Ring Frame */}
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0 group/avatar">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-cyanAccent via-purpleNeon to-magentaNeon blur-sm opacity-80 group-hover/avatar:opacity-100 group-hover/avatar:scale-105 transition-all duration-500" />
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-cyan-300/40 shadow-2xl bg-obsidian p-0.5">
                    <img
                      alt="Videsh Karmakar - Architect & Developer"
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover/avatar:scale-105"
                      src={APP_CONFIG.DEVELOPER_IMAGE_URL}
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Developer Bio & Identity */}
                <div className="space-y-3 text-center sm:text-left min-w-0 flex-1">
                  <h3
                    className="text-2xl sm:text-3xl font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyanAccent leading-tight drop-shadow-[0_0_20px_rgba(35,169,189,0.3)]"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    VIDESH KARMAKAR
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed font-sans">
                    Architect behind Naihati Nights. Specially hand-crafted to assist thousands of pandal hoppers navigating Naihati Kali Puja with battery-efficient and hyper-optimized architecture designed for budget and legacy hardware.
                  </p>
                </div>
              </div>
            </div>

            {/* Verified Channels & Social Links */}
            <div className="relative z-10 pt-6 border-t border-white/10 mt-6 space-y-4">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/50">
                <span className="flex items-center gap-1.5">
                  <span className="text-cyanAccent">✦</span> VERIFIED CHANNELS &amp; REPOSITORIES
                </span>
                <span className="text-cyanAccent flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyanAccent animate-pulse" />
                  SECURE CONNECT
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-cyanAccent hover:text-black border border-white/15 hover:border-cyanAccent text-xs font-semibold text-white transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(35,169,189,0.15)] hover:shadow-[0_0_20px_#23A9BD] hover:scale-105 group/link backdrop-blur-md"
                  href={portfolioLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="text-cyanAccent group-hover/link:text-black transition-colors text-sm leading-none">✦</span>
                  <span>Portfolio</span>
                  <span className="text-[10px] opacity-70 group-hover/link:opacity-100 transition-transform group-hover/link:translate-x-0.5">↗</span>
                </a>
                <a
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-[#1DB954] hover:text-black border border-white/15 hover:border-[#1DB954] text-xs font-semibold text-white transition-all flex items-center gap-1.5 hover:shadow-[0_0_20px_#1DB954] hover:scale-105 group/link backdrop-blur-md"
                  href={spotifyLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="text-[#1DB954] group-hover/link:text-black transition-colors text-xs leading-none">♬</span>
                  <span>Spotify</span>
                  <span className="text-[10px] opacity-70 group-hover/link:opacity-100 transition-transform group-hover/link:translate-x-0.5">↗</span>
                </a>
                <a
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-magentaNeon hover:text-white border border-white/15 hover:border-magentaNeon text-xs font-semibold text-white transition-all flex items-center gap-1.5 hover:shadow-[0_0_20px_#d91b9b] hover:scale-105 group/link backdrop-blur-md"
                  href={instagramLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="text-magentaNeon group-hover/link:text-white transition-colors text-xs leading-none">◈</span>
                  <span>Instagram</span>
                  <span className="text-[10px] opacity-70 group-hover/link:opacity-100 transition-transform group-hover/link:translate-x-0.5">↗</span>
                </a>
                <a
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-[#FF0000] hover:text-white border border-white/15 hover:border-[#FF0000] text-xs font-semibold text-white transition-all flex items-center gap-1.5 hover:shadow-[0_0_20px_#FF0000] hover:scale-105 group/link backdrop-blur-md"
                  href={youtubeLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="text-red-400 group-hover/link:text-white transition-colors text-xs leading-none">▶</span>
                  <span>YouTube</span>
                  <span className="text-[10px] opacity-70 group-hover/link:opacity-100 transition-transform group-hover/link:translate-x-0.5">↗</span>
                </a>
                <a
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-[#1877F2] hover:text-white border border-white/15 hover:border-[#1877F2] text-xs font-semibold text-white transition-all flex items-center gap-1.5 hover:shadow-[0_0_20px_#1877F2] hover:scale-105 group/link backdrop-blur-md"
                  href={facebookLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="text-blue-400 group-hover/link:text-white transition-colors text-xs leading-none font-bold">f</span>
                  <span>Facebook</span>
                  <span className="text-[10px] opacity-70 group-hover/link:opacity-100 transition-transform group-hover/link:translate-x-0.5">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
