import { Label, type LabelVariant, type LabelStatus } from "./index";
import {
  Info,
  Mail,
  Lock,
  User,
  Building2,
  KeyRound,
  AlertCircle,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react";

const VARIANTS: LabelVariant[] = [
  "default",
  "required",
  "optional",
  "muted",
  "inline",
];

const STATUSES: LabelStatus[] = [
  "neutral",
  "success",
  "warning",
  "danger",
  "info",
];

/* -------------------------------------------------------------------------- */
/*                          Section 1: variants                                */
/* -------------------------------------------------------------------------- */

function VariantSection() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {VARIANTS.map((v) => (
        <div key={v} className="space-y-2">
          <span className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            variant = &quot;{v}&quot;
          </span>
          <Label variant={v}>Email address</Label>
          <input
            type="email"
            placeholder="you@example.com"
            className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Section 2: with status                             */
/* -------------------------------------------------------------------------- */

function StatusSection() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {STATUSES.map((s) => (
        <div key={s} className="space-y-2">
          <span className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            status = &quot;{s}&quot;
          </span>
          <Label status={s}>Field label</Label>
          <input
            placeholder="…"
            className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Section 3: with icons                              */
/* -------------------------------------------------------------------------- */

function IconSection() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-2">
        <Label icon={<Mail />}>Email address</Label>
        <input
          type="email"
          placeholder="you@example.com"
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <Label variant="required" icon={<Lock />}>
          Password
        </Label>
        <input
          type="password"
          placeholder="••••••••"
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <Label icon={<User />} hint="Shown on your public profile.">
          Display name
        </Label>
        <input
          placeholder="Jane Doe"
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <Label variant="optional" icon={<Building2 />}>
          Company
        </Label>
        <input
          placeholder="Acme Inc."
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Section 4: with hints                              */
/* -------------------------------------------------------------------------- */

function HintSection() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-2">
        <Label hint="We'll never share your email.">Email</Label>
        <input
          type="email"
          placeholder="you@example.com"
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <Label variant="required" hint="Must be at least 8 characters.">
          Password
        </Label>
        <input
          type="password"
          placeholder="••••••••"
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <Label variant="optional" hint="Shown on your public profile.">
          Display name
        </Label>
        <input
          placeholder="Jane Doe"
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <Label variant="muted" hint="Read-only field.">
          Account ID
        </Label>
        <input
          type="text"
          defaultValue="usr_8f7a2b91c4d3e"
          readOnly
          className="h-9 w-full cursor-not-allowed rounded-md border border-border bg-muted px-3 text-sm outline-none"
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Section 5: inline labels                           */
/* -------------------------------------------------------------------------- */

function InlineSection() {
  return (
    <div className="max-w-md space-y-5">
      <div className="flex items-start gap-3">
        <Label variant="inline" hint="12:00 AM – 11:59 PM">
          Timezone
        </Label>
        <select className="h-9 flex-1 rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">
          <option>UTC</option>
          <option>GMT</option>
          <option>IST</option>
        </select>
      </div>

      <div className="flex items-start gap-3">
        <Label variant="inline" icon={<Info />}>
          Notifications
        </Label>
        <div className="flex flex-1 items-center gap-2">
          <input type="checkbox" defaultChecked className="size-4" />
          <span className="text-sm text-muted-foreground">
            Send me product updates
          </span>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Label variant="inline" hint="Optional" icon={<KeyRound />}>
          API Key
        </Label>
        <input
          type="text"
          placeholder="sk_live_…"
          className="h-9 flex-1 rounded-md border border-border bg-background px-3 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Section 6: icon + status combined                  */
/* -------------------------------------------------------------------------- */

function CombinedSection() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-2">
        <Label icon={<CheckCircle2 />} status="success">
          Primary email
        </Label>
        <input
          type="email"
          defaultValue="parth@venumity.com"
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <Label icon={<AlertCircle />} status="warning">
          Recovery email
        </Label>
        <input
          type="email"
          placeholder="backup@example.com"
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <Label icon={<Clock />} status="info">
          Session timeout
        </Label>
        <input
          type="text"
          defaultValue="30 minutes"
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <Label icon={<Zap />} status="danger" variant="required">
          Requires 2FA
        </Label>
        <input
          type="text"
          placeholder="Enter backup code"
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Section 7: disabled                                */
/* -------------------------------------------------------------------------- */

function DisabledSection() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-2">
        <Label disabled icon={<Lock />}>
          Disabled label
        </Label>
        <input
          disabled
          placeholder="Not editable"
          className="h-9 w-full rounded-md border border-border bg-muted px-3 text-sm outline-none"
        />
      </div>

      <div className="space-y-2">
        <Label variant="required" disabled icon={<KeyRound />} status="warning">
          Required, disabled
        </Label>
        <input
          disabled
          placeholder="Not editable"
          className="h-9 w-full rounded-md border border-border bg-muted px-3 text-sm outline-none"
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Section 8: real-world form                         */
/* -------------------------------------------------------------------------- */

function FormSection() {
  return (
    <div className="max-w-md space-y-5">
      <div className="space-y-2">
        <Label
          variant="required"
          icon={<Mail />}
          status="success"
          hint="Used for account recovery."
        >
          Email
        </Label>
        <input
          type="email"
          placeholder="you@example.com"
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <Label variant="required" icon={<Lock />} hint="Minimum 8 characters.">
          Password
        </Label>
        <input
          type="password"
          placeholder="••••••••"
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <Label variant="optional" icon={<Building2 />} hint="Shown publicly.">
          Company
        </Label>
        <input
          placeholder="Acme Inc."
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <Label variant="muted" icon={<Clock />}>
          Terms version
        </Label>
        <p className="text-xs text-muted-foreground">
          You accepted v2.4.1 on Nov 3, 2025.
        </p>
      </div>

      <button className="inline-flex h-9 items-center rounded-md bg-foreground px-4 text-sm font-medium text-background hover:opacity-90">
        Create account
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Demo                                       */
/* -------------------------------------------------------------------------- */

export default function LabelDemo() {
  return (
    <div className="flex flex-col gap-14 p-6">
      <section className="space-y-4">
        <header className="space-y-1">
          <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Variants
          </h3>
          <p className="text-sm text-muted-foreground">
            default · required · optional · muted · inline. Pure typography — no
            animations.
          </p>
        </header>
        <VariantSection />
      </section>

      <section className="space-y-4">
        <header className="space-y-1">
          <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Status dots
          </h3>
          <p className="text-sm text-muted-foreground">
            neutral · success · warning · danger · info.
          </p>
        </header>
        <StatusSection />
      </section>

      <section className="space-y-4">
        <header className="space-y-1">
          <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            With icons
          </h3>
          <p className="text-sm text-muted-foreground">
            Any Lucide / custom icon renders before the label text.
          </p>
        </header>
        <IconSection />
      </section>

      <section className="space-y-4">
        <header className="space-y-1">
          <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            With hints
          </h3>
        </header>
        <HintSection />
      </section>

      <section className="space-y-4">
        <header className="space-y-1">
          <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Inline
          </h3>
        </header>
        <InlineSection />
      </section>

      <section className="space-y-4">
        <header className="space-y-1">
          <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Icon + status combined
          </h3>
        </header>
        <CombinedSection />
      </section>

      <section className="space-y-4">
        <header className="space-y-1">
          <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Disabled
          </h3>
        </header>
        <DisabledSection />
      </section>

      <section className="space-y-4">
        <header className="space-y-1">
          <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Real-world form
          </h3>
        </header>
        <FormSection />
      </section>
    </div>
  );
}
