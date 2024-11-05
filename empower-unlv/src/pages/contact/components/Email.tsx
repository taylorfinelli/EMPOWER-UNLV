import { Mail } from "lucide-react";

export default function Email() {
  return (
    <div className="flex flex-row items-start gap-x-2">
      <div className="bg-blue_primary p-2 rounded-full">
        <Mail color="white" />
      </div>
      <div>
        <h3>Email</h3>
        <p>edwin.oh@unlv.edu</p>
      </div>
    </div>
  );
}
