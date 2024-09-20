import Separator from "@/components/separator";
import BackgroundImage from "@/pages/home/sections/backgroundImage";
import Mission from "@/pages/home/sections/mission";
import ProjectInformation from "@/pages/home/sections/projectInformation";
import Welcome from "@/pages/home/sections/welcome";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <BackgroundImage />
      <section
        about="welcome info"
        className="flex flex-col h-[calc(100vh-64px)] w-[80%] items-center justify-center"
      >
        <Welcome />
      </section>
      <section about="background" className="w-full bg-white py-16 flex flex-col items-center">
        <section about="scrollable content" className="w-[80%] flex flex-col gap-y-16">
          <Separator title="NV EMPOWER Mission" />
          <Mission />
          <Separator title="Project Information" />
          <ProjectInformation />
        </section>
      </section>
    </main>
  );
}
