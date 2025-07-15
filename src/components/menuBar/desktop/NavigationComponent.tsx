import { RouteList } from "../../../constants/routes/RouteList";
import { Link, useLocation } from "react-router-dom";

import clsx from "clsx";

export default function NavigationComponent() {
  const x = useLocation();
  return (
    <div className="grid shadow-lg shadow-black max-h-[60vh] custom-scrollbar mt-96 self-center bg-[#191f1f] dark:bg-zinc-900 rounded-lg">
      <div className={clsx("grid self-center p-4 ")}>
        {RouteList.map((route, index) => (
          <div key={index}>
            <Link
              to={route.url}
              className={clsx("", {
                "text-blue-600 font-bold":
                  x.pathname.trim() === `/${route.url}`,
              })}
            >
              {route.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
