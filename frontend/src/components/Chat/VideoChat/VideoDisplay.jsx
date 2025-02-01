// src/components/VideoChat/VideoDisplay.jsx
import PropTypes from 'prop-types';

export function VideoDisplay({ videoRef, stream, isMuted, isLocal }) {
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
  videoRef: PropTypes.any,
  stream: PropTypes.any,
  isMuted: PropTypes.bool,
  isLocal: PropTypes.bool
}