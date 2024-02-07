export interface RootState {
    username: string | null;
    roomId: string | null;
    setUsername: (username: string) => void;
    setRoomId: (roomId: string) => void;
}