interface SeparatorProps {
  title: string;
  reference?: any;
}

export default function Separator({ title, reference }: SeparatorProps) {
  return (
    <div className="w-full">
      <div className="flex flex-1 flex-row items-center" ref={reference}>
        <hr className="flex-grow h-1 border-sky-950 bg-sky-950" />
        <h2 className="px-4 font-bold text-sky-950">{title}</h2>
        <hr className="flex-grow h-1 border-sky-950 bg-sky-950" />
      </div>
    </div>
  );
}
