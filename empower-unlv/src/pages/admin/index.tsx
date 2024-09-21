import { useState } from "react";
import UploadFile from "./components/UploadFile";
import { SelectGraph } from "./components/SelectGraph";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ClearFile from "./components/ClearFile";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Alert from "./components/Alert";

export default function Admin() {
  const [file, setFile] = useState<File | null | undefined>();
  const [graphId, setGraphId] = useState<string | undefined>();
  const [uploadMethod, setUploadMethod] = useState<"append" | "overwrite">("append");

  return (
    <div className="flex flex-row justify-center pt-12">
      <Card>
        <CardHeader>
          <CardTitle>Update Graph</CardTitle>
          <CardDescription>Select a .csv file and the graph you'd like to update.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-x-2">
            <UploadFile file={file} setFile={setFile} />
            {file ? (
              <>
                <p>{file.name}</p>
                <ClearFile setFile={setFile} />
              </>
            ) : (
              <p>Upload a file</p>
            )}
          </div>
          <SelectGraph setGraphId={setGraphId} />
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-one"
                id="option-one"
                onClick={() => setUploadMethod("append")}
              />
              <Label htmlFor="option-one">Append to exisiting data</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-two"
                id="option-two"
                onClick={() => setUploadMethod("overwrite")}
              />
              <Label htmlFor="option-two">Overwrite graph data</Label>
            </div>
          </RadioGroup>
          <Alert file={file} graphId={graphId} uploadMethod={uploadMethod} />
        </CardContent>
      </Card>
    </div>
  );
}
