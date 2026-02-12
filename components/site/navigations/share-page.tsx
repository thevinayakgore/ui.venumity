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
import { CheckLine, Link as Linked, MoveRight, Share2 } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { brandName } from "@/lib/brand";

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

const getShareMessage = (url: string, title: string) => {
  if (url.includes("/components/")) {
    return `🚀 Check out this UI component on ${brandName} ! \n${title}\n${url}`;
  }

  if (url.includes("/documents/")) {
    return `📘 Helpful documentation on ${brandName} \n${title}\n${url}`;
  }

  return `✨ Take a look at this page on ${brandName} \n${title}\n${url}`;
};

const getShareConfig = (name: string, url: string, title: string) => {
  const label = name.charAt(0).toUpperCase() + name.slice(1);
  const key = name;
  const target = ["gmail", "messages"].includes(name) ? undefined : "_blank";

  const hrefMap: Record<string, string> = {
    gmail: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareMessage(url, title))}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(getShareMessage(url, title))}`,
    instagram: "https://www.instagram.com/",
    threads: `https://www.threads.net/intent/post?text=${encodeURIComponent(getShareMessage(url, title))}`,
    reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    messages: `sms:?&body=${encodeURIComponent(getShareMessage(url, title))}`,
    discord: `https://discord.com/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  };

  return {
    key,
    label,
    href: hrefMap[name],
    target,
    alt: label,
  };
};

const buildShareActions = (url: string, title: string) => {
  return SHARE_PROVIDERS.map(({ name, src }) => {
    const config = getShareConfig(name, url, title);

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

export default function SharePage() {
  const pathname = usePathname();
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const timer = setTimeout(() => {
      setCurrentUrl(window.location.href);
      setCurrentTitle(document.title);
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast.success("URL copied to clipboard !");
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1500);
    } catch (err) {
      toast.error("Failed to copy URL : " + err);
    }
  };

  const shareActions = buildShareActions(currentUrl, currentTitle);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 py-1.5 text-xs  font-normal leading-none hover:text-foreground group cursor-pointer transition-all duration-500 w-fit!">
          <Share2 className="size-3.5! group-hover:animate-[wiggle_0.6s_ease-in-out]" />
          <span>Share this page</span>
        </div>
      </DialogTrigger>

      <DialogContent className="p-0 gap-0 overflow-hidden text-white bg-white/10! backdrop-blur-xl border-white/20 rounded-xl! max-w-lg!">
        <DialogHeader className="pt-5 pb-3 px-6!">
          <DialogTitle className="flex items-center gap-3 font-normal">
            <Share2 className="size-5" />
            <span> Share this page</span>
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
        >
          <div className="p-4 pt-2 font-medium text-foreground w-full">
            <motion.div
              className="grid grid-cols-6 gap-3 p-6 rounded-lg bg-background overflow-hidden hover:shadow-xl transition-all duration-500"
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
                  <Link
                    href={action.href}
                    target={action.target}
                  >
                    <Button
                      size="icon"
                      variant="outline"
                      className={ACTION_BUTTON_CLASS}
                    >
                      {action.src && (
                        <Image
                          src={action.src}
                          alt={action.label}
                          width={500}
                          height={500}
                          className="size-6 object-contain rounded"
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
