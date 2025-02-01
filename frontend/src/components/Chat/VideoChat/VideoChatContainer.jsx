// src/components/VideoChat/VideoChatContainer.jsx
import PropTypes from 'prop-types';

export function VideoChatContainer({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}

VideoChatContainer.propTypes = {
  children: PropTypes.node.isRequired,
};