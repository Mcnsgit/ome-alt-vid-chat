// src/components/VideoChat/ChatSidebar.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ChatMessageList } from './ChatMessageList';
import { ChatInput } from './ChatInput';
import PropTypes from 'prop-types';


export function ChatSidebar({
  messages,
  systemMessage,
  onSendMessage,
  onClose
}) {
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <motion.div
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      className="lg:col-span-1 bg-gray-800 rounded-lg p-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Chat</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      {systemMessage && (
        <div className="bg-gray-700/50 rounded p-2 mb-4 text-sm">
          {systemMessage}
        </div>
      )}

      <div className="flex flex-col h-[calc(100vh-300px)]">
        <ChatMessageList messages={messages} />
        <ChatInput 
          value={inputMessage}
          onChange={setInputMessage}
          onSubmit={handleSubmit}
        />
      </div>
    </motion.div>
  );
}

ChatSidebar.propTypes = {
  messages: PropTypes.array.isRequired,
  systemMessage: PropTypes.string,
  onSendMessage: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};