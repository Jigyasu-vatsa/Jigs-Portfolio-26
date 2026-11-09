import React, { useState, useEffect } from 'react';
import { ResearchPaper } from '../types';
import { formatCitation, CitationStyle } from '../utils/researchUtils';
import { Copy, Check, Download, X, BookOpen } from 'lucide-react';

interface CitationModalProps {
  paper: ResearchPaper | null;
  onClose: () => void;
}

export const CitationModal: React.FC<CitationModalProps> = ({ paper, onClose }) => {
  const [activeStyle, setActiveStyle] = useState<CitationStyle>('bibtex');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!paper) return null;

  const citationText = formatCitation(paper, activeStyle);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(citationText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadBibtex = () => {
    const blob = new Blob([paper.bibtex], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${paper.id}-citation.bib`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="citation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-900 dark:text-slate-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 id="citation-modal-title" className="text-lg font-semibold text-slate-900 dark:text-white">
                Cite Publication
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-1">
                {paper.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Style tabs */}
        <div className="flex items-center gap-1.5 my-4 p-1 bg-slate-100 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
          {(['bibtex', 'apa', 'ieee', 'mla'] as CitationStyle[]).map((style) => (
            <button
              key={style}
              onClick={() => setActiveStyle(style)}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md uppercase tracking-wider transition-colors ${
                activeStyle === style
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900'
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        {/* Code display */}
        <div className="relative">
          <pre className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/90 rounded-xl font-mono text-xs text-slate-800 dark:text-slate-200 overflow-x-auto whitespace-pre-wrap break-all max-h-60 leading-relaxed">
            {citationText}
          </pre>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {paper.doi ? `DOI: ${paper.doi}` : `Year: ${paper.year}`}
          </span>
          <div className="flex items-center gap-2">
            {activeStyle === 'bibtex' && (
              <button
                onClick={handleDownloadBibtex}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 dark:text-slate-300 dark:hover:text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export .bib</span>
              </button>
            )}
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                copied
                  ? 'bg-emerald-500 text-slate-950 font-semibold'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Citation'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
