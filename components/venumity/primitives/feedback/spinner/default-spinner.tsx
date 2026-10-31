import { Spinner } from "./index";

export default function DefaultSpinnerDemo() {
  return (
    <div className="flex flex-wrap items-center gap-5 md:gap-10 w-fit">
      {/* Medium */}
      <div className="flex flex-col items-center gap-5">
        <div className="flex h-16 items-center justify-center">
          <Spinner variant="default" />
        </div>
        <span className="text-xs md:text-sm">tone = neutral</span>
      </div>

      {/* Medium */}
      <div className="flex flex-col items-center gap-5">
        <div className="flex h-16 items-center justify-center">
          <Spinner variant="default" size="xl" tone="danger" />
        </div>
        <div className="space-y-1">
          <p className="text-xs md:text-sm">tone = danger</p>
          <p className="text-xs md:text-sm">size = xl</p>
        </div>
      </div>
    </div>
  );
}
