import {
  Info,
  CircleX,
  CircleCheck,
  TriangleAlert,
  ChartNoAxesColumn,
} from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./index";

export default function ToneAlertDemo() {
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

      {/* Destructive – error / failure */}
      <Alert variant="destructive">
        <CircleX />
        <AlertTitle>Failed to upload file</AlertTitle>
        <AlertDescription>
          The upload was interrupted. Please check your connection and try
          again.
        </AlertDescription>
      </Alert>

      {/* Info – helpful guidance */}
      <Alert variant="info">
        <Info />
        <AlertTitle>New dashboard available</AlertTitle>
        <AlertDescription>
          We’ve redesigned the dashboard with faster loading and clearer
          insights. You can switch to the new layout in Settings.
        </AlertDescription>
      </Alert>

      {/* Warning – caution / attention needed */}
      <Alert variant="warning">
        <TriangleAlert />
        <AlertTitle>Storage almost full</AlertTitle>
        <AlertDescription>
          You’re using 92% of your available storage. Consider removing unused
          files to avoid upload issues.
        </AlertDescription>
      </Alert>
    </div>
  );
}
