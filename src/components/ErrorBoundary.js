import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="main-content" role="main">
          <div
            className="error-fallback"
            role="alert"
            style={{
              padding: '2rem',
              textAlign: 'center',
              minHeight: '40vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h1>문제가 발생했습니다</h1>
            <p>잠시 후 다시 시도해 주세요.</p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
            >
              다시 시도
            </button>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
