import { useEffect, useState } from "react";
import UploadFile from "@/pages/admin/components/UploadFile";
import { SelectGraph } from "@/pages/admin/components/SelectGraph";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ClearFile from "@/pages/admin/components/ClearFile";
import UploadMethodRadio from "@/pages/admin/components/UploadMethodRadio";
import { UploadMethod } from "@/enum";
import UploadButton from "@/pages/admin/components/UploadButton";
import { truncateText } from "../utils";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import verifyToken from "@/auth/verify-token";

export default function AdminUpload() {
  const [file, setFile] = useState<File | null | undefined>();
  const [graphId, setGraphId] = useState<string | undefined>();
  const [uploadMethod, setUploadMethod] = useState<UploadMethod>(UploadMethod.APPEND);
  const [uploading, setUploading] = useState<boolean>(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean | undefined>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const validToken = await verifyToken();
      setIsTokenValid(validToken);
      if (!validToken) {
        navigate("/login");
      }
    };

    checkToken();
  }, []);

  return (
    <>
      {isTokenValid && (
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
      )}
    </>
  );
}
