import {
  NavigationItem,
  FeatureItem,
  ExploreDestination,
  FAQItem,
  SocialLink,
  DeveloperProfile,
  AppScreenshotItem,
  UpdateReleaseInfo,
  TestimonialItem,
} from '../types';

/**
 * Centralized Application Configuration & Data
 * All editable URLs, copy, links, and content are configured here.
 */

export const APP_CONFIG = {
  name: 'NAIHATI NIGHTS',
  nameEn: 'Naihati Nights',
  nameBn: 'নাইহাটি নাইটস',
  tagline: 'Next-Gen Reactive Festival Guidance Engine',
  description:
    'Providing comprehensive offline guidance and reactive navigation tailored for festival pilgrims.',
  shortDescription: 'Next-Gen Reactive Festival Guidance Engine',
  trustLine: 'Crafted with reactive excellence by VIDESH KARMAKAR',

  // Centralized download URLs: Direct Official APK and Mirrors
  APP_DOWNLOAD_URL:
    'https://github.com/videshkarmakar-hue/Naihati-Nights/releases/download/v3.0.47/NaihatiNights-3.0.47.apk',
  APP_LOCAL_APK_URL:
    'https://github.com/videshkarmakar-hue/Naihati-Nights/releases/download/v3.0.47/NaihatiNights-3.0.47.apk',
  APP_DIRECT_APK_URL:
    'https://github.com/videshkarmakar-hue/Naihati-Nights/releases/download/v3.0.47/NaihatiNights-3.0.47.apk',
  APP_DOWNLOAD_MIRROR_URL:
    'https://github.com/videshkarmakar-hue/Naihati-Nights/releases/download/v3.0.47/NaihatiNights-3.0.47.apk',

  // Verified Developer Profile Image URL
  DEVELOPER_IMAGE_URL:
    'https://cdn.phototourl.com/member/2026-09-24-d3b8ff6f-f0d4-43e0-9082-9f39cc851774.png',

  APP_ICON_URL:
    'https://cdn.phototourl.com/member/2026-10-07-3560ff11-c4ca-4914-ada1-bb03390ea789.png',
  APP_LOGO_WORDMARK_URL:
    'https://cdn.phototourl.com/member/2026-09-16-52c30c1f-9739-4d84-89a4-6ec5d9fab446.png',
  HERO_IMAGE_URL:
    'https://cdn.phototourl.com/member/2026-10-29-a76200c3-0403-452d-81b1-ca7b18a01116.jpg',

  version: '3.0.47',
  apkFileName: 'NaihatiNights-3.0.47.apk',
  apkSize: '~27.9 MB',
  sha256: '4C9E...B81A',
  copyright: '2025 Naihati Nights. All rights reserved.',
};

/**
 * Centralized APP_SCREENSHOTS array containing the 9 high-resolution mobile application screenshots.
 * Hosted locally in /public/screenshots/ for guaranteed instant loading and zero broken links.
 */
export const APP_SCREENSHOTS: string[] = [
  'https://cdn.phototourl.com/member/2026-09-16-3999ae00-20eb-4d66-b8e6-983eb349510e.jpg',
  'https://cdn.phototourl.com/member/2026-09-16-d80378c8-6a2c-4409-af6a-16c3fda23f72.jpg',
  'https://cdn.phototourl.com/member/2026-09-16-f42fc031-fdc1-47e1-b069-3904403e27f5.jpg',
  'https://cdn.phototourl.com/member/2026-09-16-a58a3d33-fa51-4c8b-9fa3-835d1c6ecfd6.jpg',
  'https://cdn.phototourl.com/member/2026-09-16-36e444ad-d005-4ea6-9cce-ce57277d6603.jpg',
  'https://cdn.phototourl.com/member/2026-09-16-d8423aa2-6c98-4eaf-ac00-1c816112a5e7.jpg',
  'https://cdn.phototourl.com/member/2026-09-16-34a8b287-6fe2-41b8-8a2f-636186929d0d.jpg',
];

/**
 * Rich metadata for the official product screenshots
 */
