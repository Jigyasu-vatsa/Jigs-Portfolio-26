import React, { useState, useRef, useEffect } from 'react';
import {
  ExternalLink,
  ChevronDown,
  Layers,
  Globe,
  Building2,
  Sparkles,
  Compass,
} from 'lucide-react';

export interface NexusLinkItem {
  id: string;
  name: string;
  url: string;
  displayUrl: string;
  description: string;
  badge?: string;
  isExternal?: boolean;
  icon: 'globe' | 'building' | 'builder';
}

export const NEXUS_LINKS: NexusLinkItem[] = [
  {
    id: 'previous-portfolio',
    name: "Jigyasu's Previous Portfolio",
    url: 'https://jigyasu1.jigsy.in',
    displayUrl: 'jigyasu1.jigsy.in',
    description: 'Archive & foundational engineering milestones',
    badge: 'Archive',
    isExternal: true,
    icon: 'globe',
  },
  {
    id: 'about-jigsy-india',
    name: 'About at JIGSY INDIA',
    url: 'https://jigsy.in',
    displayUrl: 'jigsy.in',
    description: 'DPIIT recognized enterprise & startup initiatives',
    badge: 'Enterprise',
    isExternal: true,
    icon: 'building',
  },
  {
    id: 'about-portfolio-builder',
    name: 'About at Portfolio Builder',
    url: '#projects',
    displayUrl: 'jigsy.in/builder',
    description: 'Modular academic dossier & full-stack architecture',
    badge: 'Stack',
    isExternal: false,
    icon: 'builder',
  },
];

interface PortfolioNexusDropdownProps {
  variant?: 'header' | 'hero' | 'footer' | 'mobile';
  align?: 'left' | 'right';
  className?: string;
}

export const PortfolioNexusDropdown: React.FC<PortfolioNexusDropdownProps> = ({
  variant = 'header',
  align = 'left',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Hover to display: clear pending close timer and open dropdown
  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsOpen(true);
  };

  // Out-of-box mouse dropdown collapse: delay slightly for smooth cursor transit, then close
  const handleMouseLeave = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, [isOpen]);

  const renderIcon = (type: NexusLinkItem['icon']) => {
    switch (type) {
      case 'globe':
        return <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />;
      case 'building':
        return <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'builder':
        return <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
    }
  };

  // Variant 1: Header Dropdown
  if (variant === 'header') {
    return (
      <div
        className={`relative ${className}`}
        ref={dropdownRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          title="Explore Portfolio Nexus (Related Portfolios)"
          className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/70 dark:hover:bg-indigo-900/70 dark:text-indigo-300 dark:border-indigo-800/80 transition-colors shadow-sm shrink-0 cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-spin-slow" />
          <span className="font-semibold">Nexus</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-indigo-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div
            className={`absolute top-full pt-1.5 z-50 ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
          >
            <div className="w-72 sm:w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 animate-pop-larger text-left">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-indigo-700 dark:text-indigo-400 font-bold">
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  <span>Portfolio Nexus</span>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  3 Portals
                </span>
              </div>

              <div className="py-1 space-y-1">
                {NEXUS_LINKS.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    onClick={() => setIsOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      {renderIcon(item.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 truncate">
                          {item.name}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug line-clamp-1">
                        {item.description}
                      </p>
                      <div className="text-[9px] font-mono text-cyan-700 dark:text-cyan-400/80 mt-0.5 flex items-center gap-1">
                        <span>{item.displayUrl}</span>
                        {item.isExternal && <ExternalLink className="w-2.5 h-2.5" />}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Variant 2: Hero CTA Button Dropdown
  if (variant === 'hero') {
    return (
      <div
        className={`relative ${className}`}
        ref={dropdownRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 dark:text-cyan-300 dark:hover:text-white dark:bg-cyan-950/60 dark:hover:bg-cyan-900/60 dark:border-cyan-800/80 rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Compass className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
          <span>Nexus</span>
          <ChevronDown
            className={`w-4 h-4 text-indigo-500 dark:text-cyan-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div
            className={`absolute top-full pt-1.5 z-50 ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
          >
            <div className="w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2.5 animate-pop-larger text-left">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-700 dark:text-cyan-400 font-bold block">
                    Portfolio Nexus Directory
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Related Portfolios &amp; Digital Addresses
                  </span>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">
                  3 Portals
                </span>
              </div>

              <div className="py-1.5 space-y-1">
                {NEXUS_LINKS.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    onClick={() => setIsOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      {renderIcon(item.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-400 truncate">
                          {item.name}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
                        {item.description}
                      </p>
                      <div className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 mt-1 flex items-center gap-1 font-medium">
                        <span>{item.displayUrl}</span>
                        {item.isExternal && <ExternalLink className="w-3 h-3" />}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Variant 3: Footer or Static List
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>Nexus (Related Portfolios)</span>
        </span>
        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/80">
          3 Portals
        </span>
      </div>
      <ul className="space-y-1.5">
        {NEXUS_LINKS.map((item) => (
          <li key={item.id}>
            <a
              href={item.url}
              target={item.isExternal ? '_blank' : undefined}
              rel={item.isExternal ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-between text-slate-600 hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300 group py-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              <div>
                <div className="font-medium text-xs text-slate-800 group-hover:text-cyan-700 dark:text-slate-200 dark:group-hover:text-cyan-300 flex items-center gap-1.5">
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  {item.displayUrl}
                </div>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-600 dark:text-slate-500 dark:group-hover:text-cyan-300 ml-1 shrink-0" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
