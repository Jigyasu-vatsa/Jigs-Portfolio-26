import React, { useState } from 'react';
import {
  Compass,
  FileX2,
  Link2Off,
  WifiOff,
  AlertTriangle,
  Home,
  Layers,
  Mail,
  Sparkles,
  RefreshCw,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import {
  AppErrorState,
  getErrorDescriptor,
  JIGSY_QUICK_FACTS,
} from '../utils/errorHandling';

interface ErrorDetourPageProps {
  error: AppErrorState;
  onReturnHome: () => void;
  onExploreResearch: () => void;
  onOpenContact: () => void;
  onRetry?: () => void;
}

export const ErrorDetourPage: React.FC<ErrorDetourPageProps> = ({
  error,
  onReturnHome,
  onExploreResearch,
  onOpenContact,
  onRetry,
}) => {
  const [factIndex, setFactIndex] = useState(0);
  const descriptor = getErrorDescriptor(error);
  const currentFact = JIGSY_QUICK_FACTS[factIndex % JIGSY_QUICK_FACTS.length];

  const handleNextFact = () => {
    setFactIndex((prev) => (prev + 1) % JIGSY_QUICK_FACTS.length);
  };

  const renderIcon = () => {
    const iconClass = 'w-6 h-6 text-blue-400 dark:text-blue-400';
    switch (descriptor.icon) {
      case 'file-x':
        return <FileX2 className="w-6 h-6 text-amber-400" />;
      case 'link-off':
        return <Link2Off className="w-6 h-6 text-cyan-400" />;
      case 'wifi-off':
        return <WifiOff className="w-6 h-6 text-rose-400" />;
      case 'alert':
        return <AlertTriangle className="w-6 h-6 text-amber-400" />;
      case 'compass':
      default:
        return <Compass className={iconClass} />;
    }
  };

  return (
    <section
      aria-labelledby="error-detour-heading"
      className="relative min-h-[70vh] flex items-center justify-center px-4 sm:px-6 py-14 sm:py-20"
    >
      <div className="w-full max-w-3xl rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 border border-slate-800/90 shadow-2xl shadow-blue-950/30 backdrop-blur-xl overflow-hidden">
        {/* Top Header Band matching reference layout */}
        <div className="px-6 sm:px-8 pt-7 sm:pt-8 pb-6 border-b border-blue-500/20 bg-gradient-to-b from-blue-950/30 to-transparent">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div
              aria-hidden="true"
              className="w-12 h-12 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-center shrink-0 shadow-inner"
            >
              {renderIcon()}
            </div>

            <div className="min-w-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-blue-950/80 text-blue-300 border border-blue-500/40 mb-2.5">
                {descriptor.badge}
              </span>
              <h1
                id="error-detour-heading"
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight"
              >
                {descriptor.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="px-6 sm:px-8 py-6 sm:py-7 space-y-5">
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            {descriptor.message}
          </p>

          {/* Requested Path / Resource Monospace Box */}
          <div className="px-4 py-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
            <span className="text-slate-400 font-medium">Requested Path / Resource:</span>
            <code className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-amber-400 font-mono text-xs break-all">
              {error.requestedPath || '/'}
            </code>
          </div>

          {/* Primary Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={onReturnHome}
              className="preserve-card-text inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
            >
              <Home className="w-4 h-4 shrink-0 text-white" />
              <span className="text-white">Return to Home</span>
            </button>

            <a
              href="https://jigsy.in/sectors"
              target="_blank"
              rel="noopener noreferrer"
              data-bypass-error-guard="true"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-100 border border-slate-700 font-semibold text-sm transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 shrink-0 text-blue-400" />
              <span>Explore All 6 Sectors</span>
            </a>

            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-950/30 hover:bg-amber-950/60 text-amber-400 border border-amber-500/40 font-semibold text-sm transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>Open Contact Form</span>
            </button>

            {onRetry && (error.kind === 'not_responding' || error.kind === 'runtime_error') && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 font-semibold text-sm transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 shrink-0" />
                <span>Try Again</span>
              </button>
            )}

            {error.externalFallbackUrl && (
              <a
                href={error.externalFallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-bypass-error-guard="true"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 font-medium text-xs transition-all"
              >
                <span>Attempt External URL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Bottom Interactive Quick Fact Card */}
          <div className="mt-2 p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>WHILE YOU ARE HERE &mdash; JIGSY QUICK FACT</span>
              </div>

              <button
                type="button"
                onClick={handleNextFact}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-300" />
                <span>Show Another Fact</span>
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {currentFact.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
