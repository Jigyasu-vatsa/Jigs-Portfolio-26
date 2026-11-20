import React from 'react';
import {
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  Linkedin,
  Facebook,
  ExternalLink,
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { UI_COPY } from '../utils/uiCopy';

interface FooterProps {
  language: Language;
  onNavigate: (view: string, sectorSlug?: string) => void;
  onOpenLegal: (tab: 'privacy' | 'terms') => void;
  onOpenCookieNotice: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigate,
  onOpenLegal,
  onOpenCookieNotice,
}) => {
  const copy = UI_COPY[language].footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-testid="site-footer"
      className="bg-slate-900 dark:bg-[#0d1118] text-slate-300 pt-12 pb-7 border-t border-slate-800 text-xs no-print"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* 4-Column Evenly Aligned Upper Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-8 border-b border-slate-800 items-start">
          {/* Column 1: JIGSY INDIA Brand & Registered Office */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-extrabold text-white tracking-wider uppercase brand-font">
              {COMPANY_DETAILS.shortName}
            </h4>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {copy.contactHeading}
            </p>
            <div className="space-y-2.5 text-slate-300 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=South+Dighi,+Darbhanga,+Bihar,+India"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_DETAILS.registeredOffice}
                </a>
              </div>
              <div className="flex items-center gap-2.5 font-mono">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${COMPANY_DETAILS.officialEmail}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_DETAILS.officialEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5 font-mono">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`tel:${COMPANY_DETAILS.officialPhone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_DETAILS.officialPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Corporate Sectors (Sector Names Strictly Untranslated) */}
          <div className="space-y-3.5">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              {copy.sectorsHeading}
            </h5>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('sectors')}
                  className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{copy.allSectors}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('sector-detail', 'tech')}
                  className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>JIGSY Tech</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('sector-detail', 'consult')}
                  className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>JIGSY Consult</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('sector-detail', 'rd')}
                  className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>JIGSY R&amp;D</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('sector-detail', 'digitech')}
                  className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>JIGSY DigiTech</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('sector-detail', 'edutech')}
                  className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>JIGSY EduTech</span>
                </button>
              </li>
              <li>
                <a
                  href={COMPANY_DETAILS.youthPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 text-amber-400 flex items-center gap-1.5 transition-colors font-semibold"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>JIGSY Youth (youth.jigsy.in)</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Leadership */}
          <div className="space-y-3.5">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              {copy.companyHeading}
            </h5>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about-company')}
                  className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{copy.aboutCompany}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about-founder')}
                  className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{copy.founder}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about-directors')}
                  className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{copy.directors}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('how-to-engage')}
                  className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{copy.howToEngage}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('careers')}
                  className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{copy.careers}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{copy.contactUs}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect, Legal & Resources (No Total Visitors) */}
          <div className="space-y-3.5">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              {copy.connectHeading}
            </h5>

            <div className="flex items-center gap-2.5">
              <a
                href={COMPANY_DETAILS.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white border border-slate-700 transition-colors"
                title="JIGSY INDIA on LinkedIn"
                aria-label="JIGSY INDIA on LinkedIn"
              >
                <Linkedin className="w-4 h-4 fill-current" />
              </a>
              <a
                href={COMPANY_DETAILS.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-blue-700 text-slate-200 hover:text-white border border-slate-700 transition-colors"
                title="JIGSY INDIA on Facebook"
                aria-label="JIGSY INDIA on Facebook"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
            </div>

            <ul className="space-y-2 text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{copy.privacyPolicy}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{copy.termsConditions}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCookieNotice}
                  className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{copy.cookiePolicy}</span>
                </button>
              </li>
              <li>
                <a
                  href={COMPANY_DETAILS.founderPortfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1.5 font-semibold transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  <span>{copy.founderPortfolio}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Statutory Regulatory Disclosures */}
        <div className="space-y-2 text-center text-slate-400 text-xs">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-1.5">
            <span>{COMPANY_DETAILS.taglineSanskrit}</span>
            <span>DPIIT: {COMPANY_DETAILS.dpiit}</span>
            <span>GSTIN: {COMPANY_DETAILS.gstin}</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-1.5">
            <span>MSME: {COMPANY_DETAILS.msme}</span>
            <span>CIN: {COMPANY_DETAILS.cin}</span>
            <span>{COMPANY_DETAILS.mottoEnglish}</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-4 border-t border-slate-800 text-center space-y-1 text-xs text-slate-400">
          <div>
            {copy.developedBy}{' '}
            <a
              href={COMPANY_DETAILS.founderPortfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 hover:text-amber-400 underline font-medium"
            >
              Mr. Jigyasu Vatsa
            </a>
          </div>
          <div>
            © 2025{currentYear > 2025 ? ` - ${currentYear}` : ''} {COMPANY_DETAILS.name}. {copy.rightsReserved}
          </div>
        </div>
      </div>
    </footer>
  );
};
