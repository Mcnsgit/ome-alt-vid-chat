// src/components/VideoChat/videoChat.jsx
import { useEffect, useRef } from 'react';
import { useVideoChat } from '../../context/VideoContext';
import VideoControls from './VideoControls';

const VideoChat = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const { 
    callStatus,
    services,
    initializeServices,
    startCall,
    toggleVideo,
    toggleAudio,
    endCall 
  } = useVideoChat();

  // Debug logging
  console.log('VideoChat render:', { callStatus, services });

  useEffect(() => {
    const setupCall = async () => {
      try {
        await initializeServices();
      } catch (error) {
        console.error('Failed to initialize services:', error);
      }
    };

    if (!services.webrtc) {
      setupCall();
    }
  }, [initializeServices, services.webrtc]);

  useEffect(() => {
    if (services.webrtc && !callStatus.inCall) {
      startCall().catch(error => {
        console.error('Failed to start call:', error);
      });
    }
  }, [services.webrtc, callStatus.inCall, startCall]);

  useEffect(() => {
    if (services.webrtc) {
      if (services.webrtc.localStream) {
        localVideoRef.current.srcObject = services.webrtc.localStream;
      }
      if (services.webrtc.remoteStream) {
        remoteVideoRef.current.srcObject = services.webrtc.remoteStream;
      }
    }
  }, [services.webrtc]);

  return (
    <div className="relative w-full h-full min-h-[400px] bg-gray-900">
      {/* Remote Video */}
      <video
        ref={remoteVideoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
      />
      
      {/* Local Video */}
      <video
        ref={localVideoRef}
        className="absolute bottom-4 right-4 w-1/4 aspect-video object-cover 
                   rounded-lg border-2 border-white shadow-lg"
        autoPlay
        playsInline
        muted
      />
      
      {/* Video Controls */}
      {services.webrtc && (
        <VideoControls 
          localStream={services.webrtc.localStream}
          peerConnection={services.webrtc.peerConnection}
          callStatus={callStatus}
          onVideoToggle={toggleVideo}
          onAudioToggle={toggleAudio}
          onEndCall={endCall}
        />
      )}
      
      {/* Connection Status */}
      {(!callStatus.inCall || callStatus.error) && (
        <div className="absolute top-4 left-0 right-0 text-center">
          <div className="inline-block px-4 py-2 bg-black bg-opacity-50 
                         text-white rounded-lg">
            {callStatus.error || 'Connecting to peer...'}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoChat;