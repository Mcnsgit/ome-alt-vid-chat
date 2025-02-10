import { useState, useEffect, useRef } from 'react';
import HangupButton from './HangupButton'
import socket from '../../../../../services/SignalilngService';
import VideoButton from './VideoButton';
import AudioButton from './AudioButton';
import PropTypes from 'prop-types';

const ActionButtons = ({callStatus,localFeedEl, remoteFeedEl,updateCallStatus,localStream,peerConnection})=>{
    // const callStatus = useSelector(state=>state.callStatus);
    const menuButtons = useRef(null)

    return(
        <div id="menu-buttons" ref={menuButtons} className="row">
            <div className="left col-6">
                <AudioButton 
                    localFeedEl={localFeedEl}
                    callStatus={callStatus}
                    updateCallStatus={updateCallStatus}
                    localStream={localStream}
                    peerConnection={peerConnection}                    
                />
                <VideoButton 
                    localFeedEl={localFeedEl}
                    callStatus={callStatus}
                    localStream={localStream}
                    updateCallStatus={updateCallStatus}
                    peerConnection={peerConnection}
                />
            </div>
            <div className="center justify-center text-end col-2 hangup-wrapper">
                <HangupButton
                    localFeedEl={localFeedEl}
                    remoteFeedEl={remoteFeedEl}
                    peerConnection={peerConnection}
                    callStatus={callStatus}
                    updateCallStatus={updateCallStatus}
                />
            </div>        
        </div>
    )
}

ActionButtons.propTypes = {
    callStatus: PropTypes.shape({
        video: PropTypes.string,
        audio: PropTypes.string,
        videoEnabled: PropTypes.bool,
        audioEnabled: PropTypes.bool,
        inCall: PropTypes.bool
    }).isRequired,
    localFeedEl: PropTypes.object,
    remoteFeedEl: PropTypes.object,
    updateCallStatus: PropTypes.func,
    localStream: PropTypes.object,
    peerConnection: PropTypes.object
}
export default ActionButtons;