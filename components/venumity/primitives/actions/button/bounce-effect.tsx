import { Button } from "./index";

export default function BounceEffectButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3 max-w-xl">
      <Button animation="bounce">Default (0.05)</Button>

      <Button animation="bounce" bounceAmount={0.5}>
        Medium (0.5)
      </Button>

      <Button animation="bounce" bounceAmount={1}>
        Big (1.0)
      </Button>

      <Button animation="bounce" bounceAmount={2} variant="destructive">
        Huge (2.0)
      </Button>

      <Button
        animation="bounce"
        bounceAmount={0.5}
        scale={1.1}
        scaleTap={0.9}
        variant="outline"
      >
        Bounce + Scale Custom
      </Button>

      <Button animation="bounce" bounceAmount={0} variant="secondary">
        Click Only (No Jump)
      </Button>
    </div>
  );
}
