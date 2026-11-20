import { PageView } from '../types';

export type ErrorKind =
  | 'not_found'
  | 'pdf_not_found'
  | 'inactive_link'
  | 'github_unavailable'
  | 'not_responding'
  | 'runtime_error';

export interface AppErrorState {
  kind: ErrorKind;
  requestedPath: string;
  detail?: string;
  statusCode?: string;
  externalFallbackUrl?: string;
}

export interface ErrorDescriptor {
  badge: string;
  title: string;
  message: string;
  icon: 'compass' | 'file-x' | 'link-off' | 'wifi-off' | 'alert';
}

export interface RouteResolution {
  view: PageView;
  error: AppErrorState | null;
  scrollToId?: string;
  normalizedUrl?: string;
}

export interface QuickFactItem {
  id: string;
  text: string;
}

export const JIGSY_QUICK_FACTS: QuickFactItem[] = [
  {
    id: 'foundational-vision',
    text: "JIGSY INDIA's foundational vision was conceived on October 3, 2010 and incorporated as a DPIIT-recognized enterprise in 2025.",
  },
  {
    id: 'dual-masters',
    text: 'Jigyasu Vatsa is pursuing Simultaneous Dual Masters — Regular M.Tech CSE at Sandip University and Distance MBA at IGNOU under UGC guidelines.',
  },
  {
    id: 'springer-research',
    text: 'His AI-Assisted Smart Food Redistribution framework was published in Springer Nature & Atlantis Press (ICIPAI-2026) and accepted for Web of Science indexing.',
  },
  {
    id: 'amazon-author',
    text: 'He authored the 109-page algorithm textbook "Mastering DSA Without Fear", published globally on Amazon (ISBN: 979-8181718425).',
  },
  {
    id: 'national-qualifications',
    text: 'He is both UGC-NET Qualified (Ph.D. Admission, 80.44 percentile) in Computer Science & Applications and Bihar STET Paper-2 Qualified.',
  },
  {
    id: 'irctc-engineering',
    text: 'As a Former Developer Intern at IRCTC, he contributed to production DMRC QR ticketing integration and high-concurrency Tatkal reliability monitors.',
  },
];

/**
 * Formats a copyright year range from startYear to currentYear.
 * Example: formatCopyrightYearRange(2025, 2026) => "2025 - 2026"
 *          formatCopyrightYearRange(2025, 2025) => "2025"
 */
export function formatCopyrightYearRange(
  startYear: number = 2025,
  currentYear: number = new Date().getFullYear()
): string {
  const safeCurrent = Number.isFinite(currentYear) && currentYear >= startYear ? currentYear : startYear;
  return safeCurrent > startYear ? `${startYear} - ${safeCurrent}` : `${startYear}`;
}

export const VALID_PAGE_VIEWS: Record<string, PageView> = {
  '': 'all',
  '/': 'all',
  '/index.html': 'all',
  '/home': 'all',
  '/dashboard': 'all',
  '/research': 'research',
  '/papers': 'research',
  '/publications': 'research',
  '/conferences': 'conferences',
  '/fdp': 'fdp',
  '/workshops': 'fdp',
  '/academics': 'academics',
  '/education': 'academics',
  '/projects': 'projects',
  '/experience': 'projects',
  '/interactive': 'interactive',
  '/lab': 'interactive',
  '/jigsy-india': 'jigsy-india',
  '/jigsy': 'jigsy-india',
  '/admin-vault': 'admin-vault',
};

export const VALID_SECTION_HASHES = new Set([
  'top',
  'about',
  'hero',
  'research',
  'publications',
  'conferences',
  'fdp',
  'academics',
  'education',
  'books',
  'projects',
  'experience',
  'skills',
  'interactive',
  'analytics',
  'achievements',
  'jigsy-india',
  'contact',
  'feedback',
]);

