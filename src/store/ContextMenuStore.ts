import { ContextMenuState } from "@/interface/store/ContextMenuStoreInterface";
import { create } from "zustand";

export const useContextMenuStore = create<ContextMenuState>((set) => ({
  contextMenuVisible: false,
  setContextMenuVisible: (status: boolean) =>
    set({ contextMenuVisible: status }),
}));
