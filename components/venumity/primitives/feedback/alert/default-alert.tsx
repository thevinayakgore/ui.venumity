import { ChartNoAxesColumn } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./index";

export default function BasicAlertDemo() {
  return (
    <Alert variant="default" className="w-fit">
      <ChartNoAxesColumn />
      <AlertTitle>Views update</AlertTitle>
      <AlertDescription>
        This month recently got more views than usual.
      </AlertDescription>
    </Alert>
  );
}
