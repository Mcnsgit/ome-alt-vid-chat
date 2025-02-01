// src/components/VideoChat/SystemMessage.jsx
import PropTypes from 'prop-types';

export function SystemMessage({ message }) {
    if (!message) return null;
    
    return (
      <div className="bg-gray-700/50 rounded p-2 mb-4 text-sm">
        {message}
      </div>
    );
  }
  
  SystemMessage.propTypes = {
    message: PropTypes.string,
  };