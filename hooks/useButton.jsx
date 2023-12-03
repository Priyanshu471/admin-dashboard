import { create } from "zustand";

export const useButton = create((set) => ({
  isOpen: false,
  user: {
    id: "",
    name: "Enter name",
    email: "Enter email ",
    role: "Enter role",
  },
  setUser: (user) => set({ user }),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));
