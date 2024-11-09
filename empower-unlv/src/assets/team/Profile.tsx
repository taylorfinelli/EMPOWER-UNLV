import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface ProfileProps {
  src: string;
  name: string;
  desc: string;
}

export default function Profile({ src, name, desc }: ProfileProps) {
  return (
    <Card>
      <div className="flex flex-col items-center p-4 gap-y-4">
        <img
          className="rounded-sm w-[320px] h-[320px] object-top object-cover"
          src={src ? src : "./src/assets/team/profile.jpeg"}
        />
        <div className="text-center w-[320px]">
          <h2 className="text-xl font-semibold text-blue_primary">{name}</h2>
          <Label className="text-gray-400">{desc}</Label>
        </div>
      </div>
    </Card>
  );
}
