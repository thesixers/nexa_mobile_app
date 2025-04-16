// CallManager.js
import Peer from 'react-native-simple-peer';
import { mediaDevices } from 'react-native-webrtc';
import socket from './socket';


export default class CallManager {
  constructor(userId) {
    this.peers = new Map();
    
    this.userId = userId;

    this._setupSocketListeners();
  }

  _setupSocketListeners() {
    socket.on('signal', ({ from, signal }) => {
      let peer = this.peers.get(from);
      if (!peer) {
        peer = this._createPeer(false, from);
        this.peers.set(from, peer);
      }
      peer.signal(signal);
    });

    socket.on('end-call', ({ from }) => {
      const peer = this.peers.get(from);
      if (peer) {
        peer.destroy();
        this.peers.delete(from);
      }
    });
  }

  async _getStream() {
    return await mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
  }

  async callUser(remoteUserId) {
    const stream = await this._getStream();
    const peer = this._createPeer(true, remoteUserId, stream);
    this.peers.set(remoteUserId, peer);
  }

  _createPeer(initiator, remoteUserId, stream = null) {
    const peer = new Peer({
      initiator,
      trickle: false,
      stream,
    });

    peer.on('signal', (data) => {
      socket.emit('signal', {
        to: remoteUserId,
        from: this.userId,
        signal: data,
      });
    });

    peer.on('stream', (remoteStream) => {
      // Attach to video/audio view
      console.log('Remote stream received');
    });

    peer.on('error', (err) => console.error('Peer error:', err));
    peer.on('close', () => {
      console.log('Call ended with', remoteUserId);
      this.peers.delete(remoteUserId);
    });

    return peer;
  }

  endCall(remoteUserId) {
    const peer = this.peers.get(remoteUserId);
    if (peer) {
      peer.destroy();
      this.peers.delete(remoteUserId);
      socket.emit('end-call', { to: remoteUserId });
    }
  }

  endAllCalls() {
    for (let [userId, peer] of this.peers.entries()) {
      peer.destroy();
    }
    this.peers.clear();
  }
}
