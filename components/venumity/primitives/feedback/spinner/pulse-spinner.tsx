import { Spinner } from "./index";

export default function PulseSpinnerDemo() {
  return (
      <div className="flex flex-col items-center gap-3">
        <Spinner variant="pulse" tone="success" />
        <span className="text-xs">
          Waiting..
        </span>
      </div>
  );
}
