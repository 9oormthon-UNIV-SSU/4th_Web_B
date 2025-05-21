import { create } from 'zustand';

interface CounterStore {
  isModal: boolean;
  setModal: (val: boolean) => void;
}

export const useCounterStore = create<CounterStore>((set) => ({
  isModal: false,
  setModal: (val) => set({ isModal: val }),
}));

// ----------------------

interface ErrorStore {
  isError: boolean;
  setError: (val: boolean) => void;
}

export const useErrorStore = create<ErrorStore>((set) => ({
  isError: false,
  setError: (val) => set({ isError: val }),
}));

// ----------------------

interface DeleteIdStore {
  deleteId: number;
  setDeleteId: (val: number) => void;
}

export const useDeleteIdStore = create<DeleteIdStore>((set) => ({
  deleteId: -1,
  setDeleteId: (val) => set({ deleteId: val }),
}));