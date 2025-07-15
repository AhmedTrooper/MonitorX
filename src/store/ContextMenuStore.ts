import { ContextMenuState } from "@/interface/store/ContextMenuStore";
import { create } from "zustand";

export const useContextMenuStore = create<ContextMenuState>((set) => ({
  contextMenuVisible: false,
  setContextMenuVisible: (status: boolean) =>
    set({ contextMenuVisible: status }),
}));
