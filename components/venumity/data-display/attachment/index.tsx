"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  X,
  Check,
  Clock,
  FileText,
  RotateCw,
  Download,
  FileAudio,
  FileArchive,
  AlertTriangle,
  File as FileIcon,
  Image as ImageIcon,
  Video as VideoIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */

export type AttachmentVariant =
  | "compact"
  | "preview"
  | "upload"
  | "removable"
  | "download";

export type AttachmentStatus =
  | "idle"
  | "pending"
  | "uploading"
  | "processing"
  | "success"
  | "error";

/* -------------------------------------------------------------------------- */
/*                              Easing                                        */
/* -------------------------------------------------------------------------- */

const EASE_LINEAR: [number, number, number, number] = [0.32, 0.72, 0, 1];
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/* -------------------------------------------------------------------------- */
/*                              Icon registry                                 */
/* -------------------------------------------------------------------------- */

type IconComponent = React.ComponentType<{
  className?: string;
  strokeWidth?: number | string;
}>;

const MIME_GLYPH: Record<string, IconComponent> = {
  pdf: FileText,
  doc: FileText,
  docx: FileText,
  xls: FileText,
  xlsx: FileText,
  csv: FileText,
  ppt: FileText,
  pptx: FileText,
};

const PACK_GLYPH: Record<string, IconComponent> = {
  zip: FileArchive,
  rar: FileArchive,
  "7z": FileArchive,
  png: ImageIcon,
  jpg: ImageIcon,
  jpeg: ImageIcon,
  gif: ImageIcon,
  webp: ImageIcon,
  svg: ImageIcon,
  mp4: VideoIcon,
  mov: VideoIcon,
  webm: VideoIcon,
  mp3: FileAudio,
  wav: FileAudio,
  txt: FileText,
  md: FileText,
};

function getExtension(name: string) {
  const parts = name.split(".");
  return parts.length > 1 ? (parts.pop() ?? "").toLowerCase() : "";
}

function resolveIcon(name: string): IconComponent {
  const ext = getExtension(name);
  return MIME_GLYPH[ext] ?? PACK_GLYPH[ext] ?? FileIcon;
}

