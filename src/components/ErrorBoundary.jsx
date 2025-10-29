import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // You can also log to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} resetError={() => this.setState({ hasError: false, error: null, errorInfo: null })} />;
    }

    return this.props.children;
  }
}

// Error Fallback UI Component
const ErrorFallback = ({ error, resetError }) => {
  const navigate = useNavigate();

  const handleReset = () => {
    resetError();
    window.location.reload();
  };

  const handleGoHome = () => {
    resetError();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-purple-900 to-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 shadow-2xl">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-500/20 p-4 rounded-full">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Oops! Something went wrong
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-center mb-8">
          We encountered an unexpected error. Our team has been notified and we're working on a fix.
        </p>

        {/* Error Details (in development mode) */}
        {process.env.NODE_ENV === 'development' && error && (
          <div className="bg-gray-900/50 border border-red-500/30 rounded-lg p-4 mb-6 overflow-auto max-h-40">
            <p className="text-red-400 text-sm font-mono wrap-break-word">
              {error.toString()}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-purple-500/50"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
        </div>

        {/* Support Message */}
        <p className="text-gray-400 text-sm text-center mt-8">
          If this problem persists, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default ErrorBoundary;
