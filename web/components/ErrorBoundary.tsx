import React from 'react';
import Link from 'next/link';
import styles from './ErrorBoundary.module.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <h1>⚠️ Oops!</h1>
            <p>Something went wrong while rendering this page.</p>
            {process.env.NODE_ENV === 'development' && (
              <details className={styles.errorDetails}>
                <summary>Error Details (Development Only)</summary>
                <pre>{this.state.error?.toString()}</pre>
              </details>
            )}
            <div className={styles.actions}>
              <button onClick={() => window.location.reload()} className={styles.retryBtn}>
                Try Again
              </button>
              <Link href="/" className={styles.homeLink}>
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
