export interface OsInfoState {
  osName: string | null;
  isMobileOS: boolean;
  setOSName: (os: string) => void;
  setIsMobileOS: (osStatus: boolean) => void;
  detectMobileOS: () => void;
  osFetched: boolean;
  setOsFetched: (status: boolean) => void;
}
