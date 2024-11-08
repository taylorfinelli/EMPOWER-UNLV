import Logos from "@/assets/logos/logos";
import { useNavigate, useLocation } from "react-router-dom";
import MobileDropdown from "./components/MobileDropdown";
import { additionalItems, menuItems } from "./utils";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item: any) => {
    // scroll to top of window if we click on the tab of the current window, else navigate to it
    if (window.location.pathname === "/" + item.href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/" + item.href);
    }
  };

  return (
    <div className="flex flex-row w-full h-16 bg-blue_primary items-center justify-between md:pr-6 fixed z-50">
      <Logos className="max-w-[50%] object-contain" />

      <MobileDropdown handleClick={handleClick} />

      <div className="md:flex flex-row gap-x-4 hidden">
        {menuItems.map((item, id) => (
          <p
            key={id}
            onClick={() => handleClick(item)}
            className={`text-sm font-medium text-white transition-opacity ease-in-out duration-150 active:opacity-50 cursor-pointer ${
              location.pathname === "/" + item.href
                ? "underline underline-offset-4"
                : "opacity-50 hover:opacity-80"
            }`}
          >
            {item.text}
          </p>
        ))}
        <div className="border-l-white h-6 border-l-[1px] opacity-70" />
        {additionalItems.map((item, id) => (
          <p
            key={id}
            onClick={() => handleClick(item)}
            className={`text-sm font-medium text-white transition-opacity ease-in-out duration-150 active:opacity-50 cursor-pointer ${
              location.pathname === "/" + item.text.toLowerCase()
                ? "underline underline-offset-4"
                : "opacity-50 hover:opacity-80"
            }`}
          >
            {item.text}
          </p>
        ))}
      </div>
    </div>
  );
}
