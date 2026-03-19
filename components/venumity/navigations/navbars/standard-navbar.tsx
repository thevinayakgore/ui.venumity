"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  Menu,
  X,
  Globe,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { brandName } from "@/lib/brand";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StandardNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<
    "en" | "hi" | "mr" | "gu" | "bn" | "ta" | "te" | "kn" | "ml" | "fr" | "de"
  >("en");

  const navLabels = {
    en: ["Services", "Pricing", "Contact", "Blogs"],
    hi: ["सेवाएँ", "मूल्य", "संपर्क", "ब्लॉग"],
    mr: ["सेवा", "किंमत", "संपर्क", "ब्लॉग"],
    gu: ["સેવાઓ", "કિંમત", "સંપર્ક", "બ્લોગ"],
    bn: ["পরিষেবা", "মূল্য", "যোগাযোগ", "ব্লগ"],
    ta: ["சேவைகள்", "விலை", "தொடர்பு", "வலைப்பதிவு"],
    te: ["సేవలు", "ధరలు", "సంప్రదించండి", "బ్లాగులు"],
    kn: ["ಸೇವೆಗಳು", "ಬೆಲೆ", "ಸಂಪರ್ಕ", "ಬ್ಲಾಗ್"],
    ml: ["സേവനങ്ങൾ", "വില", "ബന്ധപ്പെടുക", "ബ്ലോഗ്"],
    fr: ["Services", "Tarifs", "Contact", "Blogs"],
    de: ["Dienste", "Preise", "Kontakt", "Blogs"],
  };

  const uiText = {
    en: {
      github: "Github",
      signIn: "Sign In",
      getStarted: "Get Started",
      startFree: "Start Building Free",
      banner:
        "Generate complete websites with just one prompt using our advanced AI",
      tryNow: "Try Now →",
      newBadge: "New",
    },
    hi: {
      github: "गिटहब",
      signIn: "साइन इन",
      getStarted: "शुरू करें",
      startFree: "मुफ़्त शुरू करें",
      banner: "हमारे उन्नत एआई से एक ही प्रॉम्प्ट में पूरी वेबसाइट बनाएं",
      tryNow: "अभी आज़माएँ →",
      newBadge: "नया",
    },
    mr: {
      github: "गिटहब",
      signIn: "साइन इन",
      getStarted: "सुरू करा",
      startFree: "मोफत सुरू करा",
      banner:
        "आमच्या प्रगत AI वापरून एका प्रॉम्प्टमध्ये पूर्ण वेबसाइट तयार करा",
      tryNow: "आता वापरून पहा →",
      newBadge: "नवीन",
    },
    gu: {
      github: "ગિટહબ",
      signIn: "સાઇન ઇન",
      getStarted: "શરૂ કરો",
      startFree: "મફતમાં શરૂ કરો",
      banner: "અમારા એડવાન્સ AI વડે એક જ પ્રોમ્પ્ટમાં સંપૂર્ણ વેબસાઇટ બનાવો",
      tryNow: "હમણાં અજમાવો →",
      newBadge: "નવું",
    },
    bn: {
      github: "গিটহাব",
      signIn: "সাইন ইন",
      getStarted: "শুরু করুন",
      startFree: "বিনামূল্যে শুরু করুন",
      banner: "আমাদের উন্নত AI দিয়ে এক প্রম্পটেই সম্পূর্ণ ওয়েবসাইট তৈরি করুন",
      tryNow: "এখনই চেষ্টা করুন →",
      newBadge: "নতুন",
    },
    ta: {
      github: "கிட்ஹப்",
      signIn: "உள்நுழை",
      getStarted: "தொடங்குங்கள்",
      startFree: "இலவசமாக தொடங்குங்கள்",
      banner:
        "எங்கள் மேம்பட்ட AI பயன்படுத்தி ஒரே பிராம்ப்டில் முழு வலைத்தளங்களை உருவாக்குங்கள்",
      tryNow: "இப்போது முயற்சிக்கவும் →",
      newBadge: "புதிய",
    },
    te: {
      github: "గిట్‌హబ్",
      signIn: "సైన్ ఇన్",
      getStarted: "ప్రారంభించండి",
      startFree: "ఉచితంగా ప్రారంభించండి",
      banner:
        "మా అధునాతన AIతో ఒక్క ప్రాంప్ట్‌లో పూర్తి వెబ్‌సైట్‌లను సృష్టించండి",
      tryNow: "ఇప్పుడు ప్రయత్నించండి →",
      newBadge: "కొత్త",
    },
    kn: {
      github: "ಗಿಟ್‌ಹಬ್",
      signIn: "ಸೈನ್ ಇನ್",
      getStarted: "ಪ್ರಾರಂಭಿಸಿ",
      startFree: "ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ",
      banner:
        "ನಮ್ಮ ಉನ್ನತ AI ಬಳಸಿ ಒಂದೇ ಪ್ರಾಂಪ್ಟ್‌ನಲ್ಲಿ ಸಂಪೂರ್ಣ ವೆಬ್‌ಸೈಟ್‌ಗಳನ್ನು ರಚಿಸಿ",
      tryNow: "ಈಗ ಪ್ರಯತ್ನಿಸಿ →",
      newBadge: "ಹೊಸ",
    },
    ml: {
      github: "ഗിറ്റ്ഹബ്",
      signIn: "സൈൻ ഇൻ",
      getStarted: "തുടങ്ങുക",
      startFree: "സൗജന്യമായി ആരംഭിക്കുക",
      banner:
        "ഞങ്ങളുടെ പുരോഗമന AI ഉപയോഗിച്ച് ഒരു പ്രോംപ്റ്റിൽ തന്നെ പൂർണ്ണ വെബ്സൈറ്റുകൾ സൃഷ്ടിക്കുക",
      tryNow: "ഇപ്പോൾ പരീക്ഷിക്കുക →",
      newBadge: "പുതിയത്",
    },
    fr: {
      github: "Github",
      signIn: "Connexion",
      getStarted: "Commencer",
      startFree: "Commencer gratuitement",
      banner:
        "Générez des sites complets avec une seule instruction grâce à notre IA avancée",
      tryNow: "Essayer maintenant →",
      newBadge: "Nouveau",
    },
    de: {
      github: "Github",
      signIn: "Anmelden",
      getStarted: "Loslegen",
      startFree: "Kostenlos starten",
      banner:
        "Erstellen Sie komplette Websites mit nur einem Prompt mithilfe unserer KI",
      tryNow: "Jetzt testen →",
      newBadge: "Neu",
    },
  };

  const languageNames = {
    en: "English",
    hi: "हिंदी",
    mr: "मराठी",
    gu: "ગુજરાતી",
    bn: "বাংলা",
    ta: "தமிழ்",
    te: "తెలుగు",
    kn: "ಕನ್ನಡ",
    ml: "മലയാളം",
    fr: "Français",
    de: "Deutsch",
  };

  const languageOrder: Array<
    "mr" | "en" | "hi" | "gu" | "bn" | "ta" | "te" | "kn" | "ml" | "fr" | "de"
  > = ["mr", "en", "hi", "gu", "bn", "ta", "te", "kn", "ml", "fr", "de"];

  return (
    <nav className="sticky top-0 w-full">
      <div className="flex items-center justify-between bg-foreground/5 backdrop-blur-md p-3">
        <section className="flex items-center gap-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt={brandName}
              width={500}
              height={500}
              className="size-8"
            />
            <span className="flex items-center text-2xl font-semibold">
              Venu<span className="text-primary mr-2">mity</span> UI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 relative">
            {navLabels[language].map((item) => (
              <Link key={item} href="#">
                <Button
                  variant="ghost"
                  className="text-sm font-medium hover:bg-foreground/10! cursor-pointer leading-none rounded-sm"
                >
                  {item}
                </Button>
              </Link>
            ))}
          </div>
        </section>

        <section className="hidden lg:flex items-center gap-1">
          <Select
            value={language}
            onValueChange={(v) =>
              setLanguage(
                v as
                  | "en"
                  | "hi"
                  | "mr"
                  | "gu"
                  | "bn"
                  | "ta"
                  | "te"
                  | "kn"
                  | "ml"
                  | "fr"
                  | "de",
              )
            }
          >
            <SelectTrigger className="h-8! cursor-pointer px-2! gap-2 bg-background! border-foreground/20! rounded-sm text-sm">
              <Globe className="size-4" />
              <SelectValue placeholder="EN" />
            </SelectTrigger>
            <SelectContent>
              {languageOrder.map((key) => (
                <SelectItem key={key} value={key} className="cursor-pointer">
                  {languageNames[key]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            size="sm"
            variant="outline"
            className="bg-background! cursor-pointer border-foreground/20 rounded-sm"
          >
            <Github className="size-4!" />
            {uiText[language].github}
          </Button>

          <Button
            size="sm"
            className="cursor-pointer bg-foreground! text-secondary! rounded-sm"
          >
            {uiText[language].signIn}
          </Button>

          <Button
            size="sm"
            className="cursor-pointer bg-linear-to-tl from-rose-500 to-pink-400 text-white! hover:shadow-lg shadow-pink-500/30 hover:scale-105 text-sm rounded-sm transition-all duration-500"
          >
            <Zap className="size-4!" />
            {uiText[language].getStarted}
          </Button>
        </section>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-6">
              {navLabels[language].map((item) => (
                <div key={item} className="space-y-2">
                  <Link
                    href="#"
                    className="font-medium p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </div>
              ))}

              <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-gray-800">
                <Button className="w-full bg-linear-to-r from-blue-600 to-purple-600">
                  <Zap className="w-4 h-4 mr-2" />
                  {uiText[language].startFree}
                </Button>
                <Button variant="outline" className="w-full">
                  {uiText[language].signIn}
                </Button>

                <div className="flex items-center justify-center gap-4 pt-4">
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Announcement Banner */}
      <div className="bg-linear-to-tl from-blue-500 to-sky-500 text-white font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-2">
            <div className="flex items-center gap-3">
              <Badge className="bg-white text-blue-500">
                <Sparkles className="size-2.5! mr-0.5" />
                {uiText[language].newBadge}
              </Badge>
              <span className="text-sm">{uiText[language].banner}</span>
              <Link href="#">
                <Button
                  size="sm"
                  variant="secondary"
                  className="cursor-pointer bg-white! text-blue-600 rounded-sm transition-all duration-500"
                >
                  {uiText[language].tryNow}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
