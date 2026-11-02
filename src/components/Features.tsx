import React from 'react';
import {
  Compass,
  Route,
  MapPin,
  BookOpen,
  Sparkles,
  HeartHandshake,
  LucideIcon,
} from 'lucide-react';
import { FEATURE_ITEMS, APP_CONFIG } from '../data/config';
import { FeatureItem } from '../types';

const iconMap: Record<string, LucideIcon> = {
  Compass,
  Route,
  MapPin,
  BookOpen,
  Sparkles,
  HeartHandshake,
};

export const Features: React.FC = () => {
  return (
    <section
      id="features"
      className="py-16 sm:py-24 bg-[#050707] relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Introduction */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9E1B18]" aria-hidden="true" />
            <span
              id="features-eyebrow"
              className="text-xs font-semibold tracking-wider text-[#B7C1BE] uppercase"
            >
              WHY {APP_CONFIG.nameEn.toUpperCase()}
            </span>
          </div>

          <h2
            id="features-main-heading"
            className="text-2xl sm:text-4xl font-bold text-[#F3F4EF] font-bengali-serif leading-tight tracking-tight mb-4"
          >
            Everything you need <br />
            <span className="text-[#C89D4B]">for your Puja journey.</span>
          </h2>

          <p
            id="features-description"
            className="text-base sm:text-lg text-[#B7C1BE] leading-relaxed max-w-2xl"
          >
            Explore pandals, plan your route, discover places and make the most of the festive season
            with <span className="font-semibold text-[#F3F4EF] font-bengali-serif">{APP_CONFIG.nameBn}</span>.
          </p>
        </div>

        {/* 6 Feature Cards Grid with Liquid Glass styling */}
        <div
          id="feature-cards-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {FEATURE_ITEMS.map((item: FeatureItem, index: number) => {
            const IconComponent = iconMap[item.iconName] || Compass;

            return (
              <div
                key={item.id}
                id={item.id}
                className="group relative p-6 sm:p-7 liquid-glass-card rounded-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Icon Badge */}
                  <div className="w-10 h-10 rounded-lg bg-[#0B2525] flex items-center justify-center text-[#C89D4B] mb-5 group-hover:bg-[#133A3A] group-hover:text-[#F3F4EF] transition-colors duration-200 shadow-sm">
                    <IconComponent className="w-5 h-5 stroke-[2]" aria-hidden="true" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-lg font-semibold text-[#F3F4EF] mb-2 tracking-tight">
                    {item.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-sm text-[#B7C1BE] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 flex items-center justify-between text-xs text-[#7F8C89]">
                  <span className="font-medium tracking-wide">0{index + 1}</span>
                  <span className="font-bengali-serif text-[#C89D4B]/80 text-[11px]">
                    {APP_CONFIG.nameBn}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
