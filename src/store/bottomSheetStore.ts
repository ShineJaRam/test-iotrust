import { create } from "zustand";
import { DApp } from "@/src/data/dapps";

interface BottomSheetState {
  isOpen: boolean;
  dapp: DApp | null;
  openSheet: (dapp: DApp) => void;
  closeSheet: () => void;
}

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  isOpen: false,
  dapp: null,
  openSheet: (dapp) => set({ isOpen: true, dapp }),
  closeSheet: () => set({ isOpen: false }),
}));
