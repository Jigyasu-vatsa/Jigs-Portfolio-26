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
import {
  RESEARCH_PAPERS,
  CONFERENCES,
  FDP_WORKSHOPS,
  EXPERIENCES,
  PROJECTS,
  SKILLS_DATA,
} from './data/portfolioData';
import { calculateResearchMetrics } from './utils/researchUtils';
import { ResearchPaper, PageView } from './types';
import { ArrowUp } from 'lucide-react';

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
  const [selectedPaperForCite, setSelectedPaperForCite] = useState<ResearchPaper | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeView, setActiveView] = useState<PageView>('all');

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

  const handleSelectView = (view: PageView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SEO & UX: Keep page title optimized for "Jigyasu" and "Jigyasu Vatsa" across all child pages
  useEffect(() => {
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
  }, [activeView]);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      } selection:bg-cyan-500 selection:text-slate-950 transition-colors relative`}
    >
      {/* Background Interactive Cyber-Snake Animation */}
      <CyberSnakeBackground />

      {/* Top Bar Header with Page-View Switcher */}
      <Header
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeView={activeView}
        onSelectView={handleSelectView}
      />

      {/* Main Content Sections (Supports both unified dashboard and detached page views) */}
      <main className="relative z-10">
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

      {/* Floating JIGSY AI Voice & Chat Assistant */}
      <JigsyAIAssistant />

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

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-slate-900/90 text-cyan-400 hover:text-white hover:bg-cyan-500 hover:text-slate-950 border border-slate-750 shadow-xl transition-all duration-300 backdrop-blur-md group"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
}
