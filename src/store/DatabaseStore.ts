import { DatabaseState } from "@/interface/store/DatabaseStoreInterface";
import { addToast } from "@heroui/react";
import { publicDir } from "@tauri-apps/api/path";
import { create } from "zustand";

export const useDatabaseStore = create<DatabaseState>((set, get) => ({
  databaseLoaded: false,
  databaseLoadingError: false,
  setDatabaseLoaded: (value) =>
    set({
      databaseLoaded: value,
    }),

  setDatabaseLoadingError: (databaseLoadingError) =>
    set({ databaseLoadingError }),
  loadDatabase: async () => {
    console.log("Database error");
    const databaseStore = get();
    const setDatabaseLoaded = databaseStore.setDatabaseLoaded;
    const setDatabaseLoadingError = databaseStore.setDatabaseLoadingError;
    try {
      const publicDirectory = await publicDir();
      console.log(publicDirectory);
      setDatabaseLoaded(true);
      throw Error("Database error!");
    } catch (error) {
      setDatabaseLoadingError(true);
      addToast({
        title: "Database Loading error",
        description: error as string,
        color: "danger",
        timeout: 1500,
      });
    }
  },
}));
