import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: (() => void) | null;
  openModal: (title: string, message: string, onConfirm: () => void) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  title: "",
  message: "",
  onConfirm: null,
  openModal: (title, message, onConfirm) =>
    set({ isOpen: true, title, message, onConfirm }),
  closeModal: () =>
    set({ isOpen: false, title: "", message: "", onConfirm: null }),
}));
