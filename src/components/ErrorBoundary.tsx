import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-gradient-to-br from-black to-chocolate-950 flex items-center justify-center p-4">
          <div className="max-w-md mx-auto text-center bg-chocolate-900/50 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gold-500/20">
            <div className="w-16 h-16 mx-auto mb-6 text-red-500">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gold-500 mb-4 font-georgian">
              რაღაც შეცდომა მოხდა
            </h1>
            <p className="text-white-300 mb-6 font-georgian">
              ბოდიშს გიხდით, რაღაც მოულოდნელი მოხდა. გთხოვთ სცადოთ გვერდის ხელახლა ჩატვირთვა.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold rounded-lg transition-colors font-georgian"
            >
              გვერდის ხელახლა ჩატვირთვა
            </button>
            {this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-gold-400 cursor-pointer font-georgian">
                  შეცდომის დეტალები (Development)
                </summary>
                <pre className="mt-2 text-xs text-white-400 bg-black/50 p-4 rounded overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 