// registry/primitives.ts
import { createPrimitives } from "./factories";
import type { PrimitiveCategory } from "@/types/primitives";

export const PRIMITIVES: PrimitiveCategory[] = createPrimitives([
  // ─── ACTIONS ─────────────────────────────────────────────
  {
    category: "Actions",
    icon: "zap",
    description:
      "Buttons, toggles, switches, and menu bars for user interaction.",
    tags: ["action", "interactive", "control"],
    subcategories: [
      {
        name: "Button",
        description:
          "Interactive button primitives with motion-driven behaviors.",
        tags: ["button", "click"],
        usage: `import { Button } from "./index";

export default function ShinyButton() {
  return (
    <Button
      size="lg"
      animation="shiny"
      className="p-6 bg-linear-to-br from-amber-400 via-orange-500 to-red-500 text-white"
>
      Shiny Button
    </Button>
  );
}`,
        props: [
          {
            name: "animation",
            type: '"default" | "shiny" | "pulse" | "gradient" | "magnetic" | "ripple"',
            default: '"default"',
            description:
              "Visual and interaction preset applied to the button. The magnetic preset enables hover-follow and drag behavior.",
            options: [
              "default",
              "shiny",
              "pulse",
              "gradient",
              "magnetic",
              "ripple",
            ],
          },
          {
            name: "size",
            type: '"xs" | "sm" | "default" | "lg" | "icon" | "icon-sm" | "icon-lg"',
            default: '"default"',
            description:
              "Controls the button height, padding, icon sizing, and text size.",
            options: [
              "xs",
              "sm",
              "default",
              "lg",
              "icon",
              "icon-sm",
              "icon-lg",
            ],
          },
          {
            name: "asChild",
            type: "boolean",
            default: "false",
            description:
              "Merges button props and styles into its direct child through Radix Slot. Use this when rendering the button as a link.",
          },
          {
            name: "strength",
            type: "number",
            default: "0.8",
            description:
              "Magnetic pull multiplier. Higher values move the button farther toward the cursor. Used only when animation is magnetic.",
          },
          {
            name: "maxDistance",
            type: "number",
            default: "100",
            description:
              "Maximum magnetic movement in pixels from its original position. Used only when animation is magnetic.",
          },
          {
            name: "children",
            type: "React.ReactNode",
            description:
              "Button content, such as text, icons, or a combination of both.",
          },
          {
            name: "className",
            type: "string",
            description:
              "Additional Tailwind CSS classes. For gradient buttons, use from-*, via-*, and to-* classes to override the default gradient colors.",
          },
          {
            name: "onClick",
            type: "(event: React.MouseEvent<HTMLButtonElement>) => void",
            description:
              "Runs when the button is clicked. Ripple waves are also created automatically when animation is ripple.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description:
              "Disables interaction and applies the disabled button styles.",
          },
          {
            name: "type",
            type: '"button" | "submit" | "reset"',
            default: '"button"',
            description:
              "Native HTML button type. Use submit when this button submits a form.",
            options: ["button", "submit", "reset"],
          },
          {
            name: "style",
            type: "React.CSSProperties",
            description:
              "Inline styles passed to the underlying button element.",
          },
        ],
        items: [
          { itemName: "Variants" },
          { itemName: "Sizes" },
          { itemName: "Custom Icon" },
          { itemName: "Icon Motion" },
          { itemName: "Scale Effect" },
          { itemName: "Bounce Effect" },
          { itemName: "Shimmer Effect" },
          { itemName: "Ripple Effect" },
        ],
        moreExamples: ["fill-outline-ripple-button", "delete-confirm-button"],
      },
    ],
  },

  // ─── FORMS ───────────────────────────────────────────────
  {
    category: "Forms",
    icon: "text-cursor-input",
    description: "Inputs, selects, comboboxes, and commands for form building.",
    tags: ["form", "input"],
    subcategories: [
      {
        name: "Command",
        tags: ["command", "palette", "search", "cmdk", "spotlight"],
        description:
          "Command palette primitive with per-item stagger, selection pulse, direction-aware slide, and 8 motion presets including clip-path reveal and drifting aurora.",
        items: [
          { itemName: "Default Command" },
          { itemName: "Grouped Command" },
          { itemName: "Slide Command" },
          { itemName: "Animated Dialog Command" },
        ],
        usage: `import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut, CommandDialog } 
        "./index";
      
<Command animation="reveal" side="top">
  <CommandInput placeholder="Search…" />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>

<CommandDialog open={open} onOpenChange={setOpen} animation="scale">
  <CommandInput placeholder="Type a command…" />
  <CommandList>…</CommandList>
</CommandDialog>`,
      },
      {
        name: "Context Menu",
        tags: ["context-menu", "right-click", "menu", "overlay"],
        description:
          "Context menu primitive with 8 structural reveal animations — panel clip-path wipe plus staggered row reveals via wipe, typewriter, shimmer, stroke, scanline, and cascade. No scale, blur, flip, fade, slide, or elastic.",
        items: [
          { itemName: "Default Context Menu" },
          { itemName: "Grouped Context Menu" },
          { itemName: "Nested Context Menu" },
        ],
        usage: `import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "./index";

<ContextMenu>
  <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Open</ContextMenuItem>
    <ContextMenuItem>New</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem destructive>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
        moreExamples: ["File Context Menu"],
      },
    ],
  },

  // ─── FEEDBACK ────────────────────────────────────────────
  {
    category: "Feedback",
    icon: "messages-square",
    description: "Alerts, toasts, snackbars, and popups for user feedback.",
    tags: ["feedback", "notify"],
    subcategories: [
      {
        name: "Alert",
        tags: ["alert", "notification", "action", "animated"],
        description:
          "Alert primitives with tones, sizes and 8 entrance animations.",
        items: [
          { itemName: "Default Alert" },
          { itemName: "Destructive Alert" },
          { itemName: "Tone Alert" },
          { itemName: "Action Alert" },
          { itemName: "Animated Alert" },
        ],
        usage: `import { Alert, AlertTitle, AlertDescription, AlertActions } from "./index";
      
<Alert variant="success" animation="bounce" icon={<CheckCircle2 />}>
  <AlertTitle>Saved</AlertTitle>
  <AlertDescription>Your changes are live.</AlertDescription>
  <AlertActions>
    <button>Undo</button>
  </AlertActions>
</Alert>`,
      },
      {
        name: "Spinner",
        tags: ["spinner", "loader", "loading", "progress"],
        description:
          "Spinner primitive with 6 variants — default border spin, ring (12-line opacity), dots (translateY bounce), pulse (ring expansion), gradient (conic rotate). 4 sizes, 5 tones, optional label, plus a SpinnerOverlay wrapper.",
        items: [
          { itemName: "Default Spinner" },
          { itemName: "Label Spinner" },
          { itemName: "Ring Spinner" },
          { itemName: "Dots Spinner" },
          { itemName: "Pulse Spinner" },
          { itemName: "Overlay Spinner" },
        ],
        usage: `import { Spinner, SpinnerOverlay } from "./index";
      
<Spinner variant="default" size="md" tone="brand" />
<Spinner variant="dots" tone="success" label="Saving…" showLabel />
<SpinnerOverlay label="Fetching dashboard…" tone="brand">
  <YourContent />
</SpinnerOverlay>`,
        moreExamples: ["Gradient Spinner"],
      },
    ],
  },

  // ─── DATA DISPLAY ────────────────────────────────────────
  {
    category: "Data Display",
    icon: "database-zap",
    description:
      "Accordions, tables, lists, timelines, tree views, and paginations.",
    tags: ["data", "display"],
    subcategories: [
      {
        name: "Accordion",
        tags: [
          "accordion",
          "collapsible",
          "expandable",
          "hierarchical",
          "dashboard",
        ],
        description:
          "Accordion with the 3 variants (minimal, separated, default), single + multiple behavior, nested support, controlled + uncontrolled modes and per-item defaultOpen.",
        items: [
          { itemName: "Single Minimal Accordion" },
          { itemName: "Minimal Separated Accordion" },
          { itemName: "Multiple Minimal Accordion" },
          { itemName: "Multiple Separated Accordion" },
          { itemName: "Nested Minimal Accordion" },
          { itemName: "Nested Separated Accordion" },
        ],
        usage: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./index";
      
<Accordion
  behavior="multiple"
  variant="separated"
  className="max-w-2xl"
>
  <AccordionItem value="frontend" defaultOpen>
    <AccordionTrigger>Frontend development</AccordionTrigger>
    <AccordionContent>
      Build interactive, component-driven user interfaces.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="backend">
    <AccordionTrigger>Backend development</AccordionTrigger>
    <AccordionContent bare className="p-4">
      Design scalable APIs and server-side services.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
        props: [
          {
            name: "behavior",
            type: `"default" | "multiple"`,
            default: `"default"`,
            description:
              "Controls whether one item (default) or multiple items (multiple) can be open at the same time.",
            options: ["default", "multiple"],
          },
          {
            name: "variant",
            type: `"minimal" | "separated" | "default"`,
            default: `"minimal"`,
            description:
              "Visual style of the accordion. Minimal = plain dividers, Separated = card-like boxes with gaps, Default = bordered rounded box.",
            options: ["minimal", "separated", "default"],
          },
          {
            name: "value",
            type: "string | string[]",
            default: "undefined",
            description:
              "Controlled open value(s). Pass a string for single mode or an array for multiple mode. Makes the accordion fully controlled.",
          },
          {
            name: "defaultOpen",
            type: "boolean",
            default: "false",
            description:
              "Set on AccordionItem to open that item on first mount (uncontrolled mode only). In single behavior only the first defaultOpen item wins; in multiple behavior all defaultOpen items open.",
          },
          {
            name: "onValueChange",
            type: "(value: string | string[]) => void",
            default: "undefined",
            description:
              "Callback fired when the open value(s) change. Receives a string in single mode or a string[] in multiple mode.",
          },
          {
            name: "className",
            type: "string",
            default: "undefined",
            description: "Additional classes applied to the accordion root.",
          },
          {
            name: "children",
            type: "React.ReactNode",
            default: "undefined",
            description:
              "AccordionItem elements — each containing an AccordionTrigger and AccordionContent.",
          },
        ],
      },
      {
        name: "Aspect Ratio",
        tags: ["aspect-ratio", "media", "image", "video"],
        description:
          "Aspect-ratio container with 5 ratio presets, custom ratio support, and 8 structural fallback animations — shimmer scroll, clip-path wipes, scanline sweep, and stroke draw. No scale, blur, flip, fade, slide, or elastic.",
        items: [
          { itemName: "Inbuilt Aspect Ratio" },
          { itemName: "Custom Ratio" },
          { itemName: "Video Aspect Ratio" },
          { itemName: "Captioned Aspect Ratio" },
          { itemName: "Wipe Aspect Ratio" },
          { itemName: "Animated Aspect Ratio" },
        ],
        usage: `import { Aspect Ratio, Aspect RatioImage } from "./index";
      
<AspectRatio variant="video" animation="wipe-right">
  <Aspect RatioImage src="/poster.jpg" alt="Demo" />
</AspectRatio Ratio>

<AspectRatio ratio={3 / 2} animation="shimmer">
  <Aspect RatioImage src="/photo.jpg" alt="" />
</AspectRatio Ratio>`,
      },
      {
        name: "Attachment",
        tags: ["attachment", "file", "upload", "removable"],
        description:
          "Attachment primitive with file-type icons, upload progress, retry, removal via height collapse, and preview thumbnails. Animations are restricted to wipes, draws, and collapses — no scale, blur, flip, fade, slide, or elastic.",
        items: [
          { itemName: "Status Attachment" },
          { itemName: "File Type Attachment" },
          { itemName: "Upload Attachment" },
          { itemName: "Removable Attachment" },
          { itemName: "Preview Attachment" },
        ],
        usage: `import { Attachment } from "./index";

<Attachment
  progress={62}
  variant="upload"
  status="uploading"
  fileSize={2456789}
  fileName="report.pdf"
/>`,
      },
      {
        name: "Avatar",
        tags: ["avatar", "profile", "user", "image", "group"],
        description:
          "Avatar primitive with 5 sizes, 4 statuses, 8 fallback tones, tooltips, groups, upload, and 7 purposeful motion presets.",
        items: [
          { itemName: "Size Avatar" },
          { itemName: "Status Avatar" },
          { itemName: "Tone Avatar" },
          { itemName: "Group Avatar" },
          { itemName: "Tooltip Avatar" },
          { itemName: "Upload Avatar" },
          { itemName: "Animated Avatar" },
        ],
        usage: `import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "./index";
      
<Avatar size="lg" status="online" animation="scale" tooltip="Alice">
  <AvatarImage src="/avatar.jpg" alt="Alice" />
  <AvatarFallback>Alice Johnson</AvatarFallback>
</Avatar>

<AvatarGroup max={4}>
  <Avatar><AvatarImage src="/a.jpg" /><AvatarFallback>A B</AvatarFallback></Avatar>
  <Avatar><AvatarImage src="/b.jpg" /><AvatarFallback>C D</AvatarFallback></Avatar>
</AvatarGroup>`,
      },
      {
        name: "Badge",
        tags: ["badge", "label", "chip", "tag", "status"],
        description:
          "Badge primitive with 6 variants (default, secondary, outline, destructive, ghost, link), 5 sizes (sm, default, lg, icon, icon-sm), 4 shapes (pill, square, circle, dot), 5 semantic tones, auto-sized icons, removable/clickable patterns, and asChild support.",
        items: [
          { itemName: "Size Badge" },
          { itemName: "Variant Badge" },
          { itemName: "Tone Badge" },
          { itemName: "Icon Badge" },
          { itemName: "Shape Badge" },
          { itemName: "Pulse Status Badge" },
          { itemName: "System Status Badge" },
          { itemName: "Priority Badge" },
          { itemName: "Shiny Badge" },
          { itemName: "Interactive Badge" },
        ],
        usage: `import { Badge } from "./index";
      
<Badge>Default</Badge>
<Badge variant="outline" tone="success">Live</Badge>
<Badge variant="destructive" size="lg">Offline</Badge>
<Badge shape="dot" tone="warning" aria-label="Away" />
<Badge asChild><a href="#">Clickable</a></Badge>`,
      },
      {
        name: "Skeleton",
        tags: ["skeleton", "loading", "placeholder", "shimmer"],
        description:
          "Skeleton primitive with 5 variants (custom, text, avatar, card, table), 3 tones (neutral, soft, contrast), and preset compositions for Basic, Card grid, Table, Profile, and Dashboard layouts. Uses only shimmer sweep and opacity pulse.",
        items: [
          { itemName: "Text Skeleton" },
          { itemName: "Avatar Skeleton" },
          { itemName: "Button Skeleton" },
          { itemName: "Badge Skeleton" },
          { itemName: "Card Skeleton" },
          { itemName: "Profile Skeleton" },
          { itemName: "Table Skeleton" },
          { itemName: "Dashboard Skeleton" },
        ],
        usage: `import { SkeletonText, SkeletonImage, SkeletonButton } from "./index";
      
<SkeletonImage pulse ratio="video" />
<SkeletonText pulse width="w-40" />
<SkeletonButton pulse size="sm" />`,
      },
    ],
  },

  // ─── MEDIA ───────────────────────────────────────────────
  {
    category: "Media",
    icon: "image",
    description: "Images, videos, audio, galleries, lightboxes, and carousels.",
    tags: ["media"],
    subcategories: [
      {
        name: "Video",
        tags: ["video", "player", "media", "fullscreen"],
        description:
          "Video player primitive with 5 variants (default, minimal, compact, theater, hero), 4 aspect ratios, pointer + keyboard seek, volume, PiP, fullscreen, and 5 structural loading indicators — spinner, pulse, ring, scanline, none.",
        items: [
          { itemName: "Default Video" },
          { itemName: "Minimal Video" },
          { itemName: "Compact Video" },
          { itemName: "Theater Video" },
          { itemName: "Hero Video" },
        ],
        usage: `import { Video } from "./index";
      
<Video src="/video.mp4" poster="/poster.jpg" title="Product Launch" />`,
      },
      {
        name: "Audio",
        tags: ["audio", "player", "music", "podcast", "waveform"],
        description:
          "Audio player primitive with 5 variants (default, compact, minimal, waveform, podcast), 3 sizes, 5 tones, and 5 structural playing-indicator animations — pulse, bars, ring, scanline, none.",
        items: [
          { itemName: "Audio Player" },
          { itemName: "Compact Audio" },
          { itemName: "Minimal Audio" },
          { itemName: "Waveform Audio" },
          { itemName: "Podcast Audio" },
        ],
        usage: `import { Audio } from "./index";
      
<Audio
  src="/ambient.mp3"
  title="Ambient Sketch"
  artist="Venumity Studio"
  artwork="/cover.jpg"
  variant="default"
  animation="bars"
/>

<Audio src="/podcast.mp3" variant="podcast" showDownload />

<Audio src="/ambient.mp3" variant="waveform" />`,
      },
    ],
  },

  // ─── TYPOGRAPHY ──────────────────────────────────────────
  {
    category: "Typography",
    icon: "type",
    description:
      "Headings, paragraphs, labels, code snippets, and blockquotes.",
    tags: ["typography", "text"],
    subcategories: [
      {
        name: "Blockquote",
        tags: [
          "blockquote",
          "quote",
          "testimonial",
          "pull-quote",
          "typography",
        ],
        description:
          "Blockquote primitive with 7 variants (default, bordered, card, pull, testimonial, verse, highlight), 4 sizes, 5 tones, avatar + rating support, and a BlockquoteList helper for grids. 6 structural animations — stroke draw, underline, shimmer, scanline, corner, none.",
        items: [
          { itemName: "Verse Blockquote" },
          { itemName: "Pull Quote" },
          { itemName: "Tone Quote" },
          { itemName: "Card Blockquote" },
          { itemName: "Shiny Quote" },
          { itemName: "Testimonial Blockquote" },
        ],
        usage: `import { Blockquote } from "./index";
      
<Blockquote
  variant="card"
  animation="shiny"
  className="w-xl"
  cite="✨ Buddha"
  quote="An idea that is developed and put into action is more important than an idea that exists only as an idea."
/>`,
      },
    ],
  },

  // ─── NAVIGATION ──────────────────────────────────────────
  {
    category: "Navigation",
    icon: "compass",
    description: "Breadcrumbs, tabs, steppers, and sidebars.",
    tags: ["navigation", "menu"],
    subcategories: [
      {
        name: "Breadcrumb",
        tags: ["breadcrumb", "navigation", "path", "underline"],
        description:
          "Breadcrumb primitive with 8 single-axis underline animations, collapsed overflow, dropdown overflow, icons, and custom separators. No scale/blur/flip/fade anywhere.",
        items: [
          { itemName: "Default Breadcrumb" },
          { itemName: "Icon Breadcrumb" },
          { itemName: "Expandable Breadcrumb" },
          { itemName: "Dropdown Breadcrumb" },
          { itemName: "Custom Separator Breadcrumb" },
          { itemName: "Animated Breadcrumb" },
        ],
        usage: `import { Breadcrumb, BreadcrumbItem } from "./index";
      
<Breadcrumb underline="slide">
  <BreadcrumbItem href="#">Home</BreadcrumbItem>
  <BreadcrumbItem href="#">Docs</BreadcrumbItem>
  <BreadcrumbItem isCurrentPage>Breadcrumb</BreadcrumbItem>
</Breadcrumb>`,
      },
    ],
  },
]);
