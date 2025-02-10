// src/hooks/useMediaStream.js
import { useCallback } from 'react';

export const useMediaStream = (updateCallStatus) => {
  const toggleTrack = useCallback((type, stream, callStatus) => {
    if (!stream) return;
    
    const tracks = type === 'video' 
      ? stream.getVideoTracks() 
      : stream.getAudioTracks();
    
    const isEnabled = type === 'video' 
      ? !callStatus.videoEnabled 
      : !callStatus.audioEnabled;
    
    tracks.forEach(track => {
      track.enabled = isEnabled;
    });

    updateCallStatus({
      ...callStatus,
      [type === 'video' ? 'videoEnabled' : 'audioEnabled']: isEnabled
    });
  }, [updateCallStatus]);

  const stopAllTracks = useCallback((stream) => {
    if (!stream) return;
    stream.getTracks().forEach(track => track.stop());
  }, []);

  return { toggleTrack, stopAllTracks };
};