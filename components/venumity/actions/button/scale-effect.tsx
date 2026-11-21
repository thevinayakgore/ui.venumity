import { Button } from "./index";

export default function ScaleEffectButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3 max-w-xl">
      <Button animation="scale">Default (1.02 / 0.98)</Button>

      <Button animation="scale" scale={1.05} scaleTap={0.95}>
        Subtle (1.05 / 0.95)
      </Button>

      <Button animation="scale" scale={1.1} scaleTap={0.9}>
        Strong (1.10 / 0.90)
      </Button>

      <Button
        animation="scale"
        scale={1.15}
        scaleTap={0.85}
        variant="destructive"
      >
        Aggressive (1.15 / 0.85)
      </Button>

      <Button animation="scale" scale={1.05} scaleTap={0.98} variant="outline">
        Gentle (1.05 / 0.98)
      </Button>

      <Button animation="scale" scale={1} scaleTap={0.9} variant="secondary">
        Click Only (1 / 0.9)
      </Button>
    </div>
  );
}
