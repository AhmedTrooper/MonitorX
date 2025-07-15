import { ActivityState } from "@/interface/store/ActivityStoreInterface";
import { WindowEvent } from "@/interface/types/WindowEventInterface";
import { addToast } from "@heroui/react";
import { fetch } from "@tauri-apps/plugin-http";
import { create } from "zustand";

export const useActivityStore = create<ActivityState>((set, get) => ({
  bucketUrl: "http://localhost:5600/api/0/buckets/",
  fetchBuckets: async () => {
    const activityStore = get();
    const bucketUrl = activityStore.bucketUrl;
    const setWindowEventUrl = activityStore.setWindowEventUrl;
    const fetchWindowTitle = activityStore.fetchWindowTitle;
    let errorOccurred = true;
    try {
      const response = await fetch(bucketUrl, {
        method: "GET",
      });
      if (response.status === 200) {
        // addToast({
        //   title: "Bucket founds",
        //   color: "success",
        //   timeout: 1000,
        // });
        const data = await response.json();
        let windowUrl = "";
        for (let key in data) {
          if (key.includes("aw-watcher-window")) {
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
}));
