import socket from "./socket";
import { mediaDevices } from "react-native-webrtc";
import Peer from "react-native-simple-peer"

class CallManager {
    constructor(myid){
        this.myid = myid
        this.calls = new Map()
        this.pendingcalls = new Map()
    }

    _setupSocketListeners(){
        socket.on("signal", ({from, signal, calltype}) => {
            let existingcall = this.calls.get(from)
            if(existingcall){
                existingcall.peer.signal(signal)
            }else{
                this.pendingcalls.set(from, {signal, calltype})
            }

            setTimeout(() => {
                this.rejectcalls(from)
            }, 10000);
        })

        socket.on("endcall", ({from}) => {
            let existingcall = this.calls.get(from)
            if(existingcall)
               {
                existingcall.peer.distroy()
                this.calls.delete(from);
               }
            this.pendingcalls.delete(from)
        })

        socket.on("hold", ({ from }) => {
            let call = this.calls.get(from)
            if(call)
                if(call.calltype === "audio")
                    call.stream?.getAudioTracks().forEach(track => (track.enabled = true))
                else
                    call.stream?.getTracks().forEach(track => (track.enabled = true))
                call.isHold = true
                call.holdInitiator = from
                console.log('u where placed on hold by '+ from);
        })

        socket.on("resumecall", ({ from }) => {
            let call = this.calls.get(from)
            if(call && call.holdInitiator === from)
                if(call.calltype === "audio")
                    call.stream?.getAudioTracks().forEach(track => (track.enabled = true));
                else
                    call.stream?.getTracks().forEach(track => (track.enabled = true));
                call.holdInitiator = null
                call.isHold = false; 
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
        let stream = await this._getStream(calltype)
        let peer = new Peer({
            initiator,
            trickle: false,
            stream
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
                existingcall.stream = remotestream
            }
        })

        peer.on("error",  (error) => {
            console.log("call could not be placed");
        })
    }
    

    async call(remoteuserid, calltype){
        // get the stream
        let stream = await this._getStream()
        // create peer and send signal to the call initiator
        const peer = await this._createPeer(true, remoteuserid, stream, calltype)
        // create a call in the calls for the outgoing call 
        this.calls.set(remoteuserid, {
            peer,
            stream,
            isHold: false,
            calltype,
            holdInitiator: null,
        })
    }

    async acceptcalls(remoteuserid){
        // accepting calls means that call could be in pendingcalls
        // find the pending call if not return
        let pendingcall = this.pendingcalls.get(remoteuserid)
        if(!pendingcall) return;

        // get the media stream
        const stream = await this._getStream()

        // create peer and send signal to the call initiator
        const peer = await this._createPeer(false, remoteuserid, stream, pendingcall.calltype)

        // create a call in the calls for the recieved call 
        this.calls.set(remoteuserid, {
            peer,
            stream,
            isHold: false,
            calltype: pendingcall.calltype,
            holdInitiator: null,
        })

        // get and set call signal
        let call = this.calls.get(remoteuserid)
        call.peer.signal(pendingcall.signal)

        //  delete the the call from pending calls
        this.pendingcalls.delete(remoteuserid)
    }

    rejectcalls(remoteuserid){
        let pendingcall = this.calls.get(remoteuserid)
        if(!pendingcall) return;

        socket.emit('endcall', {
            to: remoteuserid,
            from: this.myid
        })
        // delete it from calls
        this.pendingcalls.delete(remoteuserid)
    }

    holdcall(remoteuserid){
        let call = this.calls.get(remoteuserid)
        if(call && !call.isHold)
            socket.emit("holdcall", {
                to: remoteuserid,
                from: this.myid 
            })

            if(call.calltype === "audio")
                call.stream?.getAudioTracks().forEach(track => (track.enabled = true))
            else
                call.stream?.getTracks().forEach(track => (track.enabled = true))
            call.isHold = true
            call.holdInitiator = from
            console.log('u where placed on hold by '+ remoteuserid)
    }

    resumecall(remoteuserid){
        let call = this.calls.get(remoteuserid)
            if(call && call.isHold && call.holdInitiator === remoteuserid)
                socket.emit('resumecall', {
                    to: remoteuserid,
                    from: this.myid
                })

                if(call.calltype === "audio")
                    call.stream?.getAudioTracks().forEach(track => (track.enabled = true));
                else
                    call.stream?.getTracks().forEach(track => (track.enabled = true));
                call.holdInitiator = null
                call.isHold = false; 
    }

    endcall(remoteuserid){
        let call = this.calls.get(remoteuserid)
        if(call) {
            call.peer.distroy()
            this.calls.delete(remoteuserid)
            this.pendingcalls.delete(remoteuserid)

            socket.emit("endcall", {
                to: remoteuserid,
                from: this.myid,
            })
        }
    }

    endallcalls(){
        for (let [userId, call] of this.calls.entries()) {
            call.peer.destroy();
        }
        this.calls.clear()
        this.pendingcalls.clear();
    }
}


export default CallManager