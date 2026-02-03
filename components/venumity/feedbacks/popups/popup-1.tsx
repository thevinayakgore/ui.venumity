"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Shield, Trash2, User, Loader2 } from "lucide-react";
import { useState } from "react";

function PopupModal({
  isOpen,
  onClose,
  onConfirm,
  icon: Icon,
  iconClass,
  title,
  description,
  bg,
  borderClass,
  confirmClass,
  confirmLabel,
  loading,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  icon: React.ComponentType<{ className?: string }>;
  iconClass: string;
  title: string;
  description: string;
  bg: string;
  borderClass: string;
  confirmClass: string;
  confirmLabel: string;
  loading?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/30 backdrop-blur-lg z-50 flex items-center justify-center p-4 w-full"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`bg-linear-to-b ${bg} rounded-lg p-6 max-w-md overflow-hidden w-full border ${borderClass} shadow-2xl`}
          >
            <div className="flex flex-col items-center text-center mb-6">
              <Icon className={`size-14 p-3 rounded-sm mb-4 ${iconClass}`} />
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
            {children && <div className="mb-4">{children}</div>}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 cursor-pointer bg-foreground rounded-sm text-secondary font-medium hover:scale-105 transition-all duration-500"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 py-3 cursor-pointer rounded-sm text-white font-medium hover:scale-105 transition-all duration-500 flex items-center justify-center gap-2 ${confirmClass}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin size-5" />
                    <span>Loading...</span>
                  </>
                ) : (
                  confirmLabel
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Popup1() {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [loadingLogout, setLoadingLogout] = useState(false);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="grid grid-cols-2 items-center justify-center m-auto gap-4 p-6 sm:p-10 md:py-14 max-w-7xl"
    >
      {/* Delete Popup */}
      <button
        onClick={() => setActivePopup("delete")}
        className="cursor-pointer px-6 py-4 bg-linear-to-tl from-red-500 to-pink-400 text-white rounded-sm font-medium hover:scale-105 transition-all duration-500 w-52"
      >
        Delete Popup{" "}
      </button>
      <PopupModal
        isOpen={activePopup === "delete"}
        onClose={() => setActivePopup(null)}
        onConfirm={() => {
          console.log("Item deleted");
          setActivePopup(null);
        }}
        icon={Trash2}
        iconClass="text-red-500 bg-red-500/15"
        title="Delete Item"
        description="Are you sure you want to delete this item ? This action cannot be undone."
        bg="from-background via-background to-red-500/30"
        borderClass="border-red-500/60"
        confirmClass="bg-red-500 hover:bg-red-600"
        confirmLabel="Delete"
      />

      {/* Logout Popup */}
      <button
        onClick={() => setActivePopup("logout")}
        className="cursor-pointer px-6 py-4 bg-linear-to-tl from-orange-500 to-yellow-400 text-white rounded-sm font-medium hover:scale-105 transition-all duration-500 w-52"
      >
        Logout Popup
      </button>
      <PopupModal
        isOpen={activePopup === "logout"}
        onClose={() => setActivePopup(null)}
        onConfirm={() => {
          setLoadingLogout(true);
          setTimeout(() => {
            console.log("User logged out");
            setLoadingLogout(false);
            setActivePopup(null);
          }, 4000);
        }}
        icon={User}
        iconClass="text-orange-500 bg-orange-500/15"
        title="Logout"
        description="Are you sure you want to logout ? You will need to sign in again to access your account."
        bg="from-background via-background to-orange-500/30"
        borderClass="border-orange-500/60"
        confirmClass="bg-orange-500 hover:bg-orange-600"
        confirmLabel="Logout"
        loading={loadingLogout}
      />

      <button
        onClick={() => setActivePopup("settings")}
        className="cursor-pointer px-6 py-4 bg-linear-to-tl from-blue-500 to-cyan-400 text-white rounded-sm font-medium hover:scale-105 transition-all duration-500 w-52"
      >
        Settings Popup
      </button>
      <PopupModal
        isOpen={activePopup === "settings"}
        onClose={() => setActivePopup(null)}
        onConfirm={() => {
          console.log("Settings applied");
          setActivePopup(null);
        }}
        icon={Settings}
        iconClass="text-blue-500 bg-blue-500/15"
        title="Apply Changes"
        description="Do you want to save these settings? Some changes may require a page refresh."
        bg="from-background via-background to-blue-500/30"
        borderClass="border-blue-500/60"
        confirmClass="bg-blue-500 hover:bg-blue-600"
        confirmLabel="Apply"
      >
        <ul className="p-4 pl-8 border border-blue-500/70 bg-blue-500/10 backdrop-blur-lg rounded-sm text-sm opacity-70 mb-3 list-decimal space-y-1">
          <li>Updates will take effect immediately.</li>
          <li>Some settings may restart the app.</li>
          <li>Requires page refresh for full changes.</li>
          <li>Apply only when you are sure.</li>
        </ul>
      </PopupModal>

      <button
        onClick={() => setActivePopup("security")}
        className="cursor-pointer px-6 py-4 bg-linear-to-tl from-green-500 to-teal-400 text-white rounded-sm font-medium hover:scale-105 transition-all duration-500 w-52"
      >
        Security Popup
      </button>
      <PopupModal
        isOpen={activePopup === "security"}
        onClose={() => setActivePopup(null)}
        onConfirm={() => {
          console.log("Security action confirmed");
          setActivePopup(null);
        }}
        icon={Shield}
        iconClass="text-green-500 bg-green-500/15"
        title="Security Action"
        description="This action requires additional security confirmation. Please verify your identity."
        bg="from-background via-background to-green-500/30"
        borderClass="border-green-500/60"
        confirmClass="bg-green-500 hover:bg-green-600"
        confirmLabel="Verify"
      >
        <input
          type="password"
          placeholder="********"
          className="w-full px-4 py-3 bg-background border border-green-500/50 rounded-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
        />
      </PopupModal>
    </motion.main>
  );
}
