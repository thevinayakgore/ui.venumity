// app/components/site/navigations/share-component.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { easeIn, motion } from "motion/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CheckLine,
  Clipboard,
  Link as Linked,
  MoveRight,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getOGThumbnailPath } from "@/registry/component-utils";

interface ShareComponentProps {
  itemName?: string;
}

const SHARE_PROVIDERS = [
  { name: "gmail", src: "/assets/social/gmail.ico" },
  { name: "twitter", src: "/assets/social/twitter.png" },
  { name: "linkedin", src: "/assets/social/linkedin.png" },
  { name: "facebook", src: "/assets/social/facebook.ico" },
  { name: "whatsapp", src: "/assets/social/whatsapp.png" },
  { name: "instagram", src: "/assets/social/instagram.png" },
  { name: "threads", src: "/assets/social/threads.png" },
  { name: "reddit", src: "/assets/social/reddit.png" },
  { name: "messages", src: "/assets/social/messages.png" },
  { name: "discord", src: "/assets/social/discord.ico" },
  { name: "telegram", src: "/assets/social/telegram.webp" },
];

const ACTION_BUTTON_CLASS =
  "py-6 border-foreground/10! hover:border-blue-500/70! bg-muted/30 hover:bg-linear-to-tl from-blue-500/30 via-background shadow-none hover:shadow-lg shadow-blue-500/20 transition-all duration-100 rounded-sm cursor-pointer w-full";

const getShareMessage = (componentName: string, url: string) => {
  return `# Component - ${componentName}

✨ Next.js, TypeScript, Framer Motion, Tailwind CSS, shadcn/ui.

🔗 SOURCE CODE - ${url}
🎉 Copy-paste ready - Customizable - Open source 
🛠️ Built for developers who ship fast.

#venumityui #nextjs #buildinginpublic`;
};

const getShareConfig = (name: string, url: string, componentName: string) => {
  const label = name.charAt(0).toUpperCase() + name.slice(1);
  const key = name;
  const target = ["gmail", "messages"].includes(name) ? undefined : "_blank";
  const shareMessage = getShareMessage(componentName, url);

  const hrefMap: Record<string, string> = {
    gmail: `mailto:?subject=${encodeURIComponent(componentName)}&body=${encodeURIComponent(shareMessage)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
    instagram: "https://www.instagram.com/",
    threads: `https://www.threads.net/intent/post?text=${encodeURIComponent(shareMessage)}`,
    reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(componentName)}`,
    messages: `sms:?&body=${encodeURIComponent(shareMessage)}`,
    discord: `https://discord.com/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareMessage)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareMessage)}`,
  };

  return {
    key,
    label,
    href: hrefMap[name],
    target,
    alt: label,
  };
};

const buildShareActions = (url: string, componentName: string) => {
  return SHARE_PROVIDERS.map(({ name, src }) => {
    const config = getShareConfig(name, url, componentName);
    return {
      ...config,
      src,
    };
  });
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 500,
    x: -500,
    scale: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: easeIn,
    },
  },
};

