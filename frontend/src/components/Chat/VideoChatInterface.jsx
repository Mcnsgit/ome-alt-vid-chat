import { useState, useEffect, useRef } from 'react';
import { VideoChatService } from '../../services/VideoChatService';
import { VideoControls } from './VideoChat/VideoControls';
import { VideoDisplay } from './VideoChat/VideoDisplay';
import { ChatSidebar } from './VideoChat/ChatSidebar';
import { VideoChatLayout } from './VideoChat/VideoChatLayout';

//import { motion } from 'framer-motion';

export function  VideoChatInterface() {
  const [videoChatService] = useState(() => new VideoChatService());
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [systemMessage, setSystemMessage] = useState('');
  
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    async function initializeVideoChat() {
      try {
        setupCallbacks();
        const stream = await videoChatService.initialize();
        setLocalStream(stream);
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        setSystemMessage(`Failed to initialize video chat: ${error.message}`);
      }
    }

    initializeVideoChat();

    return () => {
      videoChatService.cleanup();
    };
  }, [ setupCallbacks, videoChatService ]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const setupCallbacks = () => {
    videoChatService.onPartnerConnected = () => {
      setSystemMessage('Connected to a partner');
    };
    
    videoChatService.onPartnerDisconnected = () => {
      setSystemMessage('Partner disconnected');
      setRemoteStream(null);
    };
    
    videoChatService.onStreamReceived = (stream) => {
      setRemoteStream(stream);
    };
    
    videoChatService.onError = (error) => {
      setSystemMessage(`Error: ${error.message}`);
    };
    
    videoChatService.onSystemMessage = (message) => {
      setSystemMessage(message);
    };
  };

  const handleToggleVideo = () => {
    const enabled = videoChatService.toggleVideo();
    setIsVideoEnabled(enabled);
  };

  const handleToggleAudio = () => {
    const enabled = videoChatService.toggleAudio();
    setIsAudioEnabled(enabled);
  };

  const handleNextPartner = () => {
    videoChatService.findNextPartner();
  };

  const handleSendMessage = (message) => {
    if (videoChatService.sendMessage(message)) {
      setMessages(prev => [...prev, { sender: 'me', content: message }]);
    }
  };

  const videoArea = (
    <>
      <VideoDisplay
        videoRef={remoteVideoRef}
        stream={remoteStream}
        isMuted={false}
        isLocal={false}
      />
      
      <div className="absolute bottom-4 right-4">
        <VideoDisplay
          videoRef={localVideoRef}
          stream={localStream}
          isMuted={true}
          isLocal={true}
        />
      </div>

      <VideoControls
        isAudioEnabled={isAudioEnabled}
        isVideoEnabled={isVideoEnabled}
        onToggleAudio={handleToggleAudio}
        onToggleVideo={handleToggleVideo}
        onNextPartner={handleNextPartner}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
      />
    </>
  );

  const sidebar = isChatOpen ? (
    <ChatSidebar
      messages={messages}
      systemMessage={systemMessage}
      onSendMessage={handleSendMessage}
      onClose={() => setIsChatOpen(false)}
    />
  ) : null;

  return (
    <VideoChatLayout sidebar={sidebar}>
      {videoArea}
    </VideoChatLayout>
  );
}

export default VideoChatInterface;