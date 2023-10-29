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
    const user = (await getUser()) as unknown as User;

    set((state) => ({
      ...state,
      user,
    }));
  },
  getAllUsers: async () => {
    const users = (await getAllUsers()) as unknown as User[];

    set((state) => ({
      ...state,
      users,
    }));
  },
  logout: () => clearToken(),
}));

export default useUserStore;
