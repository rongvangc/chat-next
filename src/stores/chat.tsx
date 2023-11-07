import {
  createRoom,
  getRoomMessage,
  getRooms,
  saveRoomMessage,
} from "@/services/room";
import { create } from "zustand";

interface ChatState {
  showMobileDraw: boolean;
  rooms: Room[];
  roomMessages: Message[];
  roomSelect: { id: string; members: User[] };
  setShowMobileDraw: (data: boolean) => void;
  setRoomSelect: (selectedRoomId: string, members: User[]) => void;
  getRooms: () => void;
  setRoom: (data: Room) => void;
  setMessage: (messageSend: Message) => void;
}

const useChatStore = create<ChatState>((set) => ({
  rooms: [],
  roomMessages: [],
  showMobileDraw: false,
  roomSelect: {
    id: "",
    members: [],
  },
  setShowMobileDraw: (data) =>
    set((state) => ({
      ...state,
      showMobileDraw: data,
    })),
  getRooms: async () => {
    const { data: roomsData } = await getRooms();

    const rooms = roomsData?.data;

    if (rooms?.length) {
      set((state) => ({
        ...state,
        rooms,
      }));
    }
  },
  setRoom: async (data) => {
    if (data) {
      set((state) => ({
        ...state,
        rooms: [data, ...state.rooms],
      }));
    }
  },
  setRoomSelect: async (id, members) => {
    // const { data: roomData } = await getRoomById(id);
    const { data: dataMessages } = await getRoomMessage(id);

    set((state) => ({
      ...state,
      roomSelect: {
        id,
        members,
      },
      roomMessages: dataMessages?.data,
      showMobileDraw: false,
    }));
  },
  setMessage: async (messageSend) => {
    set((state) => ({
      ...state,
      roomMessages: [...state.roomMessages, messageSend],
    }));
  },
}));

export default useChatStore;
