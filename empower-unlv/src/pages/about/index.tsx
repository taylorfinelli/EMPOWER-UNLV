import Publications from "./components/Publications";
import TeamMembers from "./components/TeamMembers";

export default function About() {
  return (
    <main className="flex flex-col items-center">
      <TeamMembers />
      <Publications />
    </main>
  );
}
