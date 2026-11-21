import { Button } from "./index";
import {
  Search,
  Settings,
  ArrowDown,
  RefreshCw,
  ArrowRight,
  HeartPulse,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowDownToLine,
} from "lucide-react";

export default function IconMotionButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3 max-w-xl">
      {/* Continuous */}
      <Button variant="outline" leftIcon={<Search />} iconMotion="zoom">
        Zoom
      </Button>
      <Button variant="outline" leftIcon={<RefreshCw />} iconMotion="spin">
        Spin
      </Button>
      <Button variant="outline" leftIcon={<HeartPulse />} iconMotion="pulse">
        Pulse
      </Button>
      <Button
        variant="outline"
        leftIcon={<ArrowDownToLine />}
        iconMotion="bounce"
      >
        Bounce
      </Button>
      <Button variant="outline" leftIcon={<Settings />} iconMotion="wiggle">
        Wiggle
      </Button>

      {/* Directional */}
      <Button
        variant="default"
        iconMotion="up"
        leftIcon={<ArrowRight className="-rotate-90" />}
      >
        Move Up
      </Button>
      <Button variant="default" iconMotion="down" rightIcon={<ArrowDown />}>
        Move Down
      </Button>
      <Button
        variant="secondary"
        iconMotion="left"
        leftIcon={<ArrowRight className="rotate-180" />}
      >
        Move Left
      </Button>
      <Button variant="secondary" iconMotion="right" rightIcon={<ArrowRight />}>
        Move Right
      </Button>

      <Button
        variant="outline"
        iconMotion="right-up"
        rightIcon={<ArrowUpRight />}
      >
        Move Right Up
      </Button>
      <Button
        variant="outline"
        iconMotion="bottom-left"
        leftIcon={<ArrowDownLeft />}
      >
        Move Bottom Left
      </Button>
    </div>
  );
}
