import ActivityComponent from "@/components/home/ActivityComponent";
import { useActivityStore } from "@/store/ActivityStore";
import { isEmpty } from "lodash";


export default function Home() {
    const windowEventsArr = useActivityStore((state) => state.windowEventsArr);
  
  return (
    <div className="p-8">
     {!isEmpty(windowEventsArr) && <ActivityComponent/>}
     
    </div>
  );
}