export default function ShareComponent({ itemName }: ShareComponentProps) {
  const pathname = usePathname();
  const [currentUrl, setCurrentUrl] = useState("");
  const [componentName, setComponentName] = useState(itemName || "");
  const [thumbnailPath, setThumbnailPath] = useState("/logo.png");
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const timer = setTimeout(() => {
      const url = window.location.href;
      setCurrentUrl(url);

      // If we have itemName from props, use it
      if (itemName) {
        setComponentName(itemName);
        // For preview, use OG thumbnail path (item name)
        setThumbnailPath(getOGThumbnailPath(itemName));
        return;
      }

      // Fallback to URL parsing
      const pathParts = window.location.pathname.split("/").filter(Boolean);
      if (pathParts.length >= 3 && pathParts[0] === "components") {
        const componentSlug = pathParts[pathParts.length - 1];
        const readableName = componentSlug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        setComponentName(readableName);
        // Use component slug for thumbnail
        setThumbnailPath(`/thumbnails/${componentSlug}.png`);
      } else {
        setComponentName(document.title || "UI Component");
        setThumbnailPath("/logo.png");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname, itemName]);

  const handleCopy = async () => {
    try {
      const shareMessage = getShareMessage(componentName, currentUrl);
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      toast.success("Share message copied to clipboard!");
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1500);
    } catch (err) {
      toast.error("Failed to copy message : " + err);
    }
  };

  const shareActions = buildShareActions(currentUrl, componentName);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="relative group cursor-pointer flex items-center gap-2 uppercase bg-background! text-foreground/60 hover:text-foreground rounded-sm overflow-hidden h-8"
        >
          <span
            aria-hidden
            className="vnm-shimmer-btn group bg-linear-to-l from-transparent via-zinc-300/70 to-transparent absolute left-0 top-0 bottom-0 w-20 pointer-events-none opacity-0! group-hover:opacity-50!"
          />
          <Share2 className="group-hover:animate-[wiggle_0.6s_ease-in-out]" />
        </Button>
      </DialogTrigger>

      <DialogContent className="z-700! p-0 gap-0 overflow-hidden text-white bg-white/10! backdrop-blur-xl border-white/20 rounded-xl! max-w-4xl!">
        <DialogHeader className="pt-5 pb-3 px-6!">
          <DialogTitle className="flex items-center gap-3 font-normal">
            <Share2 className="size-5" />
            <span> Share Component</span>
            <motion.span
              aria-hidden
              className="inline-flex"
              animate={{ x: [0, 15, 0] }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <MoveRight className="size-5" />
            </motion.span>
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <div className="p-4 pt-2 font-medium text-foreground w-full h-full">
            {/* Preview section */}
            <div className="flex items-start gap-4 mb-4 w-full h-70">
              <div className="relative group/img bg-accent dark:bg-popover border shadow-lg/10 rounded-lg overflow-hidden w-1/2 h-full">
                <Image
                  src={thumbnailPath}
                  alt={componentName}
                  width={5000}
                  height={5000}
                  unoptimized
                  priority
                  className="object-cover group-hover/img:scale-110 transition-all duration-500 w-full"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = "/brand-logo.png";
                  }}
                />
                <h3 className="absolute inset-x-0 bottom-0 z-10 px-4 py-3 bg-accent dark:bg-popover border-t text-sm md:text-base font-medium truncate">
                  📦 {componentName}
                </h3>
              </div>
              <div className="flex flex-col items-start gap-3 text-xs bg-accent dark:bg-popover p-3 pb-4 rounded-lg border font-mono whitespace-pre-wrap overflow-y-auto w-1/2 h-full">
                <div className="sticky top-0 flex items-center justify-between p-2 pl-3 text-center bg-background border shadow-lg/5 rounded-md text-base font-medium font-sans w-full">
                  <span className="text-2xl leading-none">🌐</span>
                  <h3>SHARE COMPONENTS WITH OTHERS</h3>
                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={copied}
                    aria-label="Copy share message"
                    className={`group/btn cursor-pointer rounded size-8 p-1.5 hover:bg-foreground/10 backdrop-blur-sm text-muted-foreground/70 hover:text-foreground disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300`}
                  >
                    {copied ? (
                      <CheckLine className="w-full h-full text-green-500" />
                    ) : (
                      <Clipboard className="w-full h-full group-hover/btn:text-foreground transition-colors duration-300" />
                    )}
                  </button>
                </div>
                <div className="flex flex-col item-start gap-2 px-1 w-full">
                  <p># Component - {componentName}</p>
                  <p>
                    ✨ Next.js, TypeScript, Framer Motion, Tailwind CSS,
                    shadcn/ui.
                  </p>
                  <span>
                    🔗 SOURCE CODE -{" "}
                    <Link
                      href={currentUrl}
                      target="_blank"
                      className="text-blue-500"
                    >
                      {currentUrl}
                    </Link>
                  </span>
                  <p>🎉 Copy-paste ready - Customizable - Open source</p>
                  <p>🛠️ Built for developers who ship fast.</p>
                  <span>#venumityui #nextjs #buildinginpublic</span>
                </div>
              </div>
            </div>

            <motion.div
              className="grid grid-cols-12 gap-3 p-4 border border-foreground/15 rounded-lg bg-background overflow-hidden hover:shadow-xl transition-all duration-500 w-full"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                key="copy"
                variants={itemVariants}
                className="hover:scale-110 transition-all duration-500"
              >
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleCopy}
                  className={ACTION_BUTTON_CLASS}
                  title="Copy share message"
                >
                  {copied ? (
                    <CheckLine className="text-green-500! size-5!" />
                  ) : (
                    <Linked className="size-5! opacity-60 group-hover:opacity-100 transition-all duration-500" />
                  )}
                </Button>
              </motion.div>

              {shareActions.map((action) => (
                <motion.div
                  key={action.key}
                  variants={itemVariants}
                  className="hover:scale-110 transition-all duration-500"
                >
                  <Link href={action.href} target={action.target}>
                    <Button
                      size="icon"
                      variant="outline"
                      className={ACTION_BUTTON_CLASS}
                      title={`Share on ${action.label}`}
                    >
                      {action.src && (
                        <Image
                          src={action.src}
                          alt={action.label}
                          width={500}
                          height={500}
                          className="size-7 object-contain rounded"
                        />
                      )}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
