// src/components/VideoChat/ChatMessageList.jsx
import PropTypes from 'prop-types';
import { ChatMessage } from './ChatMessage';

export function ChatMessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
      {messages.map((msg, i) => (
        <ChatMessage key={i} message={msg} />
      ))}
    </div>
  );
}

ChatMessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};