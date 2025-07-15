import { Divider, Switch } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div className="p-4">
      <h1 className="font-bold text-3xl">Settings</h1>
      <div className="grid gap-2 w-full">
        <Link
          to={"/"}
          className="flex gap-2 font-bold w-fit justify-self-end"
        >
          <ArrowLeft />
          <p>Home</p>
        </Link>
      </div>

      <Divider />
      <div>
        <h1 className="font-bold text-xl">Background</h1>
        <Switch></Switch>
      </div>
    </div>
  );
}