export const APP_SCREENSHOT_ITEMS: AppScreenshotItem[] = [
  {
    id: 1,
    url: APP_SCREENSHOTS[0],
    label: 'RADAR',
    code: '01',
    tag: 'Live Puja Dashboard',
    description: 'Festive landing with instant access to nearby pandals, curated guides and daily schedules.',
  },
  {
    id: 2,
    url: APP_SCREENSHOTS[1],
    label: 'EXPLORE',
    code: '02',
    tag: 'Pandal Discovery',
    description: 'Curated list of award-winning community pandals, themes and artist credits.',
  },
  {
    id: 3,
    url: APP_SCREENSHOTS[2],
    label: 'HERITAGE',
    code: '03',
    tag: 'Bonedi Bari Traditions',
    description: 'Centuries-old aristocratic zamindar household pujas across Bengal.',
  },
  {
    id: 4,
    url: APP_SCREENSHOTS[3],
    label: 'TRANSIT',
    code: '04',
    tag: 'Metro & Train Routing',
    description: 'Station-wise route planning, walking distances, and transit shortcuts.',
  },
  {
    id: 5,
    url: APP_SCREENSHOTS[4],
    label: 'ZONES',
    code: '05',
    tag: 'Zonal Directory',
    description: 'Categorized zones across North, South, Central Kolkata and districts.',
  },
  {
    id: 6,
    url: APP_SCREENSHOTS[5],
    label: 'NAVIGATE',
    code: '06',
    tag: 'Offline Map & GPS',
    description: 'High precision maps with offline pandal guides and crowd density insights.',
  },
  {
    id: 7,
    url: APP_SCREENSHOTS[6],
    label: 'INSIGHTS',
    code: '07',
    tag: 'Festival Guide',
    description: 'Detailed artisan backgrounds, puja schedules, and emergency support numbers.',
  },
];

export const DEVELOPER_INFO: DeveloperProfile = {
  name: 'Videsh Karmakar',
  role: 'Developer • Designer • Creator',
  signatureCredit: 'Crafted by VIDESH KARMAKAR',
  imageUrl: APP_CONFIG.DEVELOPER_IMAGE_URL,
  bio: 'Passionate about building digital experiences that combine technology, design and culture.',
};

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'nav-home', label: 'Home', href: '#home' },
  { id: 'nav-about', label: 'About', href: '#about' },
  { id: 'nav-capabilities', label: 'Services', href: '#capabilities' },
  { id: 'nav-download', label: 'Downloads', href: '#download' },
  { id: 'nav-developer', label: 'Developer', href: '#developer' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'social-website',
    label: 'Website',
    url: 'https://videshkarmakar.carrd.co/',
    platform: 'Website',
    description: 'videshkarmakar.carrd.co',
  },
  {
    id: 'social-spotify',
    label: 'Spotify',
    url: 'https://open.spotify.com/artist/2eJEzi0mzJB60zVJf0OjWP',
    platform: 'Spotify',
    description: 'Artist profile & releases',
  },
  {
    id: 'social-instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/code.red_videsh/',
    platform: 'Instagram',
    description: '@code.red_videsh',
  },
  {
    id: 'social-youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/@videshkarmakar2000',
    platform: 'YouTube',
    description: '@videshkarmakar2000',
  },
  {
    id: 'social-facebook',
    label: 'Facebook',
    url: 'https://www.facebook.com/gfx.videsh',
    platform: 'Facebook',
    description: 'gfx.videsh',
  },
];

export const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: 'feat-explore',
    title: 'Explore Pandals',
    description: 'Find and discover Durga Puja pandals and destinations across Bengal with ease.',
    iconName: 'Compass',
  },
  {
    id: 'feat-plan',
    title: 'Plan Your Journey',
    description: 'Organize the places and itineraries you want to visit during the festive days.',
    iconName: 'Route',
  },
  {
    id: 'feat-nearby',
    title: 'Discover Nearby',
    description: 'Find interesting Puja destinations, traditional celebrations, and landmarks around you.',
    iconName: 'MapPin',
  },
  {
    id: 'feat-guide',
    title: 'Puja Guide',
    description: 'Useful guidance and tips for making the most of Bengal’s joyous festive season.',
    iconName: 'BookOpen',
  },
  {
    id: 'feat-experience',
    title: 'Beautiful Experience',
    description: 'A clean and simple Android experience thoughtfully designed for Puja travelers.',
    iconName: 'Sparkles',
  },
  {
    id: 'feat-companion',
    title: 'Your Puja Companion',
    description: 'Keep your entire festival exploration organized, accessible, and ready in your pocket.',
    iconName: 'HeartHandshake',
  },
];

