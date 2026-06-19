"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ProcessAccordionItemBase {
  id: string;
  title: string;
  icon: string;
  description: string;
  badge: string;
}

const baseItems: ProcessAccordionItemBase[] = [
  {
    id: "item1",
    title: "Design",
    icon: "🎨",
    description: "Create beautiful user interfaces",
    badge: "Phase 01",
  },
  {
    id: "item2",
    title: "Development",
    icon: "💻",
    description: "Build robust applications",
    badge: "Phase 02",
  },
  {
    id: "item3",
    title: "Testing",
    icon: "🧪",
    description: "Ensure quality and reliability",
    badge: "Phase 03",
  },
  {
    id: "item4",
    title: "Deployment",
    icon: "🚀",
    description: "Deploy to production",
    badge: "Phase 04",
  },
  {
    id: "item5",
    title: "Maintenance",
    icon: "🔧",
    description: "Keep systems running smoothly",
    badge: "Phase 05",
  },
];

function Pill({ label }: { label: string }) {
  return (
    <span className="bg-background border px-2 py-1 text-[11px] text-foreground/60 rounded-sm">
      {label}
    </span>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-sm bg-muted p-2 text-xs">
      <span className="flex size-4 items-center justify-center rounded-full bg-green-500">
        <Check className="h-3 w-3 text-white" />
      </span>
      <span>{text}</span>
    </div>
  );
}

