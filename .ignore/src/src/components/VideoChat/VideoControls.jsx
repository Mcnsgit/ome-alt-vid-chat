// src/components/VideoChat/VideoControls.jsx
import PropTypes from 'prop-types';
import ControlButton from '../layout/common/buttons/ControlButton';

const VideoControls = ({
  callStatus,
  onVideoToggle,
  onAudioToggle,
  onEndCall
}) => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
      {/* Video Toggle */}
      <ControlButton
        icon={callStatus?.videoEnabled ? 'videocam' : 'videocam_off'}
        onClick={onVideoToggle}
        active={callStatus?.videoEnabled}
        tooltip="Toggle Video"
        className="transition-transform hover:scale-105"
      />
      
      {/* Audio Toggle */}
      <ControlButton 
        icon={callStatus?.audioEnabled ? 'mic' : 'mic_off'}
        onClick={onAudioToggle}
        active={callStatus?.audioEnabled}
        tooltip="Toggle Audio"
        className="transition-transform hover:scale-105"
      />
      
      {/* End Call */}
      <ControlButton
        icon="call_end"
        onClick={onEndCall}
        tooltip="End Call"
        className="bg-red-600 hover:bg-red-700 transition-all hover:scale-105"
      />
    </div>
  );
};

VideoControls.propTypes = {
  callStatus: PropTypes.shape({
    videoEnabled: PropTypes.bool,
    audioEnabled: PropTypes.bool,
    inCall: PropTypes.bool
  }).isRequired,
  onVideoToggle: PropTypes.func.isRequired,
  onAudioToggle: PropTypes.func.isRequired,
  onEndCall: PropTypes.func.isRequired
};

export default VideoControls;