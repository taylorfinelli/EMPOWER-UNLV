export default function Separator({ title, reference }: any) {
  return (
    <div className="flex flex-1 flex-row justify-center items-center" ref={reference}>
      <hr className="flex-grow h-1 border-sky-950 bg-sky-950" />
      <h2 className="px-4 font-bold text-sky-950">{title}</h2>
      <hr className="flex-grow h-1 border-sky-950 bg-sky-950" />
    </div>
  );
}
