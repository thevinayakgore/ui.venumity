"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Home,
  Settings,
  Users,
  FileText,
  Calendar,
  Mail,
  MessageSquare,
  PieChart,
  Search,
  Sun,
  Moon,
  LogOut,
  User,
  Bell,
  HelpCircle,
  PanelRightOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";

const brandName = "VINU";

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  path: string;
  count?: number;
  subItems?: MenuItem[];
};

export default function Sidebar1() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Close profile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems: MenuItem[] = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Dashboard",
      path: "dashboard",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Team",
      path: "team",
      count: 3,
      subItems: [
        {
          icon: <Users className="h-4 w-4" />,
          label: "Members",
          path: "team/members",
        },
        {
          icon: <Settings className="h-4 w-4" />,
          label: "Settings",
          path: "team/settings",
        },
      ],
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Projects",
      path: "projects",
      count: 5,
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Calendar",
      path: "calendar",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Inbox",
      path: "inbox",
      count: 12,
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Messages",
      path: "messages",
    },
    {
      icon: <PieChart className="h-5 w-5" />,
      label: "Analytics",
      path: "analytics",
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (openSubMenu && !isCollapsed) {
      setOpenSubMenu(null);
    }
  };

  const handleItemClick = (item: MenuItem) => {
    setIsCollapsed(false);
    setActiveItem(item.path);
    if (item.subItems) {
      setOpenSubMenu(openSubMenu === item.path ? null : item.path);
    }
    if (isMobile) {
      setIsCollapsed(true);
    }
  };

  const handleSearchClick = () => {
    setIsCollapsed(false);
    setTimeout(() => {
      searchRef.current?.focus();
    }, 300);
  };

  const expandedWidth = isMobile ? "100%" : 280;
  const collapsedWidth = isMobile ? 0 : 80;

  if (!mounted) return null;

  // Custom Avatar Component
  const CustomAvatar = () => (
    <div className="relative">
      <div className="bg-linear-to-t from-primary to-pink-500 size-10 rounded-md flex items-center justify-center text-white font-medium">
        JD
      </div>
      <motion.div
        className="absolute -bottom-0.5 -right-0.5 size-3 bg-green-500 rounded-full border-2 border-white"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </div>
  );

  // Custom Tooltip Component
  const CustomTooltip = ({
    content,
    children,
    position = "right", // Default to right positioning
  }: {
    content: string;
    children: React.ReactNode;
    position?: "left" | "right";
  }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
      <div className="">
        <div
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {children}
        </div>

        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={cn(
                "absolute -translate-y-1/2 -mt-6 right-0 w-full",
                position === "right" ? "left-full ml-3" : "right-full mr-3",
              )}
            >
              <div className="bg-muted-foreground/10 border border-primary text-center text-xs p-2 rounded-md shadow-lg whitespace-nowrap">
                {content}
              </div>
              <div
                className={cn(
                  "absolute top-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent transform -translate-y-1/2",
                  position === "right"
                    ? "right-full border-r-6 border-r-primary"
                    : "left-full border-l-6 border-r-primary",
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Help items for the Help Dialog
  const helpItems = [
    {
      title: "🚀 User authentication with Clerk",
      description:
        "Securely sign up, sign in, and manage users with Clerk integration.",
    },
    {
      title: "💳 Subscription management",
      description: "Easily handle user plans, payments, and billing cycles.",
    },
    {
      title: "📊 Real-time analytics dashboard",
      description: "Track usage, performance, and key metrics in real-time.",
    },
    {
      title: "🗂️ Project and task management tools",
      description: "Organize projects and tasks efficiently for your team.",
    },
    {
      title: "🤝 Team collaboration features",
      description: "Collaborate seamlessly with teammates using shared tools.",
    },
    {
      title: "🎨 Customizable themes (light/dark)",
      description:
        "Switch between light and dark themes for a personalized experience.",
    },
    {
      title: "🔔 Notifications & alerts system",
      description: "Stay informed with real-time notifications and alerts.",
    },
    {
      title: "📂 File storage & sharing",
      description: "Upload, store, and securely share files with your team.",
    },
    {
      title: "📅 Integrated calendar & reminders",
      description: "Manage events and get reminders directly in the platform.",
    },
    {
      title: "💬 Chat & messaging system",
      description: "Communicate instantly with built-in chat and messaging.",
    },
  ];

  return (
    <div className="flex bg-background text-foreground overflow-hidden w-full h-full">
      {/* Sidebar */}
      <motion.div
        initial={{ width: isMobile ? 0 : 280 }}
        animate={{
          width: isCollapsed ? collapsedWidth : expandedWidth,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "relative flex flex-col border-r hover:border-primary hover:shadow-xl overflow-visible", // Added overflow-visible
          isMobile && isCollapsed ? "border-r-0" : "",
        )}
      >
        {/* Collapse Button */}
        <motion.button
          onClick={toggleSidebar}
          className={cn(
            "absolute md:-right-5.5 top-1 md:top-5 z-20 p-2 rounded-md md:rounded-full border-2 hover:border-white hover:bg-primary hover:text-white bg-background flex items-center justify-center cursor-pointer",
            isCollapsed ? "rotate-180" : "",
            isMobile && "transition-all duration-700",
            isMobile && !isCollapsed ? "right-1" : "-right-12",
          )}
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.7 }}
        >
          <PanelRightOpen className="size-6" />
        </motion.button>

        {/* Sidebar Content */}
        <div className="flex h-full flex-col overflow-hidden pb-5">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center ${
              isCollapsed ? "justify-center" : ""
            } p-5 gap-3`}
          >
            <Image
              src="/logo.png"
              alt="Brand Logo"
              width={200}
              height={200}
              priority
              className="w-auto h-12 border-2 border-primary/30 rounded-md"
            />
            {!isCollapsed && (
              <motion.h1
                className="flex text-5xl lg:text-6xl font-extrabold"
                initial="initial"
                animate="animate"
                variants={{
                  animate: {
                    transition: {
                      staggerChildren: 0.2,
                      repeat: Infinity,
                      repeatType: "loop",
                    },
                  },
                }}
              >
                {brandName.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      initial: {
                        rotateY: i % 2 === 0 ? undefined : 0,
                        rotateX: i % 2 === 0 ? 0 : undefined,
                      },
                      animate: {
                        rotateY: i % 2 === 0 ? undefined : 360,
                        rotateX: i % 2 === 0 ? 360 : undefined,
                      },
                    }}
                    transition={{
                      duration: 5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                    className="inline-block bg-linear-to-br from-primary to-muted bg-clip-text text-transparent drop-shadow-md drop-shadow-primary/30"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
            )}
          </motion.div>

          {/* Search */}
          <motion.div className="p-5 py-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="relative hover:scale-105 transition-all duration-500 w-full">
                <button
                  onClick={handleSearchClick}
                  className={`${
                    isCollapsed &&
                    "h-12 cursor-pointer bg-background/80 backdrop-blur-sm dark:bg-zinc-900 rounded-md border border-primary/30 w-full"
                  }`}
                >
                  <Search className="absolute left-3.5 top-1/2 size-5 z-10 -translate-y-1/2 text-muted-foreground" />
                </button>
                {!isCollapsed && (
                  <input
                    ref={searchRef}
                    placeholder="Search..."
                    className="w-full pl-10 bg-background/80 backdrop-blur-sm dark:bg-zinc-900 h-12 rounded-lg border border-primary/30 focus:border-primary/50 focus:outline-none px-3"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Menu Items */}
          <nav className="flex-1 space-y-3 overflow-y-auto py-3">
            {menuItems.map((item) => (
              <div key={item.path} className="space-y-1 px-5">
                {isCollapsed ? (
                  <CustomTooltip content={item.label} position="right">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        className={cn(
                          "w-full h-12 rounded-lg transition-all group flex items-center justify-center relative cursor-pointer",
                          isCollapsed ? "px-2" : "px-4",
                          activeItem === item.path
                            ? "bg-primary text-white shadow-lg"
                            : "hover:bg-primary hover:text-white hover:shadow-lg",
                        )}
                        onClick={() => handleItemClick(item)}
                      >
                        <span
                          className={`shrink-0 ${
                            activeItem === item.path && "scale-125"
                          } group-hover:scale-125 transition-all duration-500`}
                        >
                          {item.icon}
                        </span>
                        {item.count && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs px-1.5 py-0.5 rounded-full"
                          >
                            {item.count}
                          </motion.span>
                        )}
                      </button>
                    </motion.div>
                  </CustomTooltip>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      className={cn(
                        "w-full h-12 rounded-lg transition-all group flex items-center gap-3 px-4 cursor-pointer",
                        activeItem === item.path
                          ? "bg-primary text-white shadow-md"
                          : "hover:bg-primary hover:text-white hover:border border-primary transition-all duration-700",
                      )}
                      onClick={() => handleItemClick(item)}
                    >
                      <span
                        className={`shrink-0 ${
                          activeItem === item.path && "scale-125"
                        } group-hover:scale-125 transition-all duration-700`}
                      >
                        {item.icon}
                      </span>
                      <span className="font-medium truncate">{item.label}</span>
                      {item.count && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="ml-auto text-xs font-medium px-2 py-1 rounded-full bg-pink-500 text-white"
                        >
                          {item.count}
                        </motion.span>
                      )}
                    </button>
                  </motion.div>
                )}

                {/* Submenu Items */}
                {!isCollapsed && item.subItems && openSubMenu === item.path && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="m-5 space-y-2 border-l pl-3 dark:border-primary/50"
                  >
                    {item.subItems.map((subItem) => (
                      <motion.div
                        key={subItem.path}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <button
                          className={cn(
                            "w-full h-12 rounded-lg group flex items-center gap-3 px-4 cursor-pointer",
                            activeItem === subItem.path
                              ? "bg-primary text-white shadow-md"
                              : "hover:bg-primary hover:text-white hover:border border-primary transition-all duration-700",
                          )}
                          onClick={() => setActiveItem(subItem.path)}
                        >
                          <span
                            className={`shrink-0 ${
                              activeItem === subItem.path && "scale-125"
                            } group-hover:scale-125 transition-all duration-700`}
                          >
                            {subItem.icon}
                          </span>
                          <span className="text-sm truncate">
                            {subItem.label}
                          </span>
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="px-4 space-y-2 mt-auto">
            {/* Quick Actions */}
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-3 gap-2"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-primary/15 hover:bg-primary hover:text-white border border-primary/50 rounded-lg p-3 flex flex-col items-center cursor-pointer"
                  onClick={() => setShowAlertModal(true)}
                >
                  <Bell className="size-5 mb-1 group-hover:scale-125 group-hover:rotate-360 transition-all duration-500" />
                  <span className="text-xs">Alerts</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-primary/15 hover:bg-primary hover:text-white border border-primary/50 rounded-lg p-3 flex flex-col items-center cursor-pointer"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <Sun className="size-5 mb-1 group-hover:scale-125 group-hover:rotate-360 transition-all duration-500" />
                  ) : (
                    <Moon className="size-5 mb-1 group-hover:scale-125 group-hover:rotate-360 transition-all duration-500" />
                  )}
                  <span className="text-xs">Theme</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-primary/15 hover:bg-primary hover:text-white border border-primary/50 rounded-lg p-3 flex flex-col items-center cursor-pointer"
                  onClick={() => setShowHelpModal(true)}
                >
                  <HelpCircle className="size-5 mb-1 group-hover:scale-125 group-hover:rotate-360 transition-all duration-500" />
                  <span className="text-xs">Help</span>
                </motion.button>
              </motion.div>
            )}

            {/* Help Modal */}
            <Dialog open={showHelpModal} onOpenChange={setShowHelpModal}>
              <DialogContent className="sm:max-w-xl overflow-auto p-0 gap-0 max-h-160">
                <DialogHeader className="sticky top-0 z-10 space-y-0 p-5 border-b bg-background">
                  <motion.div
                    initial={{ opacity: 0.3, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <DialogTitle className="text-xl md:text-3xl font-bold">
                      {brandName}
                    </DialogTitle>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0.3, filter: "blur(4px)" }}
                    animate={{ opacity: 0.6, filter: "blur(0px)" }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <DialogDescription>
                      Here is a quick overview of the SAAS website features :
                    </DialogDescription>
                  </motion.div>
                </DialogHeader>

                <motion.ul
                  className="list-none space-y-2 p-3 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  {helpItems.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0.3, y: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.3 }}
                      className="p-2 group hover:bg-primary hover:text-white border rounded-md text-sm md:text-base transition-all duration-500"
                    >
                      <span className="group-hover:text-lg transition-all duration-500">
                        {item.title}
                      </span>
                      <motion.div
                        className="pl-5 text-xs md:text-sm opacity-60 group-hover:opacity-100 mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 0.2 }}
                      >
                        {item.description}
                      </motion.div>
                    </motion.li>
                  ))}
                </motion.ul>

                <DialogFooter className="sticky bottom-0 z-10 p-3 border-t bg-background">
                  <motion.div
                    initial={{ opacity: 0.3, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <DialogClose asChild>
                      <button className="px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer w-full">
                        Close
                      </button>
                    </DialogClose>
                  </motion.div>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Alerts Modal */}
            <Dialog open={showAlertModal} onOpenChange={setShowAlertModal}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <motion.div
                    initial={{ opacity: 0.3, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <DialogTitle>Alerts</DialogTitle>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0.3, filter: "blur(4px)" }}
                    animate={{ opacity: 0.6, filter: "blur(0px)" }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <DialogDescription>
                      You have new notifications !
                    </DialogDescription>
                  </motion.div>
                </DialogHeader>

                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  <motion.div
                    initial={{ opacity: 0.3, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-muted rounded-sm"
                  >
                    🔔 Notification 1 : This is a sample alert.
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0.3, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="p-4 bg-muted rounded-sm"
                  >
                    🔔 Notification 2 : Another alert here.
                  </motion.div>
                </motion.div>

                <DialogFooter className="gap-3">
                  <motion.div
                    initial={{ opacity: 0.3, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="w-full"
                  >
                    <DialogClose asChild>
                      <button className="px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer w-full">
                        Cancel
                      </button>
                    </DialogClose>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0.3, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="w-full"
                  >
                    <button className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer w-full">
                      Continue
                    </button>
                  </motion.div>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* User Profile */}
            <div className="relative" ref={profileRef}>
              <motion.button
                className={cn(
                  "flex items-center gap-2 group rounded-lg transition-colors hover:bg-primary hover:text-white border cursor-pointer",
                  isCollapsed
                    ? "justify-center m-auto"
                    : "justify-between p-3 w-full",
                )}
                whileHover={{ scale: 1.02 }}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="flex items-center gap-2">
                  <CustomAvatar />
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col items-start"
                    >
                      <span className="text-sm font-medium">John Doe</span>
                      <span className="text-xs opacity-70">Admin</span>
                    </motion.div>
                  )}
                </div>
                {!isCollapsed && (
                  <Settings className="size-5 group-hover:scale-125 group-hover:rotate-360 transition-all duration-1000" />
                )}
              </motion.button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-0 mb-2 w-full bg-primary/10 backdrop-blur-lg border rounded-lg shadow-lg z-50 overflow-hidden"
                  >
                    <div
                      className={`p-3 border-b flex items-center ${
                        isCollapsed && "justify-center"
                      } gap-3`}
                    >
                      <CustomAvatar />
                      <div className={`${isCollapsed && "hidden"}`}>
                        <div className="font-medium">John Doe</div>
                        <div className="text-sm text-muted-foreground">
                          admin@example.com
                        </div>
                      </div>
                    </div>

                    <button className="w-full p-3 group hover:bg-primary hover:text-white flex items-center gap-2 cursor-pointer">
                      <User className={`${isCollapsed && "m-auto"} size-5`} />
                      <span className={`${isCollapsed && "hidden"}`}>
                        Profile
                      </span>
                    </button>

                    <button
                      className="w-full p-3 hover:bg-primary hover:text-white flex items-center gap-2 cursor-pointer"
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                    >
                      {theme === "dark" ? (
                        <Sun className={`${isCollapsed && "m-auto"} size-5`} />
                      ) : (
                        <Moon className={`${isCollapsed && "m-auto"} size-5`} />
                      )}
                      <span className={`${isCollapsed && "hidden"}`}>
                        {theme === "dark" ? "Light Mode" : "Dark Mode"}
                      </span>
                    </button>

                    <button className="w-full p-3 hover:bg-primary hover:text-white flex items-center gap-2 cursor-pointer">
                      <LogOut className={`${isCollapsed && "m-auto"} size-5`} />
                      <span className={`${isCollapsed && "hidden"}`}>
                        Log out
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container flex-1 overflow-auto px-4 py-14 md:py-20 max-w-7xl mx-auto w-full">
        <motion.h1
          className="text-2xl font-bold dark:text-white mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {menuItems.find((item) => item.path === activeItem)?.label ||
            "Dashboard"}
        </motion.h1>

        <motion.p
          className="text-muted-foreground mb-6 dark:text-zinc-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          This is the{" "}
          <strong className="text-primary">{activeItem.toUpperCase()}</strong>{" "}
          page content.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm border dark:border-zinc-700"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="h-40 bg-linear-to-tr from-primary to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-6xl font-bold text-white">{item}</div>
              </div>
              <h3 className="font-medium mb-2">Content Card {item}</h3>
              <p className="text-sm text-muted-foreground">
                This is a sample content card for demonstration purposes.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
