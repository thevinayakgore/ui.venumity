import { Spinner } from "./index";

export default function RingSpinnerDemo() {
  return (
    <div className="flex flex-wrap items-center gap-5 md:gap-10 lg:gap-15 w-fit">
      {/* Success */}
      <div className="flex flex-col items-center gap-5">
        <Spinner variant="ring" size="lg" tone="success" />
        <span className="text-xs capitalize md:text-sm">success</span>
      </div>

      {/* Danger */}
      <div className="flex flex-col items-center gap-5">
        <Spinner variant="ring" size="lg" tone="danger" />
        <span className="text-xs capitalize md:text-sm">danger</span>
      </div>
    </div>
  );
}
