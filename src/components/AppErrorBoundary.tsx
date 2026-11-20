import React from 'react';
import { ErrorDetourPage } from './ErrorDetourPage';
import { JigsyParentNavbar } from './JigsyParentNavbar';
import { JigsyParentFooter } from './JigsyParentFooter';
import { ParentLanguage } from '../data/parentCompanyData';

interface AppErrorBoundaryProps {
  children: React.ReactNode;
  isDark: boolean;
  onToggleTheme: () => void;
  language: ParentLanguage;
  onLanguageChange: (lang: ParentLanguage) => void;
  onReturnHome: () => void;
  onExploreResearch: () => void;
  onOpenContact: () => void;
}

interface AppErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class AppErrorBoundary extends React.Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error?.message || 'An unexpected rendering error occurred.',
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('[Portfolio ErrorBoundary]', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  render() {
    if (this.state.hasError) {
      const currentPath =
        typeof window !== 'undefined'
          ? `${window.location.pathname}${window.location.search}${window.location.hash}`
          : '/';
      return (
        <>
          <JigsyParentNavbar
            language={this.props.language}
            onLanguageChange={this.props.onLanguageChange}
            isDark={this.props.isDark}
            onToggleTheme={this.props.onToggleTheme}
            onOpenContact={() => {
              this.handleReset();
              this.props.onOpenContact();
            }}
          />
          <main className="relative z-10 max-w-full overflow-x-hidden">
            <ErrorDetourPage
              error={{
                kind: 'runtime_error',
                requestedPath: currentPath,
                detail: `An unexpected error occurred while rendering this section (${this.state.errorMessage}). Choose one of the quick paths below to continue smoothly.`,
              }}
              onReturnHome={() => {
                this.handleReset();
                this.props.onReturnHome();
              }}
              onExploreResearch={() => {
                this.handleReset();
                this.props.onExploreResearch();
              }}
              onOpenContact={() => {
                this.handleReset();
                this.props.onOpenContact();
              }}
              onRetry={this.handleReset}
            />
          </main>
          <JigsyParentFooter
            language={this.props.language}
            onReturnPortfolioHome={() => {
              this.handleReset();
              this.props.onReturnHome();
            }}
          />
        </>
      );
    }

    return this.props.children;
  }
}
