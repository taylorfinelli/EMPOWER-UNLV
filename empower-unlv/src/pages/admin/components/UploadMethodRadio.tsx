import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UploadMethod } from "@/enum";

interface UploadMethodRadioProps {
  setUploadMethod: React.Dispatch<React.SetStateAction<UploadMethod>>;
}

export default function UploadMethodRadio({ setUploadMethod }: UploadMethodRadioProps) {
  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="option-one"
          id="option-one"
          onClick={() => setUploadMethod(UploadMethod.APPEND)}
        />
        <Label htmlFor="option-one">Append to exisiting data</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="option-two"
          id="option-two"
          onClick={() => setUploadMethod(UploadMethod.OVERWRITE)}
        />
        <Label htmlFor="option-two">Overwrite graph data</Label>
      </div>
    </RadioGroup>
  );
}
