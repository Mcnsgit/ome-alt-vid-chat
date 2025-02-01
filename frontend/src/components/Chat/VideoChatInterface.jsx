import { useState, useEffect, useRef, useCallback } from 'react';
import { VideoChatService } from '../../services/VideoChatService';
import { VideoControls } from './VideoChat/VideoControls';
import { VideoDisplay } from './VideoChat/VideoDisplay';
import { ChatSidebar } from './VideoChat/ChatSidebar';
import { VideoChatLayout } from './VideoChat/VideoChatLayout';

export function VideoChatInterface() {
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

  const setupCallbacks = useCallback(() => {
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
  }, [videoChatService]);

  const handleMediaError = useCallback((error) => {
    console.error('Media error:', error);
    setSystemMessage(`Media error: ${error.message}. Please check your camera and microphone permissions.`);
  }, []);

  // Initialize video chat
  useEffect(() => {
    let mounted = true; // For cleanup and preventing state updates after unmount
    
    async function initializeVideoChat() {
      try {
        setupCallbacks();
        const stream = await videoChatService.initialize();
        if (mounted) {
          setLocalStream(stream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        }
      } catch (error) {
        if (mounted) {
          handleMediaError(error);
        }
      }
    }
  
    initializeVideoChat();
  
    // Cleanup function
    return () => {
      mounted = false;
      // Only cleanup localStream if it exists
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      videoChatService.cleanup();
    };
  }, [videoChatService, setupCallbacks, handleMediaError, localStream]);

  // Clean up callbacks
  useEffect(() => {
    return () => {
      videoChatService.onPartnerConnected = null;
      videoChatService.onPartnerDisconnected = null;
      videoChatService.onStreamReceived = null;
      videoChatService.onError = null;
      videoChatService.onSystemMessage = null;
    };
  }, [videoChatService]);

  // Handle remote stream
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

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

  if (!localStream) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-xl mb-4">Camera Access Required</h2>
          <p>{systemMessage || 'Please allow access to your camera and microphone to use video chat.'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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