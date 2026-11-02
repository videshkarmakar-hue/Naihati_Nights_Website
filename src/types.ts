export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Compass' | 'Route' | 'MapPin' | 'BookOpen' | 'Sparkles' | 'HeartHandshake';
  badge?: string;
}

export interface ExploreDestination {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  highlights: string[];
}

export type PandalZone =
  | 'North Kolkata'
  | 'South Kolkata'
  | 'Central Kolkata'
  | 'Salt Lake / East'
  | 'Bonedi Bari';

export type PandalThemeCategory =
  | 'Architectural'
  | 'Traditional & Heritage'
  | 'Folk & Artisanal'
  | 'Modern Art'
  | 'Illumination & Laser';

export interface PandalItem {
  id: string;
  name: string;
  nameBn: string;
  area: string;
  zone: PandalZone;
  theme: string;
  themeCategory: PandalThemeCategory;
  description: string;
  nearestTransit: string;
  transitType?: 'metro' | 'train' | 'bus';
  highlights: string[];
  featured?: boolean;
  crowdLevel?: 'Moderate' | 'High' | 'Very High';
  bestTimeToVisit?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  platform: 'Website' | 'Spotify' | 'Instagram' | 'YouTube' | 'Facebook';
  description?: string;
}

export interface DeveloperProfile {
  name: string;
  role: string;
  signatureCredit: string;
  imageUrl: string;
  bio: string;
}

export interface AppScreenshotItem {
  id: number;
  url: string;
  label: string;
  code: string;
  tag: string;
  description: string;
}

export interface UpdateFeatureItem {
  id: string;
  featureNumber: string;
  title: string;
  description: string;
  iconName: 'Sparkles' | 'Zap' | 'TrainTrack' | 'Train' | 'Compass' | 'LifeBuoy' | 'MapPin' | 'BatteryCharging';
}

export interface UpdateReleaseInfo {
  version: string;
  releaseDate: string;
  eyebrow: string;
  heading: string;
  supportingText: string;
  confirmationHeading: string;
  confirmationMessage: string;
  acknowledgmentMessage: string;
  features: UpdateFeatureItem[];
}

export interface Review {
  id: string;
  userId: string;
  displayName: string;
  photoURL: string | null;
  rating: number;
  comment: string;
  status: 'published' | 'pending' | 'hidden';
  createdAt: {
    seconds: number;
    nanoseconds: number;
  } | null;
  updatedAt?: {
    seconds: number;
    nanoseconds: number;
  } | null;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export interface TestimonialItem {
  id: string;
  name: string;
  nameBn?: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  quote: string;
  quoteBn?: string;
  badge: string;
  avatarText: string;
  avatarGradient: string;
  verified?: boolean;
  highlightPandal?: string;
}

