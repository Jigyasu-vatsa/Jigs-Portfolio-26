import React, { useState, useEffect } from 'react';
import {
  PARENT_COMPANY_DETAILS,
  ParentLanguage,
  resolveParentPortalUrl,
} from '../data/parentCompanyData';

interface CorporateHeaderBannerProps {
  isDark: boolean;
  language?: ParentLanguage;
  onHomeClick?: () => void;
}

/**
 * Shared JIGSY INDIA Corporate Header Banner used across parent company error headers
 * matching the official JIGSY INDIA brand banner in both Light and Dark modes.
 */
export const CorporateHeaderBanner: React.FC<CorporateHeaderBannerProps> = ({
  isDark,
  language = 'en',
  onHomeClick,
}) => {
  const isLight = !isDark;
  const [subTextIndex, setSubTextIndex] = useState(0);

  const subTitles =
    language === 'mai'
      ? [
          PARENT_COMPANY_DETAILS.taglineSanskrit,
          PARENT_COMPANY_DETAILS.mottoEnglish,
          'जिज्ञासु एकीकृत वैश्विक सेवा अहाँक संग',
        ]
      : [PARENT_COMPANY_DETAILS.taglineSanskrit, PARENT_COMPANY_DETAILS.mottoEnglish];

  useEffect(() => {
    setSubTextIndex(0);
    const timer = setInterval(() => {
      setSubTextIndex((prev) => (prev + 1) % subTitles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [subTitles.length]);

  const logoElement = (
    <img
      src={PARENT_COMPANY_DETAILS.logoUrl}
      loading="eager"
      alt="JIGSY Official Seal"
      className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform"
    />
  );

  return (
    <div
      data-testid="corporate-header-banner"
      className={`w-full border-b transition-colors duration-300 ${
        isLight
          ? 'bg-gradient-to-r from-[#e2f5ee] via-[#edf8f4] to-[#f4e8f5] border-amber-500/35'
          : 'bg-gradient-to-r from-[#01392E] via-[#073F34] to-[#3C233D] border-amber-400/35'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-2 md:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: JIGSY Official Seal */}
        {onHomeClick ? (
          <button
            type="button"
            onClick={onHomeClick}
            aria-label="JIGSY INDIA Home"
            className="flex items-center cursor-pointer select-none group shrink-0 bg-transparent border-0 p-0"
          >
            {logoElement}
          </button>
        ) : (
          <a
            href={resolveParentPortalUrl('home')}
            target="_blank"
            rel="noopener noreferrer"
            data-bypass-error-guard="true"
            aria-label="JIGSY INDIA Home"
            className="flex items-center cursor-pointer select-none group shrink-0"
          >
            {logoElement}
          </a>
        )}

        {/* Center: Perfectly fitted, single-line corporate name & 3-second alternating subtitle */}
        <div className="flex-1 text-center min-w-0 px-1 sm:px-2">
          {onHomeClick ? (
            <button
              type="button"
              onClick={onHomeClick}
              className={`font-serif font-black tracking-wide uppercase sm:whitespace-nowrap leading-tight text-[10.5px] sm:text-base md:text-lg lg:text-xl xl:text-2xl transition-colors duration-300 cursor-pointer hover:opacity-95 bg-transparent border-0 p-0 ${
                isLight
                  ? 'text-rose-700 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]'
                  : 'text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
              }`}
            >
              {PARENT_COMPANY_DETAILS.name}
            </button>
          ) : (
            <a
              href={resolveParentPortalUrl('home')}
              target="_blank"
              rel="noopener noreferrer"
              data-bypass-error-guard="true"
              className={`inline-block font-serif font-black tracking-wide uppercase sm:whitespace-nowrap leading-tight text-[10.5px] sm:text-base md:text-lg lg:text-xl xl:text-2xl transition-colors duration-300 cursor-pointer hover:opacity-95 ${
                isLight
                  ? 'text-rose-700 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]'
                  : 'text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
              }`}
            >
              {PARENT_COMPANY_DETAILS.name}
            </a>
          )}

          {/* Alternating Tagline every 3s */}
          <div className="h-4 sm:h-5 flex items-center justify-center overflow-hidden mt-0.5">
            <p
              key={subTextIndex}
              className={`font-serif tracking-wider whitespace-nowrap text-[9px] sm:text-xs md:text-sm transition-all duration-700 ease-in-out animate-fadeIn ${
                isLight
                  ? 'text-slate-800 font-semibold drop-shadow-sm'
                  : 'text-slate-100 opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
              }`}
            >
              {subTitles[subTextIndex]}
            </p>
          </div>
        </div>

        {/* Right: Make in India Emblem */}
        <div className="shrink-0 flex items-center">
          <img
            src={PARENT_COMPANY_DETAILS.makeInIndiaUrl}
            loading="eager"
            alt="Make in India"
            className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] select-none"
          />
        </div>
      </div>
    </div>
  );
};
