import Profile from "@/assets/team/Profile";
import Separator from "@/components/separator";
import { teamMembers } from "@/pages/about/utils.ts";

export default function TeamMembers() {
  return (
    <div className="pt-16 w-[80%] flex flex-col items-center gap-y-8">
      <Separator title="About us" />
      <div className="flex flex-wrap justify-center gap-8 w-full">
        {teamMembers.map((person, i) => (
          <Profile key={i} src={person.src} name={person.name} desc={person.desc} />
        ))}
      </div>
    </div>
  );
}
