import { useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useActivityStore } from "./store/ActivityStore";
import MenuBar from "./components/menuBar/MenuBar";
import ContextMenuComponent from "./components/contextMenu/ContextMenuComponent";
import { useContextMenuStore } from "./store/ContextMenuStore";
import { useApplicationStore } from "./store/ApplicationStore";
import clsx from "clsx";
import useOsInfoStore from "./store/osInfoStore";
import useThemeStore from "./store/themeStore";
import { useDatabaseStore } from "./store/DatabaseStore";

function App() {
  const dark = useThemeStore((state) => state.dark);
  const setDark = useThemeStore((state) => state.setDark);
  const detectOS = useOsInfoStore((state) => state.detectMobileOS);
  const isMobileOS = useOsInfoStore((state) => state.isMobileOS);
  const osFetched = useOsInfoStore((state) => state.osFetched);
  const contextMenuVisible = useContextMenuStore(
    (state) => state.contextMenuVisible
  );
  const setContextMenuVisible = useContextMenuStore(
    (state) => state.setContextMenuVisible
  );
  const menuBarVisible = useApplicationStore((state) => state.menuBarVisible);
  const setMenuBarVisible = useApplicationStore(
    (state) => state.setMenuBarVisible
  );
  const checkApplicationUpdate = useApplicationStore(
    (state) => state.checkApplicationUpdate
  );
  const fetchBuckets = useActivityStore((state) => state.fetchBuckets);

  const eventFetched = useActivityStore((state) => state.eventFetched);
  const databaseLoaded = useDatabaseStore((state) => state.databaseLoaded);
  const loadDatabase = useDatabaseStore((state) => state.loadDatabase);
  const retrivePassword = useActivityStore((state) => state.retrivePassword);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDark(true);
  }, [setDark]);

  useEffect(() => {
    if (!osFetched) {
      detectOS();
    }
  }, [osFetched]);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    if (databaseLoaded) {
      loadDatabase();
    }
  }, []);

  useEffect(() => {
    checkApplicationUpdate();
  }, []);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setContextMenuVisible(!contextMenuVisible);
      if (menuBarVisible) setMenuBarVisible(false);
    };
    window.addEventListener("contextmenu", handleContextMenu);
    return () => window.removeEventListener("contextmenu", handleContextMenu);
  }, [contextMenuVisible]);

  useEffect(() => {
    retrivePassword();
  }, []);

  useEffect(() => {
    if (!eventFetched) {
      fetchBuckets();
    }
  });

  return (
    <div
      className={clsx(
        "grid min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white  transition-colors pt-10 max-h-[100vh] select-none",
        {
          "custom-scrollbar": !isMobileOS,
        }
      )}
    >
      {" "}
      <MenuBar />
      <Outlet />
      <ContextMenuComponent />
    </div>
  );
}

export default App;
