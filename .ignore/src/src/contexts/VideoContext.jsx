// src/context/VideoChatContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import WebRTCService from '../services/WebRTCService';
import SignalingService from '../services/SignalingService';
import { useAuth } from './AuthContext';

const VideoChatContext = createContext(null);

export const VideoChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [callStatus, setCallStatus] = useState({
    inCall: false,
    videoEnabled: false,
    audioEnabled: false,
    connecting: false,
    error: null
  });
  
  const [services, setServices] = useState({
    webrtc: null,
    signaling: null
  });
  
  const initializeServices = useCallback(async () => {
    if (!user?.username) return;
    
    try {
      setCallStatus(prev => ({ ...prev, connecting: true }));
      
      // Initialize services
      const webrtc = new WebRTCService(user.username);
      const signaling = new SignalingService(import.meta.env.VITE_APP_SIGNALING_SERVER);
      
      // Connect to signaling server
      await signaling.connect(user.username);
      
      // Initialize WebRTC connection
      await webrtc.initializeConnection();
      
      setServices({ webrtc, signaling });
      setCallStatus(prev => ({ 
        ...prev, 
        connecting: false,
        error: null 
      }));
      
    } catch (error) {
      setCallStatus(prev => ({
        ...prev,
        connecting: false,
        error: error.message
      }));
    }
  }, [user]);

  const startCall = useCallback(async () => {
    if (!services.webrtc || !services.signaling) {
      throw new Error('Services not initialized');
    }

    try {
      // Get user media
      const localStream = await services.webrtc.getUserMedia();
      
      // Create and send offer
      const offer = await services.webrtc.createOffer();
      await services.signaling.sendOffer(offer);
      
      setCallStatus(prev => ({
        ...prev,
        inCall: true,
        videoEnabled: true,
        audioEnabled: true
      }));
      
    } catch (error) {
      setCallStatus(prev => ({
        ...prev,
        error: error.message
      }));
      throw error;
    }
  }, [services]);

  const endCall = useCallback(() => {
    if (!services.webrtc) return;

    services.webrtc.cleanup();
    setCallStatus({
      inCall: false,
      videoEnabled: false,
      audioEnabled: false,
      connecting: false,
      error: null
    });
  }, [services]);

  const toggleVideo = useCallback(() => {
    if (!services.webrtc?.localStream) return;

    const tracks = services.webrtc.localStream.getVideoTracks();
    const newEnabled = !callStatus.videoEnabled;
    
    tracks.forEach(track => track.enabled = newEnabled);
    setCallStatus(prev => ({
      ...prev,
      videoEnabled: newEnabled
    }));
  }, [services, callStatus.videoEnabled]);

  const toggleAudio = useCallback(() => {
    if (!services.webrtc?.localStream) return;

    const tracks = services.webrtc.localStream.getAudioTracks();
    const newEnabled = !callStatus.audioEnabled;
    
    tracks.forEach(track => track.enabled = newEnabled);
    setCallStatus(prev => ({
      ...prev,
      audioEnabled: newEnabled
    }));
  }, [services, callStatus.audioEnabled]);

  const value = {
    callStatus,
    initializeServices,
    startCall,
    endCall,
    toggleVideo,
    toggleAudio,
    services
  };

  return (
    <VideoChatContext.Provider value={value}>
      {children}
    </VideoChatContext.Provider>
  );
};

export const useVideoChat = () => {
  const context = useContext(VideoChatContext);
  if (!context) {
    throw new Error('useVideoChat must be used within VideoChatProvider');
  }
  return context;
};

export default VideoChatContext;