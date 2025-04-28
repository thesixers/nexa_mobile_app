import socket from "./socket";
import { mediaDevices, RTCPeerConnection, RTCIceCandidate, RTCSessionDescription } from "react-native-webrtc";
import Peer from "react-native-simple-peer"
import { EventEmitter } from "events"

class CallManager extends EventEmitter {
    constructor(myid){
        super();
        this.myid = myid
        this.calls = new Map()
        this.pendingcalls = new Map()
        
        this._setupSocketListeners()
    }

    _updateCalls(){
        this.emit("updatecalls", {
            calls: Array.from(this.calls.entries()),
            pendingCalls: Array.from(this.pendingcalls.entries())
        })
    }

    _setupSocketListeners(){
        socket.on("connect", ()=> {
            socket.emit("register", {phoneNumber: this.myid})
        })

        socket.on("signal", ({from, signal, calltype, callerDetails}) => {
            let existingcall = this.calls.get(from)
            if(existingcall){
                existingcall.peer.signal(signal)
                existingcall.callerDetails = callerDetails
            }else{
                this.pendingcalls.set(from, {signal, calltype, callerDetails})
                this._updateCalls()
            }

            setTimeout(() => {
                this.rejectcalls(from)
            }, 10000);
        })

        socket.on("endcall", ({from}) => {
            let existingcall = this.calls.get(from)
            if(existingcall)
               {
                existingcall.peer.destroy()
                this.calls.delete(from);
               }
            this.pendingcalls.delete(from)
            this._updateCalls()
        })

        socket.on("holdcall", ({ from }) => {
            let call = this.calls.get(from)
            console.log('u where placed on hold by '+ from);
        })

        socket.on("resumecall", ({ from }) => {
            let call = this.calls.get(from)
            console.log(from + " has resumed the call");
        })
    }
    
    async _getStream(calltype){
        let isVideo = calltype === "audio" ? false : true;
        return await mediaDevices.getUserMedia({
            audio: true,
            video: isVideo
        })
    }


   async _createPeer(initiator, remoteUserId, stream = null, calltype = "audio"){
    
        let peer = new Peer({
            initiator,
            trickle: false,
            stream,
            webRTC: { RTCPeerConnection,  RTCIceCandidate, RTCSessionDescription }
        })

        peer.on("signal", (signal) => {
            socket.emit("signal", {
                to: remoteUserId,
                from: this.myid,
                signal,
                calltype
            })
        })

        peer.on("stream", (remotestream) => {
            let existingcall = this.calls.get(remoteUserId)
            if(existingcall){
                existingcall.remoteStream = remotestream
                this._updateCalls()
            }
        })

        peer.on("error",  (error) => {
            console.log("call could not be placed");
        })

        return peer
    }
    

    async call(remoteuserid, calltype){
        // get the stream
        let stream = await this._getStream(calltype)
        // create peer and send signal to the call initiator
        const peer = await this._createPeer(true, remoteuserid, stream, calltype)
        // create a call in the calls for the outgoing call 
        this.calls.set(remoteuserid, {
            peer,
            isHold: false,
            calltype,
            localStream: stream,
            remoteStream: null,
            callerDetails: null
        })
        this._updateCalls()
    }

    async acceptcalls(remoteuserid){
        // accepting calls means that call could be in pendingcalls
        // find the pending call if not return
        let pendingcall = this.pendingcalls.get(remoteuserid)
        if(!pendingcall) return;

        // get the media stream
        const stream = await this._getStream(pendingcall.calltype)

        // create peer and send signal to the call initiator
        const peer = await this._createPeer(false, remoteuserid, stream, pendingcall.calltype)

        // create a call in the calls for the recieved call 
        this.calls.set(remoteuserid, {
            peer,
            stream,
            isHold: false,
            calltype: pendingcall.calltype,
            localStream: stream,
            remoteStream: null,
            callerDetails: pendingcall.callerDetails
        })

        // get and set call signal
        let call = this.calls.get(remoteuserid)
        call.peer.signal(pendingcall.signal)

        //  delete the the call from pending calls
        this.pendingcalls.delete(remoteuserid)
        this._updateCalls()
    }

    rejectcalls(remoteuserid){
        let pendingcall = this.pendingcalls.get(remoteuserid)
        if(!pendingcall) return;

        socket.emit('endcall', {
            to: remoteuserid,
            from: this.myid
        })
        // delete it from calls
        this.pendingcalls.delete(remoteuserid)
        this._updateCalls()
    }

    holdcall(remoteuserid){
        let call = this.calls.get(remoteuserid)
        if(call)
            socket.emit("holdcall", {
                to: remoteuserid,
                from: this.myid 
            })

            if(call.calltype === "audio")
            {
                call.remoteStream?.getAudioTracks().forEach(track => (track.enabled = false))
                call.localStream?.getAudioTracks().forEach(track => (track.enabled = false))
            }
            else
            {
                call.remoteStream?.getTracks().forEach(track => (track.enabled = false))
                call.localStream?.getTracks().forEach(track => (track.enabled = false))
            }
            console.log('u where placed on hold by '+ remoteuserid)
            this._updateCalls()
    }

    resumecall(remoteuserid){
        let call = this.calls.get(remoteuserid)
            if(call)
                socket.emit('resumecall', {
                    to: remoteuserid,
                    from: this.myid
                })

                if(call.calltype === "audio")
                    {
                        call.remoteStream?.getAudioTracks().forEach(track => (track.enabled = true))
                        call.localStream?.getAudioTracks().forEach(track => (track.enabled = true))
                    }
                else
                    {
                        call.remoteStream?.getTracks().forEach(track => (track.enabled = true))
                        call.localStream?.getTracks().forEach(track => (track.enabled = true))
                    }
                this._updateCalls()
    }
    

    endcall(remoteuserid){
        let call = this.calls.get(remoteuserid)
        if(call) {
            call.peer.destroy()
            this.calls.delete(remoteuserid)
            this.pendingcalls.delete(remoteuserid)

            socket.emit("endcall", {
                to: remoteuserid,
                from: this.myid,
            })
        }
        this._updateCalls()
    }

    endallcalls(){
        for (let [userId, call] of this.calls.entries()) {
            call.peer.destroy();
        }
        this.calls.clear()
        this.pendingcalls.clear();
        this._updateCalls()
    }
}


export default CallManager