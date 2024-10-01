import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { UploadMethod } from "@/enum";
import { toast } from "@/hooks/use-toast";
import { uploadFileToDDB } from "@/pages/admin/utils";

interface AlertProps {
  file: File | null | undefined;
  graphId: string | undefined;
  uploadMethod: UploadMethod;
  setFile: React.Dispatch<React.SetStateAction<File | null | undefined>>;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  setUploadMethod: React.Dispatch<React.SetStateAction<UploadMethod>>;
}

export default function Alert({
  file,
  graphId,
  uploadMethod,
  setUploading,
  setFile,
  setUploadMethod,
}: AlertProps) {
  const handleUpload = async () => {
    setUploading(true);
    try {
      await uploadFileToDDB(file!, uploadMethod, graphId!, setUploading);
      setFile(null);
      setUploadMethod(UploadMethod.APPEND);
      toast({
        title: "Upload Success!",
        description: `Your file "${file!.name}" was uploaded successfully.`,
      });
    } catch (error: any) {
      setUploadMethod(UploadMethod.APPEND);
      toast({
        title: "Upload Failed!",
        description: error.message,
      });
    }
  };

  const alertText =
    uploadMethod === UploadMethod.OVERWRITE
      ? "You are going to overwrite all existing data for the selected graph. "
      : "";
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={!(file && graphId)}>Upload to database</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you{uploadMethod === UploadMethod.OVERWRITE ? " ABSOLUTELY " : " "}sure?
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <p>
                <strong>{alertText}</strong> This action cannot be undone.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpload}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster />
    </>
  );
}
