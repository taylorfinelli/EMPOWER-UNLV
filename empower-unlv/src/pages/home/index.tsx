import Separator from "@/components/separator";
import BackgroundImage from "@/pages/home/sections/backgroundImage";
import Mission from "@/pages/home/sections/mission";
import NavBar from "@/components/navbar";
import ProjectInformation from "@/pages/home/sections/projectInformation";
import Welcome from "@/pages/home/sections/welcome";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <NavBar />
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
