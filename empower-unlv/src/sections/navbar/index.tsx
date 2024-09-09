import { useState } from "react";

export default function NavBar({ refs }: any) {
  const [selected, setSelected] = useState(0);

  const menuItems = [
    { text: "Home", index: 0, ref: refs[0] },
    { text: "Data", index: 1 },
    { text: "Variant Testing", index: 2 },
    { text: "FAQ", index: 3 },
    { text: "Contact", index: 4 },
  ];

  const additionalItems = [
    { text: "About", index: 5 },
    { text: "Media", index: 6 },
  ];

  const handleClick = (item: (typeof menuItems)[0]) => {
    console.log(item);
    setSelected(item.index);
    if (item.ref?.current) {
      item.ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-row gap-4 w-full h-16 bg-sky-950 items-center justify-end pr-6 fixed z-50">
      {menuItems.map((item) => (
        <p
          key={item.index}
          onClick={() => {
            handleClick(item);
          }}
          className={`text-sm font-medium text-white transition-opacity ease-in-out duration-150 active:opacity-50 cursor-pointer ${
            selected === item.index ? "underline underline-offset-4" : "opacity-50 hover:opacity-80"
          }`}
        >
          {item.text}
        </p>
      ))}
      <div className="border-l-white h-6 border-l-[1px] opacity-70" />
      {additionalItems.map((item) => (
        <p
          key={item.index}
          onClick={() => {
            setSelected(item.index);
          }}
          className={`text-sm font-medium text-white transition-opacity ease-in-out duration-150 active:opacity-50 cursor-pointer ${
            selected === item.index ? "underline underline-offset-4" : "opacity-50 hover:opacity-80"
          }`}
        >
          {item.text}
        </p>
      ))}
    </div>
  );
}