function formatBytes(bytes: number) {
  if (bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const exp = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const v = bytes / 1024 ** exp;
  return `${exp === 0 ? v : v.toFixed(1)} ${units[exp]}`;
}

function formatSizeProp(size: number | string | undefined) {
  if (size === undefined) return undefined;
  return typeof size === "number" ? formatBytes(size) : size;
}

/* -------------------------------------------------------------------------- */
/*                              Extended cva                                  */
/* -------------------------------------------------------------------------- */

const attachmentRowVariants = cva(
  "flex items-center rounded-lg border transition-colors duration-200",
  {
    variants: {
      variant: {
        compact: "gap-2.5 px-2.5 py-2",
        preview: "gap-3 px-3 py-3",
        upload: "gap-3 px-3 py-2.5",
        removable: "gap-3 px-3 py-2.5",
        download: "gap-3 px-3 py-2.5",
      },
      status: {
        idle: "border-border bg-foreground/3 dark:bg-muted/40",
        pending: "border-dashed border-foreground/20 bg-transparent",
        uploading: "border-border bg-foreground/3 dark:bg-muted/40",
        processing: "border-border bg-foreground/3 dark:bg-muted/40",
        success:
          "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
        error: "border-red-500/50 bg-red-500/5 dark:bg-red-500/10",
      },
    },
    defaultVariants: { variant: "compact", status: "idle" },
  },
);

const iconTileVariants = cva(
  // One shared base — icon always fills its box, padding always applied
  "relative flex shrink-0 items-center justify-center overflow-hidden rounded-md",
  {
    variants: {
      variant: {
        compact: "size-8 p-1",
        preview: "size-11 p-1.5",
        upload: "size-10 p-1.5",
        removable: "size-10 p-1.5",
        download: "size-10 p-1.5",
      },
      status: {
        idle: "bg-foreground/6 text-foreground",
        pending: "bg-foreground/6 text-foreground",
        uploading: "bg-foreground/6 text-foreground",
        processing: "bg-foreground/6 text-foreground",
        success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
        error: "bg-red-500/15 text-red-600 dark:text-red-400",
      },
    },
    defaultVariants: { variant: "compact", status: "idle" },
  },
);

/* -------------------------------------------------------------------------- */
/*                              Status text                                   */
/* -------------------------------------------------------------------------- */

function statusText(
  status: AttachmentStatus,
  opts: { progress: number; size?: string; errorMessage?: string },
) {
  switch (status) {
    case "pending":
      return "Ready to upload";
    case "uploading":
      return `Uploading · ${Math.round(opts.progress)}%`;
    case "processing":
      return "Processing document";
    case "success":
      return opts.size ? `Uploaded · ${opts.size}` : "Uploaded";
    case "error":
      return opts.errorMessage ?? "Upload failed. Try again.";
    default:
      return opts.size ?? "";
  }
}

/* -------------------------------------------------------------------------- */
/*                              Status icon (SVG)                             */
/* -------------------------------------------------------------------------- */

function StatusIcon({
  status,
  FileGlyph,
  animateLine,
}: {
  status: AttachmentStatus;
  FileGlyph: IconComponent;
  animateLine: boolean;
}) {
  if (status === "uploading") {
    // Pure CSS spin — no transform via JS
    return (
      <span
        aria-hidden
        className="size-[62.5%] rounded-full border-2 border-current border-r-transparent opacity-80 motion-safe:animate-spin"
      />
    );
  }

  if (status === "pending") {
    return <Clock className="size-[inherit] h-full w-full p-[15%]" />;
  }

  if (status === "success") {
    // Line-draw: animate strokeDashoffset only (no transform).
    return (
      <Check
        className={cn(
          "stroke-3 h-full w-full p-[15%]",
          animateLine && "attachment-check-draw",
        )}
      />
    );
  }

  if (status === "error") {
    return <AlertTriangle className="h-full w-full p-[15%]" />;
  }

  return <FileGlyph className="h-full w-full p-[15%]" />;
}

/* -------------------------------------------------------------------------- */
/*                              Icon button                                   */
/* -------------------------------------------------------------------------- */

function ActionButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex size-7 items-center justify-center rounded-md text-muted-foreground",
        "transition-colors duration-150",
        "hover:bg-foreground/6 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Root                                          */
/* -------------------------------------------------------------------------- */

export interface AttachmentProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onError"
> {
  variant?: AttachmentVariant;
  fileName: string;
  fileSize?: number | string;
  /** Only used for variant="preview". */
  thumbnailSrc?: string;
  /** 0–100, used while `status="uploading"`. */
  progress?: number;
  status?: AttachmentStatus;
  errorMessage?: string;
  onRetry?: () => void;
  removable?: boolean;
  onRemove?: () => void;
  downloadHref?: string;
  onDownload?: () => void;
}

type MotionUnsafeDivProps =
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart";

function omitMotionUnsafeProps(
  props: React.HTMLAttributes<HTMLDivElement>,
): Omit<React.HTMLAttributes<HTMLDivElement>, MotionUnsafeDivProps> {
  const { onDrag, onDragStart, onDragEnd, onAnimationStart, ...safeProps } =
    props;

  void onDrag;
  void onDragStart;
  void onDragEnd;
  void onAnimationStart;

  return safeProps;
}

export const Attachment = React.forwardRef<HTMLDivElement, AttachmentProps>(
  (
    {
      variant = "compact",
      fileName,
      fileSize,
      thumbnailSrc,
      progress = 0,
      status = "idle",
      errorMessage,
      onRetry,
      removable,
      onRemove,
      downloadHref,
      onDownload,
      className,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion() ?? false;
    const [removed, setRemoved] = React.useState(false);

    const safeVariant: AttachmentVariant = variant ?? "compact";
    const safeStatus: AttachmentStatus = status ?? "idle";

    const showRemove = removable ?? safeVariant === "removable";
    const showDownload =
      Boolean(downloadHref || onDownload) || safeVariant === "download";
    const showThumbnail =
      safeVariant === "preview" &&
      Boolean(thumbnailSrc) &&
      safeStatus === "idle";
    const isError = safeStatus === "error";
    const isBusy = safeStatus === "uploading" || safeStatus === "processing";

    const FileGlyph = resolveIcon(fileName);
    const size = formatSizeProp(fileSize);
    const meta = statusText(safeStatus, { progress, size, errorMessage });

    useAttachmentStyles();

    // Strip DOM handlers that conflict with motion.div types
    const safeProps = omitMotionUnsafeProps(props);

    const handleRemove = () => setRemoved(true);

    /* ---------- thumbnail (preview) card ---------- */
    if (showThumbnail) {
      return (
        <PreviewCard
          ref={ref}
          fileName={fileName}
          size={size}
          thumbnailSrc={thumbnailSrc as string}
          removed={removed}
          showRemove={showRemove}
          onRequestRemove={handleRemove}
          onRemoveComplete={onRemove}
          reduceMotion={reduceMotion}
          className={className}
          {...safeProps}
        />
      );
    }

    /* ---------- row card ---------- */
    return (
      <AnimatePresence initial={false} onExitComplete={() => onRemove?.()}>
        {!removed && (
          <motion.div
            ref={ref}
            data-slot="attachment"
            data-variant={safeVariant}
            data-status={safeStatus}
            /* Only structural animation: height collapse. No transform, no opacity. */
            initial={false}
            exit={{ height: 0, marginTop: 0 }}
            transition={{
              height: {
                duration: reduceMotion ? 0 : 0.22,
                ease: EASE_LINEAR,
              },
            }}
            style={{ overflow: "hidden" }}
            className={className}
            {...safeProps}
          >
            <div
              className={cn(
                attachmentRowVariants({
                  variant: safeVariant,
                  status: safeStatus,
                }),
              )}
            >
              {/* Icon tile */}
              <div
                aria-hidden
                className={cn(
                  iconTileVariants({
                    variant: safeVariant,
                    status: safeStatus,
                  }),
                )}
              >
                <StatusIcon
                  status={safeStatus}
                  FileGlyph={FileGlyph}
                  animateLine={!reduceMotion}
                />
              </div>

              {/* Name + meta */}
              <div className="min-w-0 flex-1">
                <p
                  title={fileName}
                  className={cn(
                    "truncate text-[13px] font-medium leading-none tracking-[-0.01em]",
                    isBusy && !reduceMotion
                      ? "attachment-shimmer-text"
                      : isError
                        ? "text-red-600 dark:text-red-400"
                        : "text-foreground",
                  )}
                >
                  {fileName}
                </p>

                {meta ? (
                  <p
                    className={cn(
                      "mt-1 truncate text-[11.5px]",
                      isError
                        ? "text-red-600 dark:text-red-400"
                        : "text-muted-foreground",
                    )}
                  >
                    {meta}
                  </p>
                ) : null}
              </div>

              {/* Trailing actions — reveals via width wipe on hover, not scale */}
              <div
                className={cn(
                  "flex shrink-0 items-center gap-1 overflow-hidden",
                  "transition-[max-width] duration-200",
                  "max-w-25",
                )}
              >
                {isError && onRetry ? (
                  <ActionButton label={`Retry ${fileName}`} onClick={onRetry}>
                    <RotateCw className="size-4" />
                  </ActionButton>
                ) : null}

                {showDownload ? (
                  <ActionButton
                    label={`Download ${fileName}`}
                    onClick={() => {
                      onDownload?.();
                      if (downloadHref) {
                        window.open(
                          downloadHref,
                          "_blank",
                          "noopener,noreferrer",
                        );
                      }
                    }}
                  >
                    <Download className="size-4" />
                  </ActionButton>
                ) : null}

                {showRemove ? (
                  <ActionButton
                    label={`Remove ${fileName}`}
                    onClick={handleRemove}
                  >
                    <X className="size-4" />
                  </ActionButton>
                ) : null}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);
Attachment.displayName = "Attachment";

/* -------------------------------------------------------------------------- */
/*                              Preview card                                  */
/* -------------------------------------------------------------------------- */

interface PreviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  fileName: string;
  size?: string;
  thumbnailSrc: string;
  removed: boolean;
  showRemove: boolean;
  onRequestRemove: () => void;
  onRemoveComplete?: () => void;
  reduceMotion: boolean;
}

const PreviewCard = React.forwardRef<HTMLDivElement, PreviewCardProps>(
  (
    {
      fileName,
      size,
      thumbnailSrc,
      removed,
      showRemove,
      onRequestRemove,
      onRemoveComplete,
      reduceMotion,
      className,
      ...props
    },
    ref,
  ) => {
    const ext = getExtension(fileName).toUpperCase();
    const meta = [ext, size].filter(Boolean).join(" · ");
    const safeProps = omitMotionUnsafeProps(props);

    return (
      <AnimatePresence
        initial={false}
        onExitComplete={() => onRemoveComplete?.()}
      >
        {!removed && (
          <motion.div
            ref={ref}
            data-slot="attachment"
            data-variant="preview"
            /* Only structural collapse — no opacity, no scale. */
            initial={false}
            exit={{ height: 0 }}
            transition={{
              height: { duration: reduceMotion ? 0 : 0.22, ease: EASE_LINEAR },
            }}
            style={{ overflow: "hidden" }}
            className={cn("w-35 shrink-0", className)}
            {...safeProps}
          >
            <div className="group rounded-lg border border-border bg-foreground/3 p-2 dark:bg-muted/40">
              <div className="relative aspect-square w-full overflow-hidden rounded-md bg-foreground/6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbnailSrc}
                  alt=""
                  className="size-full object-cover"
                />

                {showRemove ? (
                  <button
                    type="button"
                    aria-label={`Remove ${fileName}`}
                    onClick={onRequestRemove}
                    className={cn(
                      "absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full",
                      "bg-black/60 text-white backdrop-blur-sm",
                      "opacity-0 transition-opacity duration-150",
                      "group-hover:opacity-100 focus-visible:opacity-100",
                      "outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    )}
                  >
                    <X className="size-3.5" />
                  </button>
                ) : null}
              </div>

              <p
                title={fileName}
                className="mt-2 truncate text-[13px] font-medium leading-none tracking-[-0.01em] text-foreground"
              >
                {fileName}
              </p>

              {meta ? (
                <p className="mt-1 truncate text-[11.5px] text-muted-foreground">
                  {meta}
                </p>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);
PreviewCard.displayName = "PreviewCard";

/* -------------------------------------------------------------------------- */
/*                              Styles                                        */
/* -------------------------------------------------------------------------- */

const ATTACHMENT_STYLE_ID = "venumity-attachment-styles-v1";

function useAttachmentStyles() {
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(ATTACHMENT_STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = ATTACHMENT_STYLE_ID;
    style.textContent = `
/* Text shimmer — background-position scroll, no transform. */
@media (prefers-reduced-motion: no-preference) {
  .attachment-shimmer-text {
    color: transparent;
    background-image: linear-gradient(
      90deg,
      var(--muted-foreground) 0%,
      var(--muted-foreground) 35%,
      var(--foreground) 50%,
      var(--muted-foreground) 65%,
      var(--muted-foreground) 100%
    );
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    animation: attachment-text-shimmer 1.8s linear infinite;
  }
}

@keyframes attachment-text-shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}

/* Check line-draw — strokeDashoffset only, no transform. */
.attachment-check-draw path {
  stroke-dasharray: 32;
  stroke-dashoffset: 32;
  animation: attachment-check-draw 0.4s ${`cubic-bezier(${EASE_OUT.join(",")})`} forwards;
}

@keyframes attachment-check-draw {
  to { stroke-dashoffset: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .attachment-shimmer-text { animation: none !important; }
  .attachment-check-draw path { animation: none !important; stroke-dashoffset: 0 !important; }
}
`;
    document.head.appendChild(style);
  }, []);
}
