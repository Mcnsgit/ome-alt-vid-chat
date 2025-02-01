// src/services/VideoChatService.js
import io from 'socket.io-client';
import Peer from 'peerjs';

export class VideoChatService {
  constructor() {
    this.socket = null;
    this.peer = null;
    this.localStream = null;
    this.currentCall = null;
    this.hasPartner = false;
    this.isVideoChat = false;
    this.serverURI = import.meta.env.VITE_APP_SERVER_URI || 'http://localhost:3000';
    
    // Event callbacks to be set by component
    this.onPartnerConnected = null;
    this.onPartnerDisconnected = null;
    this.onStreamReceived = null;
    this.onMessage = null;
    this.onError = null;
    this.onSystemInfo = null;
  }

  async initialize() {
    try {
      // Initialize socket connection
      this.socket = io(this.serverURI);
      this.setupSocketListeners();

      // Get media stream
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      // Initialize peer connection
      await this.initializePeerConnection();

      this.isVideoChat = true;
      this.sendLocalInfo();

      return this.localStream;
    } catch (error) {
      this.isVideoChat = false;
      this.sendLocalInfo();
      throw error;
    }
  }

  setupSocketListeners() {
    this.socket.on('msg', (msg) => {
      this.onMessage?.(msg);
    });

    this.socket.on('sysinfo', (code) => {
      this.handleSystemInfo(code);
    });

    this.socket.on('videochat_init', (offer) => {
      this.handleVideoInit(offer);
    });

    this.socket.on('videochat_offer', (offer) => {
      this.handleVideoOffer(offer);
    });

    this.socket.on('videochat_offer_response', (answer) => {
      this.handleVideoOfferResponse(answer);
    });

    this.socket.on('videochat_ice', (candidate) => {
      this.processIce(candidate);
    });

    this.socket.on('disconnect', () => {
      this.handleSystemInfo('server_disconnection');
    });
  }

  async initializePeerConnection() {
    this.peer = new Peer({
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' },
          { urls: 'stun:stun3.l.google.com:19302' }
        ]
      }
    });

    return new Promise((resolve, reject) => {
      this.peer.on('open', () => {
        this.setupPeerListeners();
        resolve();
      });

      this.peer.on('error', (error) => {
        reject(error);
      });
    });
  }

  setupPeerListeners() {
    this.peer.on('call', async (call) => {
      try {
        call.answer(this.localStream);
        this.setupCallHandlers(call);
      } catch (error) {
        this.onError?.(error);
      }
    });
  }

  setupCallHandlers(call) {
    this.currentCall = call;

    call.on('stream', (remoteStream) => {
      this.onStreamReceived?.(remoteStream);
    });

    call.on('close', () => {
      this.onPartnerDisconnected?.();
    });

    call.on('error', (error) => {
      this.onError?.(error);
    });
  }

  handleSystemInfo(code) {
    switch (code) {
      case 'partner_connected':
        this.hasPartner = true;
        this.onPartnerConnected?.();
        break;
      case 'partner_disconnected':
        this.disconnectFromPartner();
        break;
      case 'waiting_partner':
        this.sendLocalInfo();
        this.hasPartner = false;
        break;
      default:
        break;
    }
    this.onSystemInfo?.(code);
  }

  async handleVideoInit(offer) {
    try {
      if (!this.isVideoChat || !this.localStream) {
        return this.socket.emit('videochat_init', false);
      }

      const call = this.peer.call(offer.peerId, this.localStream);
      this.setupCallHandlers(call);
    } catch (error) {
      this.onError?.(error);
    }
  }

  async handleVideoOffer(offer) {
    try {
      if (!this.isVideoChat || !this.localStream) {
        return this.socket.emit('videochat_offer_ok', false);
      }

      await this.peer.answer(offer);
      this.socket.emit('videochat_offer_ok', true);
    } catch (error) {
      this.onError?.(error);
    }
  }

  handleVideoOfferResponse(answer) {
    if (this.currentCall) {
      this.currentCall.handleAnswer(answer);
    }
  }

  processIce(candidate) {
    if (this.currentCall) {
      this.currentCall.addIceCandidate(candidate);
    }
  }

  sendLocalInfo() {
    this.socket.emit('info', { isVideoChat: this.isVideoChat });
  }

  sendMessage(message) {
    if (this.hasPartner && message.trim()) {
      this.socket.emit('msg', message);
      return true;
    }
    return false;
  }

  disconnectFromPartner() {
    this.hasPartner = false;
    if (this.currentCall) {
      this.currentCall.close();
      this.currentCall = null;
    }
    this.onPartnerDisconnected?.();
  }

  nextPartner() {
    this.disconnectFromPartner();
    this.socket.emit('next');
  }

  toggleVideo() {
    if (this.localStream) {
      const videoTrack = this.localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      return videoTrack.enabled;
    }
    return false;
  }

  toggleAudio() {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      return audioTrack.enabled;
    }
    return false;
  }

  cleanup() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }
    if (this.currentCall) {
      this.currentCall.close();
    }
    if (this.peer) {
      this.peer.destroy();
    }
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}