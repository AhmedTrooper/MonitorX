import { ApplicationState } from "@/interface/store/ApplicationStore";
import { MetadataState } from "@/interface/types/MetadataInterface";
import { addToast } from "@heroui/react";
import { getVersion } from "@tauri-apps/api/app";
import { create } from "zustand";

export const useApplicationStore = create<ApplicationState>((set, get) => ({
  metadataUrl:
    "https://raw.githubusercontent.com/dalal12345/ReactTS-HeroUI-TauriV2-Tailwindv3.4/main/update/metadata.json",
  menuBarVisible: false,
  setMenuBarVisible: (status) => set({ menuBarVisible: status }),
  toggleMenuBar: () =>
    set((state) => ({ menuBarVisible: !state.menuBarVisible })),
  applicationVersion: "",
  setApplicationVersion: (version) => set({ applicationVersion: version }),
  onlineApplicationVersion: "",
  setOnlineApplicationVersion: (version) =>
    set({ onlineApplicationVersion: version }),
  applicationUpdateAvailable: false,
  setApplicationUpdateAvailable: (status) =>
    set({ applicationUpdateAvailable: status }),
  applicationUpdateCheckError: false,
  setApplicationUpdateCheckError: (status) =>
    set({ applicationUpdateCheckError: status }),
  applicationUpdateChecked: false,
  setApplicationUpdateChecked: (status) =>
    set({ applicationUpdateChecked: status }),
  checkApplicationUpdate: async () => {
    const applicationStore = get();
    let localApplicationVersion: string | null = null;
    let onlineApplicationVersion: string | null = null;
    applicationStore.setApplicationVersion;
    applicationStore.metadataUrl;
    try {
      let currentVersion = await getVersion();
      localApplicationVersion = currentVersion;
      applicationStore.setApplicationVersion(currentVersion);
      let response = await fetch(applicationStore.metadataUrl);
      if (response.status === 200) {
        let data = (await response.json()) as MetadataState;
        console.log(data)
        applicationStore.setMetadataInformation(data);
        applicationStore.setOnlineApplicationVersion(
          data.onlineApplicationVersion
        );
        onlineApplicationVersion = data.onlineApplicationVersion;
        if (localApplicationVersion < onlineApplicationVersion) {
          addToast({
            title: "Application Update Available",
            description: `Online : ${onlineApplicationVersion}, Local: ${localApplicationVersion}`,
            color: "success",
            timeout: 1000,
          });
          applicationStore.setApplicationUpdateAvailable(true);
        }
      } else {
        addToast({
          title: "Update check error!",
          color: "danger",
          // description: error as string,
          timeout: 1000,
        });
      }
    } catch (error) {
      addToast({
        title: "Update check error!",
        color: "danger",
        description: error as string,
        timeout: 2000,
      });
    }
  },
  metadataInformation: null,
  setMetadataInformation: (value) => set({ metadataInformation: value }),
}));
