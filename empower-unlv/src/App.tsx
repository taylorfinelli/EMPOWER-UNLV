import NavBar from "./sections/navbar";
import BackgroundImage from "./sections/backgroundImage";
import Welcome from "./sections/welcome";
import Separator from "./components/separator";
import { useRef } from "react";
import Mission from "./sections/mission";
import ProjectInformation from "./sections/projectInformation";

export default function App() {
  const homeRef = useRef(null);
  const refs = [homeRef];
  return (
    <main className="flex flex-col items-center" ref={homeRef}>
      <NavBar refs={refs} />
      <BackgroundImage />
      <section
        about="welcome info"
        className="flex flex-col h-[100vh] pt-16 w-[80%] items-center justify-center"
      >
        <Welcome />
      </section>
      <section about="background" className="w-full bg-white py-16 flex flex-col items-center">
        <section about="scrollable content" className="w-[80%] flex flex-col gap-y-16">
          <Separator title="NV EMPOWER MISSION" />
          <Mission />
          <Separator title="PROJECT INFORMATION" />
          <ProjectInformation />
        </section>
      </section>
    </main>
  );
}
