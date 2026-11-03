import React, { useState, useEffect } from 'react';
import { ResearchPaper, ConferenceItem, ProjectItem } from '../types';
import {
  Search,
  BookOpen,
  Users,
  Code2,
  FileText,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  papers: ResearchPaper[];
  conferences: ConferenceItem[];
  projects: ProjectItem[];
  onSelectPaper: (paper: ResearchPaper) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  papers,
  conferences,
  projects,
  onSelectPaper,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalized = query.trim().toLowerCase();

  const matchingPapers = normalized
    ? papers.filter(
        (p) =>
          p.title.toLowerCase().includes(normalized) ||
          p.tags.some((t) => t.toLowerCase().includes(normalized)) ||
          p.contributors.some((c) => c.toLowerCase().includes(normalized))
      )
    : papers.slice(0, 3);

  const matchingConferences = normalized
    ? conferences.filter(
        (c) =>
          c.conferenceName.toLowerCase().includes(normalized) ||
          c.acronym.toLowerCase().includes(normalized) ||
          c.location.toLowerCase().includes(normalized)
      )
    : conferences.slice(0, 2);

  const matchingProjects = normalized
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(normalized) ||
          p.associatedWith.toLowerCase().includes(normalized) ||
          p.techStack.some((t) => t.toLowerCase().includes(normalized))
      )
    : projects.slice(0, 2);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick Command Search"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 rounded-2xl shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search research papers, conferences, projects, skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-4 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 ml-2">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-4 text-xs">
          {/* Quick Nav Links */}
          {!normalized && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono uppercase text-slate-500">
                Quick Jump
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-1">
                {[
                  { label: 'Research Papers', href: '#research' },
                  { label: 'Conferences', href: '#conferences' },
                  { label: 'Analytics', href: '#analytics' },
                  { label: 'Experience', href: '#experience' },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-cyan-700 border border-slate-200 dark:bg-slate-950/60 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-cyan-400 dark:border-transparent transition-colors text-center font-medium block"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Research Papers Section */}
          {matchingPapers.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono uppercase text-slate-500 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Research Papers</span>
              </div>
              <div className="space-y-1 mt-1">
                {matchingPapers.map((paper) => (
                  <div
                    key={paper.id}
                    onClick={() => {
                      onSelectPaper(paper);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-semibold text-white group-hover:text-cyan-300 line-clamp-1">
                        {paper.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {paper.type} · {paper.year} · {paper.indexing.join(', ')}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conferences Section */}
          {matchingConferences.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono uppercase text-slate-500 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                <span>Conferences Attended</span>
              </div>
              <div className="space-y-1 mt-1">
                {matchingConferences.map((conf) => (
                  <a
                    key={conf.id}
                    href="#conferences"
                    onClick={onClose}
                    className="p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer transition-colors flex items-center justify-between group block"
                  >
                    <div>
                      <div className="font-semibold text-white group-hover:text-purple-300 line-clamp-1">
                        {conf.conferenceName}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {conf.acronym} · {conf.role} · {conf.dates}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {matchingProjects.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono uppercase text-slate-500 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Engineering Projects</span>
              </div>
              <div className="space-y-1 mt-1">
                {matchingProjects.map((proj) => (
                  <a
                    key={proj.id}
                    href="#projects"
                    onClick={onClose}
                    className="p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer transition-colors flex items-center justify-between group block"
                  >
                    <div>
                      <div className="font-semibold text-white group-hover:text-emerald-300 line-clamp-1">
                        {proj.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {proj.associatedWith} · {proj.category}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {matchingPapers.length === 0 &&
            matchingConferences.length === 0 &&
            matchingProjects.length === 0 && (
              <div className="py-8 text-center text-slate-500">
                No matching publications, conferences, or projects found for &ldquo;{query}&rdquo;.
              </div>
            )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Tip: Jump directly to any paper or section</span>
          <span>Use ⌘K / Ctrl+K anytime</span>
        </div>
      </div>
    </div>
  );
};
