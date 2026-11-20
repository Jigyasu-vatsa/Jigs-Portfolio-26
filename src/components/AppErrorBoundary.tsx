import React from 'react';
import { ErrorDetourPage } from './ErrorDetourPage';

interface AppErrorBoundaryProps {
  children: React.ReactNode;
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
      );
    }

    return this.props.children;
  }
}
