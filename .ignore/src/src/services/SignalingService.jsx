// Signaling Service using Socket.IO
import { io } from 'socket.io-client';

class SignalingService {
  constructor(url = 'https://video-chat-app-auth-8e4fccddfb7f.herokuapp.com') {
    this.socket = null;
    this.url = url;
    this.eventHandlers = new Map();
  }

  connect(userName, password = 'x') {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(this.url, {
      auth: {
        userName,
        password
      }
    });

    this.setupBaseHandlers();
    return this.socket;
  }

  setupBaseHandlers() {
    this.socket.on('connect', () => {
      console.log('Connected to signaling server');
    });

    this.socket.on('error', (error) => {
      console.error('Signaling server error:', error);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from signaling server');
    });
  }

  // Event handlers for video chat
  onNewOffer(callback) {
    this.socket.on('newOfferAwaiting', callback);
  }

  onAnswer(callback) {
    this.socket.on('answerResponse', callback);
  }

  onIceCandidate(callback) {
    this.socket.on('receivedIceCandidateFromServer', callback);
  }

  // Emitters
  async sendOffer(offer) {
    return this.socket.emit('newOffer', offer);
  }

  async sendAnswer(answer, offerData) {
    return new Promise((resolve) => {
      this.socket.emit('newAnswer', {
        ...offerData,
        answer
      }, (iceCandidates) => {
        resolve(iceCandidates);
      });
    });
  }

  sendIceCandidate(data) {
    this.socket.emit('sendIceCandidateToSignalingServer', data);
  }

  // Cleanup
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default SignalingService;