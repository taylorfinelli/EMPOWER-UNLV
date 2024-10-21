import React, { useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { locationNamesMap } from "../utils";

interface SelectCityProps {
  setLineToShow: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function SelectCity({ setLineToShow, value, setValue }: SelectCityProps) {
  const [open, setOpen] = useState<boolean>(false);
  const locationNames = Array.from(locationNamesMap.values());

  const valueToKeyMap = new Map();
  for (const [key, value] of locationNamesMap) {
    valueToKeyMap.set(value, key);
  }

  useEffect(() => {
    setLineToShow(valueToKeyMap.get(value));
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
          {value ? locationNames.find((location) => location === value) : "Select location..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search graphs..." />
          <CommandList>
            <CommandEmpty>No graph ID found.</CommandEmpty>
            <CommandGroup>
              {locationNames.map((location) => (
                <CommandItem
                  key={location}
                  value={location}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", value === location ? "opacity-100" : "opacity-0")}
                  />
                  {location}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
