import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface UploadFileProps {
  file: File | null | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | null | undefined>>;
}

export default function UploadFile({ file, setFile }: UploadFileProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: any) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  useEffect(() => {
    if (fileRef.current && !file) {
      fileRef.current.value = "";
    }
  }, [file]);

  return (
    <Button onClick={() => fileRef?.current?.click()}>
      <Upload />
      <input
        className="hidden"
        onChange={handleFileChange}
        ref={fileRef}
        type="file"
        accept=".csv"
      ></input>
    </Button>
  );
}
