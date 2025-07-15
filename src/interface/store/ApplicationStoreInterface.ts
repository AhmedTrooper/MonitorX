import { MetadataState } from "../types/MetadataInterface";

export interface ApplicationState {
  menuBarVisible: boolean;
  setMenuBarVisible: (status: boolean) => void;
  toggleMenuBar: () => void;
  applicationVersion: string;
  setApplicationVersion: (version: string) => void;
  onlineApplicationVersion: string;
  setOnlineApplicationVersion: (version: string) => void;
  applicationUpdateAvailable: boolean;
  setApplicationUpdateAvailable: (status: boolean) => void;
  applicationUpdateCheckError: boolean;
  setApplicationUpdateCheckError: (status: boolean) => void;
  applicationUpdateChecked: boolean;
  setApplicationUpdateChecked: (status: boolean) => void;
  checkApplicationUpdate: () => Promise<void>;
  metadataUrl: string;
  metadataInformation: MetadataState | null;
  setMetadataInformation: (metadata: null | MetadataState) => void;
}
