export type ParentLanguage = 'en' | 'hi' | 'mai';

export interface ParentSectorItem {
  id: string;
  name: string;
  slug: string;
}

export const PARENT_COMPANY_DETAILS = {
  name: 'JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED',
  shortName: 'JIGSY INDIA',
  taglineSanskrit: 'जिज्ञासु ईक्षण ग्रंथि समृद्धि युक्ति',
  mottoEnglish: 'JIGYASU INTEGRATED GLOBAL SERVICES with YOU',
  cin: 'U62099BR2025PTC078592',
  dpiit: 'DIPP228528',
  gstin: '10AAHCJ0404B1ZN',
  msme: 'UDYAM-BR-34-0051280',
  officialEmail: 'jigsy25@gmail.com',
  officialPhone: '+91 94314 00022',
  registeredOffice: 'South Dighi, Darbhanga, Bihar, India - 846004',
  logoUrl: '/assets/aistudio/image_bdd66c74.png',
  makeInIndiaUrl: '/assets/make-in-india-emblem.png',
  portalUrl: 'https://jigsy.in',
  youthPortalUrl: 'https://youth.jigsy.in',
  founderPortfolioUrl: 'https://jigyasu.jigsy.in',
  founderAboutUrl: 'https://jigsy.in/about/founder',
  linkedinUrl: 'https://www.linkedin.com/in/jigyasu-vatsa/',
  facebookUrl: 'https://www.facebook.com/jigyasu.vatsa',
} as const;

export const PARENT_SECTORS: ParentSectorItem[] = [
  { id: 'tech', name: 'JIGSY Tech', slug: 'tech' },
  { id: 'consult', name: 'JIGSY Consult', slug: 'consult' },
  { id: 'rd', name: 'JIGSY R&D', slug: 'rd' },
  { id: 'digitech', name: 'JIGSY DigiTech', slug: 'digitech' },
  { id: 'edutech', name: 'JIGSY EduTech', slug: 'edutech' },
  { id: 'youth', name: 'JIGSY Youth', slug: 'youth' },
];

export interface ParentUiCopyLocale {
  nav: {
    marquee: string;
    lightMode: string;
    darkMode: string;
    home: string;
    sectorsServices: string;
    allSectorsOverview: string;
    about: string;
    aboutCompany: string;
    aboutCompanySub: string;
    founder: string;
    founderSub: string;
    directors: string;
    directorsSub: string;
    howToEngage: string;
    howToEngageSub: string;
    careers: string;
    contact: string;
    requestService: string;
    youthPortal: string;
  };
  footer: {
    contactHeading: string;
    sectorsHeading: string;
    allSectors: string;
    companyHeading: string;
    aboutCompany: string;
    founder: string;
    directors: string;
    howToEngage: string;
    careers: string;
    contactUs: string;
    connectHeading: string;
    privacyPolicy: string;
    termsConditions: string;
    cookiePolicy: string;
    founderPortfolio: string;
    developedBy: string;
    rightsReserved: string;
  };
}

