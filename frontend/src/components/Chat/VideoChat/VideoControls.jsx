import { motion } from "framer-motion";
import { Mic, MicOff, Video, VideoOff, MessageSquare, UserPlus } from "lucide-react";
import PropTypes from "prop-types";

export function VideoControls({ 
    isAudioEnabled, 
    isVideoEnabled, 
    onToggleAudio, 
    onToggleVideo,
    onNextPartner,
    onToggleChat 
  }) {
    return (
      <div className="flex justify-center gap-4 py-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleAudio}
          className="p-3 rounded-full bg-gray-700 hover:bg-gray-600"
        >
          {isAudioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
        </motion.button>
  
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleVideo}
          className="p-3 rounded-full bg-gray-700 hover:bg-gray-600"
        >
          {isVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
        </motion.button>
  
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNextPartner}
          className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700"
        >
          <UserPlus size={20} />
        </motion.button>
  
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleChat}
          className="p-3 rounded-full bg-gray-700 hover:bg-gray-600"
        >
          <MessageSquare size={20} />
        </motion.button>
      </div>
    );
}
  
  VideoControls.propTypes = {
    isAudioEnabled: PropTypes.bool.isRequired,
    isVideoEnabled: PropTypes.bool.isRequired,
    onToggleAudio: PropTypes.func.isRequired,
    onToggleVideo: PropTypes.func.isRequired,
    onNextPartner: PropTypes.func.isRequired,
    onToggleChat: PropTypes.func.isRequired,
  };