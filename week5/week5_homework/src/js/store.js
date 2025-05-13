import { create } from 'zustand';

export const useCounterStore = create((set) => ({
  isModal: false,
  setModal: (val) => set({ isModal: val}),
}));

export const useErrorStore = create((set) => ({
  isError: false,
  setError: (val) => set({ isError: val }),
}));

export const useDeleteIdStore = create((set) => ({
  deleteId: "",
  setDeleteId: (val) => set({ deleteId: val }),
}));