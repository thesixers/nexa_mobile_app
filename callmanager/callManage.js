import socket from "./socket";
import { mediaDevices } from "react-native-webrtc";

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
        })

        // socket.on()
    }

   async _createPeer(){

    }

    async acceptcalls(){

    }

    async _getStream(){
        return await mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
    }
}