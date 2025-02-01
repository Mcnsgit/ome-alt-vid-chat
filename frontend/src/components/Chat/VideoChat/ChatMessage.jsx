// src/components/VideoChat/ChatMessage.jsx

import PropTypes from 'prop-types';

export function ChatMessage({ message }) {
    return (
      <div className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[80%] rounded-lg p-3 ${
            message.sender === 'me' ? 'bg-indigo-600' : 'bg-gray-700'
          }`}
        >
          {message.content}
        </div>
      </div>
    );
}

ChatMessage.propTypes = {
  message: PropTypes.shape({
    sender: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};