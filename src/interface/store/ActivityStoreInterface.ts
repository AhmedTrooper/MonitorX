import { WindowEvent } from "../types/WindowEventInterface";

export interface ActivityState {
  bucketUrl: string;
  fetchBuckets: () => Promise<void>;
  windowEventUrl: string;
  setWindowEventUrl: (url: string) => void;
  fetchWindowTitle: () => Promise<void>;
  windowEventsArr: WindowEvent[];
  setWindowEventsArr: (event: WindowEvent[]) => void;
  eventFetched: boolean;
  setEventFetched: (status: boolean) => void;
}
