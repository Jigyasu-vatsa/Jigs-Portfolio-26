import React, { useState, useEffect, useRef } from 'react';
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
import {
  PARENT_COMPANY_DETAILS,
  PARENT_SECTORS,
  PARENT_UI_COPY,
  ParentLanguage,
  resolveParentPortalUrl,
} from '../data/parentCompanyData';

interface JigsyParentNavbarProps {
  language: ParentLanguage;
  onLanguageChange: (lang: ParentLanguage) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenContact?: () => void;
}

export const JigsyParentNavbar: React.FC<JigsyParentNavbarProps> = ({
  language,
  onLanguageChange,
  isDark,
  onToggleTheme,
  onOpenContact,
}) => {
  const nav = PARENT_UI_COPY[language].nav;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSectorsOpen, setIsSectorsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langOpenedByHoverRef = useRef<boolean>(false);

  const [taglineIndex, setTaglineIndex] = useState(0);
  const taglineOptions = [
    PARENT_COMPANY_DETAILS.taglineSanskrit,
    PARENT_COMPANY_DETAILS.mottoEnglish,
    language === 'mai'
      ? 'जिज्ञासु एकीकृत वैश्विक सेवा अहाँक संग'
      : 'जिज्ञासु ईक्षण ग्रंथि समृद्धि युक्ति',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglineOptions.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [taglineOptions.length]);

  return (
    <header
      data-testid="parent-company-navbar"
      className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm no-print"
    >
      {/* 1. Corporate Announcement Marquee */}
      <div className="preserve-dark bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs py-1.5 px-4 overflow-hidden border-b border-blue-800/40">
        <div className="flex items-center">
          <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase px-2 py-0.5 rounded mr-3 shrink-0 tracking-wider">
            {PARENT_COMPANY_DETAILS.shortName}
          </span>
          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="animate-marquee inline-block font-medium text-slate-100">
              {nav.marquee} &nbsp; • &nbsp; CIN: {PARENT_COMPANY_DETAILS.cin} &nbsp; • &nbsp; DPIIT:{' '}
              {PARENT_COMPANY_DETAILS.dpiit} &nbsp; • &nbsp; {PARENT_COMPANY_DETAILS.officialEmail}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Corporate Header Brand Banner (Company Name strictly untranslated) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-3">
        <div className="flex items-center justify-between gap-4">
          <a
            href={resolveParentPortalUrl('home')}
            target="_blank"
            rel="noopener noreferrer"
            data-bypass-error-guard="true"
            aria-label="JIGSY INDIA Home"
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
          >
            <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-amber-400 p-0.5 bg-white shadow-md group-hover:scale-105 transition-transform">
              <img
                src={PARENT_COMPANY_DETAILS.logoUrl}
                loading="eager"
                alt="JIGSY Official Seal"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </a>

          <div className="text-center flex-1 px-2 min-w-0">
            <div className="text-xs sm:text-sm md:text-base lg:text-lg font-extrabold text-red-700 dark:text-amber-400 tracking-wide uppercase leading-snug">
              <a
                href={resolveParentPortalUrl('home')}
                target="_blank"
                rel="noopener noreferrer"
                data-bypass-error-guard="true"
                className="cursor-pointer hover:opacity-90 transition-opacity uppercase tracking-wide"
              >
                {PARENT_COMPANY_DETAILS.name}
              </a>
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 min-h-[18px] transition-all duration-500 mt-0.5">
              <span className="italic font-serif">{taglineOptions[taglineIndex]}</span>
            </div>
          </div>

          <div className="shrink-0 flex items-center">
            <img
              src={PARENT_COMPANY_DETAILS.makeInIndiaUrl}
              loading="eager"
              alt="Make in India"
              className="h-10 sm:h-12 w-auto object-contain select-none"
            />
          </div>
        </div>
      </div>

      {/* 3. Primary Corporate Navigation Bar */}
      <nav
        className="preserve-dark bg-slate-900 text-white border-t border-slate-800"
        aria-label="JIGSY INDIA Primary Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 gap-2">
            {/* Left of Nav: Brand Title + Language Selector + Theme Toggle */}
            <div className="flex items-center gap-2.5">
              <a
                href={resolveParentPortalUrl('home')}
                target="_blank"
                rel="noopener noreferrer"
                data-bypass-error-guard="true"
                className="font-black text-white text-base md:text-lg tracking-wider cursor-pointer hover:text-amber-400 transition-colors select-none whitespace-nowrap shrink-0"
              >
                {PARENT_COMPANY_DETAILS.shortName}
              </a>

              {/* Language Switcher — Gapless hover bridge prevents flicker */}
              <div
                className="relative"
                onMouseEnter={() => {
                  if (!isLangOpen) {
                    langOpenedByHoverRef.current = true;
                  }
                  setIsLangOpen(true);
                }}
                onMouseLeave={() => {
                  langOpenedByHoverRef.current = false;
                  setIsLangOpen(false);
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (langOpenedByHoverRef.current) {
                      langOpenedByHoverRef.current = false;
                      setIsLangOpen(true);
                      return;
                    }
                    setIsLangOpen((prev) => !prev);
                  }}
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
                    className="preserve-dark w-36 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1"
                  >
                    {(['en', 'hi', 'mai'] as ParentLanguage[]).map((langCode) => (
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
                        <span>
                          {langCode === 'en' ? 'English' : langCode === 'hi' ? 'हिंदी' : 'मैथिली'}
                        </span>
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

            {/* Right of Nav: Clean Corporate Links */}
            <div className="hidden lg:flex items-center space-x-1 font-semibold text-xs text-slate-200">
              <a
                href={resolveParentPortalUrl('home')}
                target="_blank"
                rel="noopener noreferrer"
                data-bypass-error-guard="true"
                className="px-3 py-1.5 rounded-md transition-colors hover:bg-slate-800 text-slate-200 hover:text-white"
              >
                {nav.home}
              </a>

              {/* Sectors & Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsSectorsOpen(true)}
                onMouseLeave={() => setIsSectorsOpen(false)}
              >
                <a
                  href={resolveParentPortalUrl('sectors')}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-bypass-error-guard="true"
                  className="px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors hover:bg-slate-800 text-slate-200 hover:text-white"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>{nav.sectorsServices}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </a>
                {isSectorsOpen && (
                  <div className="absolute left-0 top-full pt-1.5 z-50">
                    <div className="preserve-dark w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-2 text-slate-200">
                      <a
                        href={resolveParentPortalUrl('sectors')}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-bypass-error-guard="true"
                        onClick={() => setIsSectorsOpen(false)}
                        className="block w-full text-left px-3 py-1.5 text-xs font-bold text-amber-400 hover:bg-slate-800 border-b border-slate-800"
                      >
                        {nav.allSectorsOverview} →
                      </a>
                      {PARENT_SECTORS.map((s) => (
                        <a
                          key={s.id}
                          href={resolveParentPortalUrl('sector-detail', s.slug)}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-bypass-error-guard="true"
                          onClick={() => setIsSectorsOpen(false)}
                          className="w-full text-left px-3 py-1.5 text-xs hover:bg-slate-800 flex items-center justify-between text-slate-200"
                        >
                          <span className="font-medium">{s.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{s.slug}</span>
                        </a>
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
                <a
                  href={resolveParentPortalUrl('about-company')}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-bypass-error-guard="true"
                  className="px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors hover:bg-slate-800 text-slate-200 hover:text-white"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>{nav.about}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </a>
                {isAboutOpen && (
                  <div className="absolute left-0 top-full pt-1.5 z-50">
                    <div className="preserve-dark w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-2 text-slate-200">
                      <a
                        href={resolveParentPortalUrl('about-company')}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-bypass-error-guard="true"
                        onClick={() => setIsAboutOpen(false)}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-800 flex flex-col"
                      >
                        <span className="font-bold text-white">{nav.aboutCompany}</span>
                        <span className="text-[10px] text-slate-400">{nav.aboutCompanySub}</span>
                      </a>
                      <a
                        href={resolveParentPortalUrl('about-founder')}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-bypass-error-guard="true"
                        onClick={() => setIsAboutOpen(false)}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-800 flex flex-col"
                      >
                        <span className="font-bold text-amber-400">{nav.founder}</span>
                        <span className="text-[10px] text-slate-400">{nav.founderSub}</span>
                      </a>
                      <a
                        href={resolveParentPortalUrl('about-directors')}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-bypass-error-guard="true"
                        onClick={() => setIsAboutOpen(false)}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-800 flex flex-col"
                      >
                        <span className="font-bold text-white">{nav.directors}</span>
                        <span className="text-[10px] text-slate-400">{nav.directorsSub}</span>
                      </a>
                      <a
                        href={resolveParentPortalUrl('how-to-engage')}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-bypass-error-guard="true"
                        onClick={() => setIsAboutOpen(false)}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-800 flex flex-col border-t border-slate-800"
                      >
                        <span className="font-bold text-emerald-400">{nav.howToEngage}</span>
                        <span className="text-[10px] text-slate-400">{nav.howToEngageSub}</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Careers */}
              <a
                href={resolveParentPortalUrl('careers')}
                target="_blank"
                rel="noopener noreferrer"
                data-bypass-error-guard="true"
                className="px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors hover:bg-slate-800 text-slate-200 hover:text-white"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>{nav.careers}</span>
              </a>

              {/* Contact Us */}
              <a
                href={resolveParentPortalUrl('contact')}
                target="_blank"
                rel="noopener noreferrer"
                data-bypass-error-guard="true"
                data-testid="nav-contact-btn"
                className="px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors hover:bg-slate-800 text-slate-200 hover:text-white"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{nav.contact}</span>
              </a>

              {/* Request Service */}
              {onOpenContact ? (
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="preserve-card-text px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1 font-bold shadow-sm cursor-pointer"
                >
                  <Send className="w-3 h-3 text-white" />
                  <span className="text-white">{nav.requestService}</span>
                </button>
              ) : (
                <a
                  href={resolveParentPortalUrl('contact')}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-bypass-error-guard="true"
                  className="preserve-card-text px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1 font-bold shadow-sm"
                >
                  <Send className="w-3 h-3 text-white" />
                  <span className="text-white">{nav.requestService}</span>
                </a>
              )}

              {/* Youth Portal */}
              <a
                href={PARENT_COMPANY_DETAILS.youthPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-bypass-error-guard="true"
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
        <div className="preserve-dark lg:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2 text-sm text-slate-200">
          <a
            href={resolveParentPortalUrl('home')}
            target="_blank"
            rel="noopener noreferrer"
            data-bypass-error-guard="true"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            {nav.home}
          </a>
          <a
            href={resolveParentPortalUrl('sectors')}
            target="_blank"
            rel="noopener noreferrer"
            data-bypass-error-guard="true"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            {nav.sectorsServices}
          </a>
          <div className="pl-2 space-y-1 border-l-2 border-slate-700 ml-2">
            <a
              href={resolveParentPortalUrl('about-company')}
              target="_blank"
              rel="noopener noreferrer"
              data-bypass-error-guard="true"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-slate-800"
            >
              {nav.aboutCompany}
            </a>
            <a
              href={resolveParentPortalUrl('about-founder')}
              target="_blank"
              rel="noopener noreferrer"
              data-bypass-error-guard="true"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-slate-800 text-amber-300 font-semibold"
            >
              {nav.founder}
            </a>
            <a
              href={resolveParentPortalUrl('about-directors')}
              target="_blank"
              rel="noopener noreferrer"
              data-bypass-error-guard="true"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-slate-800"
            >
              {nav.directors}
            </a>
            <a
              href={resolveParentPortalUrl('how-to-engage')}
              target="_blank"
              rel="noopener noreferrer"
              data-bypass-error-guard="true"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-slate-800 text-emerald-300 font-semibold"
            >
              {nav.howToEngage}
            </a>
          </div>
          <a
            href={resolveParentPortalUrl('careers')}
            target="_blank"
            rel="noopener noreferrer"
            data-bypass-error-guard="true"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            {nav.careers}
          </a>
          <a
            href={resolveParentPortalUrl('contact')}
            target="_blank"
            rel="noopener noreferrer"
            data-bypass-error-guard="true"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            {nav.contact}
          </a>
          {onOpenContact ? (
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenContact();
              }}
              className="preserve-card-text w-full text-left px-3 py-2 rounded-lg bg-blue-600 text-white font-bold flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 text-white" />
              <span className="text-white">{nav.requestService}</span>
            </button>
          ) : (
            <a
              href={resolveParentPortalUrl('contact')}
              target="_blank"
              rel="noopener noreferrer"
              data-bypass-error-guard="true"
              onClick={() => setIsMobileMenuOpen(false)}
              className="preserve-card-text w-full text-left px-3 py-2 rounded-lg bg-blue-600 text-white font-bold flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-white" />
              <span className="text-white">{nav.requestService}</span>
            </a>
          )}
          <a
            href={PARENT_COMPANY_DETAILS.youthPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-bypass-error-guard="true"
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
