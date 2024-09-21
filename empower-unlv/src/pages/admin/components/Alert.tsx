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

interface AlertProps {
  file: File | null | undefined;
  graphId: string | undefined;
  uploadMethod: "append" | "overwrite";
}

export default function Alert({ file, graphId, uploadMethod }: AlertProps) {
  const alertText =
    uploadMethod === "overwrite"
      ? "You are going to overwrite all existing data for the selected graph. "
      : "";
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={!(file && graphId)}>Upload to database</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you{uploadMethod === "overwrite" ? " ABSOLUTELY " : " "}sure?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <p>
              <strong>{alertText}</strong> This action cannot be undone.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
