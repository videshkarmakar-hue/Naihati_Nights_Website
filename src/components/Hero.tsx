import React from 'react';
import {
  Train,
  MapPin,
  Compass,
  Smartphone,
  Database,
  Github,
  Download,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { APP_CONFIG, LATEST_UPDATE_INFO } from '../data/config';
import { ScrollReveal } from './ScrollReveal';
import { AestheticDownloadButton } from './AestheticDownloadButton';

interface HeroProps {
  onOpenWhatsNew?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWhatsNew }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#120B09] text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col justify-between"
    >
      {/* Background Architectural 3D Perspective Wave Curves matching Reference */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full object-cover opacity-60"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3E2723" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#261613" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#120B09" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="waveGradOrange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0660A" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#3E2723" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#120B09" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="centerHorizon" cx="50%" cy="58%" r="40%">
              <stop offset="0%" stopColor="#3E2723" stopOpacity="0.7" />
              <stop offset="45%" stopColor="#261613" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#120B09" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Central horizon glow mask */}
          <rect width="1440" height="900" fill="url(#centerHorizon)" />

          {/* Left Ribbons flowing inward */}
          <path
            d="M-100 280 C280 260, 520 440, 720 520 C520 540, 260 560, -100 620 Z"
            fill="url(#waveGrad1)"
          />
          <path
            d="M-80 340 C320 320, 560 460, 720 520 C540 560, 280 620, -80 720 Z"
            fill="url(#waveGradOrange)"
          />
          <path
            d="M-50 420 C360 400, 580 480, 720 520 C560 580, 300 700, -50 820 Z"
            fill="url(#waveGrad1)"
          />

          {/* Right Ribbons flowing inward */}
          <path
            d="M1540 280 C1160 260, 920 440, 720 520 C920 540, 1180 560, 1540 620 Z"
            fill="url(#waveGrad1)"
          />
          <path
            d="M1520 340 C1120 320, 880 460, 720 520 C900 560, 1160 620, 1520 720 Z"
            fill="url(#waveGradOrange)"
          />
          <path
            d="M1490 420 C1080 400, 860 480, 720 520 C880 580, 1140 700, 1490 820 Z"
            fill="url(#waveGrad1)"
          />

          {/* Perspective grid lines radiating toward horizon center (720, 520) */}
          <g stroke="#5D4037" strokeWidth="0.75" opacity="0.35">
            <line x1="720" y1="520" x2="0" y2="900" />
            <line x1="720" y1="520" x2="140" y2="900" />
            <line x1="720" y1="520" x2="280" y2="900" />
            <line x1="720" y1="520" x2="420" y2="900" />
            <line x1="720" y1="520" x2="560" y2="900" />
            <line x1="720" y1="520" x2="700" y2="900" />
            <line x1="720" y1="520" x2="740" y2="900" />
            <line x1="720" y1="520" x2="880" y2="900" />
            <line x1="720" y1="520" x2="1020" y2="900" />
            <line x1="720" y1="520" x2="1160" y2="900" />
            <line x1="720" y1="520" x2="1300" y2="900" />
            <line x1="720" y1="520" x2="1440" y2="900" />

            {/* Horizontal perspective depth rungs */}
            <line x1="600" y1="540" x2="840" y2="540" />
            <line x1="500" y1="580" x2="940" y2="580" />
            <line x1="380" y1="640" x2="1060" y2="640" />
            <line x1="220" y1="720" x2="1220" y2="720" />
            <line x1="40" y1="830" x2="1400" y2="830" />
          </g>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10 text-center pt-4 sm:pt-8">
        <ScrollReveal direction="up" distance={18} duration={500}>
          {/* Official Bengali Calligraphy Logo - Prominent & Easily Viewed */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <img
              src={APP_CONFIG.APP_LOGO_WORDMARK_URL}
              alt="শারদ ভ্রমণ"
              className="h-36 sm:h-48 md:h-60 lg:h-72 max-w-[95vw] w-auto object-contain brightness-115 drop-shadow-[0_12px_40px_rgba(0,0,0,0.75)]"
              loading="eager"
            />
          </div>

          {/* Reference Centered Subtitle */}
          <p className="text-xs sm:text-sm text-[#D7CCC8] max-w-xl mx-auto mb-8 font-sans leading-relaxed">
            Voice-free. Zero tracking. 100% offline SQLite. Built for Bengal's Durga Puja.
          </p>

          {/* Centered Reference Button Action (Download Direct APK) */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
            <AestheticDownloadButton
              id="hero-reference-download-btn"
              variant="capsule-sheen"
              label="Download App (Direct APK)"
              activeLabel="Preparing..."
              completedLabel="Downloading..."
              ariaLabel="Download Sharod Bhraman APK directly"
              className="!px-7 !py-3 !rounded-full !bg-white !text-black !font-bold hover:!bg-[#F0660A] hover:!text-white !border-white transition-all shadow-lg text-xs sm:text-sm"
            />

            {onOpenWhatsNew && (
              <button
                type="button"
                onClick={onOpenWhatsNew}
                className="px-4 py-2.5 rounded-full border border-[#5D4037] bg-[#271916]/80 hover:bg-[#3E2723] text-[#D7CCC8] hover:text-white text-xs font-mono transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>Release v5.1</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F0660A]" />
              </button>
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom Integrated Platforms / Partners Ticker matching Reference */}
      <div className="w-full border-t border-[#4E342E]/60 pt-6 pb-2 relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-xs font-medium text-[#D7CCC8]/80 font-mono">
          <div className="flex items-center gap-2 hover:text-white transition-colors">
            <span className="w-2 h-2 rounded-full bg-[#F0660A]" />
            <span>Kolkata Metro</span>
          </div>

          <div className="flex items-center gap-2 hover:text-white transition-colors">
            <Compass className="w-4 h-4 text-[#F0660A]" />
            <span>OpenStreetMap</span>
          </div>

          <div className="flex items-center gap-2 hover:text-white transition-colors">
            <Smartphone className="w-4 h-4 text-[#F0660A]" />
            <span>Android FOSS</span>
          </div>

          <div className="flex items-center gap-2 hover:text-white transition-colors">
            <Database className="w-4 h-4 text-[#F0660A]" />
            <span>SQLite Offline</span>
          </div>

          <div className="flex items-center gap-2 hover:text-white transition-colors">
            <ShieldCheck className="w-4 h-4 text-[#F0660A]" />
            <span>GPL-3.0 License</span>
          </div>

          <div className="flex items-center gap-2 hover:text-white transition-colors">
            <Github className="w-4 h-4 text-[#F0660A]" />
            <span>GitHub Verified</span>
          </div>
        </div>
      </div>
    </section>
  );
};
