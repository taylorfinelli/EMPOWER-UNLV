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
import { graphIds } from "@/graphIds";
import { useState } from "react";

interface SelectGraphProps {
  setGraphId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function SelectGraph({ setGraphId }: SelectGraphProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setGraphId(value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
          {value ? graphIds.find((graphId) => graphId === value) : "Select graph..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search graphs..." />
          <CommandList>
            <CommandEmpty>No graph ID found.</CommandEmpty>
            <CommandGroup>
              {graphIds.map((graphId) => (
                <CommandItem
                  key={graphId}
                  value={graphId}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", value === graphId ? "opacity-100" : "opacity-0")}
                  />
                  {graphId}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
