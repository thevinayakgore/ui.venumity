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
          },
          {
            name: "size",
            type: '"xs" | "sm" | "default" | "lg" | "icon" | "icon-sm" | "icon-lg"',
            default: '"default"',
            description:
              "Controls the button height, padding, icon sizing, and text size.",
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
        props: [
          {
            name: "size",
            type: '"sm" | "default" | "lg" | null',
            default: '"default"',
            description: "Sets command size, input height, and list height.",
            example: 'size="lg"',
          },
          {
            name: "variant",
            type: '"default" | "ghost" | null',
            default: '"default"',
            description: "Sets the command appearance.",
            example: 'variant="ghost"',
          },
          {
            name: "animation",
            type: '"none" | "scale" | "slide" | "elastic"',
            default: '"scale"',
            description: "Sets the root animation preset.",
            example: 'animation="slide"',
          },
          {
            name: "side",
            type: '"top" | "bottom" | "left" | "right"',
            default: '"top"',
            description: "Sets slide direction, not positioning.",
            example: 'side="bottom"',
          },
          {
            name: "animateItems",
            type: "boolean",
            default: "true",
            description: "Enables staggered item animations.",
            example: "animateItems={false}",
          },
          {
            name: "animate",
            type: "boolean",
            default: "true",
            description:
              "Enables one CommandItem's animation when animateItems is true.",
            example: "animate={false}",
          },
          {
            name: "motionOverrides",
            type: "CommandProps['motionOverrides']",
            description: "Overrides root motion settings. Command only.",
            example: "motionOverrides={{ transition: { duration: 0.2 } }}",
          },
          {
            name: "className",
            type: "string",
            description: "Adds CSS classes to the component.",
            example: 'className="rounded-2xl"',
          },
          {
            name: "children",
            type: "React.ReactNode",
            description: "Component content. Required for CommandDialog.",
            example: "<CommandItem>Calendar</CommandItem>",
          },
        ],
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
        props: [
          {
            name: "onOpenChange",
            type: "(open: boolean) => void",
            description: "Called when the root menu opens or closes.",
            example: "onOpenChange={setOpen}",
          },
          {
            name: "asChild",
            type: "boolean",
            default: "false",
            description: "Uses the trigger's child element as its root.",
            example: "asChild",
          },
          {
            name: "align",
            type: '"start" | "center" | "end"',
            default: 'Content: inherited; SubContent: "start"',
            description: "Sets popup alignment.",
            example: 'align="start"',
          },
          {
            name: "side",
            type: '"top" | "right" | "bottom" | "left"',
            default: 'Content: inherited; SubContent: "right"',
            description: "Sets the preferred popup side.",
            example: 'side="right"',
          },
          {
            name: "sideOffset",
            type: "number",
            default: "Content: 4; SubContent: 2",
            description: "Sets the popup offset in pixels.",
            example: "sideOffset={8}",
          },
          {
            name: "collisionPadding",
            type: "number",
            default: "12",
            description: "Sets popup collision padding in pixels.",
            example: "collisionPadding={16}",
          },
          {
            name: "container",
            type: 'React.ComponentProps<typeof BaseContextMenu.Portal>["container"]',
            description: "Sets the portal container for popup content.",
            example: "container={containerRef}",
          },
          {
            name: "inset",
            type: "boolean",
            description:
              "Adds left padding to items, labels, and submenu triggers.",
            example: "inset",
          },
          {
            name: "destructive",
            type: "boolean",
            description: "Applies destructive styling to ContextMenuItem.",
            example: "destructive",
          },
          {
            name: "className",
            type: "string",
            description: "Adds CSS classes to supported components.",
            example: 'className="rounded-xl"',
          },
          {
            name: "children",
            type: "React.ReactNode",
            description: "Content rendered inside supported components.",
            example: "<ContextMenuItem>Open</ContextMenuItem>",
          },
        ],
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
        props: [
          {
            name: "variant",
            type: '"default" | "destructive" | "success" | "warning" | "info" | null',
            default: '"default"',
            description: "Sets the alert color tone.",
            example: 'variant="success"',
          },
          {
            name: "animation",
            type: '"none" | "fade" | "scale" | "slide" | "bounce" | "flip" | "blur" | "elastic"',
            default: '"fade"',
            description: "Sets the animation preset.",
            example: 'animation="bounce"',
          },
          {
            name: "side",
            type: '"top" | "bottom" | "left" | "right"',
            default: '"top"',
            description: "Sets slide animation direction.",
            example: 'side="bottom"',
          },
          {
            name: "open",
            type: "boolean",
            description: "Controls visibility. Omit to always render.",
            example: "open={isOpen}",
          },
          {
            name: "className",
            type: "string",
            description: "Adds CSS classes to the component.",
            example: 'className="rounded-xl"',
          },
          {
            name: "children",
            type: "React.ReactNode",
            description:
              "Alert content, including icons, text, and AlertAction.",
            example: "<AlertTitle>Saved</AlertTitle>",
          },
        ],
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
        props: [
          {
            name: "variant",
            type: '"default" | "ring" | "dots" | "pulse" | "gradient"',
            default: '"default"',
            description:
              "Sets the spinner style. SpinnerOverlay always uses ring.",
            example: 'variant="dots"',
          },
          {
            name: "size",
            type: '"sm" | "md" | "lg" | "xl"',
            default: 'Spinner: "md"; SpinnerOverlay: "sm"',
            description: "Sets spinner size. Gradient uses larger dimensions.",
            example: 'size="lg"',
          },
          {
            name: "tone",
            type: '"neutral" | "success" | "warning" | "danger"',
            default: '"neutral"',
            description: "Sets spinner color. Does not affect gradient colors.",
            example: 'tone="success"',
          },
          {
            name: "label",
            type: "string",
            description: "Adds visible loading text and an accessible label.",
            example: 'label="Saving…"',
          },
          {
            name: "className",
            type: "string",
            description: "Adds CSS classes to the component.",
            example: 'className="gap-3"',
          },
          {
            name: "children",
            type: "React.ReactNode",
            description:
              "SpinnerOverlay content shown blurred behind the spinner.",
            example: "<Dashboard />",
          },
        ],
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
          },
          {
            name: "variant",
            type: `"minimal" | "separated" | "default"`,
            default: `"minimal"`,
            description:
              "Visual style of the accordion. Minimal = plain dividers, Separated = card-like boxes with gaps, Default = bordered rounded box.",
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
        props: [
          {
            name: "variant",
            type: '"video" | "portrait" | "square" | "cinema" | "photo" | string',
            default: '"video"',
            description: "AspectRatio preset or custom ratio string.",
            example: 'variant="3/2"',
          },
          {
            name: "ratio",
            type: "number",
            description: "AspectRatio numeric ratio. Overrides variant.",
            example: "ratio={3 / 2}",
          },
          {
            name: "src",
            type: "string",
            description: "Image URL for AspectRatioImage.",
            example: 'src="/photo.jpg"',
          },
          {
            name: "alt",
            type: "string",
            description: "Alternative text for AspectRatioImage.",
            example: 'alt="Mountain landscape"',
          },
          {
            name: "fallback",
            type: "React.ReactNode",
            description: "Content shown until the image loads.",
            example: 'fallback={<AnimationBar animation="shimmer" />}',
          },
          {
            name: "animation",
            type: '"none" | "shimmer" | "wipe-right" | "wipe-up" | "wipe-down" | "wipe-left"',
            default: '"shimmer"',
            description: "AnimationBar effect. Not an AspectRatio prop.",
            example: 'animation="wipe-right"',
          },
          {
            name: "duration",
            type: "number",
            default: "Shimmer: 1.65; wipe: 1.6",
            description: "AnimationBar duration in seconds.",
            example: "duration={2}",
          },
          {
            name: "repeat",
            type: '"infinite" | "none"',
            default: '"infinite"',
            description: "Controls AnimationBar repetition.",
            example: 'repeat="none"',
          },
          {
            name: "delay",
            type: "number",
            default: "0",
            description: "AnimationBar delay in seconds.",
            example: "delay={0.3}",
          },
          {
            name: "className",
            type: "string",
            description: "Adds CSS classes to the component.",
            example: 'className="rounded-2xl"',
          },
          {
            name: "style",
            type: "React.CSSProperties",
            description: "Inline styles. Can override the container ratio.",
            example: "style={{ aspectRatio: 1 }}",
          },
          {
            name: "children",
            type: "React.ReactNode",
            description: "Media or content inside AspectRatio.",
            example: '<AspectRatioImage src="/photo.jpg" alt="Landscape" />',
          },
        ],
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
        props: [
          {
            name: "variant",
            type: '"compact" | "preview" | "upload" | "removable" | "download"',
            default: '"compact"',
            description: "Sets the attachment layout and default actions.",
            example: 'variant="upload"',
          },
          {
            name: "fileName",
            type: "string",
            required: true,
            description: "File name used for the label and file-type icon.",
            example: 'fileName="report.pdf"',
          },
          {
            name: "fileSize",
            type: "number | string",
            description: "File size in bytes or preformatted text.",
            example: "fileSize={2456789}",
          },
          {
            name: "thumbnailSrc",
            type: "string",
            description: "Thumbnail URL for preview variant in idle status.",
            example: 'thumbnailSrc="/preview.jpg"',
          },
          {
            name: "progress",
            type: "number",
            default: "0",
            description: "Upload percentage, from 0 to 100.",
            example: "progress={62}",
          },
          {
            name: "status",
            type: '"idle" | "pending" | "uploading" | "processing" | "success" | "error"',
            default: '"idle"',
            description: "Sets the status icon, styling, and text.",
            example: 'status="uploading"',
          },
          {
            name: "errorMessage",
            type: "string",
            default: '"Upload failed. Try again."',
            description: "Custom text shown in error status.",
            example: 'errorMessage="File exceeds the size limit."',
          },
          {
            name: "onRetry",
            type: "() => void",
            description: "Shows a retry button in error status.",
            example: "onRetry={handleRetry}",
          },
          {
            name: "removable",
            type: "boolean",
            default: 'variant === "removable"',
            description: "Controls whether the remove button appears.",
            example: "removable",
          },
          {
            name: "onRemove",
            type: "() => void",
            description: "Called after the removal animation finishes.",
            example: "onRemove={handleRemove}",
          },
          {
            name: "downloadHref",
            type: "string",
            description: "URL opened by the row download action.",
            example: 'downloadHref="/files/report.pdf"',
          },
          {
            name: "onDownload",
            type: "() => void",
            description: "Callback for the row download action.",
            example: "onDownload={handleDownload}",
          },
          {
            name: "className",
            type: "string",
            description: "Adds CSS classes to the outer container.",
            example: 'className="max-w-md"',
          },
        ],
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
        props: [
          {
            name: "size",
            type: '"xs" | "sm" | "md" | "lg" | "xl"',
            default: 'Avatar/AvatarGroup: "md"; AvatarUpload: "lg"',
            description: "Sets avatar dimensions and text size.",
            example: 'size="lg"',
          },
          {
            name: "status",
            type: '"online" | "offline" | "away" | "busy" | null',
            default: "null",
            description: "Sets the Avatar status dot.",
            example: 'status="online"',
          },
          {
            name: "showStatus",
            type: "boolean",
            default: "false",
            description: "Shows an online dot when no status is set.",
            example: "showStatus",
          },
          {
            name: "tooltip",
            type: "React.ReactNode",
            description: "Tooltip content shown above Avatar.",
            example: 'tooltip="Alice Johnson"',
          },
          {
            name: "interactive",
            type: "boolean",
            default: "Avatar: Boolean(tooltip); AvatarGroup: true",
            description: "Controls hover emphasis and tooltip visibility.",
            example: "interactive={false}",
          },
          {
            name: "animation",
            type: '"none" | "fade" | "scale" | "pop" | "slide" | "reveal" | "ring"',
            default: '"scale"',
            description: "Sets the Avatar or AvatarGroup animation.",
            example: 'animation="pop"',
          },
          {
            name: "motionOverrides",
            type: "AvatarProps['motionOverrides']",
            description: "Overrides Avatar motion settings.",
            example: "motionOverrides={{ transition: { duration: 0.2 } }}",
          },
          {
            name: "src",
            type: "string | null",
            description: "Image URL. Null is supported by AvatarUpload only.",
            example: 'src="/avatar.jpg"',
          },
          {
            name: "alt",
            type: "string",
            default: 'AvatarImage: ""; AvatarUpload: "Profile photo"',
            description: "Alternative text for the image.",
            example: 'alt="Alice Johnson"',
          },
          {
            name: "tone",
            type: '"neutral" | "blue" | "emerald" | "amber" | "rose" | "violet" | "red" | "sky"',
            default: 'Derived from text, otherwise "neutral"',
            description: "Sets the AvatarFallback background tone.",
            example: 'tone="violet"',
          },
          {
            name: "delayMs",
            type: "number",
            default: "0",
            description: "AvatarFallback display delay in milliseconds.",
            example: "delayMs={300}",
          },
          {
            name: "max",
            type: "number",
            default: "4",
            description: "Visible AvatarGroup limit before the overflow count.",
            example: "max={5}",
          },
          {
            name: "initials",
            type: "string",
            description: "Fallback text for AvatarUpload.",
            example: 'initials="Alice Johnson"',
          },
          {
            name: "accept",
            type: "string",
            default: '"image/*"',
            description: "Accepted AvatarUpload file types.",
            example: 'accept="image/png,image/jpeg"',
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Disables AvatarUpload file selection.",
            example: "disabled",
          },
          {
            name: "onChange",
            type: "(file: File | null) => void",
            description: "Called when AvatarUpload selects a file.",
            example: "onChange={handleFileChange}",
          },
          {
            name: "uploadLabel",
            type: "string",
            default: '"Upload profile photo"',
            description: "Accessible label for AvatarUpload.",
            example: 'uploadLabel="Change profile photo"',
          },
          {
            name: "className",
            type: "string",
            description: "Adds CSS classes to the component.",
            example: 'className="ring-2 ring-background"',
          },
          {
            name: "children",
            type: "React.ReactNode",
            description: "Component content. Required for AvatarGroup.",
            example: "<AvatarFallback>Alice Johnson</AvatarFallback>",
          },
        ],
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
        props: [
          {
            name: "variant",
            type: '"default" | "secondary" | "outline" | "destructive" | "ghost" | "link" | "soft" | "gradient" | "ring" | "solid" | "shiny"',
            default: '"default"',
            description: "Sets the Badge visual style.",
            example: 'variant="outline"',
          },
          {
            name: "size",
            type: '"sm" | "default" | "lg" | "xl" | "icon" | "icon-sm" | "status"',
            default: '"default"',
            description:
              "Sets the Badge height, padding, text size, and icon size.",
            example: 'size="lg"',
          },
          {
            name: "shape",
            type: '"pill" | "square" | "circle" | "dot"',
            default: '"pill"',
            description: "Sets the Badge shape.",
            example: 'shape="dot"',
          },
          {
            name: "tone",
            type: '"neutral" | "success" | "warning" | "info" | "danger" | "brand" | "green" | "red" | "blue" | "yellow" | "orange" | "rose" | "indigo" | "pink"',
            default: '"neutral"',
            description: "Sets the semantic or color tone.",
            example: 'tone="success"',
          },
          {
            name: "asChild",
            type: "boolean",
            default: "false",
            description:
              "Renders Badge as a child element, such as a link or button.",
            example: "asChild",
          },
          {
            name: "color",
            type: "string",
            default: '"bg-green-500"',
            description: "BadgePulse dot and ping color.",
            example: 'color="bg-red-500"',
          },
          {
            name: "dotSize",
            type: "string",
            default: '"size-2.5"',
            description: "BadgePulse dot size.",
            example: 'dotSize="size-3"',
          },
          {
            name: "className",
            type: "string",
            description: "Adds CSS classes to the component.",
            example: 'className="uppercase"',
          },
          {
            name: "children",
            type: "React.ReactNode",
            description: "Badge text, icons, or BadgePulse.",
            example: "<BadgePulse /> Live",
          },
        ],
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
        props: [
          {
            name: "tone",
            type: '"neutral" | "soft" | "contrast"',
            default: '"contrast"',
            description: "Sets the Skeleton fill intensity.",
            example: 'tone="soft"',
          },
          {
            name: "pulse",
            type: "boolean",
            default: "false",
            description: "Enables the opacity pulse animation.",
            example: "pulse",
          },
          {
            name: "width",
            type: "string",
            default: 'SkeletonText: "w-full"; SkeletonBadge: "w-16"',
            description: "Width class for SkeletonText or SkeletonBadge.",
            example: 'width="w-40"',
          },
          {
            name: "size",
            type: '"sm" | "md" | "lg"',
            default: '"md"',
            description: "Sets SkeletonAvatar or SkeletonButton size.",
            example: 'size="lg"',
          },
          {
            name: "ratio",
            type: '"square" | "video" | "portrait"',
            default: '"video"',
            description: "Sets the SkeletonImage aspect ratio.",
            example: 'ratio="square"',
          },
          {
            name: "className",
            type: "string",
            description: "Adds CSS classes to the component.",
            example: 'className="mb-2"',
          },
        ],
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
        props: [
          {
            name: "src",
            type: "string",
            required: true,
            description: "Video source URL.",
            example: 'src="/video.mp4"',
          },
          {
            name: "poster",
            type: "string",
            description: "Poster image URL shown before playback.",
            example: 'poster="/poster.jpg"',
          },
          {
            name: "title",
            type: "string",
            description: "Title overlay shown at the top of the player.",
            example: 'title="Product Launch"',
          },
          {
            name: "variant",
            type: '"default" | "minimal" | "compact" | "theater" | "hero"',
            default: '"default"',
            description: "Sets the player layout and control behavior.",
            example: 'variant="theater"',
          },
          {
            name: "aspectRatio",
            type: '"video" | "square" | "wide" | "vertical" | string',
            default: '"video"',
            description:
              'Sets the player aspect ratio. Supports presets, strings such as "4/3", or plain numbers.',
            example: 'aspectRatio="vertical"',
          },
          {
            name: "tone",
            type: '"neutral" | "brand" | "success" | "warning" | "danger"',
            default: '"neutral"',
            description: "Sets the progress bar fill color.",
            example: 'tone="success"',
          },
          {
            name: "autoPlay",
            type: "boolean",
            default: "false",
            description: "Starts playback automatically.",
            example: "autoPlay",
          },
          {
            name: "loop",
            type: "boolean",
            default: "false",
            description: "Restarts playback after it ends.",
            example: "loop",
          },
          {
            name: "muted",
            type: "boolean",
            default: "false",
            description: "Starts the video muted.",
            example: "muted",
          },
          {
            name: "playsInline",
            type: "boolean",
            default: "true",
            description: "Prevents fullscreen playback on mobile devices.",
            example: "playsInline={false}",
          },
          {
            name: "showSettings",
            type: "boolean",
            default: "true",
            description: "Shows the settings menu for speed and quality.",
            example: "showSettings={false}",
          },
          {
            name: "showPip",
            type: "boolean",
            default: "true",
            description: "Shows the picture-in-picture button when supported.",
            example: "showPip={false}",
          },
          {
            name: "className",
            type: "string",
            description: "Adds CSS classes to the player container.",
            example: 'className="max-w-3xl"',
          },
          {
            name: "style",
            type: "React.CSSProperties",
            description:
              "Inline styles. Can override the container aspect ratio.",
            example: "style={{ aspectRatio: '4 / 3' }}",
          },
          {
            name: "children",
            type: "React.ReactNode",
            description: "Custom overlay content inside the player.",
            example: '<span className="absolute top-2 right-2">HD</span>',
          },
        ],
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
        props: [
          {
            name: "src",
            type: "string",
            required: true,
            description: "Audio source URL.",
            example: 'src="/podcast.mp3"',
          },
          {
            name: "title",
            type: "string",
            default: '"Audio"',
            description: "Audio title.",
            example: 'title="Ambient Sketch"',
          },
          {
            name: "artist",
            type: "string",
            description: "Artist or creator name.",
            example: 'artist="Venumity Studio"',
          },
          {
            name: "artwork",
            type: "string",
            description: "Cover image URL for default and podcast variants.",
            example: 'artwork="/cover.jpg"',
          },
          {
            name: "duration",
            type: "number",
            description: "Fallback duration in seconds before metadata loads.",
            example: "duration={180}",
          },
          {
            name: "variant",
            type: '"default" | "compact" | "minimal" | "waveform" | "podcast"',
            default: '"default"',
            description: "Sets the Audio player layout.",
            example: 'variant="waveform"',
          },
          {
            name: "size",
            type: '"sm" | "default" | "lg"',
            default: '"default"',
            description: "Sets the text and play button size.",
            example: 'size="lg"',
          },
          {
            name: "tone",
            type: '"neutral" | "brand" | "success" | "warning" | "danger"',
            default: '"neutral"',
            description: "Sets the border and progress fill color.",
            example: 'tone="success"',
          },
          {
            name: "animation",
            type: '"none" | "pulse" | "bars" | "ring" | "scanline"',
            default: '"bars"',
            description: "Sets the playing indicator animation.",
            example: 'animation="pulse"',
          },
          {
            name: "showVolume",
            type: "boolean",
            default: "true",
            description: "Shows the volume control.",
            example: "showVolume={false}",
          },
          {
            name: "showTime",
            type: "boolean",
            default: "true",
            description: "Shows elapsed and total time.",
            example: "showTime={false}",
          },
          {
            name: "showDownload",
            type: "boolean",
            default: "false",
            description: "Shows the download button.",
            example: "showDownload",
          },
          {
            name: "onDownload",
            type: "() => void",
            description: "Called when the download button is clicked.",
            example: "onDownload={handleDownload}",
          },
          {
            name: "onEnded",
            type: "() => void",
            description: "Called when audio playback ends.",
            example: "onEnded={handleEnded}",
          },
          {
            name: "autoPlay",
            type: "boolean",
            default: "false",
            description: "Starts playback automatically.",
            example: "autoPlay",
          },
          {
            name: "loop",
            type: "boolean",
            default: "false",
            description: "Restarts playback after it ends.",
            example: "loop",
          },
          {
            name: "className",
            type: "string",
            description: "Adds CSS classes to the player container.",
            example: 'className="max-w-md"',
          },
        ],
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
        props: [
          {
            name: "variant",
            type: '"default" | "with-icons" | "expandable" | "dropdown" | "custom-separator"',
            default: '"default"',
            description: "Sets the Breadcrumb layout and separator behavior.",
            example: 'variant="with-icons"',
          },
          {
            name: "separator",
            type: "React.ReactNode",
            default: "Variant-specific icon or arrow",
            description: "Custom separator between breadcrumb items.",
            example: "separator={<span>→</span>}",
          },
          {
            name: "maxItems",
            type: "number",
            default: "3",
            description:
              "Maximum visible items before collapsing. Minimum is 3.",
            example: "maxItems={4}",
          },
          {
            name: "underline",
            type: '"none" | "slide" | "center" | "dot" | "dashed" | "double" | "pulse" | "grow-up" | "ink-fill"',
            default: '"slide"',
            description: "Sets the hover underline animation for links.",
            example: 'underline="center"',
          },
          {
            name: "href",
            type: "string",
            description: "BreadcrumbItem link URL. Omit for a non-link item.",
            example: 'href="/dashboard"',
          },
          {
            name: "icon",
            type: "React.ReactNode",
            description: "Icon shown when Breadcrumb variant is with-icons.",
            example: 'icon={<Home className="size-3.5" />}',
          },
          {
            name: "isCurrentPage",
            type: "boolean",
            default: "false",
            description: "Marks the current BreadcrumbItem.",
            example: "isCurrentPage",
          },
          {
            name: "className",
            type: "string",
            description: "Adds CSS classes to the component.",
            example: 'className="text-sm"',
          },
          {
            name: "children",
            type: "React.ReactNode",
            description: "Breadcrumb items or item content.",
            example: "<BreadcrumbItem>Home</BreadcrumbItem>",
          },
        ],
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
        props: [
          {
            name: "variant",
            type: '"default" | "with-icons" | "expandable" | "dropdown" | "custom-separator"',
            default: '"default"',
            description: "Sets the Breadcrumb layout and separator behavior.",
            example: 'variant="with-icons"',
          },
          {
            name: "separator",
            type: "React.ReactNode",
            default: "Variant-specific icon or arrow",
            description: "Custom separator between breadcrumb items.",
            example: "separator={<span>→</span>}",
          },
          {
            name: "maxItems",
            type: "number",
            default: "3",
            description:
              "Maximum visible items before collapsing. Minimum is 3.",
            example: "maxItems={4}",
          },
          {
            name: "underline",
            type: '"none" | "slide" | "center" | "dot" | "dashed" | "double" | "pulse" | "grow-up" | "ink-fill"',
            default: '"slide"',
            description: "Sets the hover underline animation for links.",
            example: 'underline="center"',
          },
          {
            name: "href",
            type: "string",
            description: "BreadcrumbItem link URL. Omit for a non-link item.",
            example: 'href="/dashboard"',
          },
          {
            name: "icon",
            type: "React.ReactNode",
            description: "Icon shown when Breadcrumb variant is with-icons.",
            example: 'icon={<Home className="size-3.5" />}',
          },
          {
            name: "isCurrentPage",
            type: "boolean",
            default: "false",
            description: "Marks the current BreadcrumbItem.",
            example: "isCurrentPage",
          },
          {
            name: "className",
            type: "string",
            description: "Adds CSS classes to the component.",
            example: 'className="text-sm"',
          },
          {
            name: "children",
            type: "React.ReactNode",
            description: "Breadcrumb items or item content.",
            example: "<BreadcrumbItem>Home</BreadcrumbItem>",
          },
        ],
      },
    ],
  },
]);