function DesignContent() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Capture the look and feel of your SaaS so the rest of the process has a
        clear visual reference.
      </p>

      <div className="flex flex-wrap gap-2 text-[11px]">
        <Pill label="Brand kit" />
        <Pill label="Design system" />
        <Pill label="Reference links" />
      </div>

      <div className="flex flex-col gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <ul className="space-y-1 list-disc ml-4 text-xs text-muted-foreground">
          <li>Upload your logo, colors, and typography preferences.</li>
          <li>Share 3–5 examples of products you like visually.</li>
          <li>
            Call out any must-have layouts (dashboards, pricing, auth, etc.).
          </li>
        </ul>
        <div className="space-y-2 rounded-lg bg-background border p-3 text-xs">
          <p className="text-[11px] font-medium text-foreground">
            Quick checklist
          </p>
          <ChecklistItem text="Brand assets are ready to upload" />
          <ChecklistItem text="Core screens you care about are listed" />
          <ChecklistItem text="Accessibility requirements are noted" />
          <div className="mt-2 flex flex-wrap gap-2">
            <Button size="sm" className="h-7 px-3 text-[11px]">
              Attach design brief
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-3 text-[11px]"
            >
              Use a starter template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DevelopmentContent() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Choose your stack and how hands-on you want to be with the codebase.
      </p>

      <div className="flex flex-col gap-3 md:grid-cols-2">
        <div className="space-y-2 rounded-lg bg-background border p-3 text-xs">
          <p className="text-[11px] font-medium text-foreground">
            Tech stack preferences
          </p>
          <div className="flex flex-wrap gap-2">
            <Pill label="Next.js" />
            <Pill label="TypeScript" />
            <Pill label="Postgres" />
            <Pill label="REST / GraphQL" />
          </div>
          <ul className="mt-2 space-y-1 list-disc ml-4 text-xs text-muted-foreground">
            <li>Specify required integrations (Stripe, Auth, etc.).</li>
            <li>Note any internal APIs we should connect to.</li>
          </ul>
        </div>

        <div className="space-y-2 rounded-lg bg-background border p-3 text-xs">
          <p className="text-[11px] font-medium text-foreground">
            Environments
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="rounded-full px-3 py-1 text-[11px]">Dev</Badge>
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-[11px]"
            >
              Staging
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-[11px]"
            >
              Production
            </Badge>
          </div>
          <ChecklistItem text="Repository and access details are available" />
          <div className="mt-2 flex flex-wrap gap-2">
            <Button size="sm" className="h-7 px-3 text-[11px]">
              Link Git provider
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-3 text-[11px]"
            >
              I don’t have a repo yet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestingContent() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Decide how much automation you want and which flows must never break.
      </p>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="space-y-2 rounded-lg bg-background border p-3 text-xs">
          <p className="text-[11px] font-medium text-foreground">
            Coverage focus
          </p>
          <ul className="space-y-1 list-disc ml-4 text-xs text-muted-foreground">
            <li>Authentication & billing flows.</li>
            <li>Critical user journeys (onboarding, core feature).</li>
            <li>Data exports and reports.</li>
          </ul>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            <Pill label="Unit tests" />
            <Pill label="E2E tests" />
            <Pill label="Smoke tests" />
          </div>
        </div>

        <div className="space-y-2 rounded-lg bg-background border p-3 text-xs">
          <p className="text-[11px] font-medium text-foreground">
            Quick presets
          </p>
          <ChecklistItem text="Minimal: Only critical flows" />
          <ChecklistItem text="Balanced: Critical + key UI states" />
          <ChecklistItem text="Strict: High coverage on every release" />
          <div className="mt-2 flex flex-wrap gap-2">
            <Button size="sm" className="h-7 px-3 text-[11px]">
              Choose preset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeploymentContent() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Configure where and how your SaaS should be deployed and rolled out.
      </p>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="space-y-2 rounded-lg bg-background border p-3 text-xs">
          <p className="text-[11px] font-medium text-foreground">
            Hosting & regions
          </p>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <Pill label="Vercel" />
            <Pill label="AWS" />
            <Pill label="EU region" />
            <Pill label="US region" />
          </div>
          <ul className="mt-2 space-y-1 list-disc ml-4 text-xs text-muted-foreground">
            <li>Note any compliance requirements (GDPR, SOC2, etc.).</li>
            <li>Tell us if you need multi-region or multi-tenant setups.</li>
          </ul>
        </div>

        <div className="space-y-2 rounded-lg bg-background border p-3 text-xs">
          <p className="text-[11px] font-medium text-foreground">
            Rollout strategy
          </p>
          <ChecklistItem text="Single launch for all users" />
          <ChecklistItem text="Gradual rollout with feature flags" />
          <ChecklistItem text="Internal beta before public release" />
          <div className="mt-2 flex flex-wrap gap-2">
            <Button size="sm" className="h-7 px-3 text-[11px]">
              Connect hosting
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-3 text-[11px]"
            >
              Decide later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MaintenanceContent() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Define how we keep your product healthy after launch: updates, alerts,
        and SLAs.
      </p>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="space-y-2 rounded-lg bg-background border p-3 text-xs">
          <p className="text-[11px] font-medium text-foreground">
            SLA & cadence
          </p>
          <ul className="space-y-1 list-disc ml-4 text-xs text-muted-foreground">
            <li>Choose your expected response and resolution times.</li>
            <li>Decide how often you want non-critical updates shipped.</li>
            <li>Share any blackout periods for releases.</li>
          </ul>
          <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
            <Pill label="Standard SLA" />
            <Pill label="Premium SLA" />
          </div>
        </div>

        <div className="space-y-2 rounded-lg bg-background border p-3 text-xs">
          <p className="text-[11px] font-medium text-foreground">
            Notifications
          </p>
          <ChecklistItem text="Critical alerts to engineering" />
          <ChecklistItem text="Weekly summary to product / founders" />
          <ChecklistItem text="Monthly health report PDF" />
          <div className="mt-2 flex flex-wrap gap-2">
            <Button size="sm" className="h-7 px-3 text-[11px]">
              Configure alerts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StepsAccordionDemo() {
  const [openItem, setOpenItem] = useState<string | null>("item1");

  function toggleItem(id: string) {
    setOpenItem((prev) => (prev === id ? null : id));
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6 md:p-10">
      {/* Header */}
      <header className="flex w-full flex-col items-start gap-2">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Development process
        </h2>
        <p className="max-w-xl text-sm text-muted-foreground">
          Use this guided process to submit everything we need to turn your idea
          into a production-ready SaaS, phase by phase.
        </p>
      </header>

      <Accordion
        type="single"
        collapsible
        value={openItem ?? undefined}
        className="space-y-3"
      >
        {baseItems.map((item, index) => {
          return (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="overflow-hidden rounded-lg border! bg-card/90 shadow-none transition-all duration-500 hover:shadow-lg/10 data-[state=open]:shadow-lg/10"
            >
              <AccordionTrigger
                onClick={() => toggleItem(item.id)}
                className="group flex w-full cursor-pointer items-stretch justify-between gap-3 p-3 text-left text-sm font-medium no-underline!"
              >
                <div className="flex flex-1 items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-md bg-muted text-lg">
                    {item.icon}
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="text-sm font-semibold">
                      {index + 1}. {item.title}
                    </span>
                    <p className="line-clamp-1 text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="border-t border-border/70 bg-muted/30 px-4 pb-4 pt-3 text-sm">
                {item.id === "item1" && <DesignContent />}
                {item.id === "item2" && <DevelopmentContent />}
                {item.id === "item3" && <TestingContent />}
                {item.id === "item4" && <DeploymentContent />}
                {item.id === "item5" && <MaintenanceContent />}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
}

export {
  Pill,
  ChecklistItem,
  DesignContent,
  DevelopmentContent,
  TestingContent,
  DeploymentContent,
  MaintenanceContent,
};
