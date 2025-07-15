import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleDot,
  Maximize2,
  Menu,
  Minus,
  X,
} from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggleButton from "../../ui/ThemeToggleButton";
import NavigationComponent from "./desktop/NavigationComponent";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useApplicationStore } from "@/store/ApplicationStore";
import { clsx } from "clsx";
import MetadataInfo from "./desktop/MetadataInfo";
import useOsInfoStore from "@/store/OsInfoStore";

export default function MenuBar() {
  const [isFullScreen, setIsFullScreen] = useState<boolean | null>(null);
  const toggleMenuBar = useApplicationStore((state) => state.toggleMenuBar);
  const menuBarVisible = useApplicationStore((state) => state.menuBarVisible);
  const applicationUpdateAvailable = useApplicationStore(
    (state) => state.applicationUpdateAvailable
  );
  const applicationVersion = useApplicationStore(
    (state) => state.applicationVersion
  );
 const onlineApplicationVersion = useApplicationStore(
    (state) => state.onlineApplicationVersion
  );
    const isMobileOS = useOsInfoStore((state) => state.isMobileOS);


  const navigate = useNavigate();
  const startDraggingWindow = async () => {
    await getCurrentWindow().startDragging();
  };

  const hideWindow = async () => {
    try {
      await getCurrentWindow().minimize();
    } catch (e) {
      console.log(e);
    }
  };

  const handleFullScreen = async () => {
    try {
      let screenStatus = await getCurrentWindow().isFullscreen();
      setIsFullScreen(screenStatus);
      if (isFullScreen) {
        await getCurrentWindow().setFullscreen(false);
        setIsFullScreen(false);
      } else {
        await getCurrentWindow().setFullscreen(true);
        setIsFullScreen(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleWindowClose = async () => {
    try {
      await getCurrentWindow().close();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="menu-bar fixed z-50 top-0 grid left-0 grid-cols-12 w-full   bg-[#191f1f] dark:bg-zinc-900">
      <div className=" w-full h-full col-span-1 sm:flex"></div>

      <div className={clsx("",{
        "flex window-control justify-center justify-items-center col-span-4  sm:col-span-2   grid-cols-3 items-start gap-4 p-1 ":!isMobileOS,
        "hidden":isMobileOS
      })}>
        <X
          onClick={handleWindowClose}
          className="cursor-pointer w-5 text-white"
        />

        <Minus
          onClick={hideWindow}
          className="cursor-pointer w-5 text-white"
        />

        <Maximize2
          onClick={handleFullScreen}
          className="cursor-pointer w-5 text-white"
        />
      </div>

      <ul className={
        clsx("",{
          "window-drag-area gap-2  col-span-6 sm:col-span-8 grid items-center w-full   grid-cols-12":!isMobileOS,
          "window-drag-area gap-2  col-span-10 sm:col-span-6 grid items-center w-full   grid-cols-12":isMobileOS
        })
      }>
        {/* Dragging window section.... */}
        <li
          className="col-span-2 sm:col-span-4   w-full h-full cursor-grabbing"
          onMouseDown={startDraggingWindow}
        ></li>

        {/* Navigation section.... */}
        <li className="grid grid-cols-2 w-fit p-1   justify-self-center col-span-4 gap-5 md:gap-15 lg:gap-24  justify-items-center content-center text-white">
          <p onClick={() => navigate(-1)}>
            <ArrowLeft className="cursor-pointer" />
          </p>

          <p onClick={() => navigate(1)}>
            {" "}
            <ArrowRight className="cursor-pointer" />
          </p>
        </li>

        <li className="col-span-2 sm:col-span-1   w-full h-full cursor-pointer grid items-center">
          <Popover>
            <PopoverTrigger>
              <p>
                <CircleDot
                  className={clsx("", {
                    "text-green-600": !applicationUpdateAvailable,
                    "text-red-600": applicationUpdateAvailable,
                  })}
                />
              </p>
            </PopoverTrigger>
            <PopoverContent>
              {!applicationUpdateAvailable && (
                <div className="max-h-[60vh]p-2">
                  <p>Current : {String(applicationVersion)}</p>
                  <p>Online : {String(onlineApplicationVersion)}</p>
                  <h1 className="text-green-600 flex gap-2">
                    <Check />
                    No update yet...
                  </h1>
                </div>
              )}

              {applicationUpdateAvailable && <MetadataInfo />}
            </PopoverContent>
          </Popover>
        </li>

        <li className="w-full col-span-2 sm:col-span-1 pr-3 grid items-center justify-items-center">
          <ThemeToggleButton />
        </li>

        <li className="w-full  text-white  col-span-2 pr-3 grid items-center justify-items-center">
          {!menuBarVisible && (
            <Menu
              onClick={toggleMenuBar}
              className="cursor-pointer justify-self-end"
            />
          )}

          {menuBarVisible && (
            <X
              onClick={toggleMenuBar}
              className="cursor-pointer justify-self-end"
            />
          )}

          {menuBarVisible && (
            <ul className="absolute h-fit w-fit  justify-self-center left-0 grid gap-1 pt-10 p-2">
              <NavigationComponent />
            </ul>
          )}
        </li>
      </ul>

      <div className=" w-full  h-full col-span-1 sm:flex"></div>
    </div>
  );
}
