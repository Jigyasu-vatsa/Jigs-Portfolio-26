import React from 'react';
import { PageView } from '../types';
import {
  Search,
  Sun,
  Moon,
  FileText,
  BookOpen,
  Award,
  Users,
  GraduationCap,
  Briefcase,
  Gamepad2,
  Layers,
  Building2,
  ExternalLink,
} from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  activeView: PageView;
  onSelectView: (view: PageView) => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleTheme,
  onOpenSearch,
  activeView,
  onSelectView,
}) => {
  const navTabs: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Dashboard', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'research', label: 'Research Papers', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'jigsy-india', label: 'JIGSY INDIA', icon: <Building2 className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'fdp', label: 'FDPs & Workshops', icon: <Award className="w-3.5 h-3.5" /> },
    { id: 'conferences', label: 'Conferences', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'academics', label: 'Dual Masters', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'projects', label: 'Experience & Projects', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'interactive', label: 'Interactive Lab', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/85 dark:bg-slate-950/85 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5">
        {/* Zone 1: JIGSY Logo (clickable to jigsy.in) & Portfolio Title */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Clickable JIGSY Emblem Logo linking to jigsy.in */}
          <a
            href="https://jigsy.in"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit JIGSY INDIA Official Portal (jigsy.in)"
            className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-cyan-500 via-blue-500 to-amber-400 hover:scale-105 transition-transform flex items-center justify-center shadow-md shadow-cyan-500/20 group relative shrink-0"
          >
            <img
              src="/assets/aistudio/image_bdd66c74.png"
              alt="JIGSY INDIA Official Seal"
              className="w-full h-full object-contain rounded-full bg-slate-950"
            />
          </a>

          {/* Portfolio Brand Name (Concise R&D Branding) */}
          <button
            onClick={() => onSelectView('all')}
            className="flex flex-col text-left group transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                R&amp;D Portfolio
              </span>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/80">
                CSE R&amp;D
              </span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400/90 tracking-wide">
              AI · Cyber Security · Systems
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Page Links / Tabs */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 overflow-x-auto text-xs font-medium"
        >
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectView(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeView === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenSearch}
            aria-label="Quick search (Press Ctrl+K)"
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors flex items-center gap-1.5 text-xs"
            title="Press Ctrl+K to search"
          >
            <Search className="w-4 h-4" />
            <kbd className="hidden lg:inline-block text-[10px] font-mono text-slate-400 bg-slate-950 px-1 py-0.5 rounded border border-slate-800">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={onToggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
          </button>

          <a
            href="#contact"
            className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 rounded-lg transition-all shadow-md shadow-cyan-500/10 whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Connect & CV</span>
            <span className="sm:hidden">CV</span>
          </a>
        </div>
      </div>

      {/* Mobile Page View Navigation Bar */}
      <div className="md:hidden px-4 py-2 border-t border-slate-850 overflow-x-auto flex gap-1.5 bg-slate-950/95 no-scrollbar">
        {navTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelectView(tab.id)}
            className={`px-2.5 py-1 text-[11px] rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 ${
              activeView === tab.id
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 bg-slate-900 border border-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
};
