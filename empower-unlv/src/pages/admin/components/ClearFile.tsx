import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { X } from "lucide-react";

interface ClearFileProps {
  setFile: React.Dispatch<React.SetStateAction<File | null | undefined>>;
}

export default function ClearFile({ setFile }: ClearFileProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <X
            color="#FF3333"
            className="cursor-pointer hover:opacity-80 active:opacity-90"
            onClick={() => {
              setFile(null);
            }}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Remove file</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
