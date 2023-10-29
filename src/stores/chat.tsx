import { createRoom } from "@/services/room";
import { getUser } from "@/services/user";
import { create } from "zustand";

interface ChatState {
  showMobileDraw: boolean;
  rooms: Room[];
  setShowMobileDraw: (data: boolean) => void;
  createRoom: (data: CreateRoomType) => void;
}

const useChatStore = create<ChatState>((set) => ({
  rooms: [],
  showMobileDraw: false,
  setShowMobileDraw: (data) =>
    set((state) => ({
      ...state,
      showMobileDraw: data,
    })),
  createRoom: async (data) => {
    const room = (await createRoom(data)) as unknown as Room;

    console.log("runnnnn", room);

    set((state) => ({
      ...state,
      rooms: [room, ...state.rooms],
    }));
  },
}));

export default useChatStore;
