import { create } from "zustand"

export default useCallStore = create(set => ({
    calls: [],
    pendingCalls: [],
    callManager: null,
    activeCall: null,
    
    setCalls: calls => set({ calls }),
    setActiveCall: calls => set({ activeCall }),
    setPendingCalls: pendingCalls => set({ pendingCalls }),
    setCallManager: callManager => set({ callManager }),
}))