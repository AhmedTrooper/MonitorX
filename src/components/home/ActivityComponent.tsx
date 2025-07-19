import { useActivityStore } from "@/store/ActivityStore";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Trash2 } from "lucide-react";

export default function ActivityComponent() {
  const windowEventsArr = useActivityStore((state) => state.windowEventsArr);
  return (
    <div className="activity-section w-full grid gap-5">
      <h1 className="text-4xl text-success-600">Activity List</h1>
      {windowEventsArr.map((event, index) => {
        if (event.data.title && event.data.title !== "") {
          return (
            <Card
              key={index}
              className="w-full"
            >
              <CardHeader className="overflow-auto custom-scrollbar">
                {event.data.title}
              </CardHeader>
              <CardBody>
                <h1 className="text-success-600">{event.duration} seconds</h1>
                <h1>{event.timestamp}</h1>
              </CardBody>
              <CardFooter>
                <p className="cursor-pointer">
                  {" "}
                  <Trash2 className="text-primary-600"/>
                  {event.data.app}                </p>
              </CardFooter>
            </Card>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
