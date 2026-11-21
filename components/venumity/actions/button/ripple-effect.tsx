import { Button } from "./index";

export default function RippleEffectButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-5 md:gap-10 p-5 md:p-10 max-w-2xl">
      {/* Colors */}
      <div className="space-y-5 w-full">
        <h4 className="text-sm font-medium pb-5 border-b">Ripple Colors</h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default" animation="ripple">
            Default Ripple
          </Button>
          <Button animation="ripple" variant="destructive">
            Default Ripple
          </Button>
          <Button
            variant="outline"
            animation="ripple"
            rippleColor="var(--primary)"
          >
            Primary Ripple
          </Button>
          <Button animation="ripple" rippleColor="#fbbf24" variant="outline">
            Yellow Ripple
          </Button>
          <Button animation="ripple" rippleColor="#22c55e" variant="secondary">
            Green Ripple
          </Button>
        </div>
      </div>

      {/* Layers */}
      <div className="space-y-5 w-full">
        <h4 className="text-sm font-medium pb-5 border-b">Ripple Layers</h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button rippleLayers={1} variant="default" animation="ripple">
            1 Layer
          </Button>
          <Button rippleLayers={2} variant="default" animation="ripple">
            2 Layers
          </Button>
          <Button rippleLayers={3} variant="default" animation="ripple">
            3 Layers (Default)
          </Button>
          <Button rippleLayers={5} variant="default" animation="ripple">
            5 Layers
          </Button>
          <Button
            animation="ripple"
            rippleLayers={8}
            variant="secondary"
            rippleColor="var(--primary)"
          >
            8 Layers
          </Button>
        </div>
      </div>

      {/* Duration & Speed */}
      <div className="space-y-5 w-full">
        <h4 className="text-sm font-medium pb-5 border-b">Ripple Speed</h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            animation="ripple"
            rippleDuration={0.3}
            rippleColor="color-mix(in oklab, var(--foreground) 30%, transparent)"
          >
            Fast (0.3s)
          </Button>
          <Button
            variant="outline"
            animation="ripple"
            rippleDuration={0.75}
            rippleColor="color-mix(in oklab, var(--foreground) 20%, transparent)"
          >
            Default (0.75s)
          </Button>
          <Button
            variant="outline"
            animation="ripple"
            rippleDuration={1.5}
            rippleColor="color-mix(in oklab, var(--foreground) 20%, transparent)"
          >
            Slow (1.5s)
          </Button>
          <Button
            variant="outline"
            animation="ripple"
            rippleDuration={2.5}
            rippleColor="color-mix(in oklab, var(--foreground) 20%, transparent)"
          >
            Very Slow (2.5s)
          </Button>
        </div>
      </div>

      {/* Combined Customization */}
      <div className="space-y-5 w-full">
        <h4 className="text-sm font-medium pb-5 border-b">Combined</h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            rippleLayers={4}
            rippleDuration={1}
            animation="ripple"
            rippleColor="var(--color-purple-500)"
            className="bg-foreground! text-secondary!"
          >
            Purple Storm
          </Button>
          <Button
            rippleLayers={2}
            animation="ripple"
            rippleDuration={0.5}
            variant="destructive"
            rippleColor="rgba(255,255,255,0.6)"
          >
            Cyber Fast White
          </Button>
          <Button
            rippleLayers={6}
            variant="outline"
            animation="ripple"
            rippleDuration={2}
            rippleColor="var(--color-emerald-500)"
          >
            Eco Waves
          </Button>
        </div>
      </div>
    </div>
  );
}
