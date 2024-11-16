import { MapPin } from "lucide-react";

export default function Location() {
  return (
    <div className="flex flex-row items-start gap-x-2">
      <div className="bg-blue_primary p-2 rounded-full">
        <MapPin color="white" />
      </div>
      <div>
        <h3>Location</h3>
        <p>
          4505 South Maryland Parkway <br /> Las Vegas, NV 89154-4022
        </p>
      </div>
    </div>
  );
}
