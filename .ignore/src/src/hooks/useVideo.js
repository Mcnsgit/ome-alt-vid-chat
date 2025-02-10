import { createContext, useContext } from 'react';

const VideoChatContext = createContext(null);

export const useVideoChat = () => {
  const context = useContext(VideoChatContext);
  if (!context) {
    throw new Error('useVideoChat must be used within VideoChatProvider');
  }
  return context;
};