const PDF_OR_DOC_PATTERN = /\.(pdf|docx?|pptx?|xlsx?|zip|rar)(\?.*)?$/i;
const IMAGE_OR_MEDIA_PATTERN = /\.(png|jpe?g|webp|gif|svg|mp4|webm)(\?.*)?$/i;

export function isPdfPath(path: string): boolean {
  return /\.pdf(\?.*|#.*)?$/i.test(path.trim()) || /^\/?pdfiles\//i.test(path.trim());
}

export function isDocumentOrAssetPath(path: string): boolean {
  const trimmed = path.trim();
  return (
    isPdfPath(trimmed) ||
    PDF_OR_DOC_PATTERN.test(trimmed) ||
    IMAGE_OR_MEDIA_PATTERN.test(trimmed) ||
    /^\/?assets\//i.test(trimmed)
  );
}

export function isInactiveLinkHref(href: string | null | undefined): boolean {
  if (href === null || href === undefined) return true;
  const trimmed = href.trim();
  if (!trimmed) return true;
  if (trimmed === '#' || trimmed === '#!' || trimmed === '#none') return true;
  if (/^javascript:/i.test(trimmed)) return true;
  return false;
}

export function parseErrorKindParam(param: string | null): ErrorKind | null {
  if (!param) return null;
  const normalized = param.trim().toLowerCase();
  switch (normalized) {
    case '404':
    case 'not_found':
      return 'not_found';
    case 'pdf':
    case 'pdf_not_found':
      return 'pdf_not_found';
    case 'inactive':
    case 'inactive_link':
    case 'unavailable':
      return 'inactive_link';
    case 'github':
    case 'github_unavailable':
      return 'github_unavailable';
    case '503':
    case '504':
    case 'timeout':
    case 'offline':
    case 'not_responding':
      return 'not_responding';
    case '500':
    case 'runtime':
    case 'runtime_error':
      return 'runtime_error';
    default:
      return null;
  }
}

export function resolveRouteState(
  pathname: string,
  search: string = '',
  hash: string = ''
): RouteResolution {
  const params = new URLSearchParams(search);
  const errPathParam = params.get('__err_path') || params.get('path');
  const errTypeParam = parseErrorKindParam(params.get('__err_type') || params.get('error'));
  const errSourceParam = params.get('__err_source');

  // 1. Handle GitHub Pages 404.html redirect or explicit error query params
  if (errPathParam || errTypeParam) {
    const requestedPath = errPathParam || pathname || '/';
    let kind: ErrorKind = errTypeParam || 'not_found';
    if (!errTypeParam) {
      if (isPdfPath(requestedPath)) {
        kind = 'pdf_not_found';
      } else if (errSourceParam === 'github') {
        kind = 'github_unavailable';
      }
    }
    return {
      view: 'all',
      error: {
        kind,
        requestedPath,
      },
    };
  }

  // Normalize pathname (remove trailing slash except root)
  const cleanPath =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname || '/';
  const lowerPath = cleanPath.toLowerCase();

  // 2. Check if pathname itself is a known valid view
  if (lowerPath in VALID_PAGE_VIEWS) {
    const resolvedView = VALID_PAGE_VIEWS[lowerPath];

    // Validate hash if present
    if (hash && hash !== '#') {
      const cleanHash = hash.replace(/^#\/?/, '').trim();
      const lowerHash = cleanHash.toLowerCase();

      // Hash-based path like #/about/founder1
      if (hash.startsWith('#/')) {
        const asPath = '/' + lowerHash;
        if (asPath in VALID_PAGE_VIEWS) {
          return { view: VALID_PAGE_VIEWS[asPath], error: null };
        }
        return {
          view: 'all',
          error: {
            kind: isPdfPath(asPath) ? 'pdf_not_found' : 'not_found',
            requestedPath: hash,
          },
        };
      }

      if (VALID_SECTION_HASHES.has(lowerHash)) {
        return {
          view: resolvedView,
          error: null,
          scrollToId: lowerHash,
        };
      }

      // Unknown hash route
      return {
        view: 'all',
        error: {
          kind: 'inactive_link',
          requestedPath: `${cleanPath}${hash}`,
        },
      };
    }

    return { view: resolvedView, error: null };
  }

  // 3. Unknown pathname -> determine whether PDF/asset missing vs general 404
  const fullRequested = `${cleanPath}${search}${hash}`;
  if (isPdfPath(cleanPath)) {
    return {
      view: 'all',
      error: {
        kind: 'pdf_not_found',
        requestedPath: fullRequested,
      },
    };
  }

  return {
    view: 'all',
    error: {
      kind: 'not_found',
      requestedPath: fullRequested,
    },
  };
}

export function classifyResourceResponse(
  url: string,
  status: number,
  contentType: string | null,
  isOffline: boolean = false
): ErrorKind | null {
  if (isOffline || status === 0) {
    return 'not_responding';
  }
  if (status === 408 || status === 502 || status === 503 || status === 504) {
    return 'not_responding';
  }

  const expectsPdfOrAsset = isDocumentOrAssetPath(url);
  const ct = (contentType || '').toLowerCase();

  // Vite/SPA servers often return 200 text/html (index.html fallback) for missing static files!
  if (expectsPdfOrAsset && ct.includes('text/html')) {
    return isPdfPath(url) ? 'pdf_not_found' : 'not_found';
  }

  if (status === 404 || status === 410) {
    return isPdfPath(url) ? 'pdf_not_found' : 'not_found';
  }

  if (status >= 400) {
    return isPdfPath(url) ? 'pdf_not_found' : 'not_responding';
  }

  return null;
}

export function getErrorDescriptor(error: AppErrorState): ErrorDescriptor {
  switch (error.kind) {
    case 'pdf_not_found':
      return {
        badge: `${error.statusCode || '404'} · PDF Document Not Available`,
        title: 'This document took an unexpected detour',
        message:
          error.detail ||
          'The requested PDF file, certificate, or academic report is currently unavailable, archived, or not uploaded yet on this server. Choose one of the quick paths below or contact Mr. Jigyasu Vatsa for verified access.',
        icon: 'file-x',
      };
    case 'inactive_link':
      return {
        badge: 'Link Unavailable · Not Active',
        title: 'This link is currently not active',
        message:
          error.detail ||
          'The destination link or portal you selected is either under deployment, scheduled for an upcoming release, or no longer active. Choose one of the quick paths below to continue exploring smoothly.',
        icon: 'link-off',
      };
    case 'github_unavailable':
      return {
        badge: `${error.statusCode || '404'} · GitHub Page Not Available`,
        title: 'This route took an unexpected detour',
        message:
          error.detail ||
          'The GitHub Pages route or resource you requested is unavailable, moved, or not published on jigyasu.jigsy.in. Choose one of the quick paths below to continue exploring smoothly.',
        icon: 'compass',
      };
    case 'not_responding':
      return {
        badge: `${error.statusCode || '503'} · Resource Not Responding`,
        title: 'The requested resource is not responding',
        message:
          error.detail ||
          'We could not reach the requested page, file, or network endpoint right now (offline, timed out, or server unavailable). Please check your connection or use one of the quick paths below.',
        icon: 'wifi-off',
      };
    case 'runtime_error':
      return {
        badge: '500 · Unexpected Application Error',
        title: 'This view took an unexpected detour',
        message:
          error.detail ||
          'An unexpected client-side issue interrupted this section. Your navigation remains safe — choose one of the quick paths below to return smoothly.',
        icon: 'alert',
      };
    case 'not_found':
    default:
      return {
        badge: `${error.statusCode || '404'} · Page Not Found`,
        title: 'This route took an unexpected detour',
        message:
          error.detail ||
          'The page or link you requested is either unavailable, moved, or no longer active on JIGSY INDIA. Choose one of the quick paths below to continue exploring smoothly.',
        icon: 'compass',
      };
  }
}
