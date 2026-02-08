"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  QrCode,
  Download,
  Share2,
  Copy,
  Check,
  Phone,
  Mail,
  MapPin,
  Globe,
  Building,
  Calendar,
} from "lucide-react";

export default function ProfileCardWithQR() {
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<"profile" | "qr">("profile");
  const [qrGrid, setQrGrid] = useState<boolean[]>(Array(64).fill(false));

  useEffect(() => {
    setTimeout(() => {
      setQrGrid(Array.from({ length: 64 }, () => Math.random() > 0.5));
    }, 0);
  }, []);

  const profile = {
    name: "Michael Rodriguez",
    title: "CTO & Co-founder",
    company: "InnovateTech",
    location: "Austin, TX",
    phone: "+1 (555) 123-4567",
    email: "michael@innovatetech.com",
    website: "innovatetech.com/michael",
    linkedin: "linkedin.com/in/michaelrodriguez",
    bio: "Technology leader with 15+ years experience building scalable software solutions. Passionate about innovation and team development.",
    joinDate: "March 2020",
    employees: "45",
    projects: "120+",
  };

  const qrCodeValue = `BEGIN:VCARD
VERSION:3.0
N:Rodriguez;Michael;;;
FN:Michael Rodriguez
ORG:InnovateTech
TITLE:CTO & Co-founder
TEL;TYPE=WORK,VOICE:${profile.phone}
EMAIL:${profile.email}
URL:${profile.website}
ADR;TYPE=WORK:;;Austin, TX
NOTE:${profile.bio}
END:VCARD`;

  const copyVCard = () => {
    navigator.clipboard.writeText(qrCodeValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadVCard = () => {
    const element = document.createElement("a");
    const file = new Blob([qrCodeValue], { type: "text/vcard" });
    element.href = URL.createObjectURL(file);
    element.download = "michael-rodriguez.vcf";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* View Toggle */}
          <div className="border-b border-gray-200 dark:border-gray-800">
            <div className="flex">
              <button
                onClick={() => setActiveView("profile")}
                className={`flex-1 py-4 text-center font-medium ${
                  activeView === "profile"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveView("qr")}
                className={`flex-1 py-4 text-center font-medium ${
                  activeView === "qr"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
              >
                QR Code
              </button>
            </div>
          </div>

          <div className="p-8">
            {activeView === "profile" ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Profile */}
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-24 h-24 bg-linear-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">MR</span>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {profile.name}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {profile.title}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Building size={16} />
                          {profile.company}
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <MapPin size={16} />
                          {profile.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-8">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                      About
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {profile.bio}
                    </p>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          <Phone
                            size={18}
                            className="text-blue-600 dark:text-blue-300"
                          />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Phone
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {profile.phone}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                          <Mail
                            size={18}
                            className="text-green-600 dark:text-green-300"
                          />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Email
                          </div>
                          <a
                            href={`mailto:${profile.email}`}
                            className="font-medium text-gray-900 dark:text-white"
                          >
                            {profile.email}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                          <Globe
                            size={18}
                            className="text-purple-600 dark:text-purple-300"
                          />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Website
                          </div>
                          <a
                            href={`https://${profile.website}`}
                            className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                          >
                            {profile.website}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                          <Calendar
                            size={18}
                            className="text-orange-600 dark:text-orange-300"
                          />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Joined
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {profile.joinDate}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Stats & Actions */}
                <div className="space-y-6">
                  {/* Stats */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                      Company Stats
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">
                          Employees
                        </span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {profile.employees}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">
                          Projects
                        </span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {profile.projects}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">
                          Founded
                        </span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          2018
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* QR Preview */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-linear-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                      <QrCode size={48} className="text-gray-600" />
                    </div>
                    <button
                      onClick={() => setActiveView("qr")}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                    >
                      View QR Code →
                    </button>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={downloadVCard}
                      className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <Download size={18} />
                      Download vCard
                    </button>
                    <button
                      onClick={copyVCard}
                      className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                      {copied ? "Copied" : "Copy vCard"}
                    </button>
                    <button className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center gap-2">
                      <Share2 size={18} />
                      Share Profile
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* QR Code View */
              <div className="max-w-md mx-auto text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Scan to Connect
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Scan this QR code to save contact information
                </p>

                {/* QR Code Display */}
                <div className="mb-8">
                  <div className="w-64 h-64 mx-auto bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl p-4">
                    <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                      <div className="relative">
                        <div className="grid grid-cols-8 gap-1">
                          {[...Array(64)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-4 h-4 ${
                                qrGrid[i] ? "bg-gray-900" : "bg-transparent"
                              } rounded-sm`}
                            />
                          ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold">MR</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info in QR View */}
                <div className="mb-8">
                  <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {profile.name}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 mb-4">
                    {profile.title}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {profile.company} • {profile.location}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveView("profile")}
                    className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Back to Profile
                  </button>
                  <button
                    onClick={downloadVCard}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.main>
  );
}
