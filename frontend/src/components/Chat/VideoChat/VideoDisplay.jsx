// src/components/VideoChat/VideoDisplay.jsx
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export function VideoDisplay({ videoRef, stream, isMuted, isLocal }) {
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, videoRef]);

  return (
    <div className={`relative ${isLocal ? 'w-48' : 'w-full'} bg-gray-800 rounded-lg overflow-hidden`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isMuted}
        className="w-full h-full object-cover"
      />
      {!stream && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p>{isLocal ? 'Camera not available' : 'Waiting for partner...'}</p>
        </div>
      )}
    </div>
  );
}

VideoDisplay.propTypes = {
  videoRef: PropTypes.object.isRequired,
  stream: PropTypes.object,
  isMuted: PropTypes.bool,
  isLocal: PropTypes.bool
};