interface SeparatorProps {
  title: string;
  reference?: any;
}

export default function Separator({ title, reference }: SeparatorProps) {
  return (
    <div className="w-full">
      <div className="flex flex-1 flex-col md:flex-row items-center" ref={reference}>
        <hr className="hidden md:block flex-grow h-1 border-blue_primary bg-blue_primary" />
        <h2 className="px-4 text-center font-bold text-blue_primary">{title}</h2>
        <hr className="hidden md:block flex-grow h-1 border-blue_primary bg-blue_primary" />
      </div>
      <hr className="block md:hidden my-1 flex-grow h-0.5 border-blue_primary bg-blue_primary" />
    </div>
  );
}
