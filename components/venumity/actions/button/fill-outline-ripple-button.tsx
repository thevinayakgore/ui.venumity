import { Button } from "./index";

export default function FillOutlineRippleButton() {
  return (
    <Button
      size="lg"
      animation="ripple"
      className="relative isolate border-2 border-primary bg-transparent text-sm font-semibold text-primary hover:text-white active:before:bg-blue-600! active:border-3 active:border-blue-400! active:rounded-xl before:absolute before:-z-10 before:top-full before:left-full before:bg-primary hover:before:-top-10 hover:before:-left-10 before:h-40 before:w-50 before:rounded-full inset-shadow-none before:duration-700 transition-all duration-500 overflow-hidden"
    >
      Click & Hold
    </Button>
  );
}
