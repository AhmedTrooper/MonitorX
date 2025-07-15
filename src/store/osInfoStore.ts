import { create } from "zustand";
import { platform } from "@tauri-apps/plugin-os";
import { OsInfoState } from "@/interface/store/OsInfoStore";

const useOsInfoStore = create<OsInfoState>((set, get) => ({
  osName: null,
  isMobileOS: false,
  setOSName: (os) => set({ osName: os }),
  setIsMobileOS: (status) => set({ isMobileOS: status }),
  osFetched: false,
  setOsFetched: (status) => set({ osFetched: status }),
  detectMobileOS: () => {
    const osInfoStore = get();
    const setOsFetched = osInfoStore.setOsFetched;
    // let osFetched = osInfoStore.osFetched;
    const currentOS = platform();
    set({ osName: currentOS });
    setOsFetched(true);
    // osFetched = osInfoStore.osFetched;

    if (currentOS === "android" || currentOS === "ios") {
      set({ isMobileOS: true });
    } else {
      set({ isMobileOS: false });
    }
  },
}));

export default useOsInfoStore;
