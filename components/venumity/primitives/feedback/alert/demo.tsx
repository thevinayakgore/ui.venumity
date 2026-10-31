import { Button } from "../../actions/button";
import { Settings, CircleCheck, ChartNoAxesColumn } from "lucide-react";
import { Alert, AlertTitle, AlertDescription, AlertAction } from "./index";

export default function AlertDemo() {
  return (
    <div className="p-5 md:p-10 space-y-3 max-w-lg">
      {/* Default – neutral / informational */}
      <Alert variant="default">
        <ChartNoAxesColumn />
        <AlertTitle>Views update</AlertTitle>
        <AlertDescription>
          This month recently got more views than usual.
        </AlertDescription>
      </Alert>

      {/* Success – positive confirmation */}
      <Alert variant="success">
        <CircleCheck />
        <AlertTitle>Changes saved successfully</AlertTitle>
        <AlertDescription>
          Your profile information has been updated and is now visible to other
          users.
        </AlertDescription>
      </Alert>

      {/* Default with actions – actionable / settings-like */}
      <Alert variant="default">
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
    </div>
  );
}
