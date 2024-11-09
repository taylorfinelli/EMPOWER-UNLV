import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { additionalItems, menuItems } from "@/components/navbar/utils";

export default function MobileDropdown({ handleClick }: any) {
  const allMenuItems = [...menuItems, ...additionalItems];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="md:hidden cursor-pointer px-6 h-full flex flex-col justify-center">
          <div>
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-2">
        {allMenuItems.map((item, i) => (
          <DropdownMenuItem
            className="active:bg-slate-200 text-lg"
            key={i}
            onClick={() => handleClick(item)}
          >
            {item.text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
