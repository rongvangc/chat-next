import { getRoomMessage, getRooms } from "@/services/room";
import { create } from "zustand";

interface ChatState {
  showMobileDraw: boolean;
  rooms: Room[];
  roomMessages: MessageReceiver[];
  roomSelect: { id: string; members: User[] };
  setShowMobileDraw: (data: boolean) => void;
  setRoomSelect: (selectedRoomId: string, members: User[]) => void;
  getRooms: () => void;
  setRoom: (data: Room) => void;
  setOrderRoom: (data: string) => void;
  setCountRoom: (data: UpdatedRoom) => void;
  setMessage: (messageSend: MessageReceiver) => void;
}

const useChatStore = create<ChatState>((set, get) => ({
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
  setOrderRoom: async (data) => {
    if (data) {
      set((state) => {
        const objectToMove = state?.rooms?.find((room) => room._id === data);
        const newRoomOrder = [
          objectToMove,
          ...state.rooms.filter((room) => room._id !== data),
        ] as Room[];

        return {
          ...state,
          rooms: newRoomOrder,
        };
      });
    }
  },
  setCountRoom: async (data) => {
    if (data) {
      set((state) => {
        const objectToMove = state?.rooms?.find(
          (room) => room._id === data.roomId
        );
        const newRoomOrder = [
          objectToMove,
          ...state.rooms.filter((room) => room._id !== data.roomId),
        ] as Room[];

        return {
          ...state,
          rooms: newRoomOrder.map((room) =>
            room._id === data.roomId
              ? {
                  ...room,
                  count: data.count === 0 ? 0 : room.count + data.count,
                }
              : room
          ),
        };
      });
    }
  },
  setRoomSelect: async (id, members) => {
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
