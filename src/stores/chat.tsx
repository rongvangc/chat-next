import { createRoom, getRooms } from "@/services/room";
import { create } from "zustand";

interface ChatState {
  showMobileDraw: boolean;
  rooms: Room[];
  roomSelect: string;
  setShowMobileDraw: (data: boolean) => void;
  setRoomSelect: (selectedRoomId: string) => void;
  getRooms: () => void;
  createRoom: (data: CreateRoomType) => void;
}

const useChatStore = create<ChatState>((set) => ({
  rooms: [],
  showMobileDraw: false,
  roomSelect: "",
  setShowMobileDraw: (data) =>
    set((state) => ({
      ...state,
      showMobileDraw: data,
    })),
  getRooms: async () => {
    const { data: roomsData } = await getRooms();

    const rooms = roomsData as Room[];

    if (rooms?.length) {
      set((state) => ({
        ...state,
        rooms,
      }));
    }
  },
  createRoom: async (data) => {
    const { data: roomData } = await createRoom(data);

    if (roomData) {
      const roomCreated = roomData.data as Room;
      set((state) => ({
        ...state,
        rooms: [roomCreated, ...state.rooms],
      }));
    }
  },
  setRoomSelect: async (selectedRoom) => {
    set((state) => ({
      ...state,
      selectedRoom,
      showMobileDraw: false,
    }));
  },
}));

export default useChatStore;
