import { useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import useOsInfoStore from "./store/OsInfoStore";
import MenuBar from "./components/menuBar/MenuBar";
import useThemeStore from "./store/ThemeStore";
import ContextMenuComponent from "./components/contextMenu/ContextMenuComponent";
import { useContextMenuStore } from "./store/ContextMenuStore";
import { useApplicationStore } from "./store/ApplicationStore";
import clsx from "clsx";

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

  return (
    <div
      className={clsx(
        "grid min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors pt-10 max-h-[100vh] select-none",
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
