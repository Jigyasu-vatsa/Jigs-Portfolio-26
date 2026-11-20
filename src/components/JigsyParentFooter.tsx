import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  Linkedin,
  Facebook,
  ExternalLink,
  X,
  ShieldCheck,
} from 'lucide-react';
import {
  PARENT_COMPANY_DETAILS,
  PARENT_UI_COPY,
  ParentLanguage,
  resolveParentPortalUrl,
} from '../data/parentCompanyData';
import { formatCopyrightYearRange } from '../utils/errorHandling';

interface JigsyParentFooterProps {
  language: ParentLanguage;
  onReturnPortfolioHome: () => void;
}

type LegalModalTab = 'privacy' | 'terms' | 'cookie' | null;

export const JigsyParentFooter: React.FC<JigsyParentFooterProps> = ({
  language,
  onReturnPortfolioHome,
}) => {
  const copy = PARENT_UI_COPY[language].footer;
  const copyrightRange = formatCopyrightYearRange(2025);
  const [legalTab, setLegalTab] = useState<LegalModalTab>(null);

  return (
    <>
      <footer
        data-testid="site-footer"
        className="preserve-dark bg-slate-900 dark:bg-[#0d1118] text-slate-300 pt-12 pb-7 border-t border-slate-800 text-xs no-print"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* 4-Column Evenly Aligned Upper Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-8 border-b border-slate-800 items-start">
            {/* Column 1: JIGSY INDIA Brand & Registered Office */}
            <div className="space-y-3.5">
              <h4 className="text-sm font-extrabold text-white tracking-wider uppercase">
                {PARENT_COMPANY_DETAILS.shortName}
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
                    data-bypass-error-guard="true"
                    className="hover:text-white transition-colors"
                  >
                    {PARENT_COMPANY_DETAILS.registeredOffice}
                  </a>
                </div>
                <div className="flex items-center gap-2.5 font-mono">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <a
                    href={`mailto:${PARENT_COMPANY_DETAILS.officialEmail}`}
                    className="hover:text-white transition-colors"
                  >
                    {PARENT_COMPANY_DETAILS.officialEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2.5 font-mono">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <a
                    href={`tel:${PARENT_COMPANY_DETAILS.officialPhone.replace(/\s+/g, '')}`}
                    className="hover:text-white transition-colors"
                  >
                    {PARENT_COMPANY_DETAILS.officialPhone}
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
                  <a
                    href={resolveParentPortalUrl('sectors')}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-bypass-error-guard="true"
                    className="hover:text-white flex items-center gap-1.5 transition-colors text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{copy.allSectors}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={resolveParentPortalUrl('sector-detail', 'tech')}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-bypass-error-guard="true"
                    className="hover:text-white flex items-center gap-1.5 transition-colors text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>JIGSY Tech</span>
                  </a>
                </li>
                <li>
                  <a
                    href={resolveParentPortalUrl('sector-detail', 'consult')}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-bypass-error-guard="true"
                    className="hover:text-white flex items-center gap-1.5 transition-colors text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>JIGSY Consult</span>
                  </a>
                </li>
                <li>
                  <a
                    href={resolveParentPortalUrl('sector-detail', 'rd')}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-bypass-error-guard="true"
                    className="hover:text-white flex items-center gap-1.5 transition-colors text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>JIGSY R&amp;D</span>
                  </a>
                </li>
                <li>
                  <a
                    href={resolveParentPortalUrl('sector-detail', 'digitech')}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-bypass-error-guard="true"
                    className="hover:text-white flex items-center gap-1.5 transition-colors text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>JIGSY DigiTech</span>
                  </a>
                </li>
                <li>
                  <a
                    href={resolveParentPortalUrl('sector-detail', 'edutech')}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-bypass-error-guard="true"
                    className="hover:text-white flex items-center gap-1.5 transition-colors text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>JIGSY EduTech</span>
                  </a>
                </li>
                <li>
                  <a
                    href={PARENT_COMPANY_DETAILS.youthPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-bypass-error-guard="true"
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
                  <a
                    href={resolveParentPortalUrl('about-company')}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-bypass-error-guard="true"
                    className="hover:text-white flex items-center gap-1.5 transition-colors text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{copy.aboutCompany}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={resolveParentPortalUrl('about-founder')}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-bypass-error-guard="true"
                    className="hover:text-white flex items-center gap-1.5 transition-colors text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{copy.founder}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={resolveParentPortalUrl('about-directors')}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-bypass-error-guard="true"
                    className="hover:text-white flex items-center gap-1.5 transition-colors text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{copy.directors}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={resolveParentPortalUrl('how-to-engage')}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-bypass-error-guard="true"
                    className="hover:text-white flex items-center gap-1.5 transition-colors text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{copy.howToEngage}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={resolveParentPortalUrl('careers')}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-bypass-error-guard="true"
                    className="hover:text-white flex items-center gap-1.5 transition-colors text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{copy.careers}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={resolveParentPortalUrl('contact')}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-bypass-error-guard="true"
                    className="hover:text-white flex items-center gap-1.5 transition-colors text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{copy.contactUs}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Connect, Legal & Resources */}
            <div className="space-y-3.5">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                {copy.connectHeading}
              </h5>

              <div className="flex items-center gap-2.5">
                <a
                  href={PARENT_COMPANY_DETAILS.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-bypass-error-guard="true"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white border border-slate-700 transition-colors"
                  title="JIGSY INDIA on LinkedIn"
                  aria-label="JIGSY INDIA on LinkedIn"
                >
                  <Linkedin className="w-4 h-4 fill-current" />
                </a>
                <a
                  href={PARENT_COMPANY_DETAILS.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-bypass-error-guard="true"
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
                    onClick={() => setLegalTab('privacy')}
                    className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{copy.privacyPolicy}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setLegalTab('terms')}
                    className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{copy.termsConditions}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setLegalTab('cookie')}
                    className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{copy.cookiePolicy}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onReturnPortfolioHome}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1.5 font-semibold transition-colors cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                    <span>{copy.founderPortfolio}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Statutory Regulatory Disclosures */}
          <div className="space-y-2 text-center text-slate-400 text-xs">
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-1.5">
              <span>{PARENT_COMPANY_DETAILS.taglineSanskrit}</span>
              <span>DPIIT: {PARENT_COMPANY_DETAILS.dpiit}</span>
              <span>GSTIN: {PARENT_COMPANY_DETAILS.gstin}</span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-1.5">
              <span>MSME: {PARENT_COMPANY_DETAILS.msme}</span>
              <span>CIN: {PARENT_COMPANY_DETAILS.cin}</span>
              <span>{PARENT_COMPANY_DETAILS.mottoEnglish}</span>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-4 border-t border-slate-800 text-center space-y-1 text-xs text-slate-400">
            <div>
              {copy.developedBy}{' '}
              <button
                type="button"
                onClick={onReturnPortfolioHome}
                className="text-slate-200 hover:text-amber-400 underline font-medium cursor-pointer bg-transparent border-0 p-0"
              >
                Mr. Jigyasu Vatsa
              </button>
            </div>
            <div>
              © {copyrightRange} {PARENT_COMPANY_DETAILS.name}. {copy.rightsReserved}
            </div>
          </div>
        </div>
      </footer>

      {/* Corporate Legal / Cookie Notice Modal */}
      {legalTab && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="JIGSY INDIA Corporate Policy"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
        >
          <div className="preserve-dark relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl text-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>
                  {legalTab === 'privacy'
                    ? copy.privacyPolicy
                    : legalTab === 'terms'
                    ? copy.termsConditions
                    : copy.cookiePolicy}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLegalTab(null)}
                aria-label="Close policy dialog"
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed space-y-2.5">
              {legalTab === 'privacy' && (
                <>
                  <p>
                    <strong className="text-white">{PARENT_COMPANY_DETAILS.name}</strong> respects
                    visitor privacy across <span className="font-mono text-blue-300">jigsy.in</span>{' '}
                    and its portfolio subdomains (<span className="font-mono text-blue-300">jigyasu.jigsy.in</span>).
                  </p>
                  <p>
                    Information voluntarily shared through official contact or inquiry channels is
                    used solely for communication, academic collaboration, or enterprise engagement
                    and is never sold to third parties.
                  </p>
                </>
              )}
              {legalTab === 'terms' && (
                <>
                  <p>
                    All digital portals, publications, research references, and brand assets under{' '}
                    <strong className="text-white">{PARENT_COMPANY_DETAILS.shortName}</strong> are
                    governed by applicable corporate and intellectual property laws of India.
                  </p>
                  <p>
                    Statutory registrations: CIN {PARENT_COMPANY_DETAILS.cin} · DPIIT{' '}
                    {PARENT_COMPANY_DETAILS.dpiit} · GSTIN {PARENT_COMPANY_DETAILS.gstin}.
                  </p>
                </>
              )}
              {legalTab === 'cookie' && (
                <>
                  <p>
                    This portal stores lightweight local browser preferences (such as dark/light
                    theme selection and language preference) strictly to improve reading comfort.
                  </p>
                  <p>No third-party advertising trackers are deployed on this error-handling gateway.</p>
                </>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <a
                href={PARENT_COMPANY_DETAILS.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-bypass-error-guard="true"
                className="px-3.5 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-medium text-slate-200 flex items-center gap-1.5"
              >
                <span>Visit jigsy.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                type="button"
                onClick={() => setLegalTab(null)}
                className="preserve-card-text px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
              >
                <span className="text-white">Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
