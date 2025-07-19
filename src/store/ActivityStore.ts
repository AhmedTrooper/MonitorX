import { ActivityState } from "@/interface/store/ActivityStoreInterface";
import { PasswordInformationState } from "@/interface/types/PasswordInformationInterface";
import { WindowEvent } from "@/interface/types/WindowEventInterface";
import { addToast } from "@heroui/react";
import { BaseDirectory, documentDir, join } from "@tauri-apps/api/path";
import {
  exists,
  writeTextFile,
  mkdir,
  readTextFile,
} from "@tauri-apps/plugin-fs";
import { fetch } from "@tauri-apps/plugin-http";
import { create } from "zustand";

export const useActivityStore = create<ActivityState>((set, get) => ({
  bucketUrl: "http://localhost:5600/api/0/buckets/",
  fetchBuckets: async () => {
    const activityStore = get();
    const bucketUrl = activityStore.bucketUrl;
    const setWindowEventUrl = activityStore.setWindowEventUrl;
    const fetchWindowTitle = activityStore.fetchWindowTitle;
    const setBucketId = activityStore.setBucketId;
    let errorOccurred = true;
    try {
      const response = await fetch(bucketUrl, {
        method: "GET",
      });
      if (response.status === 200) {
        const data = await response.json();
        let windowUrl = "";
        for (let key in data) {
          if (key.includes("aw-watcher-window")) {
            setBucketId(key.trim());
            windowUrl = data[key]["id"].trim();
          }
        }

        setWindowEventUrl(windowUrl);

        errorOccurred = false;
      } else {
        addToast({
          title: "Bucket fetch unsuccessful",
          color: "warning",
          timeout: 1000,
        });
      }
    } catch (error) {
      addToast({
        title: "Error on fetch",
        description: error as string,
        color: "danger",
        timeout: 2000,
      });
    } finally {
      if (!errorOccurred) {
        fetchWindowTitle();
      }
    }
  },
  windowEventUrl: "",
  setWindowEventUrl: (url: string) => set({ windowEventUrl: url }),
  fetchWindowTitle: async () => {
    const activityStore = get();
    const windowEventUrl = activityStore.windowEventUrl;
    const setWindowEventsArr = activityStore.setWindowEventsArr;
    const setEventFetched = activityStore.setEventFetched;
    const setTempWindowEventsArr = activityStore.setTempWindowEventsArr;

    try {
      const eventResponse = await fetch(
        `http://localhost:5600/api/0/buckets/${windowEventUrl}/events`.trim(),
        {
          method: "GET",
        }
      );

      if (eventResponse.status === 200) {
        const windowArr = await eventResponse.json();
        setWindowEventsArr(windowArr);
        setTempWindowEventsArr(windowArr);
        addToast({
          title: "Event fetch successful",
          color: "success",
          timeout: 1000,
        });
      } else {
        addToast({
          title: "Event fetch unsuccessful",
          color: "warning",
          timeout: 1000,
        });
      }
    } catch (error) {
      addToast({
        title: "Error on fetch",
        description: error as string,
        color: "danger",
        timeout: 2000,
      });
    } finally {
      setEventFetched(true);
    }
  },
  windowEventsArr: [],
  setWindowEventsArr: (event: WindowEvent[]) => set({ windowEventsArr: event }),
  eventFetched: false,
  setEventFetched: (status: boolean) => set({ eventFetched: status }),
  bucketId: "",
  setBucketId: (bucketId: string) => set({ bucketId }),
  removeEvent: async (eventID) => {
    const activityStore = get();
    const windowEventUrl = activityStore.windowEventUrl;
    const windowEventsArr = activityStore.windowEventsArr;
    const setWindowEventsArr = activityStore.setWindowEventsArr;
    let arr = [...windowEventsArr];

    try {
      const eventResponse = await fetch(
        `http://localhost:5600/api/0/buckets/${windowEventUrl}/events/${eventID}`.trim(),
        {
          method: "DELETE",
        }
      );

      if (eventResponse.status === 200) {
        arr = arr.filter((item) => item.id !== eventID);
        setWindowEventsArr(arr);
        addToast({
          timeout: 500,
          title: "Deleted",
          color: "success",
        });
      }
    } catch (error) {
      addToast({
        title: "Error on delete",
        description: error as string,
        color: "danger",
        timeout: 2000,
      });
    }
  },
  searchKeyWord: "",
  setSearchKeyWord: (searchKeyWord: string) => set({ searchKeyWord }),
  tempWindowEventsArr: [],
  setTempWindowEventsArr: (events: WindowEvent[]) =>
    set({ tempWindowEventsArr: events }),
  searchActivity: () => {
    const activityStore = get();
    const searchKeyWord = activityStore.searchKeyWord;
    const setTempWindowEventsArr = activityStore.setTempWindowEventsArr;
    let windowEventsArr = activityStore.windowEventsArr;
    let tempArr = [...windowEventsArr];
    tempArr = windowEventsArr.filter((item) =>
item.data.title.toLowerCase().includes(searchKeyWord.trim().toLowerCase())
    );
    setTempWindowEventsArr(tempArr);
  },
  userPassword: "",
  setUserPassword: (userPassword) => set({ userPassword }),
  isSignedIn: false,
  setIsSignIn: (isSignedIn: boolean) => set({ isSignedIn }),
  assignPassword: async () => {
    const activityStore = get();
    try {
      const data = {
        key: activityStore.userPassword,
      };
      if (
        !(await exists("PolishedConfig", { baseDir: BaseDirectory.Document }))
      ) {
        mkdir("PolishedConfig", { baseDir: BaseDirectory.Document })
          .then(async () => {
            try {
              await writeTextFile(
                await join("PolishedConfig", "tyson.json"),
                JSON.stringify(data),
                {
                  baseDir: BaseDirectory.Document,
                }
              );
            } catch (error) {
              addToast({
                title: "Error on creating directory",
                description: error as string,
                color: "danger",
                timeout: 2000,
              });
            }
          })
          .then(() => {
            activityStore.setUserPassword("");
            return;
          })
          .catch(() => {
            addToast({
              title: "Writing error",
              timeout: 1000,
              color: "danger",
            });
          });
      }
      try {
        await writeTextFile(
          await join("PolishedConfig", "tyson.json"),
          JSON.stringify(data),
          {
            baseDir: BaseDirectory.Document,
          }
        );
        activityStore.setUserPassword("");
      } catch (error) {
        addToast({
          title: "Error on creating directory",
          description: error as string,
          color: "danger",
          timeout: 2000,
        });
      }
    } catch (error) {
      addToast({
        title: "Error on Login or Create",
        description: error as string,
        color: "danger",
        timeout: 2000,
      });
    } finally {
      activityStore.retrivePassword();
    }
  },
  retrivePassword: async () => {
    const activityStore = get();
    const setIsSignIn = activityStore.setIsSignIn;
    try {
      if (
        await exists(
          await join(await documentDir(), "PolishedConfig", "tyson.json")
        )
      ) {
        const contents = await readTextFile(
          await join("PolishedConfig", "tyson.json"),
          { baseDir: BaseDirectory.Document }
        );
        let passwordInfo = await JSON.parse(contents);
        if (
          passwordInfo?.key &&
          typeof passwordInfo?.key === "string" &&
          passwordInfo?.key !== ""
        ) {
          setIsSignIn(true);
          activityStore.setPasswordInfo(passwordInfo);
          // console.log(passwordInfo);
        }
        //  console.log(passwordInfo);
      }
    } catch (error) {
      addToast({
        title: "Error on Password Retrival",
        description: error as string,
        color: "danger",
        timeout: 1000,
      });
    }
  },
  passowrdInfo: null,
  setPasswordInfo: (passowrdInfo: PasswordInformationState | null) =>
    set({ passowrdInfo }),
  isVerified: false,
  setIsVerified: (isVerified) => set({ isVerified }),
  verifyPassword: (pass: string) => {
    const activityStore = get();
    if (pass === activityStore.passowrdInfo?.key) {
      activityStore.setIsVerified(true);
      addToast({
        title: "Verified",
        description: "Password is ok!",
        color: "success",
        timeout: 1000,
      });
    } else {
      addToast({
        title: "Verification failed",
        description: "Password mismatch",
        color: "danger",
        timeout: 1000,
      });
    }

    activityStore.setUserPassword("");
  },
  clearBucket: async () => {
    const activityStore = get();
    const windowEventUrl = activityStore.windowEventUrl;
    try {
      const response = await fetch(
        `http://localhost:5600/api/0/buckets/${windowEventUrl}?force=1`.trim(),
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) {
        activityStore.setWindowEventsArr([]);
        activityStore.setTempWindowEventsArr([]);
        addToast({
          timeout: 1000,
          title: "Activity is Empty!",
          color: "success",
        });
      } else {
        addToast({
          timeout: 1000,
          title: "Empty failed",
          color: "danger",
        });
      }
    } catch (error) {
      addToast({
        title: "Delete failed",
        description: JSON.stringify(error),
        color: "danger",
        timeout: 1000,
      });
    }
  },
}));
