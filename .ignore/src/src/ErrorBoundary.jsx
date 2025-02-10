// src/components/ErrorBoundary.jsx
import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
      return (
        <div style={styles.errorContainer}>
          <h2>Something went wrong.</h2>
          <details style={styles.details}>
            {error && error.toString()}
            <br />
            {errorInfo && errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

const styles = {
  errorContainer: {
    padding: '20px',
    textAlign: 'center',
  },
  details: {
    whiteSpace: 'pre-wrap',
  },
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;