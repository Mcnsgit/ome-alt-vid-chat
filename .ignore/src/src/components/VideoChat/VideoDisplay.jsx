// src/components/VideoChat/VideoDisplay.jsx
import { useRef, useEffect } from 'react';
import useVideoChat from '../../context/VideoContext';

const VideoDisplay = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const { services, callStatus } = useVideoChat();

  useEffect(() => {
    if (services?.webrtc) {
      localVideoRef.current.srcObject = services.webrtc.localStream;
      remoteVideoRef.current.srcObject = services.webrtc.remoteStream;
    }
  }, [services]);

  return (
    <div className="relative flex justify-center w-full max-w-6xl mx-auto aspect-video">
      {/* Remote Video */}
      <video
        ref={remoteVideoRef}
        className="w-full h-full object-cover rounded-lg bg-black"
        autoPlay
        playsInline
      />
      
      {/* Local Video */}
      <video
        ref={localVideoRef}
        className="absolute bottom-4 right-4 w-1/4 aspect-video object-cover 
                 rounded-lg border-2 border-white bg-black"
        autoPlay
        playsInline
        muted
      />
      
      {/* Connection Status */}
      {!callStatus.inCall && (
        <div className="absolute top-4 left-0 right-0 text-center">
          <div className="inline-block px-4 py-2 bg-black bg-opacity-50 
                        text-white rounded-lg">
            Waiting for connection...
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDisplay;