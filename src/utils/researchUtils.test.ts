import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterPapers,
  formatCitation,
  calculateResearchMetrics,
  generateCSVExport,
} from './researchUtils';
import { RESEARCH_PAPERS } from '../data/portfolioData';

test('filterPapers filters by exact tag Conference Paper Scopus Index', () => {
  const result = filterPapers(RESEARCH_PAPERS, 'Conference Paper Scopus Index');
  assert.ok(result.length >= 1);
  assert.ok(result.every((p) => p.type === 'Conference Paper' && p.indexing.includes('Scopus')));
});

test('filterPapers filters by exact tag Book Chapter WOS Index', () => {
  const result = filterPapers(RESEARCH_PAPERS, 'Book Chapter WOS Index');
  assert.ok(result.length >= 1);
  assert.ok(result.some((p) => p.indexing.includes('Web of Science')));
});

test('filterPapers filters by search query', () => {
  const result = filterPapers(RESEARCH_PAPERS, 'All', 'Circular Economy');
  assert.ok(result.length >= 1);
  const titles = result.map((r) => r.title);
  assert.ok(titles.some((t) => t.includes('Circular Economy')));
});

test('formatCitation outputs formatted BibTeX and APA strings', () => {
  const paper = RESEARCH_PAPERS[0];
  const bibtex = formatCitation(paper, 'bibtex');
  assert.ok(bibtex.includes('vatsa'));
  assert.ok(bibtex.includes('Vatsa'));

  const apa = formatCitation(paper, 'apa');
  assert.ok(apa.includes('(2026)'));
  assert.ok(apa.includes('Vatsa'));
});

test('calculateResearchMetrics computes accurate counts for research papers', () => {
  const metrics = calculateResearchMetrics(RESEARCH_PAPERS);
  assert.ok(metrics.totalPapers >= 4);
  assert.ok(metrics.totalCitations > 0);
  assert.ok(metrics.scopusIndexed >= 1);
  assert.ok(metrics.wosIndexed >= 1);
});

test('generateCSVExport creates valid header and rows', () => {
  const csv = generateCSVExport(RESEARCH_PAPERS);
  assert.ok(csv.startsWith('Title,Type,Publication,Year,Authors,DOI,Indexing,Citations'));
  assert.ok(csv.includes('Smart Food Redistribution'));
});
