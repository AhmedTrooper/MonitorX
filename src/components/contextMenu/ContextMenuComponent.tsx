import { useContextMenuStore } from "@/store/ContextMenuStore";
import { Divider } from "@heroui/react";
import { Link } from "react-router-dom";

export default function ContextMenuComponent() {
  const contextMenuVisible = useContextMenuStore(
    (state) => state.contextMenuVisible
  );

  if (!contextMenuVisible) return null;
  return (
    <div
      className="absolute shadow-md z-50 shadow-black rounded-md bg-white w-60 h-60 p-2 dark:bg-zinc-900 dark:text-white font-semibold"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1 className="font-bold text-xl custom-scrolbar">Shorcuts</h1>
      <Divider />
      <Link to="/">Home</Link>
    </div>
  );
}
