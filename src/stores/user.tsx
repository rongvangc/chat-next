import { clearToken } from "@/lib/cookieUtils";
import { getAllUsers, getUser } from "@/services/user";
import { create } from "zustand";

interface UserState {
  user: User | null;
  users: User[] | null;
  getUserInfo: () => void;
  getAllUsers: () => void;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  users: null,
  getUserInfo: async () => {
    const { data } = await getUser();

    set((state) => ({
      ...state,
      user: data,
    }));
  },
  getAllUsers: async () => {
    const { data } = await getAllUsers();

    set((state) => ({
      ...state,
      users: data,
    }));
  },
  logout: () => clearToken(),
}));

export default useUserStore;
