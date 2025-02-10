//// src/services/VideoChatService.js
const STUN_SERVERS = {
  iceServers: [
    {
      urls: [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302'
      ]
    }
  ]
};

class WebRTCService {
  constructor(userName) {
    this.userName = userName;
    this.peerConnection = null;
    this.localStream = null;
    this.remoteStream = null;
  }

  async initializeConnection() {
    try {
      this.peerConnection = new RTCPeerConnection(STUN_SERVERS);
      this.remoteStream = new MediaStream();
      
      // Set up event listeners
      this.setupEventListeners();
      
      return {
        peerConnection: this.peerConnection,
        remoteStream: this.remoteStream
      };
    } catch (error) {
      console.error('Failed to initialize WebRTC connection:', error);
      throw error;
    }
  }

  async getUserMedia(constraints = { video: true, audio: true }) {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
      return this.localStream;
    } catch (error) {
      console.error('Failed to get user media:', error);
      throw error;
    }
  }

  setupEventListeners() {
    // ICE candidate events
    this.peerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        this.onIceCandidate(candidate);
      }
    };

    // Track events 
    this.peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach(track => {
        this.remoteStream.addTrack(track);
      });
    };

    // Connection state changes
    this.peerConnection.onconnectionstatechange = () => {
      console.log('Connection state:', this.peerConnection.connectionState);
    };
  }

  async createOffer() {
    try {
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      return offer;
    } catch (error) {
      console.error('Error creating offer:', error);
      throw error;
    }
  }

  async handleAnswer(answer) {
    try {
      await this.peerConnection.setRemoteDescription(answer);
    } catch (error) {
      console.error('Error handling answer:', error);
      throw error;
    }
  }

  async createAnswer(offer) {
    try {
      await this.peerConnection.setRemoteDescription(offer);
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      return answer;
    } catch (error) {
      console.error('Error creating answer:', error);
      throw error;
    }
  }

  onIceCandidate(candidate) {
    // Implementation will depend on your signaling server
    console.log('New ICE candidate:', candidate);
  }

  cleanup() {
    if (this.peerConnection) {
      this.peerConnection.close();
    }
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }
  }
}

export default WebRTCService;
//import { io } from 'socket.io-client';
//import Peer from 'simple-peer/simplepeer.min.js';

//export default class VideoChatService {
//  constructor() {
//    this.socket = null;
//    this.peer = null;
//    this.localStream = null;
//    this.currentCall = null;
//    this.hasPartner = false;
//    this.isVideoChat = false;
//    this.isInitialized = false;
//    this.serverUrl = import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:3000';

//    // Callbacks to be set by the component
//    this.onPartnerConnected = null;
//    this.onPartnerDisconnected = null;
//    this.onStreamReceived = null;
//    this.onError = null;
//    this.onSystemMessage = null;
//  }

//  async initialize() {
//    try {
//      // Get media stream first
//      this.localStream = await this.getMediaStream();
      
//      // Initialize socket connection
//      this.socket = io(this.serverUrl, {
//        transports: ['websocket'],
//        upgrade: false
//      });

//      this.setupSocketListeners();
//      this.isInitialized = true;
      
//      return this.localStream;
//    } catch {
//      console.error('VideoChatService initialization error:', error);
//      throw error;
//    }
//  }

//  async getMediaStream() {
//    try {
//      return await navigator.mediaDevices.getUserMedia({
//        video: true,
//        audio: true
//      });
//    } catch (error) {
//      throw new Error('Failed to access camera and microphone');
//    }
//  }

//  setupSocketListeners() {
//    this.socket.on('connect', () => {
//      console.log('Connected to server');
//      this.socket.emit('info', { isVideoChat: true });
//    });

//    this.socket.on('sysinfo', (code) => {
//      switch (code) {
//        case 'partner_connected':
//          this.hasPartner = true;
//          this.onPartnerConnected?.();
//          break;
//        case 'partner_disconnected':
//          this.disconnectFromPartner();
//          break;
//        case 'waiting_partner':
//          this.hasPartner = false;
//          break;
//      }
//      this.onSystemMessage?.(code);
//    });

//    this.socket.on('videochat_init', () => {
//      this.initializePeerConnection(false);
//    });

//    this.socket.on('videochat_offer', async (data) => {
//      await this.handleVideoOffer(data);
//    });

//    this.socket.on('videochat_offer_response', (answer) => {
//      this.peer?.signal(answer);
//    });

//    this.socket.on('videochat_ice', (candidate) => {
//      this.peer?.addIceCandidate(candidate);
//    });

//    this.socket.on('msg', (message) => {
//      // Handle incoming messages
//      console.log('Received message:', message);
//    });
//  }

//  async initializePeerConnection(isInitiator) {
//    try {
//      this.peer = new Peer({
//        initiator: isInitiator,
//        stream: this.localStream,
//        trickle: true,
//        config: {
//          iceServers: [
//            { urls: 'stun:stun.l.google.com:19302' },
//            { urls: 'stun:stun1.l.google.com:19302' }
//          ]
//        }
//      });

//      this.setupPeerListeners();
//    } catch (error) {
//      console.error('Peer connection error:', error);
//      this.onError?.(error);
//    }
//  }

//  setupPeerListeners() {
//    this.peer.on('signal', (data) => {
//      if (this.peer.initiator) {
//        this.socket.emit('videochat_offer', data);
//      } else {
//        this.socket.emit('videochat_offer_ok', data);
//      }
//    });

//    this.peer.on('stream', (stream) => {
//      this.onStreamReceived?.(stream);
//    });

//    this.peer.on('close', () => {
//      this.disconnectFromPartner();
//    });

//    this.peer.on('error', (error) => {
//      this.onError?.(error);
//    });
//  }

//  nextPartner() {
//    this.disconnectFromPartner();
//    this.socket.emit('next');
//  }

//  disconnectFromPartner() {
//    if (this.peer) {
//      this.peer.destroy();
//      this.peer = null;
//    }
//    this.hasPartner = false;
//    this.onPartnerDisconnected?.();
//  }

//  toggleVideo() {
//    if (this.localStream) {
//      const videoTrack = this.localStream.getVideoTracks()[0];
//      videoTrack.enabled = !videoTrack.enabled;
//      return videoTrack.enabled;
//    }
//    return false;
//  }

//  toggleAudio() {
//    if (this.localStream) {
//      const audioTrack = this.localStream.getAudioTracks()[0];
//      audioTrack.enabled = !audioTrack.enabled;
//      return audioTrack.enabled;
//    }
//    return false;
//  }

//  sendMessage(message) {
//    if (this.hasPartner && message.trim()) {
//      this.socket.emit('msg', message);
//      return true;
//    }
//    return false;
//  }

//  cleanup() {
//    this.disconnectFromPartner();
//    if (this.localStream) {
//      this.localStream.getTracks().forEach(track => track.stop());
//    }
//    if (this.socket) {
//      this.socket.disconnect();
//    }
//    this.isInitialized = false;
//  }
//}