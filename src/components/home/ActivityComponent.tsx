import { useActivityStore } from "@/store/ActivityStore";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Alert, Input } from "@heroui/react";
import { Trash2 } from "lucide-react";
import DeleteComponent from "./DeleteComponent";

export default function ActivityComponent() {
  const windowEventsArr = useActivityStore((state) => state.windowEventsArr);
  const removeEvent = useActivityStore((state) => state.removeEvent);
  const tempWindowEventsArr = useActivityStore(
    (state) => state.tempWindowEventsArr
  );
  const searchKeyWord = useActivityStore((state) => state.searchKeyWord);
  const searchActivity = useActivityStore((state) => state.searchActivity);
  const isVerified = useActivityStore((state) => state.isVerified);
  const clearBucket = useActivityStore((state) => state.clearBucket);
  const setSearchKeyWord = useActivityStore((state) => state.setSearchKeyWord);


  return (
    <div className="activity-section w-full grid gap-5">
      {searchKeyWord && <h1>Searching : {searchKeyWord}</h1>}
      <Input
        placeholder="Search Activity"
        onChange={(e) => {
          setSearchKeyWord(e.target.value);
          searchActivity();
        }}
        title="Search for your activity"
      />
      <DeleteComponent />

      {isVerified && (
        <h1 className=" text-red-600 grid gap-4">
          <Alert
            color="success"
            className="w-fit"
          >
            Verified
          </Alert>
          <Trash2
            onClick={clearBucket}
            className="cursor-pointer"
          />
        </h1>
      )}
      {(searchKeyWord && searchKeyWord === ""
        ? windowEventsArr
        : tempWindowEventsArr
      ).map((event, index) => {
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
              <CardFooter className="flex gap-4">
                {isVerified && (
                  <Trash2
                    onClick={() => removeEvent(event.id)}
                    className="text-primary-600 cursor-pointer"
                  />
                )}
                <p> {event.data.app} </p>
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
