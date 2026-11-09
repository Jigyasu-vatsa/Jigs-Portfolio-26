import React, { useState } from 'react';
import { ResearchPaper, ResearchTag } from '../types';
import { filterPapers, generateBibtexExport, generateCSVExport } from '../utils/researchUtils';
import {
  Search,
  BookOpen,
  Quote,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Download,
  Copy,
  Check,
  Tag,
  SlidersHorizontal,
  FileCheck,
  Award,
  Sparkles,
  Globe,
} from 'lucide-react';

interface ResearchLaboratoryProps {
  papers: ResearchPaper[];
  onOpenCite: (paper: ResearchPaper) => void;
}

const AVAILABLE_TAGS: ResearchTag[] = [
  'All',
  'Conference Paper',
  'Journal',
  'Book Chapter WOS Index',
  'Conference Paper Scopus Index',
  'Peer Review',
  'UGC-CARE Approved',
  'Accepted for Indexing',
  'ISBN Proceeding',
];

export const ResearchLaboratory: React.FC<ResearchLaboratoryProps> = ({
  papers,
  onOpenCite,
}) => {
  const [selectedTag, setSelectedTag] = useState<ResearchTag>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'year' | 'citations' | 'title'>('year');
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>('paper-1');
  const [copiedDoiId, setCopiedDoiId] = useState<string | null>(null);

  // Filter papers
  const filteredPapers = filterPapers(papers, selectedTag, searchQuery);

  // Sort papers
  const sortedPapers = [...filteredPapers].sort((a, b) => {
    if (sortBy === 'year') return b.year - a.year;
    if (sortBy === 'citations') return (b.citationsCount || 0) - (a.citationsCount || 0);
    return a.title.localeCompare(b.title);
  });

  const toggleExpand = (id: string) => {
    setExpandedPaperId(expandedPaperId === id ? null : id);
  };

  const handleCopyDoi = (paper: ResearchPaper) => {
    if (!paper.doi) return;
    navigator.clipboard.writeText(paper.doiUrl || `https://doi.org/${paper.doi}`);
    setCopiedDoiId(paper.id);
    setTimeout(() => setCopiedDoiId(null), 2000);
  };

  const handleDownloadAllBibtex = () => {
    const bibtex = generateBibtexExport(sortedPapers);
    const blob = new Blob([bibtex], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jigyasu-vatsa-publications-${selectedTag.toLowerCase().replace(/\s+/g, '-')}.bib`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadCSV = () => {
    const csv = generateCSVExport(sortedPapers);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jigyasu-vatsa-publications.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="research" className="py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Peer-Reviewed Scholarly Footprint</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {papers.length} Research Publications &amp; Proceedings
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
              Spanning Springer Nature (WoS accepted), Scopus-indexed conference proceedings (GTISD-2026), Taylor &amp;
              Francis (In Press), UGC-CARE approved journal articles, and LNMI Conference ISBN Proceedings.
            </p>
          </div>

          {/* Export Actions */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={handleDownloadAllBibtex}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-200 dark:text-slate-300 dark:hover:text-white dark:bg-slate-900 dark:hover:bg-slate-850 dark:border-slate-800 rounded-lg transition-colors shadow-sm"
              title="Download all filtered papers as BibTeX"
            >
              <Download className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>BibTeX Export</span>
            </button>
            <button
              onClick={handleDownloadCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-200 dark:text-slate-300 dark:hover:text-white dark:bg-slate-900 dark:hover:bg-slate-850 dark:border-slate-800 rounded-lg transition-colors shadow-sm"
              title="Download research index as CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>CSV Index</span>
            </button>
          </div>
        </div>

        {/* Interactive Tag Filter Bar */}
        <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-8 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <Tag className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Filter by Index &amp; Publication Category:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {AVAILABLE_TAGS.map((tag) => {
              const count = filterPapers(papers, tag, '').length;
              const isActive = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 border border-slate-200 dark:bg-slate-950/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 dark:border-slate-800'
                  }`}
                >
                  <span>{tag}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? 'bg-slate-950/30 text-slate-950'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls Strip */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by title, author, DOI, ISBN, ISSN, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <span>Sort by:</span>
              </span>
              <select
                aria-label="Sort research papers"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'year' | 'citations' | 'title')}
                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 shadow-sm"
              >
                <option value="year">Latest Year</option>
                <option value="citations">Most Cited</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Papers List */}
        {sortedPapers.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white">No research papers found</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
              No publications match the selected tag &ldquo;{selectedTag}&rdquo; and query &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSelectedTag('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-cyan-500 text-slate-950 rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedPapers.map((paper) => {
              const isExpanded = expandedPaperId === paper.id;
              const hasDoiCopied = copiedDoiId === paper.id;

              return (
                <article
                  key={paper.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 hover:bg-slate-50/60 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/90 transition-all shadow-sm group"
                >
                  {/* Unboxed Metadata Header */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2.5 font-mono">
                    <span className="text-cyan-700 dark:text-cyan-400 font-semibold">{paper.type}</span>
                    <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                    <span className="text-slate-700 dark:text-slate-300">{paper.year}</span>
                    <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                    <span>Role: <strong className="text-slate-900 dark:text-slate-200 font-medium">{paper.role}</strong></span>
                    <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">{paper.indexingStatus}</span>
                  </div>

                  {/* Paper Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                    {paper.title}
                  </h3>

                  {/* Publication Venue */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 italic">
                    {paper.publication}
                  </p>

                  {/* Contributors with Jigyasu Vatsa Highlighted */}
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 flex flex-wrap items-center gap-1">
                    <span className="text-slate-500 font-medium">Contributors:</span>
                    {paper.contributors.map((author, i) => {
                      const isJigyasu = author.toLowerCase().includes('jigyasu');
                      return (
                        <span key={author}>
                          <span
                            className={
                              isJigyasu
                                ? 'text-cyan-800 dark:text-cyan-300 font-bold bg-cyan-100 dark:bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-200 dark:border-cyan-800/40'
                                : 'text-slate-700 dark:text-slate-300'
                            }
                          >
                            {author}
                          </span>
                          {i < paper.contributors.length - 1 && <span className="text-slate-400 dark:text-slate-600 mr-1">;</span>}
                        </span>
                      );
                    })}
                  </div>

                  {/* DOI & Identifier Strip */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800/60 text-xs font-mono text-slate-600 dark:text-slate-400">
                    {paper.doi && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-500">DOI:</span>
                        <a
                          href={paper.doiUrl || `https://doi.org/${paper.doi}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-700 dark:text-cyan-400 hover:underline hover:text-cyan-800 dark:hover:text-cyan-300 flex items-center gap-1"
                        >
                          <span>{paper.doi}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => handleCopyDoi(paper)}
                          title="Copy DOI URL"
                          className="p-1 text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                        >
                          {hasDoiCopied ? <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    )}

                    {paper.isbn && paper.isbn.length > 0 && (
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <span className="text-slate-500">ISBN:</span>
                        <span>{paper.isbn.join(', ')}</span>
                      </div>
                    )}

                    {paper.issn && paper.issn.length > 0 && (
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <span className="text-slate-500">ISSN:</span>
                        <span>{paper.issn.join(', ')}</span>
                      </div>
                    )}

                    {paper.certificateUrl && (
                      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 ml-auto">
                        <FileCheck className="w-3.5 h-3.5" />
                        <a
                          href={paper.certificateUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline font-semibold"
                        >
                          Verified Certificate / Document Attached &darr;
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Expandable Abstract Details Drawer */}
                  {isExpanded && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 animate-fadeIn text-xs text-slate-700 dark:text-slate-300 space-y-3">
                      <div>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1 text-[11px] uppercase tracking-wider font-mono">
                          Abstract &amp; Methodological Framework
                        </h4>
                        <p className="leading-relaxed text-slate-700 dark:text-slate-300 text-justify">
                          {paper.abstract}
                        </p>
                      </div>

                      {paper.keywords && paper.keywords.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                          <span className="text-slate-500 font-mono text-[11px]">Keywords:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {paper.keywords.map((kw) => (
                              <span
                                key={kw}
                                className="text-[11px] text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 shadow-xs"
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Prototype Callout if available */}
                      {paper.prototypeUrl && (
                        <div className={`p-3 rounded-xl border flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 ${
                          paper.prototypeStatus === 'active'
                            ? 'bg-emerald-50 border-emerald-200 text-slate-800 dark:bg-emerald-950/60 dark:border-emerald-500/40 dark:text-emerald-200'
                            : 'bg-cyan-50 border-cyan-200 text-slate-800 dark:bg-cyan-950/60 dark:border-cyan-500/40 dark:text-cyan-200'
                        }`}>
                          <div className="min-w-0 flex-1">
                            <div className={`flex flex-wrap items-center gap-1.5 font-semibold text-xs ${
                              paper.prototypeStatus === 'active' ? 'text-emerald-800 dark:text-emerald-300' : 'text-cyan-800 dark:text-cyan-300'
                            }`}>
                              <Globe className={`w-3.5 h-3.5 shrink-0 ${
                                paper.prototypeStatus === 'active' ? 'text-emerald-600 dark:text-emerald-400' : 'text-cyan-600 dark:text-cyan-400'
                              }`} />
                              <span className="truncate">{paper.prototypeLabel || 'Prototype'}</span>
                              <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono uppercase font-bold shrink-0 ${
                                paper.prototypeStatus === 'active'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30'
                                  : 'bg-cyan-100 text-cyan-800 border border-cyan-300 dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-500/30'
                              }`}>
                                {paper.prototypeBadge || (paper.prototypeStatus === 'active' ? 'Prototype' : 'Next Soon')}
                              </span>
                            </div>
                            <p className="text-[11px] text-emerald-950/80 dark:text-slate-300 mt-0.5 leading-snug">
                              {paper.prototypeNote || 'Related Web Presence & Prototype Platform.'}
                            </p>
                          </div>
                          <a
                            href={paper.prototypeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center justify-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shrink-0 w-full lg:w-auto ${
                              paper.prototypeStatus === 'active'
                                ? 'bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950'
                                : 'bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-slate-950'
                            }`}
                          >
                            <span>Open {paper.prototypeLabel ? paper.prototypeLabel.split(' ')[0] : 'Prototype'}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-2 border-t border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
                        <span>Source Record: <strong className="text-slate-700 dark:text-slate-300 font-medium">{paper.source}</strong></span>
                        {(paper.paperUrl || paper.driveUrl) && (
                          <a
                            href={paper.paperUrl || paper.driveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-700 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300 flex items-center gap-1 font-medium self-start sm:self-auto"
                          >
                            <span>Open Publisher Repository</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Card Bottom Toolbar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/70">
                    <button
                      onClick={() => toggleExpand(paper.id)}
                      className="text-xs font-medium text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 transition-colors self-start"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                          <span>Hide Details</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                          <span>Show Abstract &amp; Insights</span>
                        </>
                      )}
                    </button>

                    <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0">
                      {paper.prototypeUrl && (
                        <a
                          href={paper.prototypeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shadow-sm border ${
                            paper.prototypeStatus === 'active'
                              ? 'text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border-emerald-300 dark:text-emerald-300 dark:bg-emerald-950/70 dark:hover:bg-emerald-900 dark:border-emerald-500/40'
                              : 'text-cyan-800 hover:text-cyan-950 bg-cyan-50 hover:bg-cyan-100 border-cyan-300 dark:text-cyan-300 dark:bg-cyan-950/70 dark:hover:bg-cyan-900 dark:border-cyan-500/40'
                          }`}
                          title={paper.prototypeNote || paper.prototypeLabel}
                        >
                          <Globe className={`w-3.5 h-3.5 shrink-0 ${
                            paper.prototypeStatus === 'active' ? 'text-emerald-600 dark:text-emerald-400' : 'text-cyan-600 dark:text-cyan-400'
                          }`} />
                          <span>{paper.prototypeLabel ? paper.prototypeLabel.split(' ')[0] : 'Prototype'}</span>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-sans uppercase font-bold tracking-wider shrink-0 ${
                            paper.prototypeStatus === 'active'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30'
                              : 'bg-cyan-100 text-cyan-800 border border-cyan-300 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20'
                          }`}>
                            {paper.prototypeBadge || (paper.prototypeStatus === 'active' ? 'Prototype' : 'Next Soon')}
                          </span>
                          <ExternalLink className={`w-3 h-3 shrink-0 ${
                            paper.prototypeStatus === 'active' ? 'text-emerald-600 dark:text-emerald-400' : 'text-cyan-600 dark:text-cyan-400'
                          }`} />
                        </a>
                      )}

                      <button
                        onClick={() => onOpenCite(paper)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all flex items-center gap-1.5 shadow-sm shrink-0"
                      >
                        <Quote className="w-3.5 h-3.5" />
                        <span>Cite Paper</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
