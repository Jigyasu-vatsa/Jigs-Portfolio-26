/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroDashboard } from './components/HeroDashboard';
import { ResearchLaboratory } from './components/ResearchLaboratory';
import { ConferencesSection } from './components/ConferencesSection';
import { FdpWorkshopsSection } from './components/FdpWorkshopsSection';
import { DualMastersCard } from './components/DualMastersCard';
import { InteractivePlayground } from './components/InteractivePlayground';
import { CyberSnakeBackground } from './components/CyberSnakeBackground';
import { JigsyAIAssistant } from './components/JigsyAIAssistant';
import { VisualAnalytics } from './components/VisualAnalytics';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { SkillsMatrix } from './components/SkillsMatrix';
import { EducationCertifications } from './components/EducationCertifications';
import { AchievementsHonor } from './components/AchievementsHonor';
import { FeedbackContact } from './components/FeedbackContact';
import { CitationModal } from './components/CitationModal';
import { CommandPalette } from './components/CommandPalette';
import { JigsyIndiaSection } from './components/JigsyIndiaSection';
import { AdminVaultPage } from './components/AdminVaultPage';
import { ErrorDetourPage } from './components/ErrorDetourPage';
import { AppErrorBoundary } from './components/AppErrorBoundary';
import { JigsyParentNavbar } from './components/JigsyParentNavbar';
import { JigsyParentFooter } from './components/JigsyParentFooter';
import { ParentLanguage } from './data/parentCompanyData';
import {
  RESEARCH_PAPERS,
  CONFERENCES,
  FDP_WORKSHOPS,
  EXPERIENCES,
  PROJECTS,
  SKILLS_DATA,
} from './data/portfolioData';
import { calculateResearchMetrics } from './utils/researchUtils';
import {
  AppErrorState,
  VALID_SECTION_HASHES,
  classifyResourceResponse,
  getErrorDescriptor,
  isDocumentOrAssetPath,
  isInactiveLinkHref,
  resolveRouteState,
} from './utils/errorHandling';
import { ResearchPaper, PageView } from './types';
import { Sun, Moon, Sparkles, Check, X } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('jigsy_theme');
      if (saved !== null) {
        return saved === 'dark';
      }
    } catch {
      // fallback
    }
    return true;
  });
  const initialRoute =
    typeof window !== 'undefined'
      ? resolveRouteState(window.location.pathname, window.location.search, window.location.hash)
      : { view: 'all' as PageView, error: null };

  const [selectedPaperForCite, setSelectedPaperForCite] = useState<ResearchPaper | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeView, setActiveView] = useState<PageView>(initialRoute.view);
  const [appError, setAppError] = useState<AppErrorState | null>(initialRoute.error);
  const [parentLanguage, setParentLanguage] = useState<ParentLanguage>('en');
  const [showThemeFacilityModal, setShowThemeFacilityModal] = useState(false);
  const [assistantPulseSignal, setAssistantPulseSignal] = useState(false);

  // First-time site visitor: notify that Dark and Light mode switching facility is available
  useEffect(() => {
    try {
      const hasSeen = localStorage.getItem('jigsy_has_seen_theme_facility');
      if (!hasSeen) {
        const timer = setTimeout(() => {
          setShowThemeFacilityModal(true);
        }, 700);
        return () => clearTimeout(timer);
      }
    } catch {
      // fallback
    }
  }, []);

  const handleDismissThemeFacility = () => {
    try {
      localStorage.setItem('jigsy_has_seen_theme_facility', 'true');
    } catch {
      // fallback
    }
    setShowThemeFacilityModal(false);
    // After user closes theme popup or clicks Okay/Proceed, pulse the assistant launcher without auto-opening app
    setAssistantPulseSignal(true);
  };

  const researchMetrics = calculateResearchMetrics(RESEARCH_PAPERS);

  // Sync dark class on document element
  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('jigsy_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('jigsy_theme', 'light');
      }
    } catch {
      // fallback
    }
  }, [darkMode]);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetUrlToHome = () => {
    try {
      if (
        window.location.pathname !== '/' ||
        window.location.search !== '' ||
        window.location.hash !== ''
      ) {
        window.history.pushState(null, '', '/');
      }
    } catch {
      // ignore history errors in sandboxed iframes
    }
  };

  const handleSelectView = (view: PageView) => {
    setAppError(null);
    setActiveView(view);
    resetUrlToHome();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenContactFromError = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setAppError(null);
    setActiveView('all');
    resetUrlToHome();
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  const triggerProgrammaticNavigation = (href: string, target: string | null) => {
    if (target === '_blank') {
      const tempLink = document.createElement('a');
      tempLink.href = href;
      tempLink.target = '_blank';
      tempLink.rel = 'noopener noreferrer';
      tempLink.setAttribute('data-bypass-error-guard', 'true');
      tempLink.style.display = 'none';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    } else {
      window.location.assign(href);
    }
  };

  // Sync URL navigation (popstate & hashchange) with app state and 404/error handler
  useEffect(() => {
    const syncFromLocation = () => {
      const resolved = resolveRouteState(
        window.location.pathname,
        window.location.search,
        window.location.hash
      );
      if (resolved.error) {
        setAppError(resolved.error);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setAppError(null);
        setActiveView(resolved.view);
        if (resolved.scrollToId) {
          setTimeout(() => {
            document.getElementById(resolved.scrollToId!)?.scrollIntoView({ behavior: 'smooth' });
          }, 80);
        }
      }
    };

    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener('hashchange', syncFromLocation);
    return () => {
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener('hashchange', syncFromLocation);
    };
  }, []);

  // Global link guard: intercepts unavailable PDFs, inactive links, offline external requests, and missing pages
  useEffect(() => {
    const handleDocumentClick = async (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const targetEl = event.target as HTMLElement | null;
      const anchor = targetEl?.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.getAttribute('data-bypass-error-guard') === 'true') return;

      const rawHref = anchor.getAttribute('href');
      if (!rawHref || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return;

      // 1. Inactive / placeholder hrefs (#, javascript:void(0), empty)
      if (isInactiveLinkHref(rawHref)) {
        event.preventDefault();
        setAppError({
          kind: 'inactive_link',
          requestedPath: rawHref === '#' ? anchor.textContent?.trim() || '#' : rawHref,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 2. In-page hash links (#contact, #projects, etc.)
      if (rawHref.startsWith('#')) {
        const sectionId = rawHref.slice(1).trim();
        const lowerId = sectionId.toLowerCase();
        const existingTarget = document.getElementById(sectionId);
        if (existingTarget) {
          if (appError && lowerId !== 'contact') {
            event.preventDefault();
            setAppError(null);
            setActiveView('all');
            resetUrlToHome();
            setTimeout(() => {
              document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
          return;
        }
        if (VALID_SECTION_HASHES.has(lowerId)) {
          event.preventDefault();
          setAppError(null);
          setActiveView('all');
          resetUrlToHome();
          setTimeout(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
          }, 120);
          return;
        }
        event.preventDefault();
        setAppError({
          kind: 'inactive_link',
          requestedPath: rawHref,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 3. Parse URL to inspect same-origin PDFs/assets vs external links
      let parsedUrl: URL;
      try {
        parsedUrl = new URL(rawHref, window.location.origin);
      } catch {
        event.preventDefault();
        setAppError({
          kind: 'inactive_link',
          requestedPath: rawHref,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 4. Upcoming / "Next Soon" links (e.g., CyberTrustedFM not live yet)
      if (
        anchor.getAttribute('data-link-status') === 'inactive' ||
        parsedUrl.hostname.toLowerCase() === 'ctfm.jigsy.in'
      ) {
        event.preventDefault();
        setAppError({
          kind: 'inactive_link',
          requestedPath: parsedUrl.href,
          detail:
            'CyberTrustedFM (ctfm.jigsy.in) is currently in upcoming deployment ("Next Soon") and is not active yet. You can return home, explore live prototypes, or attempt the URL directly.',
          externalFallbackUrl: parsedUrl.href,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const isSameOrigin = parsedUrl.origin === window.location.origin;

      // 5. Same-origin local PDFs, certificates, reports, and static assets -> verify availability before opening
      if (isSameOrigin && isDocumentOrAssetPath(parsedUrl.pathname)) {
        event.preventDefault();
        const linkTarget = anchor.getAttribute('target');
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 4500);
        try {
          const response = await fetch(parsedUrl.href, {
            method: 'HEAD',
            cache: 'no-store',
            signal: controller.signal,
          });
          window.clearTimeout(timeoutId);
          const errorKind = classifyResourceResponse(
            parsedUrl.pathname,
            response.status,
            response.headers.get('content-type'),
            !navigator.onLine
          );
          if (errorKind) {
            setAppError({
              kind: errorKind,
              requestedPath: parsedUrl.pathname,
              statusCode: response.status >= 400 ? String(response.status) : '404',
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            triggerProgrammaticNavigation(parsedUrl.href, linkTarget);
          }
        } catch {
          window.clearTimeout(timeoutId);
          setAppError({
            kind: navigator.onLine ? 'pdf_not_found' : 'not_responding',
            requestedPath: parsedUrl.pathname,
            statusCode: navigator.onLine ? '404' : '503',
          });
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      // 6. Same-origin non-asset route links -> resolve via SPA router
      if (isSameOrigin && anchor.getAttribute('target') !== '_blank') {
        event.preventDefault();
        const resolved = resolveRouteState(parsedUrl.pathname, parsedUrl.search, parsedUrl.hash);
        try {
          window.history.pushState(null, '', parsedUrl.pathname + parsedUrl.search + parsedUrl.hash);
        } catch {
          // ignore
        }
        if (resolved.error) {
          setAppError(resolved.error);
        } else {
          setAppError(null);
          setActiveView(resolved.view);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 7. External links when device is offline -> show not responding error page
      if (!isSameOrigin && !navigator.onLine) {
        event.preventDefault();
        setAppError({
          kind: 'not_responding',
          requestedPath: parsedUrl.href,
          statusCode: '503',
          detail:
            'Your connection appears to be offline or the destination link is not responding. Reconnect and try again, or continue exploring locally available sections.',
          externalFallbackUrl: parsedUrl.href,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [appError]);

  // SEO & UX: Keep page title optimized for "Jigyasu" and "Jigyasu Vatsa" across all child pages & errors
  useEffect(() => {
    if (appError) {
      const descriptor = getErrorDescriptor(appError);
      document.title = `${descriptor.badge} | Jigyasu Vatsa | jigyasu.jigsy.in`;
      return;
    }
    const titles: Record<PageView, string> = {
      all: 'Jigyasu Vatsa | Official Website & Research Portfolio | jigyasu.jigsy.in',
      research: 'Research & Publications | Jigyasu Vatsa | jigyasu.jigsy.in',
      conferences: 'Conference Proceedings & Presentations | Jigyasu Vatsa | jigyasu.jigsy.in',
      fdp: 'FDP & Academic Leadership | Jigyasu Vatsa | jigyasu.jigsy.in',
      academics: 'Dual Masters & Academic Rigor | Jigyasu Vatsa | jigyasu.jigsy.in',
      projects: 'Engineering Projects & Innovations | Jigyasu Vatsa | jigyasu.jigsy.in',
      interactive: 'Interactive Code Lab & Skills | Jigyasu Vatsa | jigyasu.jigsy.in',
      'jigsy-india': 'JIGSY INDIA | Jigyasu Integrated Global Services | jigyasu.jigsy.in',
      'admin-vault': 'Confidential Admin Vault | Jigyasu Vatsa | jigyasu.jigsy.in',
    };
    document.title = titles[activeView] || 'Jigyasu Vatsa | Official Website & Research Portfolio | jigyasu.jigsy.in';
  }, [activeView, appError]);

  return (
    <div
      className={`min-h-screen max-w-full overflow-x-hidden ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      } selection:bg-cyan-500 selection:text-slate-950 transition-colors relative`}
    >
      {/* Background Interactive Cyber-Snake Animation */}
      <CyberSnakeBackground />

      {/* Main Shell wrapped in ErrorBoundary (Parent Company JIGSY INDIA handles all 404/invalid hash/missing doc/not responding/runtime error screens) */}
      <AppErrorBoundary
        isDark={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        language={parentLanguage}
        onLanguageChange={setParentLanguage}
        onReturnHome={() => handleSelectView('all')}
        onExploreResearch={() => handleSelectView('research')}
        onOpenContact={handleOpenContactFromError}
      >
        {appError ? (
          <>
            <JigsyParentNavbar
              language={parentLanguage}
              onLanguageChange={setParentLanguage}
              isDark={darkMode}
              onToggleTheme={() => setDarkMode(!darkMode)}
              onOpenContact={handleOpenContactFromError}
            />
            <main className="relative z-10 max-w-full overflow-x-hidden">
              <ErrorDetourPage
                error={appError}
                onReturnHome={() => handleSelectView('all')}
                onExploreResearch={() => handleSelectView('research')}
                onOpenContact={handleOpenContactFromError}
                onRetry={() => {
                  if (navigator.onLine) {
                    window.location.reload();
                  } else {
                    setAppError({
                      ...appError,
                      detail: 'Still offline — please check your internet connection and try again.',
                    });
                  }
                }}
              />
            </main>
            <JigsyParentFooter
              language={parentLanguage}
              onReturnPortfolioHome={() => handleSelectView('all')}
            />
          </>
        ) : (
          <>
            {/* Top Bar Header with Page-View Switcher */}
            <Header
              darkMode={darkMode}
              onToggleTheme={() => setDarkMode(!darkMode)}
              onOpenSearch={() => setIsSearchOpen(true)}
              activeView={activeView}
              onSelectView={handleSelectView}
            />

            {/* Main Content Sections */}
            <main className="relative z-10 max-w-full overflow-x-hidden">
        {/* Render sections according to activeView */}
        {/* Unified Dashboard View: Shows complete portfolio footprint */}
        {activeView === 'all' && (
          <>
            <HeroDashboard
              metrics={researchMetrics}
              onExplorePapers={() => handleSelectView('research')}
              onExploreConferences={() => handleSelectView('conferences')}
              onExploreFdp={() => handleSelectView('fdp')}
              onExploreInteractive={() => handleSelectView('interactive')}
              onExploreJigsy={() => handleSelectView('jigsy-india')}
            />

            <ResearchLaboratory
              papers={RESEARCH_PAPERS}
              onOpenCite={(paper) => setSelectedPaperForCite(paper)}
            />

            <FdpWorkshopsSection items={FDP_WORKSHOPS} />

            <ConferencesSection conferences={CONFERENCES} />

            {/* Prominent Dual Masters Card */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <DualMastersCard />
            </div>

            <InteractivePlayground />

            <VisualAnalytics
              papers={RESEARCH_PAPERS}
              metrics={researchMetrics}
            />

            <ExperienceTimeline experiences={EXPERIENCES} />

            <ProjectsShowcase projects={PROJECTS} />

            <SkillsMatrix skills={SKILLS_DATA} />

            <EducationCertifications />

            <AchievementsHonor />

            {/* Universal Footer with Contact & Confidential Vault */}
            <FeedbackContact onOpenVault={() => handleSelectView('admin-vault')} />
          </>
        )}

        {/* Detached Page View: Confidential Admin Vault Portal */}
        {activeView === 'admin-vault' && (
          <div className="pt-6">
            <AdminVaultPage onBackToHome={() => handleSelectView('all')} />
            <FeedbackContact onOpenVault={() => handleSelectView('admin-vault')} />
          </div>
        )}

        {/* Detached Page View: JIGSY INDIA Founded Enterprise Showcase */}
        {activeView === 'jigsy-india' && (
          <div className="pt-6">
            <JigsyIndiaSection />
            <FeedbackContact onOpenVault={() => handleSelectView('admin-vault')} />
          </div>
        )}

        {/* Detached Page View: 4 Research Papers */}
        {activeView === 'research' && (
          <div className="pt-6">
            <ResearchLaboratory
              papers={RESEARCH_PAPERS}
              onOpenCite={(paper) => setSelectedPaperForCite(paper)}
            />
            <VisualAnalytics
              papers={RESEARCH_PAPERS}
              metrics={researchMetrics}
            />
            <FeedbackContact onOpenVault={() => handleSelectView('admin-vault')} />
          </div>
        )}

        {/* Detached Page View: FDPs & Workshops */}
        {activeView === 'fdp' && (
          <div className="pt-6">
            <FdpWorkshopsSection items={FDP_WORKSHOPS} />
            <FeedbackContact onOpenVault={() => handleSelectView('admin-vault')} />
          </div>
        )}

        {/* Detached Page View: Conferences */}
        {activeView === 'conferences' && (
          <div className="pt-6">
            <ConferencesSection conferences={CONFERENCES} />
            <FeedbackContact onOpenVault={() => handleSelectView('admin-vault')} />
          </div>
        )}

        {/* Detached Page View: Dual Masters & Academics */}
        {activeView === 'academics' && (
          <div className="pt-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <DualMastersCard />
            </div>
            <EducationCertifications />
            <FeedbackContact onOpenVault={() => handleSelectView('admin-vault')} />
          </div>
        )}

        {/* Detached Page View: Experience & Projects */}
        {activeView === 'projects' && (
          <div className="pt-6">
            <ExperienceTimeline experiences={EXPERIENCES} />
            <ProjectsShowcase projects={PROJECTS} />
            <SkillsMatrix skills={SKILLS_DATA} />
            <FeedbackContact onOpenVault={() => handleSelectView('admin-vault')} />
          </div>
        )}

        {/* Detached Page View: Interactive Lab & Code Sandboxes */}
        {activeView === 'interactive' && (
          <div className="pt-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-slate-300">
                    <strong className="text-purple-300">Interactive Lab Mode:</strong> Featuring the Drag-to-Explore Research Lab, Interactive Code Runner, and Live Python/C#/SQL Sandboxes.
                  </span>
                </div>
                <button
                  onClick={() => handleSelectView('all')}
                  className="text-cyan-400 hover:text-cyan-300 underline font-mono text-[11px]"
                >
                  View Full Unified Dashboard &rarr;
                </button>
              </div>
            </div>
            <InteractivePlayground />
            <SkillsMatrix skills={SKILLS_DATA} />
            <FeedbackContact onOpenVault={() => handleSelectView('admin-vault')} />
          </div>
        )}
            </main>
          </>
        )}
      </AppErrorBoundary>

      {/* Floating JIGSY AI Voice & Chat Assistant */}
      <JigsyAIAssistant pulseSignal={assistantPulseSignal} />

      {/* Citation Export Modal */}
      <CitationModal
        paper={selectedPaperForCite}
        onClose={() => setSelectedPaperForCite(null)}
      />

      {/* Power-User Command Palette */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        papers={RESEARCH_PAPERS}
        conferences={CONFERENCES}
        projects={PROJECTS}
        onSelectPaper={(paper) => {
          setSelectedPaperForCite(paper);
        }}
      />

      {/* Floating Scroll to Top Button with Custom JIGSY Upward Monogram Icon */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          title="Back to top"
          className="fixed bottom-14 sm:bottom-20 right-3 sm:right-6 z-40 w-10 h-11 sm:w-11 sm:h-12 flex items-center justify-center rounded-xl bg-white/95 dark:bg-slate-900/95 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/90 hover:border-cyan-500 dark:hover:border-cyan-400/70 shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 backdrop-blur-md group cursor-pointer"
        >
          <img
            src="/assets/aistudio/image_ac5cb4ac.png"
            alt="Scroll to top"
            className="h-7 sm:h-8 w-auto object-contain mix-blend-multiply dark:mix-blend-screen dark:invert group-hover:-translate-y-0.5 transition-transform select-none pointer-events-none"
          />
        </button>
      )}

      {/* First-Time Site Loading Theme Facility Available Info Modal */}
      {!appError && showThemeFacilityModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
        >
          <div className="relative w-full max-w-lg p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 shadow-2xl text-slate-900 dark:text-slate-100 transition-all animate-pop-larger">
            {/* Close Button */}
            <button
              onClick={handleDismissThemeFacility}
              aria-label="Dismiss theme notification"
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                THEME SWITCHING FACILITY
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Default: Dark Mode
              </span>
            </div>

            <h3 className="text-xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">
              Dark &amp; Light Mode Facility Available
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
              Welcome to Mr. Jigyasu Vatsa&apos;s Official Academic &amp; Research Portfolio. This portal opens in high-contrast <strong className="text-slate-900 dark:text-cyan-300">Dark Mode</strong> by default for optimal algorithm code reading and scientific paper inspection. You can easily switch between Dark and Light mode at any time using the theme toggle in the header navigation bar.
            </p>

            {/* Informational Visual Cards (Info only - not selectable here) */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {/* Dark Mode Info Display */}
              <div className="p-4 rounded-xl border bg-slate-950 border-cyan-500/80 ring-1 ring-cyan-500/30 text-white relative flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <Moon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Active Default
                  </span>
                </div>
                <div>
                  <div className="font-bold text-sm text-white">Dark Mode</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">High-contrast obsidian theme</div>
                </div>
              </div>

              {/* Light Mode Info Display */}
              <div className="p-4 rounded-xl border bg-slate-100 dark:bg-slate-800/40 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 relative flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-500">
                    <Sun className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                    Header Toggle
                  </span>
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-slate-100">Light Mode</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">Crisp daylight contrast</div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Just Okay / Proceed and Dismiss */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono text-center sm:text-left">
                Switch themes anytime with the Sun/Moon button at top right.
              </span>
              <button
                onClick={handleDismissThemeFacility}
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap"
              >
                Okay, Proceed &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
