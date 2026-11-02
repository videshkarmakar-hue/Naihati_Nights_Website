import React from 'react';
import { Database, Navigation, Shield, Compass, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const IntroSection: React.FC = () => {
  const introCards = [
    {
      id: 'intro-card-1',
      icon: Database,
      title: '100% Offline SQLite',
      subtitle:
        'Preloaded pandal directory, corridors, and timing notes with zero network buffering.',
    },
    {
      id: 'intro-card-2',
      icon: Navigation,
      title: 'Real-Time Gate Navigation',
      subtitle:
        'Exact Metro exit coordinates directly mapped to pandal ingress walking gates.',
    },
    {
      id: 'intro-card-3',
      icon: Shield,
      title: 'Zero Tracking & Battery Drain',
      subtitle:
        'GPL-3.0 open source with zero telemetry, zero analytics, and maximum battery life.',
    },
  ];

  return (
    <section
      id="about"
      className="py-24 sm:py-32 bg-[#140D0B] text-white relative overflow-hidden border-t border-[#4E342E]/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <ScrollReveal direction="up" distance={16} duration={500}>
          {/* Centered Pill Badge matching Reference < INTRODUCTION > */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#271916] border border-[#5D4037] text-[#F0660A] text-[11px] font-mono tracking-widest uppercase mb-4 select-none">
            <span className="w-1 h-1 rounded-full bg-[#F0660A]" />
            <span>INTRODUCTION</span>
          </div>

          {/* Centered Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans mb-10 sm:mb-14">
            What is Sharod Bhraman ?
          </h2>

          {/* 3 Horizontal Cards in a row matching Reference Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left">
            {introCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="p-6 rounded-2xl bg-[#3E2723] border border-[#5D4037] hover:border-[#F0660A]/50 transition-all duration-200 group flex items-start gap-4"
                >
                  {/* Square Outline Icon Box on Left */}
                  <div className="w-11 h-11 rounded-xl bg-[#271916] border border-[#5D4037] flex items-center justify-center text-[#F0660A] shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-white font-sans tracking-tight mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#D7CCC8] leading-relaxed">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
