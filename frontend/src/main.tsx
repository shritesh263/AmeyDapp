import { Buffer } from 'buffer';
(globalThis as any).Buffer = Buffer;
(globalThis as any).global = globalThis;
(globalThis as any).process = (globalThis as any).process || { env: {} };

import { Component, type ErrorInfo, type ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './App.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', color: '#e8edf8', fontFamily: 'sans-serif' }}>
          <h1 style={{ color: '#f87171', fontSize: '24px', marginBottom: '12px' }}>Something went wrong</h1>
          <p style={{ color: '#b0bcd4', marginBottom: '16px' }}>
            {this.state.error?.message || 'An unexpected error occurred while loading the application.'}
          </p>
          <pre style={{ background: 'rgba(0,0,0,0.6)', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '13px', color: '#fbbf24' }}>
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '20px', padding: '10px 20px', background: '#4f7fff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
          >
            Reload Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
}
