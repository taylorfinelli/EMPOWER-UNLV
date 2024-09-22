import { useState } from "react";
import UploadFile from "./components/UploadFile";
import { SelectGraph } from "./components/SelectGraph";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ClearFile from "./components/ClearFile";
import UploadMethodRadio from "./components/UploadMethodRadio";
import { UploadMethod } from "@/enum";
import UploadButton from "./components/UploadButton";
import { truncateText } from "./utils";
import { LoaderCircle } from "lucide-react";

export default function Admin() {
  const [file, setFile] = useState<File | null | undefined>();
  const [graphId, setGraphId] = useState<string | undefined>();
  const [uploadMethod, setUploadMethod] = useState<UploadMethod>(UploadMethod.APPEND);
  const [uploading, setUploading] = useState<boolean>(false);

  return (
    <div className="flex flex-row justify-center pt-12">
      {uploading ? (
        <div className="flex flex-row gap-x-2">
          <LoaderCircle className="animate-spin" />
          <p>Uploading</p>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Update Graph</CardTitle>
            <CardDescription>
              Select a .csv file and the graph you'd like to update.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-x-2">
              <UploadFile file={file} setFile={setFile} />
              {file ? (
                <>
                  <p>{truncateText(file.name, 30)}</p>
                  <ClearFile setFile={setFile} />
                </>
              ) : (
                <p>Upload a file</p>
              )}
            </div>
            <SelectGraph setGraphId={setGraphId} />
            <UploadMethodRadio setUploadMethod={setUploadMethod} />
            <UploadButton
              file={file}
              setFile={setFile}
              graphId={graphId}
              uploadMethod={uploadMethod}
              setUploading={setUploading}
              setUploadMethod={setUploadMethod}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
