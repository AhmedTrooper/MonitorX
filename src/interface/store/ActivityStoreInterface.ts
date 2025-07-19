import { PasswordInformationState } from "../types/PasswordInformationInterface";
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
  bucketId: string;
  setBucketId: (bucketId: string) => void;
  removeEvent: (eventID: number) => Promise<void>;
  searchKeyWord: string;
  setSearchKeyWord: (searchKeyWord: string) => void;
  tempWindowEventsArr: WindowEvent[];
  setTempWindowEventsArr: (event: WindowEvent[]) => void;
  searchActivity: () => void;
  userPassword: string;
  setUserPassword: (userPassword: string) => void;
  isSignedIn: boolean;
  setIsSignIn: (isSignedIn: boolean) => void;
  assignPassword: () => Promise<void>;
  retrivePassword: () => Promise<void>;
  passowrdInfo: PasswordInformationState | null;
  setPasswordInfo: (passowrdInfo: PasswordInformationState | null) => void;
  isVerified: boolean;
  setIsVerified: (isVerified: boolean) => void;
  verifyPassword: (pass: string) => void;
  clearBucket: () => Promise<void>;
}