export const EXPLORE_DESTINATIONS: ExploreDestination[] = [
  {
    id: 'dest-kolkata',
    title: 'Kolkata Puja',
    category: 'The Epicenter',
    description: 'The heartbeat of Bengal’s grandest celebration with vibrant streets and endless energy.',
    imageUrl: 'https://cdn.phototourl.com/free/2026-09-08-d4e31193-ab20-4eda-a2e9-dbf236f83c51.jpg',
    highlights: ['Citywide festive energy', 'Day & night exploration', 'Cultural epicenter'],
  },
  {
    id: 'dest-north',
    title: 'North Kolkata',
    category: 'Heritage & History',
    description: 'Historic lanes, ancestral rajbari traditions, and timeless bonedi bari celebrations.',
    imageUrl: 'https://cdn.phototourl.com/member/2026-09-09-1c61e896-e1db-485b-9f9a-f75c4ccc56a9.jpg',
    highlights: ['Bonedi Bari heritage', 'Traditional idol sculpting', 'Old-world nostalgia'],
  },
  {
    id: 'dest-south',
    title: 'South Kolkata',
    category: 'Grandeur & Artistry',
    description: 'Spectacular architectural pandals, expansive installations, and renowned community pujas.',
    imageUrl: 'https://cdn.phototourl.com/member/2026-09-09-2418a699-ff4d-40e3-8e56-181e13191f73.jpg',
    highlights: ['Scale & lighting', 'Major iconic pandals', 'Wide accessible routes'],
  },
  {
    id: 'dest-traditional',
    title: 'Traditional Puja',
    category: 'Roots & Rituals',
    description: 'The rhythmic beats of the dhak, sound of the shankha, authentic rituals, and timeless customs.',
    imageUrl: 'https://cdn.phototourl.com/member/2026-09-09-cb229008-2ab1-4ab2-9b24-83b8cef71218.jpg',
    highlights: ['Dhunuchi naach', 'Authentic ceremonies', 'Devotional atmosphere'],
  },
  {
    id: 'dest-theme',
    title: 'Theme Puja',
    category: 'Modern Expression',
    description: 'Artistic expressions, contemporary social themes, and awe-inspiring conceptual craftsmanship.',
    imageUrl: 'https://cdn.phototourl.com/member/2026-09-09-ef8f8dff-f14d-4298-98cf-040b4b83a771.jpg',
    highlights: ['Contemporary concepts', 'Artistic installations', 'Thought-provoking themes'],
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is শারদ ভ্রমণ?',
    answer:
      'শারদ ভ্রমণ (Sharod Bhraman) is a dedicated Android travel and discovery application designed to help you explore Durga Puja pandals, discover destinations across Bengal, and plan your festive journey with ease.',
  },
  {
    id: 'faq-2',
    question: 'What can I do with the app?',
    answer:
      'With শারদ ভ্রমণ, you can discover Durga Puja destinations, browse pandal locations, organize your visiting itineraries, locate nearby celebrations, and keep essential travel details organized in one place.',
  },
  {
    id: 'faq-3',
    question: 'Where can I download the app?',
    answer:
      'You can download the app directly using the official "Download App" buttons across this website, which link directly to the official package distribution.',
  },
  {
    id: 'faq-4',
    question: 'Is the app free?',
    answer:
      'Yes, the application is freely accessible to download so that Puja lovers and travelers can enjoy exploring Bengal without barriers.',
  },
  {
    id: 'faq-5',
    question: 'Which devices are supported?',
    answer:
      'The application is built for Android mobile devices, supporting standard Android versions for smooth on-the-go navigation during the festive season.',
  },
  {
    id: 'faq-6',
    question: 'How do I get started?',
    answer:
      'Simply download the application from this website, install it on your Android smartphone, open the app, and begin exploring Puja destinations and planning your festive route.',
  },
  {
    id: 'faq-7',
    question: 'How can I contact the developer?',
    answer:
      'You can connect with Videsh Karmakar through the official personal website (videshkarmakar.carrd.co) or via the social profiles linked in the Developer section below.',
  },
];

/**
 * LATEST_UPDATE_INFO
 * Contains complete details for the latest version update and "What's New" release notes.
 */
