import React, { useState } from 'react';
import {
  ExternalLink,
  Globe,
  Mail,
  ChevronRight,
} from 'lucide-react';
import { DEVELOPER_INFO, SOCIAL_LINKS } from '../data/config';
import { SocialLink } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { DeveloperContactModal } from './DeveloperContactModal';

const SpotifyBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const InstagramBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YouTubeBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const FacebookBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Website: Globe,
  Spotify: SpotifyBrandIcon,
  Instagram: InstagramBrandIcon,
  YouTube: YouTubeBrandIcon,
  Facebook: FacebookBrandIcon,
};

export const DeveloperSection: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section
      id="developer"
      className="py-24 sm:py-32 bg-[#140D0B] text-white relative overflow-hidden border-t border-[#4E342E]/50"
      aria-label="Creator & Developer Monograph"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" distance={20} duration={600}>
          {/* Section 2 Grid matching Reference layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 relative">
            {/* Left Column: Close-up Dramatic Monochrome Portrait */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#3E2723] border border-[#5D4037] shadow-2xl">
                <img
                  src={DEVELOPER_INFO.imageUrl}
                  alt={DEVELOPER_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter grayscale contrast-[1.18] brightness-[0.92]"
                  loading="lazy"
                />

                {/* Ambient dark bottom vignette */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#140D0B] via-transparent to-transparent opacity-90"
                  aria-hidden="true"
                />

                {/* Bottom author title plate */}
                <div className="absolute bottom-5 inset-x-5 z-20 p-4 rounded-xl bg-[#271916]/90 backdrop-blur-sm border border-[#5D4037]">
                  <span className="block text-sm font-bold text-white font-sans">
                    {DEVELOPER_INFO.name}
                  </span>
                  <span className="block text-xs text-[#F0660A] font-mono mt-0.5">
                    Lead Architect &amp; Designer
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Reference Kicker, Headline with Orange Dot, Paragraphs & Read More link */}
            <div className="lg:col-span-7 flex flex-col justify-between relative">
              {/* Reference Ghost Watermark Numeral "02." */}
              <div
                className="absolute -bottom-10 right-0 text-8xl sm:text-9xl font-black text-white/[0.03] select-none pointer-events-none font-sans"
                aria-hidden="true"
              >
                02.
              </div>

              <div>
                {/* Reference Pill Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#271916] border border-[#5D4037] text-[#F0660A] text-[11px] font-mono tracking-widest uppercase mb-4 select-none">
                  <span className="w-1 h-1 rounded-full bg-[#F0660A]" />
                  <span>ARTISAN &amp; CREATOR MONOGRAPH</span>
                </div>

                {/* Reference Headline matching "We Are Experts In Our Field." with orange dot */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 font-sans leading-tight">
                  Crafted With Devotion <br />
                  For Bengal<span className="text-[#F0660A] font-black">.</span>
                </h2>

                {/* Editorial Subtitle Paragraph */}
                <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed max-w-xl mb-4 font-sans">
                  "{DEVELOPER_INFO.bio}"
                </p>

                {/* Secondary detail paragraph matching Crope two-paragraph structure */}
                <p className="text-xs sm:text-sm text-[#D7CCC8] leading-relaxed max-w-xl mb-8 font-sans">
                  Built independently as a gift for Bengal's festive community. Every corridor, Metro exit, and zonal pandal was personally verified on the ground to deliver a smooth, battery-friendly experience that respects your privacy.
                </p>

                {/* Reference Action Link: "CONTACT CREATOR ▶" in orange */}
                <div className="flex items-center gap-6 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(true)}
                    className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-mono tracking-wider uppercase text-[#F0660A] hover:text-white transition-colors cursor-pointer"
                  >
                    <span>CONTACT CREATOR</span>
                    <span className="w-5 h-5 rounded-full bg-[#F0660A]/10 border border-[#F0660A]/30 flex items-center justify-center text-[#F0660A] group-hover:bg-[#F0660A] group-hover:text-white transition-all">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Channels Deck */}
          <div className="pt-8 border-t border-white/[0.06]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#A1887F]">
                Verified Channels
              </span>
              <span className="text-[11px] font-mono text-[#D7CCC8]">
                @videshkarmakar
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {SOCIAL_LINKS.map((link: SocialLink) => {
                const IconComponent = platformIcons[link.platform] || Globe;
                return (
                  <a
                    key={link.id}
                    id={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-[#3E2723] border border-[#5D4037] hover:border-[#F0660A]/50 transition-colors flex items-center justify-between group"
                    aria-label={link.label}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#271916] border border-white/5 flex items-center justify-center text-[#F0660A] group-hover:scale-105 transition-transform">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-white">
                        {link.label}
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#A1887F] group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Developer Contact Inquiries Dialog */}
      <DeveloperContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
};
