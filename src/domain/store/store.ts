import create from 'zustand'
import {RootState} from "@/domain/store/model/types";

export const useStore = create<RootState>((set) => ({
    username: null,
    roomId: null,
    setUsername: (username: string) => set(() => ({ username })),
    setRoomId: (roomId: string) => set(() => ({ roomId: roomId })),
}))
