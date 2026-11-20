import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCopyrightYearRange,
  resolveRouteState,
  classifyResourceResponse,
  isInactiveLinkHref,
  isPdfPath,
  getErrorDescriptor,
  JIGSY_QUICK_FACTS,
} from './errorHandling';

test('formatCopyrightYearRange renders 2025 to current year dynamically', () => {
  assert.equal(formatCopyrightYearRange(2025, 2025), '2025');
  assert.equal(formatCopyrightYearRange(2025, 2026), '2025 - 2026');
  assert.equal(formatCopyrightYearRange(2025, 2028), '2025 - 2028');
  assert.equal(formatCopyrightYearRange(2025, 2024), '2025');
});

test('resolveRouteState allows valid portfolio routes and section anchors', () => {
  assert.deepEqual(resolveRouteState('/', '', ''), { view: 'all', error: null });
  assert.deepEqual(resolveRouteState('/research', '', ''), { view: 'research', error: null });
  assert.deepEqual(resolveRouteState('/conferences/', '', ''), { view: 'conferences', error: null });
  assert.deepEqual(resolveRouteState('/', '', '#contact'), {
    view: 'all',
    error: null,
    scrollToId: 'contact',
  });
});

test('resolveRouteState catches unknown paths as 404 not_found', () => {
  const result = resolveRouteState('/about/founder1', '', '');
  assert.equal(result.error?.kind, 'not_found');
  assert.equal(result.error?.requestedPath, '/about/founder1');
});

test('resolveRouteState detects missing PDF paths directly and via GitHub 404 redirect', () => {
  const directPdf = resolveRouteState('/pdfiles/missing-report.pdf', '', '');
  assert.equal(directPdf.error?.kind, 'pdf_not_found');
  assert.equal(directPdf.error?.requestedPath, '/pdfiles/missing-report.pdf');

  const githubRedirect = resolveRouteState(
    '/',
    '?__err_path=%2Fabout%2Ffounder1&__err_source=github',
    ''
  );
  assert.equal(githubRedirect.error?.kind, 'github_unavailable');
  assert.equal(githubRedirect.error?.requestedPath, '/about/founder1');

  const githubPdfRedirect = resolveRouteState(
    '/',
    '?__err_path=%2Fpdfiles%2Fnonexistent.pdf&__err_source=github',
    ''
  );
  assert.equal(githubPdfRedirect.error?.kind, 'pdf_not_found');
  assert.equal(githubPdfRedirect.error?.requestedPath, '/pdfiles/nonexistent.pdf');
});

test('resolveRouteState catches invalid hash links as inactive_link or not_found', () => {
  const unknownHash = resolveRouteState('/', '', '#nonexistent-section');
  assert.equal(unknownHash.error?.kind, 'inactive_link');

  const hashPath = resolveRouteState('/', '', '#/about/founder1');
  assert.equal(hashPath.error?.kind, 'not_found');
  assert.equal(hashPath.error?.requestedPath, '#/about/founder1');
});

test('classifyResourceResponse detects missing PDFs even when SPA returns 200 text/html', () => {
  assert.equal(
    classifyResourceResponse('/pdfiles/missing.pdf', 200, 'text/html; charset=utf-8', false),
    'pdf_not_found'
  );
  assert.equal(
    classifyResourceResponse('/pdfiles/IRCTCinternship6MonthsDec24May25.pdf', 200, 'application/pdf', false),
    null
  );
  assert.equal(
    classifyResourceResponse('/pdfiles/missing.pdf', 404, 'text/plain', false),
    'pdf_not_found'
  );
  assert.equal(
    classifyResourceResponse('/some/page', 503, 'text/html', false),
    'not_responding'
  );
  assert.equal(
    classifyResourceResponse('/some/page', 200, 'text/html', true),
    'not_responding'
  );
});

test('isInactiveLinkHref and isPdfPath identify inactive links and PDFs accurately', () => {
  assert.equal(isInactiveLinkHref('#'), true);
  assert.equal(isInactiveLinkHref(''), true);
  assert.equal(isInactiveLinkHref('javascript:void(0)'), true);
  assert.equal(isInactiveLinkHref('#contact'), false);
  assert.equal(isInactiveLinkHref('https://jigsy.in'), false);

  assert.equal(isPdfPath('/pdfiles/alpha.pdf'), true);
  assert.equal(isPdfPath('/assets/aistudio/241_Jigyasu_Vatsa_b3005cd7.pdf'), true);
  assert.equal(isPdfPath('/research'), false);
});

test('getErrorDescriptor and quick facts provide complete messaging', () => {
  const d404 = getErrorDescriptor({ kind: 'not_found', requestedPath: '/about/founder1' });
  assert.equal(d404.badge, '404 · Page Not Found');
  assert.equal(d404.title, 'This route took an unexpected detour');

  const dPdf = getErrorDescriptor({ kind: 'pdf_not_found', requestedPath: '/pdfiles/x.pdf' });
  assert.match(dPdf.badge, /PDF Document Not Available/);

  const dOffline = getErrorDescriptor({ kind: 'not_responding', requestedPath: '/api/data' });
  assert.match(dOffline.badge, /Not Responding/);

  assert.ok(JIGSY_QUICK_FACTS.length >= 4);
});

test('parent company portal URLs map founder and sectors accurately', async () => {
  const { resolveParentPortalUrl, PARENT_COMPANY_DETAILS } = await import('../data/parentCompanyData');
  assert.equal(PARENT_COMPANY_DETAILS.founderAboutUrl, 'https://jigsy.in/about/founder');
  assert.equal(resolveParentPortalUrl('about-founder'), 'https://jigsy.in/about/founder');
  assert.equal(resolveParentPortalUrl('sectors'), 'https://jigsy.in/sectors');
  assert.equal(resolveParentPortalUrl('sector-detail', 'rd'), 'https://jigsy.in/sectors/rd');
  assert.equal(resolveParentPortalUrl('sector-detail', 'youth'), 'https://youth.jigsy.in');
  assert.equal(resolveParentPortalUrl('contact'), 'https://jigsy.in/contact');
});
