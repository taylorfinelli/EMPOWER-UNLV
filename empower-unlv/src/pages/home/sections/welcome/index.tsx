import Logos from "@/assets/logos/logos";

export default function Welcome() {
  return (
    <div className="flex flex-col gap-4">
      <Logos />
      <h1 className="text-white">WELCOME TO THE NV EMPOWER PROGRAM</h1>
      <h2 className="text-white">
        NV Enabling the Management of Public Health Outcomes Through Wastewater Resources
      </h2>
    </div>
  );
}
