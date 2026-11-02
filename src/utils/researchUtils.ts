import { ResearchPaper, ResearchTag } from '../types';

export function filterPapers(
  papers: ResearchPaper[],
  tag: ResearchTag,
  query: string = ''
): ResearchPaper[] {
  const normalizedQuery = query.trim().toLowerCase();

  return papers.filter((paper) => {
    // Tag matching
    const matchesTag =
      tag === 'All' ||
      paper.tags.includes(tag) ||
      (tag === 'Book Chapter' && paper.type === 'Book Chapter') ||
      (tag === 'Conference Paper' && paper.type === 'Conference Paper') ||
      (tag === 'Journal' && paper.type === 'Journal Article') ||
      (tag === 'Book Chapter WOS Index' &&
        paper.type === 'Book Chapter' &&
        paper.indexing.includes('Web of Science')) ||
      (tag === 'Conference Paper Scopus Index' &&
        paper.type === 'Conference Paper' &&
        paper.indexing.includes('Scopus')) ||
      (tag === 'Peer Review' && paper.indexing.includes('Peer Reviewed')) ||
      (tag === 'UGC-CARE Approved' && paper.indexing.includes('UGC-CARE'));

    if (!matchesTag) return false;

    // Search query matching
    if (!normalizedQuery) return true;

    const searchableText = [
      paper.title,
      paper.publication,
      paper.abstract,
      paper.role,
      paper.source,
      ...(paper.contributors || []),
      ...(paper.keywords || []),
      ...(paper.isbn || []),
      ...(paper.issn || []),
      paper.doi || '',
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export type CitationStyle = 'bibtex' | 'apa' | 'ieee' | 'mla';

export function formatCitation(paper: ResearchPaper, style: CitationStyle): string {
  const authors = paper.contributors.join(', ');
  const year = paper.year;
  const title = paper.title;
  const publication = paper.publication;
  const doi = paper.doi ? ` https://doi.org/${paper.doi}` : '';

  switch (style) {
    case 'bibtex':
      return paper.bibtex;

    case 'apa':
      return `${authors} (${year}). ${title}. ${publication}.${doi}`;

    case 'ieee':
      return `${authors}, "${title}," in ${publication}, ${year}.${doi}`;

    case 'mla':
      return `${authors}. "${title}." ${publication}, ${year}.${doi}`;

    default:
      return `${authors} (${year}). ${title}. ${publication}.`;
  }
}

export interface ResearchMetrics {
  totalPapers: number;
  totalCitations: number;
  scopusIndexed: number;
  wosIndexed: number;
  peerReviewed: number;
  bookChapters: number;
  conferencePapers: number;
  journalArticles: number;
  hIndexEstimate: number;
}

export function calculateResearchMetrics(papers: ResearchPaper[]): ResearchMetrics {
  const totalPapers = papers.length;
  const totalCitations = papers.reduce((sum, p) => sum + (p.citationsCount || 0), 0);
  const scopusIndexed = papers.filter((p) => p.indexing.includes('Scopus')).length;
  const wosIndexed = papers.filter((p) => p.indexing.includes('Web of Science')).length;
  const peerReviewed = papers.filter((p) => p.indexing.includes('Peer Reviewed')).length;
  const bookChapters = papers.filter((p) => p.type === 'Book Chapter').length;
  const conferencePapers = papers.filter((p) => p.type === 'Conference Paper').length;
  const journalArticles = papers.filter((p) => p.type === 'Journal Article').length;

  // Approximate h-index from citations
  const sortedCites = papers.map((p) => p.citationsCount || 0).sort((a, b) => b - a);
  let hIndex = 0;
  for (let i = 0; i < sortedCites.length; i++) {
    if (sortedCites[i] >= i + 1) {
      hIndex = i + 1;
    } else {
      break;
    }
  }

  return {
    totalPapers,
    totalCitations,
    scopusIndexed,
    wosIndexed,
    peerReviewed,
    bookChapters,
    conferencePapers,
    journalArticles,
    hIndexEstimate: hIndex || 2,
  };
}

export function generateBibtexExport(papers: ResearchPaper[]): string {
  return papers.map((p) => p.bibtex).join('\n\n');
}

export function generateCSVExport(papers: ResearchPaper[]): string {
  const headers = ['Title', 'Type', 'Publication', 'Year', 'Authors', 'DOI', 'Indexing', 'Citations'];
  const rows = papers.map((p) => [
    `"${p.title.replace(/"/g, '""')}"`,
    `"${p.type}"`,
    `"${p.publication.replace(/"/g, '""')}"`,
    p.year,
    `"${p.contributors.join('; ')}"`,
    `"${p.doi || ''}"`,
    `"${p.indexing.join(', ')}"`,
    p.citationsCount,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
