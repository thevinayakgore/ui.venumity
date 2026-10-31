import { Spinner } from "./index";

export default function DotsSpinnerDemo() {
  return (
      <div className="flex flex-col items-center gap-3">
        <Spinner variant="dots" />
        <span className="text-xs">
          Waiting..
        </span>
      </div>
  );
}
