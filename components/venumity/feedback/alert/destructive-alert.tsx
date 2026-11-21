import { CircleX } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./index";

export default function DestructiveAlertDemo() {
  return (
    <Alert variant="destructive" className="w-sm">
      <CircleX />
      <AlertTitle>Failed to upload file</AlertTitle>
      <AlertDescription>
        The upload was interrupted. Please check your connection and try again.
      </AlertDescription>
    </Alert>
  );
}
