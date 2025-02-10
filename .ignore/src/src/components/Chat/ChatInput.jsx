// src/components/VideoChat/ChatInput.jsx
import PropTypes from 'prop-types';


export function ChatInput({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mt-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-gray-700 rounded-lg px-4 py-2"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 rounded-lg px-4 py-2"
        >
          Send
        </button>
      </div>
    </form>
  );
}

ChatInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};