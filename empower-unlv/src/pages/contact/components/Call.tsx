import { Phone } from "lucide-react";

export default function Call() {
  return (
    <div className="flex flex-row items-start gap-x-2">
      <div className="bg-blue_primary p-2 rounded-full">
        <Phone color="white" />
      </div>
      <div>
        <h3>Call</h3>
        <p>(702) 895-0509</p>
      </div>
    </div>
  );
}
