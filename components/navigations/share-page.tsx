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
import { brandName } from "@/lib/brand";

const getShareMessage = (url: string, title: string) => {
  if (url.includes("/components/")) {
    return `🚀 Check out this UI component on ${brandName} ! \n${title}\n${url}`;
  }

  if (url.includes("/documents/")) {
    return `📘 Helpful documentation on ${brandName} \n${title}\n${url}`;
  }

  return `✨ Take a look at this page on ${brandName} \n${title}\n${url}`;
};

const SHARE_ACTIONS = [
  {
    key: "copy",
    label: "Copy URL",
    icon: Clipboard,
    onClick: (copyPageUrl: () => void) => copyPageUrl(),
  },
  {
    key: "email",
    label: "Email",
    iconSrc: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
    href: (pageUrl: string, pageTitle: string) =>
      `mailto:?subject=${encodeURIComponent(pageTitle)}&body=${encodeURIComponent(pageUrl)}`,
  },
  {
    key: "twitter",
    label: "Twitter",
    iconSrc:
      "https://abs.twimg.com/responsive-web/client-web/icon-ios.77d25eba.png",
    href: (pageUrl: string, pageTitle: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        getShareMessage(pageUrl, pageTitle),
      )}`,
    target: "_blank",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    iconSrc:
      "https://scontent.fnag4-4.fna.fbcdn.net/v/t39.30808-1/271351546_4622007704503308_6943858492069827899_n.png?stp=dst-png_s480x480&_nc_cat=107&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=pDDFgcxMuwwQ7kNvwFBrgoA&_nc_oc=AdmJ2LEapL3O-4HbiyqFHo3mhVf0itnsFbBHG2EHN8qUJVf6voSqSCcCmuzUYkOoHbTUN8iYgG0PoRAYjiZD_ndZ&_nc_zt=24&_nc_ht=scontent.fnag4-4.fna&_nc_gid=yR5xdA_69EQ7LvvQ3eQz0g&oh=00_Afu5qUo2mWeEG0m4ZqIwXGKXT8BTNQqN65hqMVksqw04Rg&oe=6984E9D8",
    href: (pageUrl: string, pageTitle: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        pageUrl,
      )}&summary=${encodeURIComponent(getShareMessage(pageUrl, pageTitle))}`,
    target: "_blank",
  },
  {
    key: "facebook",
    label: "Facebook",
    iconSrc: "https://static.xx.fbcdn.net/rsrc.php/y1/r/ay1hV6OlegS.ico",
    href: (pageUrl: string, pageTitle: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        pageUrl,
      )}&quote=${encodeURIComponent(getShareMessage(pageUrl, pageTitle))}`,
    target: "_blank",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    iconSrc:
      "https://store-images.s-microsoft.com/image/apps.8453.13655054093851568.4a371b72-2ce8-4bdb-9d83-be49894d3fa0.7f3687b9-847d-4f86-bb5c-c73259e2b38e",
    href: (pageUrl: string, pageTitle: string) =>
      `https://wa.me/?text=${encodeURIComponent(
        getShareMessage(pageUrl, pageTitle),
      )}`,
    target: "_blank",
  },
  {
    key: "instagram",
    label: "Instagram",
    iconSrc: "https://static.cdninstagram.com/rsrc.php/v4/yI/r/VsNE-OHk_8a.png",
    href: () => "https://www.instagram.com/",
    target: "_blank",
  },
  {
    key: "threads",
    label: "Threads",
    iconSrc: "https://static.cdninstagram.com/rsrc.php/v4/yX/r/7RzDLDb3SrS.png",
    href: (pageUrl: string, pageTitle: string) =>
      `https://www.threads.net/intent/post?text=${encodeURIComponent(
        getShareMessage(pageUrl, pageTitle),
      )}`,
    target: "_blank",
  },
  {
    key: "reddit",
    label: "Reddit",
    iconSrc: "https://www.redditstatic.com/shreddit/assets/favicon/192x192.png",
    href: (pageUrl: string, pageTitle: string) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(
        pageUrl,
      )}&title=${encodeURIComponent(pageTitle)}`,
    target: "_blank",
  },
  {
    key: "sms",
    label: "Messags",
    iconSrc:
      "https://play-lh.googleusercontent.com/9AZOTXU_CpreTFAXUPAmJNkm8VGCb1C90fjJ9pHGcVmpGMDSTq3cUbaQJdBT9Tdp9A",
    href: (pageUrl: string, pageTitle: string) =>
      `sms:?&body=${encodeURIComponent(getShareMessage(pageUrl, pageTitle))}`,
  },
  {
    key: "discord",
    label: "Discord",
    iconSrc: "https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico",
    href: (pageUrl: string, pageTitle: string) =>
      `https://discord.com/url?url=${encodeURIComponent(
        pageUrl,
      )}&text=${encodeURIComponent(pageTitle)}`,
    target: "_blank",
  },
  {
    key: "telegram",
    label: "Telegram",
    iconSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/960px-Telegram_logo.svg.png",
    href: (pageUrl: string, pageTitle: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(
        pageUrl,
      )}&text=${encodeURIComponent(pageTitle)}`,
    target: "_blank",
  },
];

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

  const copyPageUrl = async () => {
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 py-1.5 text-xs  font-normal leading-none hover:text-foreground group cursor-pointer transition-all duration-500 w-fit!">
          <Share2 className="size-3.5! group-hover:animate-[wiggle_0.6s_ease-in-out]" />
          <span>Share this page</span>
        </div>
      </DialogTrigger>

      <DialogContent className="p-0 gap-0 overflow-hidden text-white bg-white/10! backdrop-blur-xl border-white/20 rounded-md! max-w-xl!">
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
          <div className="p-4 pt-2  font-medium text-foreground w-full">
            <motion.div
              className="grid grid-cols-3 gap-5 p-6 rounded-md bg-background overflow-hidden hover:shadow-xl transition-all duration-500"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {SHARE_ACTIONS.map((action) => {
                const IconImage = action.iconSrc;

                if (action.key === "copy") {
                  return (
                    <motion.div
                      key={action.key}
                      variants={itemVariants}
                      className="hover:scale-110 transition-all duration-500"
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => action.onClick?.(copyPageUrl)}
                        className="flex items-center gap-3 p-6! border-foreground/10! hover:border-blue-500/70! bg-muted/30 hover:bg-linear-to-tl from-blue-500/30 via-background hover:shadow-lg shadow-blue-500/20 transition-all duration-100 rounded cursor-pointer w-full"
                      >
                        {copied ? (
                          <CheckLine className="text-green-500! size-5!" />
                        ) : (
                          <Linked className="size-5! opacity-60 group-hover:opacity-100 transition-all duration-500" />
                        )}
                        <span>{action.label}</span>
                      </Button>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={action.key}
                    variants={itemVariants}
                    className="hover:scale-110 transition-all duration-500"
                  >
                    <Link
                      href={action.href!(currentUrl, currentTitle)}
                      target={action.target}
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex items-center gap-3 p-6! border-foreground/10! hover:border-blue-500/70! bg-muted/30 hover:bg-linear-to-tl from-blue-500/30 via-background hover:shadow-lg shadow-blue-500/20 transition-all duration-100 rounded cursor-pointer w-full"
                      >
                        {IconImage && (
                          <Image
                            src={IconImage}
                            alt={action.label}
                            width={500}
                            height={500}
                            className="size-6 object-contain rounded"
                          />
                        )}
                        <span>{action.label}</span>
                      </Button>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
