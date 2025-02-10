//import React, { useEffect, useState, useCallback } from 'react';
//import { useNavigate } from 'react-router-dom';
//import VideoRoom from './components/VideoRoom';
//import usePeerConnection from '../../hooks/usePeerConnection';
//import useMediaStream from '../../hooks/useMediaStream';
//import { VideoProvider } from '../../context/VideoContext.jsx';

//const RandomVideoChat = () => {
//  const navigate = useNavigate();
//  const [isJoined, setIsJoined] = useState(false);
//  const [userName, setUserName] = useState('');
//  const [availablePeers, setAvailablePeers] = useState([]);

//  const { 
//    localStream,
//    remoteStream, 
//    peerConnection,
//    createPeerConnection,
//    handleStreamSetup
//  } = usePeerConnection();

//  const {
//    startLocalStream,
//    stopLocalStream,
//    toggleVideo,
//    toggleAudio
//  } = useMediaStream();

//  const handleJoin = useCallback(async () => {
//    const name = prompt("Enter username");
//    if (name) {
//      setUserName(name);
//      setIsJoined(true);
//      await startLocalStream();
//      createPeerConnection(name);
//    }
//  }, [startLocalStream, createPeerConnection]);

//  const handleStartCall = useCallback(async () => {
//    if (!localStream || !peerConnection) return;
//    try {
//      await handleStreamSetup('offer');
//      navigate('/call/offer');
//    } catch (err) {
//      console.error('Failed to start call:', err);
//    }
//  }, [localStream, peerConnection, handleStreamSetup, navigate]);

//  const handleAnswerCall = useCallback(async (peerId) => {
//    if (!localStream || !peerConnection) return;
//    try {
//      await handleStreamSetup('answer', peerId);
//      navigate('/call/answer');
//    } catch (err) {
//      console.error('Failed to answer call:', err);
//    }
//  }, [localStream, peerConnection, handleStreamSetup, navigate]);

//  const handleEndCall = useCallback(() => {
//    stopLocalStream();
//    if (peerConnection) {
//      peerConnection.close();
//    }
//    navigate('/');
//  }, [peerConnection, stopLocalStream, navigate]);

//  if (!isJoined) {
//    return (
//      <div className="flex items-center justify-center min-h-screen">
//        <button 
//          onClick={handleJoin}
//          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//        >
//          Join Random Chat
//        </button>
//      </div>
//    );
//  }

//  return (
//    <VideoProvider value={{
//      localStream,
//      remoteStream,
//      peerConnection,
//      userName,
//      toggleVideo,
//      toggleAudio,
//      handleEndCall
//    }}>
//      <div className="container mx-auto p-4">
//        <h1 className="text-2xl mb-4">Welcome {userName}</h1>
        
//        <div className="grid grid-cols-2 gap-4">
//          <div>
//            <h2 className="text-xl mb-2">Start a Chat</h2>
//            <button 
//              onClick={handleStartCall}
//              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//            >
//              Start Random Chat
//            </button>
//          </div>
          
//          <div>
//            <h2 className="text-xl mb-2">Available Chats</h2>
//            {availablePeers.map((peer) => (
//              <button
//                key={peer.id}
//                onClick={() => handleAnswerCall(peer.id)}
//                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded block mb-2"
//              >
//                Chat with {peer.userName}
//              </button>
//            ))}
//          </div>
//        </div>

//        <VideoRoom />
//      </div>
//    </VideoProvider>
//  );
//};

//export default RandomVideoChat;