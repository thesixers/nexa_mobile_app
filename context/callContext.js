import { createContext, useContext, useState, useEffect, useRef } from "react";
import CallManager from "../callmanager/callManage";
import socket from "../callmanager/socket";
import { userProfile } from "../utils"
import { router } from "expo-router";
import useCallStore from "../store/useCallStore";

const callContext = createContext();

export const useCallContext = () =>useContext(callContext)

export const CallProvider = ({children}) => {
    const { setCallManager, setCalls, setPendingCalls, calls, pendingCalls, activeCall, setActiveCall } = useCallStore();
    console.log(activeCall)

    useEffect(() => {
        socket.connect()
        const callManager = new CallManager(userProfile.phoneNumber)
        setCallManager(callManager)

        callManager.on("updatecalls", ({calls, pendingCalls}) => {
            setCalls(calls)
            setPendingCalls(pendingCalls)
        })

        return () => {
            socket.disconnect()
            callManager.endallcalls()
        }
    }, [])

    useEffect(() => {
        if(calls.length > 0){
            if(calls.length === 1 && pendingCalls.length === 0){
                // setActiveCall(calls[0][1])
                router.push('/display/callui')
            }
        }
    }, [calls])


    useEffect(() => {
        if(pendingCalls.length > 0){
            if(pendingCalls.length === 1 && calls.length === 0) 
            {
                setActiveCall(pendingCalls[0][1])
                router.push('/display/callui');
            }
        }
    }, [pendingCalls])


    return(
        <callContext.Provider
        value={{ calls, pendingCalls }}
        >
            {children}
        </callContext.Provider>
    )
}