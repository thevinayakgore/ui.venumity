import { Settings } from "lucide-react";
import { Button } from "../../actions/button";
import { Alert, AlertTitle, AlertDescription, AlertAction } from "./index";

export default function ActionAlertDemo() {
  return (
    <Alert className="w-sm">
      <Settings />
      <AlertTitle>Review settings</AlertTitle>
      <AlertDescription>
        You’re currently receiving email notifications for every new comment.
      </AlertDescription>
      <AlertAction>
        <Button size="sm" animation="ripple" className="text-white">
          Ok, Got it
        </Button>
      </AlertAction>
    </Alert>
  );
}
