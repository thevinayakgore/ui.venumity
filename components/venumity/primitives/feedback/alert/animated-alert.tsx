import { Alert, AlertTitle, AlertDescription } from "./index";
import {
  MessageSquareMore,
  BellRing,
  CircleCheck,
  CircleX,
  Info,
  TriangleAlert,
} from "lucide-react";

export default function AnimatedAlertDemo() {
  return (
    <div className="p-5 md:p-10 space-y-3 max-w-lg">
      <p className="text-xs text-center text-muted-foreground mb-5">
        Just refresh once to view animation ! (top-right corner)
      </p>
      {/* Blur – neutral update */}
      <Alert variant="default" animation="blur">
        <MessageSquareMore />
        <AlertTitle>New comments on your post</AlertTitle>
        <AlertDescription>
          You have 3 new comments on “Getting started with our design system”.
          Tap to review and reply.
        </AlertDescription>
      </Alert>

      {/* Bounce – light, positive ping */}
      <Alert variant="default" animation="bounce">
        <BellRing />
        <AlertTitle>Reminder: Daily standup in 10 minutes</AlertTitle>
        <AlertDescription>
          Join the team call to share updates and blockers for the day.
        </AlertDescription>
      </Alert>

      {/* Elastic – info with a bit of motion */}
      <Alert variant="info" animation="elastic">
        <Info />
        <AlertTitle>Trial period ending soon</AlertTitle>
        <AlertDescription>
          Your 14‑day trial ends in 2 days. Upgrade now to keep access to all
          features without interruption.
        </AlertDescription>
      </Alert>

      {/* Flip – success confirmation */}
      <Alert variant="success" animation="flip">
        <CircleCheck />
        <AlertTitle>Email verified successfully</AlertTitle>
        <AlertDescription>
          Your email address has been confirmed. You can now reset your password
          and enable two‑factor authentication.
        </AlertDescription>
      </Alert>

      {/* Fade – error / failure */}
      <Alert variant="destructive" animation="fade">
        <CircleX />
        <AlertTitle>Payment could not be processed</AlertTitle>
        <AlertDescription>
          Your card was declined. Please update your payment method or try a
          different card to continue.
        </AlertDescription>
      </Alert>

      {/* Scale – important info */}
      <Alert variant="info" animation="scale">
        <Info />
        <AlertTitle>Scheduled maintenance tonight</AlertTitle>
        <AlertDescription>
          We’ll be performing system upgrades from 2–4 AM IST. You may
          experience brief interruptions during this window.
        </AlertDescription>
      </Alert>

      {/* Slide – warning / caution */}
      <Alert variant="warning" animation="slide">
        <TriangleAlert />
        <AlertTitle>Unsaved changes will be lost</AlertTitle>
        <AlertDescription>
          You’re about to leave this page. Make sure to save your work or your
          recent edits will be discarded.
        </AlertDescription>
      </Alert>
    </div>
  );
}
