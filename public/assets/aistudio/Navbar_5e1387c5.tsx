import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Globe,
  ChevronDown,
  Menu,
  X,
  Briefcase,
  Phone,
  Info,
  LayoutGrid,
  CheckCircle,
  ExternalLink,
  GraduationCap,
  Send,
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS, SECTORS } from '../data/companyData';
import { UI_COPY } from '../utils/uiCopy';
import { CrispImage } from './CrispImage';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, sectorSlug?: string) => void;
  onOpenContactModal: (opts?: { sectorSlug?: string; serviceName?: string; engagementType?: string }) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenContactModal,
  language,
  onLanguageChange,
  isDark,
  onToggleTheme,
}) => {
  const nav = UI_COPY[language].nav;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSectorsOpen, setIsSectorsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const [taglineIndex, setTaglineIndex] = useState(0);
  const taglineOptions = [
    COMPANY_DETAILS.taglineSanskrit,
    COMPANY_DETAILS.mottoEnglish,
    language === 'mai' ? 'जिज्ञासु एकीकृत वैश्विक सेवा अहाँक संग' : 'जिज्ञासु ईक्षण ग्रंथि समृद्धि युक्ति',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglineOptions.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [taglineOptions.length]);

  const isAboutActive =
    currentView === 'about' ||
    currentView === 'about-company' ||
    currentView === 'about-founder' ||
    currentView === 'about-directors' ||
    currentView === 'how-to-engage';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm no-print">
      {/* 1. Corporate Announcement Marquee */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs py-1.5 px-4 overflow-hidden border-b border-blue-800/40">
        <div className="flex items-center">
          <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase px-2 py-0.5 rounded mr-3 shrink-0 tracking-wider">
            {COMPANY_DETAILS.shortName}
          </span>
          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="animate-marquee inline-block font-medium text-slate-100">
              {nav.marquee} &nbsp; • &nbsp; CIN: {COMPANY_DETAILS.cin} &nbsp; • &nbsp; DPIIT: {COMPANY_DETAILS.dpiit} &nbsp; • &nbsp; {COMPANY_DETAILS.officialEmail}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Corporate Header Brand Banner (Company Name strictly untranslated) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-3">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            aria-label="JIGSY INDIA Home"
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0 bg-transparent border-0 p-0"
          >
            <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-amber-400 p-0.5 bg-white shadow-md group-hover:scale-105 transition-transform">
              <CrispImage
                src={COMPANY_DETAILS.logoUrl}
                sizes="(max-width: 768px) 48px, 64px"
                targetWidth={144}
                loading="eager"
                alt="JIGSY Official Seal"
                className="w-full h-full object-contain"
              />
            </div>
          </button>

          <div className="text-center flex-1 px-2">
            <div
              className="text-xs sm:text-sm md:text-base lg:text-lg font-extrabold text-red-700 dark:text-amber-400 tracking-wide uppercase leading-snug"
              style={{ fontFamily: 'Outfit, serif' }}
            >
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="cursor-pointer hover:opacity-90 transition-opacity bg-transparent border-0 p-0 uppercase tracking-wide"
              >
                {COMPANY_DETAILS.name}
              </button>
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 min-h-[18px] transition-all duration-500 mt-0.5">
              <span className="italic font-serif">{taglineOptions[taglineIndex]}</span>
            </div>
          </div>

          <div className="shrink-0 flex items-center">
            <CrispImage
              src={COMPANY_DETAILS.makeInIndiaUrl}
              sizes="48px"
              targetWidth={96}
              loading="eager"
              alt="Make in India"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* 3. Primary Corporate Navigation Bar */}
      <nav className="bg-slate-900 text-white border-t border-slate-800" aria-label="Primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 gap-2">
            {/* Left of Nav: Brand Title + Language Selector + Theme Toggle */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="font-black text-white text-base md:text-lg tracking-wider brand-font cursor-pointer hover:text-amber-400 transition-colors select-none whitespace-nowrap shrink-0 bg-transparent border-0 p-0"
              >
                {COMPANY_DETAILS.shortName}
              </button>

              {/* Language Switcher — Gapless hover bridge prevents flicker */}
              <div
                className="relative"
                onMouseEnter={() => setIsLangOpen(true)}
                onMouseLeave={() => setIsLangOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsLangOpen((prev) => !prev)}
                  data-testid="language-switcher"
                  aria-expanded={isLangOpen}
                  aria-haspopup="menu"
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-800 hover:bg-slate-700 text-slate-100 transition-colors border border-slate-700 cursor-pointer"
                  title="Select Language / भाषा चुनें"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span className="uppercase text-[11px]">{language}</span>
                  <ChevronDown
                    className={`w-3 h-3 text-slate-400 transition-transform duration-150 ${
                      isLangOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  data-testid="language-dropdown"
                  className={`absolute left-0 top-full pt-1.5 z-50 transition-opacity duration-150 ${
                    isLangOpen
                      ? 'opacity-100 pointer-events-auto visible'
                      : 'opacity-0 pointer-events-none invisible'
                  }`}
                >
                  <div
                    role="menu"
                    className="w-36 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1"
                  >
                    {(['en', 'hi', 'mai'] as Language[]).map((langCode) => (
                      <button
                        key={langCode}
                        type="button"
                        role="menuitem"
                        data-testid={`lang-option-${langCode}`}
                        onClick={() => {
                          onLanguageChange(langCode);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-800 flex items-center justify-between cursor-pointer transition-colors ${
                          language === langCode ? 'font-bold text-amber-400' : 'text-slate-200'
                        }`}
                      >
                        <span>{langCode === 'en' ? 'English' : langCode === 'hi' ? 'हिंदी' : 'मैथिली'}</span>
                        {language === langCode && <CheckCircle className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dark / Light Mode Switch */}
              <button
                type="button"
                onClick={onToggleTheme}
                data-testid="theme-toggle"
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-slate-800 border border-slate-700 text-amber-300 hover:bg-slate-700 transition-colors cursor-pointer"
                title={isDark ? nav.lightMode : nav.darkMode}
                aria-label={isDark ? nav.lightMode : nav.darkMode}
              >
                {isDark ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-slate-200" />
                )}
                <span className="text-[11px] font-medium hidden sm:inline">
                  {isDark ? nav.lightMode : nav.darkMode}
                </span>
              </button>
            </div>

            {/* Right of Nav: Clean Corporate Links (NO Employee Verification) */}
            <div className="hidden lg:flex items-center space-x-1 font-semibold text-xs text-slate-200">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentView === 'home'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'hover:bg-slate-800 text-slate-200 hover:text-white'
                }`}
              >
                {nav.home}
              </button>

              {/* Sectors & Services Dropdown (Sector Names strictly untranslated) */}
              <div
                className="relative"
                onMouseEnter={() => setIsSectorsOpen(true)}
                onMouseLeave={() => setIsSectorsOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => onNavigate('sectors')}
                  className={`px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer ${
                    currentView === 'sectors' || currentView === 'sector-detail'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'hover:bg-slate-800 text-slate-200 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>{nav.sectorsServices}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                {isSectorsOpen && (
                  <div className="absolute left-0 top-full pt-1.5 z-50">
                    <div className="w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-2 animate-fadeIn text-slate-200">
                      <button
                        type="button"
                        onClick={() => {
                          onNavigate('sectors');
                          setIsSectorsOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs font-bold text-amber-400 hover:bg-slate-800 border-b border-slate-800 cursor-pointer"
                      >
                        {nav.allSectorsOverview} →
                      </button>
                      {SECTORS.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            onNavigate('sector-detail', s.slug);
                            setIsSectorsOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 text-xs hover:bg-slate-800 flex items-center justify-between text-slate-200 cursor-pointer"
                        >
                          <span className="font-medium">{s.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{s.slug}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* About Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => onNavigate('about-company')}
                  className={`px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer ${
                    isAboutActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'hover:bg-slate-800 text-slate-200 hover:text-white'
                  }`}
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>{nav.about}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                {isAboutOpen && (
                  <div className="absolute left-0 top-full pt-1.5 z-50">
                    <div className="w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-2 animate-fadeIn text-slate-200">
                      <button
                        type="button"
                        onClick={() => {
                          onNavigate('about-company');
                          setIsAboutOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-800 flex flex-col cursor-pointer"
                      >
                        <span className="font-bold text-white">{nav.aboutCompany}</span>
                        <span className="text-[10px] text-slate-400">{nav.aboutCompanySub}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onNavigate('about-founder');
                          setIsAboutOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-800 flex flex-col cursor-pointer"
                      >
                        <span className="font-bold text-amber-400">{nav.founder}</span>
                        <span className="text-[10px] text-slate-400">{nav.founderSub}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onNavigate('about-directors');
                          setIsAboutOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-800 flex flex-col cursor-pointer"
                      >
                        <span className="font-bold text-white">{nav.directors}</span>
                        <span className="text-[10px] text-slate-400">{nav.directorsSub}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onNavigate('how-to-engage');
                          setIsAboutOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-800 flex flex-col border-t border-slate-800 cursor-pointer"
                      >
                        <span className="font-bold text-emerald-400">{nav.howToEngage}</span>
                        <span className="text-[10px] text-slate-400">{nav.howToEngageSub}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Careers */}
              <button
                type="button"
                onClick={() => onNavigate('careers')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer ${
                  currentView === 'careers'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'hover:bg-slate-800 text-slate-200 hover:text-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>{nav.careers}</span>
              </button>

              {/* Contact Us — Direct navigation to /contact page (Contact Form at TOP!) */}
              <button
                type="button"
                data-testid="nav-contact-btn"
                onClick={() => onNavigate('contact')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer ${
                  currentView === 'contact'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'hover:bg-slate-800 text-slate-200 hover:text-white'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{nav.contact}</span>
              </button>

              {/* Quick Request Service Modal Trigger */}
              <button
                type="button"
                onClick={() => onOpenContactModal({ engagementType: 'Project Proposal & Development' })}
                className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1 font-bold shadow-sm cursor-pointer"
              >
                <Send className="w-3 h-3" />
                <span>{nav.requestService}</span>
              </button>

              {/* External Link to Dedicated Youth Portal (youth.jigsy.in) */}
              <a
                href={COMPANY_DETAILS.youthPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 px-2.5 py-1.5 rounded-md border border-amber-400/60 text-amber-300 hover:bg-amber-400 hover:text-slate-950 transition-colors flex items-center gap-1 font-bold"
                title="JIGSY Youth (youth.jigsy.in)"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{nav.youthPortal}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="lg:hidden flex items-center">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 rounded-lg border border-slate-700 text-slate-200 cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2 animate-fadeIn text-sm text-slate-200">
          <button
            type="button"
            onClick={() => {
              onNavigate('home');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg cursor-pointer ${
              currentView === 'home' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-800'
            }`}
          >
            {nav.home}
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('sectors');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg cursor-pointer ${
              currentView === 'sectors' || currentView === 'sector-detail'
                ? 'bg-blue-600 text-white font-bold'
                : 'hover:bg-slate-800'
            }`}
          >
            {nav.sectorsServices}
          </button>
          <div className="pl-2 space-y-1 border-l-2 border-slate-700 ml-2">
            <button
              type="button"
              onClick={() => {
                onNavigate('about-company');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              {nav.aboutCompany}
            </button>
            <button
              type="button"
              onClick={() => {
                onNavigate('about-founder');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-slate-800 text-amber-300 font-semibold cursor-pointer"
            >
              {nav.founder}
            </button>
            <button
              type="button"
              onClick={() => {
                onNavigate('about-directors');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              {nav.directors}
            </button>
            <button
              type="button"
              onClick={() => {
                onNavigate('how-to-engage');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-slate-800 text-emerald-300 font-semibold cursor-pointer"
            >
              {nav.howToEngage}
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              onNavigate('careers');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg cursor-pointer ${
              currentView === 'careers' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-800'
            }`}
          >
            {nav.careers}
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('contact');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg cursor-pointer ${
              currentView === 'contact' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-800'
            }`}
          >
            {nav.contact}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenContactModal({ engagementType: 'Project Proposal & Development' });
            }}
            className="w-full text-left px-3 py-2 rounded-lg bg-blue-600 text-white font-bold flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{nav.requestService}</span>
          </button>
          <a
            href={COMPANY_DETAILS.youthPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-left px-3 py-2 rounded-lg border border-amber-400/50 text-amber-300 font-bold flex items-center justify-between"
          >
            <span>JIGSY Youth (youth.jigsy.in)</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
};