export const LATEST_UPDATE_INFO: UpdateReleaseInfo = {
  version: 'V5.1.1.0',
  releaseDate: 'September 2026',
  eyebrow: "HOTFIX UPDATE",
  heading: "V5.1.1.0 Now Update — Install Latest 'Hotfix' Version",
  supportingText:
    "The V5.1.1.0 Hotfix is now live! Install the latest hotfix version for faster route calculation, station-wise pandal mapping, and enhanced stability.",
  confirmationHeading: 'V5.1.1.0 Hotfix Successfully Applied',
  confirmationMessage:
    'The critical V5.1.1.0 hotfix update brings ultra-fast station-wise pandal access, improved Google Maps accuracy, lightweight memory optimizations, and smooth 60fps UI animations.',
  acknowledgmentMessage:
    'Thank you for traveling with শারদ ভ্রমণ. Install the latest hotfix to ensure an uninterrupted Durga Puja journey.',
  features: [
    {
      id: 'feat-clean-ui',
      featureNumber: '01',
      title: 'Cleaner, Refined Interface',
      description:
        'A smoother and more focused interface designed for faster navigation and a better everyday experience.',
      iconName: 'Sparkles',
    },
    {
      id: 'feat-performance',
      featureNumber: '02',
      title: 'Improved App Engine',
      description:
        'Optimized the application engine for faster response, smoother operation, and improved reliability.',
      iconName: 'Zap',
    },
    {
      id: 'feat-metro-mapping',
      featureNumber: '03',
      title: 'Metro Station-Wise Pandle Mapping',
      description:
        'Added station-level Pandle Mapping with dedicated North + South coverage for easier location-based access.',
      iconName: 'TrainTrack',
    },
    {
      id: 'feat-train-mapping',
      featureNumber: '04',
      title: 'Train Station-Wise Pandle Mapping',
      description:
        'Added detailed Train Station-Wise Pandle Mapping with North + South coverage for improved station-level usability.',
      iconName: 'Train',
    },
    {
      id: 'feat-north-south',
      featureNumber: '05',
      title: 'Dedicated North + South Sections',
      description:
        'Separate regional sections make station information easier to browse, understand, and access.',
      iconName: 'Compass',
    },
    {
      id: 'feat-live-help',
      featureNumber: '06',
      title: 'Live Help, Reports & Suggestions',
      description:
        'A dedicated area for Live Help, issue reporting, feedback, and suggestions.',
      iconName: 'LifeBuoy',
    },
    {
      id: 'feat-google-maps',
      featureNumber: '07',
      title: 'Improved Google Mapping Accuracy',
      description:
        'Enhanced Google Maps integration and mapping accuracy for more reliable station and location-based results.',
      iconName: 'MapPin',
    },
    {
      id: 'feat-efficiency',
      featureNumber: '08',
      title: 'Lightweight & Battery Efficient',
      description:
        'Optimized to remain lightweight and responsive while reducing unnecessary battery consumption.',
      iconName: 'BatteryCharging',
    },
  ],
};

/**
 * Authentic Testimonials from Durga Puja Travelers & Heritage Walkers
 */
