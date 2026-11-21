import { Spinner, LoadingDots } from "./index";

export default function GradientSpinnerDemo() {
  return (
    <div className="flex items-center justify-center gap-5 md:gap-10 lg:gap-15 w-full">
      <div className="flex flex-col items-center gap-5">
        <Spinner variant="gradient" size="sm" />
        <div className="space-y-1 text-center">
          <h3 className="text-base font-semibold">Processing request</h3>
          <p className="text-sm text-muted-foreground">
            We are preparing things
            <LoadingDots />
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5">
        <Spinner variant="gradient" />
        <div className="space-y-1 text-center">
          <h3 className="text-base font-semibold">Processing request</h3>
          <p className="text-sm text-muted-foreground">
            We are preparing things
            <LoadingDots />
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5">
        <Spinner variant="gradient" size="xl" />
        <div className="space-y-1 text-center">
          <h3 className="text-base font-semibold">Processing request</h3>
          <p className="text-sm text-muted-foreground">
            We are preparing things
            <LoadingDots />
          </p>
        </div>
      </div>
    </div>
  );
}