export const PARENT_UI_COPY: Record<ParentLanguage, ParentUiCopyLocale> = {
  en: {
    nav: {
      marquee:
        'Multi-Sector Enterprise · Software & Cloud · Business Consultancy · Applied R&D · ISBN Publishing · EduTech & Campus Incubation · Youth Internships: youth.jigsy.in',
      lightMode: 'Light',
      darkMode: 'Dark',
      home: 'Home',
      sectorsServices: 'Sectors & Services',
      allSectorsOverview: 'All 6 Corporate Sectors',
      about: 'About',
      aboutCompany: 'About Company',
      aboutCompanySub: 'Corporate overview, DPIIT & statutory profile',
      founder: 'Founder — Mr. Jigyasu Vatsa',
      founderSub: 'Vision, leadership & research direction',
      directors: 'Board of Directors',
      directorsSub: 'Corporate governance & leadership board',
      howToEngage: 'How to Engage',
      howToEngageSub: 'Start a project, consultation or partnership',
      careers: 'Careers',
      contact: 'Contact Us',
      requestService: 'Request Service',
      youthPortal: 'Youth Portal',
    },
    footer: {
      contactHeading: 'Registered Office & Contact',
      sectorsHeading: 'Corporate Sectors',
      allSectors: 'All 6 Corporate Sectors',
      companyHeading: 'Company & Leadership',
      aboutCompany: 'About Company',
      founder: 'Founder — Mr. Jigyasu Vatsa',
      directors: 'Board of Directors',
      howToEngage: 'How to Engage',
      careers: 'Careers',
      contactUs: 'Contact Us',
      connectHeading: 'Connect & Resources',
      privacyPolicy: 'Privacy Policy',
      termsConditions: 'Terms & Conditions',
      cookiePolicy: 'Cookie Policy',
      founderPortfolio: 'Founder Portfolio (jigyasu.jigsy.in)',
      developedBy: 'Developed & Maintained by',
      rightsReserved: 'All rights reserved.',
    },
  },
  hi: {
    nav: {
      marquee:
        'बहु-क्षेत्रीय उद्यम · सॉफ्टवेयर एवं क्लाउड · व्यावसायिक परामर्श · अनुप्रयुक्त अनुसंधान · ISBN प्रकाशन · एडुटेक · युवा इंटर्नशिप: youth.jigsy.in',
      lightMode: 'लाइट',
      darkMode: 'डार्क',
      home: 'होम',
      sectorsServices: 'सेक्टर और सेवाएँ',
      allSectorsOverview: 'सभी 6 कॉर्पोरेट सेक्टर',
      about: 'हमारे बारे में',
      aboutCompany: 'कंपनी परिचय',
      aboutCompanySub: 'कॉर्पोरेट विवरण, DPIIT एवं वैधानिक जानकारी',
      founder: 'संस्थापक — श्री जिज्ञासु वत्स',
      founderSub: 'दृष्टिकोण, नेतृत्व और अनुसंधान दिशा',
      directors: 'निदेशक मंडल',
      directorsSub: 'कॉर्पोरेट प्रशासन एवं नेतृत्व बोर्ड',
      howToEngage: 'हमसे कैसे जुड़ें',
      howToEngageSub: 'प्रोजेक्ट, परामर्श या साझेदारी शुरू करें',
      careers: 'करियर',
      contact: 'संपर्क करें',
      requestService: 'सेवा अनुरोध',
      youthPortal: 'युवा पोर्टल',
    },
    footer: {
      contactHeading: 'पंजीकृत कार्यालय एवं संपर्क',
      sectorsHeading: 'कॉर्पोरेट सेक्टर',
      allSectors: 'सभी 6 कॉर्पोरेट सेक्टर',
      companyHeading: 'कंपनी एवं नेतृत्व',
      aboutCompany: 'कंपनी परिचय',
      founder: 'संस्थापक — श्री जिज्ञासु वत्स',
      directors: 'निदेशक मंडल',
      howToEngage: 'हमसे कैसे जुड़ें',
      careers: 'करियर',
      contactUs: 'संपर्क करें',
      connectHeading: 'जुड़ें एवं संसाधन',
      privacyPolicy: 'गोपनीयता नीति',
      termsConditions: 'नियम एवं शर्तें',
      cookiePolicy: 'कुकी नीति',
      founderPortfolio: 'संस्थापक पोर्टफोलियो (jigyasu.jigsy.in)',
      developedBy: 'द्वारा विकसित एवं संचालित',
      rightsReserved: 'सर्वाधिकार सुरक्षित।',
    },
  },
  mai: {
    nav: {
      marquee:
        'बहु-क्षेत्रीय उद्यम · सॉफ्टवेयर आ क्लाउड · व्यावसायिक परामर्श · अनुसंधान आ विकास · ISBN प्रकाशन · युवा इंटर्नशिप: youth.jigsy.in',
      lightMode: 'लाइट',
      darkMode: 'डार्क',
      home: 'गृह',
      sectorsServices: 'क्षेत्र आ सेवा',
      allSectorsOverview: 'सभ 6 कॉर्पोरेट क्षेत्र',
      about: 'हमरा बारे मे',
      aboutCompany: 'कंपनी परिचय',
      aboutCompanySub: 'कॉर्पोरेट परिचय, DPIIT आ पंजीकरण विवरण',
      founder: 'संस्थापक — श्री जिज्ञासु वत्स',
      founderSub: 'दृष्टिकोण, नेतृत्व आ अनुसंधान दिशा',
      directors: 'निदेशक मंडल',
      directorsSub: 'कॉर्पोरेट संचालन आ नेतृत्व बोर्ड',
      howToEngage: 'कोना जुड़ब',
      howToEngageSub: 'प्रोजेक्ट, परामर्श वा साझेदारी प्रारंभ करू',
      careers: 'करियर',
      contact: 'संपर्क करू',
      requestService: 'सेवा अनुरोध',
      youthPortal: 'युवा पोर्टल',
    },
    footer: {
      contactHeading: 'पंजीकृत कार्यालय आ संपर्क',
      sectorsHeading: 'कॉर्पोरेट क्षेत्र',
      allSectors: 'सभ 6 कॉर्पोरेट क्षेत्र',
      companyHeading: 'कंपनी आ नेतृत्व',
      aboutCompany: 'कंपनी परिचय',
      founder: 'संस्थापक — श्री जिज्ञासु वत्स',
      directors: 'निदेशक मंडल',
      howToEngage: 'कोना जुड़ब',
      careers: 'करियर',
      contactUs: 'संपर्क करू',
      connectHeading: 'जुड़ू आ संसाधन',
      privacyPolicy: 'गोपनीयता नीति',
      termsConditions: 'नियम आ शर्त',
      cookiePolicy: 'कुकी नीति',
      founderPortfolio: 'संस्थापक पोर्टफोलियो (jigyasu.jigsy.in)',
      developedBy: 'द्वारा विकसित आ संचालित',
      rightsReserved: 'सभ अधिकार सुरक्षित।',
    },
  },
};

export function resolveParentPortalUrl(view: string, sectorSlug?: string): string {
  const base = PARENT_COMPANY_DETAILS.portalUrl;
  switch (view) {
    case 'home':
      return `${base}/`;
    case 'sectors':
      return `${base}/sectors`;
    case 'sector-detail':
      if (sectorSlug === 'youth') {
        return PARENT_COMPANY_DETAILS.youthPortalUrl;
      }
      return sectorSlug ? `${base}/sectors/${sectorSlug}` : `${base}/sectors`;
    case 'about':
    case 'about-company':
      return `${base}/about/company`;
    case 'about-founder':
      return `${base}/about/founder`;
    case 'about-directors':
      return `${base}/about/directors`;
    case 'how-to-engage':
      return `${base}/about/how-to-engage`;
    case 'careers':
      return `${base}/careers`;
    case 'contact':
      return `${base}/contact`;
    default:
      return `${base}/`;
  }
}
