import { useApplicationStore } from "@/store/ApplicationStore";
import { Download } from "lucide-react";

export default function MetadataInfo() {
  const metadataInformation = useApplicationStore(
    (state) => state.metadataInformation
  );

  const applicationVersion = useApplicationStore(
    (state) => state.applicationVersion
  );

  const onlineApplicationVersion = useApplicationStore(
    (state) => state.onlineApplicationVersion
  );

  if (!metadataInformation) return;
  return (
    <div className="w-40 sm:w-60 md:w-80 p-2 grid gap-2">
      <h1>Current : {applicationVersion}</h1>
      <h1>
        Availabel :{" "}
        <span className="text-red-600">{onlineApplicationVersion}</span>
      </h1>

      <a
        target="_blank"
        href={metadataInformation["release_url"]}
        className="flex gap-2 bg-green-600 rounded-lg p-2"
      >
        {" "}
        <Download></Download>
        Download
      </a>
    </div>
  );
}