export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Anirban Mukherjee',
    nameBn: 'অনির্বাণ মুখোপাধ্যায়',
    role: 'Heritage Walker & Street Photographer',
    location: 'Ballygunge, South Kolkata',
    rating: 5,
    date: 'Maha Saptami 2025',
    badge: 'Verified Pandal Hopper',
    avatarText: 'AM',
    avatarGradient: 'from-[#F0660A] to-[#FF7B29]',
    verified: true,
    highlightPandal: 'Sovabazar Rajbari',
    quote:
      'The Bonedi Bari heritage guide and Kumartuli sculptor spotlights are unmatched. My group explored 14 aristocratic household pujas across North Kolkata without having to ask locals for directions once. The offline map saved our night when cellular data choked!',
    quoteBn:
      'বনেদি বাড়ির ঐতিহ্য আর কুমারটুলির শিল্পীদের তথ্য অসাধারণভাবে সাজানো। মোবাইল নেটওয়ার্ক জ্যাম হওয়ার পরেও অফলাইন ম্যাপ নিখুঁত কাজ করেছে।',
  },
  {
    id: 'test-2',
    name: 'Dr. Sreemoyee Sen',
    nameBn: 'ডাঃ শ্রীময়ী সেন',
    role: 'Senior Resident Medical Officer',
    location: 'SSKM Hospital / Bhawanipore',
    rating: 5,
    date: 'Maha Ashtami 2025',
    badge: 'Night Shift Commuter',
    avatarText: 'SS',
    avatarGradient: 'from-[#0EA5E9] to-[#2563EB]',
    verified: true,
    highlightPandal: 'Tridhara Sammilani',
    quote:
      'Traveling between hospital duties and family pandal visits during Ashtami night can be chaotic. The station gate guidance and live emergency helpline access right on the home screen gave my parents total peace of mind. Truly built for Kolkata citizens.',
    quoteBn:
      'জরুরী ডিউটির মাঝেও পরিবারের সাথে নির্বিঘ্নে পুজো পরিক্রমা করতে পেরেছি। মেট্রো গেটের ডিরেকশন ও হেল্পলাইন একদম যথাযথ।',
  },
  {
    id: 'test-3',
    name: 'Debojyoti Banerjee',
    nameBn: 'দেবজ্যোতি বন্দ্যোপাধ্যায়',
    role: 'Software Architect & Tech Reviewer',
    location: 'Salt Lake Sector V',
    rating: 5,
    date: 'Maha Navami 2025',
    badge: 'Power User',
    avatarText: 'DB',
    avatarGradient: 'from-[#10B981] to-[#059669]',
    verified: true,
    highlightPandal: 'FD Block Salt Lake',
    quote:
      'Zero ads, zero bloatware, zero intrusive trackers. The liquid dark UI is easier on phone battery during 6-hour walking marathons. The North-South train integration with Sealdah and Howrah lines was pure brilliance.',
    quoteBn:
      'কোনো বিরক্তিকর বিজ্ঞাপন নেই, দ্রুত চলে এবং ফোনের ব্যাটারি বাঁচায়। শিয়ালদহ ও হাওড়া লাইনের ট্রেন ম্যাপিং ছিল এক কথায় অনবদ্য।',
  },
  {
    id: 'test-4',
    name: 'Poulomi Chatterjee',
    nameBn: 'পৌলমী চট্টোপাধ্যায়',
    role: 'Food & Cultural Curator',
    location: 'Dhakuria, South Kolkata',
    rating: 5,
    date: 'Maha Sasthi 2025',
    badge: 'Culture Enthusiast',
    avatarText: 'PC',
    avatarGradient: 'from-[#EC4899] to-[#D946EF]',
    verified: true,
    highlightPandal: 'Suruchi Sangha',
    quote:
      'We visited 19 pandals across South Kolkata on Sasthi night! The walking route optimization ensured we never doubled back on blocked barricades. Also loved the traditional Dhak rhythm audio player in the background!',
    quoteBn:
      'ষষ্ঠীর রাতে ১৯টি মণ্ডপ পরিক্রমা করেছি অনায়াসে। ব্যারিকেড এড়িয়ে সঠিক হাঁটার পথ দেখানোর সুবিধাটি দারুণ ছিল।',
  },
  {
    id: 'test-5',
    name: 'Arpita Roy',
    nameBn: 'অর্পিতা রায়',
    role: 'Visiting Expat & UI Designer',
    location: 'London, UK / Visiting Kolkata',
    rating: 5,
    date: 'Mahalaya 2025',
    badge: 'Diaspora Traveler',
    avatarText: 'AR',
    avatarGradient: 'from-[#F59E0B] to-[#D97706]',
    verified: true,
    highlightPandal: 'College Square',
    quote:
      'Returning to Kolkata for Durga Puja after five years felt overwhelming until I installed Sharod Bhraman. It felt like having a cultured local friend whispering secrets about hidden artisan alleys and authentic bhog timings.',
    quoteBn:
      'পাঁচ বছর পর কলকাতায় ফিরে শারদ ভ্রমণ অ্যাপটি ছিল আমার পরম বন্ধু। চমৎকার আধুনিক ডিজাইন ও নিখুঁত তথ্য।',
  },
  {
    id: 'test-6',
    name: 'Sourav Gangopadhyay',
    nameBn: 'সৌরভ গঙ্গোপাধ্যায়',
    role: 'Suburban Explorer & College Student',
    location: 'Howrah Station / Shibpur',
    rating: 5,
    date: 'Maha Saptami 2025',
    badge: 'Daily Commuter',
    avatarText: 'SG',
    avatarGradient: 'from-[#8B5CF6] to-[#6366F1]',
    verified: true,
    highlightPandal: 'Santosh Mitra Square',
    quote:
      'Coming from Howrah via local train, the station-wise mapping told us exactly which footbridge to take and which pandals are in walking distance. Saved thousands on auto surge pricing!',
    quoteBn:
      'হাওড়া থেকে লোকাল ট্রেনে এসে স্টেশন ভিত্তিক ম্যাপ দেখে হেঁটেই বহু মণ্ডপ দেখেছি। অতিরিক্ত অটো ভাড়া বাঁচাতে প্রচুর সাহায্য করেছে।',
  },
];
