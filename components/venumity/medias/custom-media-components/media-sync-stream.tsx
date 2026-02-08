"use client";
import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RefreshCw,
  Wifi,
  Cloud,
  Download,
  Upload,
  Zap,
  Shield,
  Users,
  Globe,
} from "lucide-react";

export default function CustomMediaComponent_4_4() {
  const [syncStatus, setSyncStatus] = useState<
    "synced" | "syncing" | "pending"
  >("synced");
  const [streamQuality, setStreamQuality] = useState<
    "auto" | "low" | "medium" | "high"
  >("auto");
  const [isStreaming, setIsStreaming] = useState(true);
  const [bufferProgress, setBufferProgress] = useState(85);
  const [connectionStrength] = useState(95);
  const [devices] = useState([
    {
      id: 1,
      name: "Living Room TV",
      type: "tv",
      status: "active",
      lastSync: "2 min ago",
    },
    {
      id: 2,
      name: "Mobile Phone",
      type: "phone",
      status: "active",
      lastSync: "Just now",
    },
    {
      id: 3,
      name: "Office Desktop",
      type: "desktop",
      status: "inactive",
      lastSync: "5 hours ago",
    },
    {
      id: 4,
      name: "Tablet",
      type: "tablet",
      status: "syncing",
      lastSync: "Syncing...",
    },
  ]);

  const [mediaLibrary] = useState({
    total: 2456,
    synced: 2341,
    remaining: 115,
    size: "48.7 GB",
  });

  const streamQualities = [
    { id: "auto", label: "Auto (Adaptive)", bitrate: "Dynamic" },
    { id: "low", label: "Low (480p)", bitrate: "1.5 Mbps" },
    { id: "medium", label: "Medium (720p)", bitrate: "3 Mbps" },
    { id: "high", label: "High (1080p)", bitrate: "5 Mbps" },
  ];

  useEffect(() => {
    if (syncStatus === "syncing") {
      const interval = setInterval(() => {
        setBufferProgress((prev) => {
          if (prev >= 100) {
            setSyncStatus("synced");
            return 100;
          }
          return prev + 5;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [syncStatus]);

  const startSync = () => {
    setSyncStatus("syncing");
    setBufferProgress(0);
  };

  const toggleStreaming = () => {
    setIsStreaming(!isStreaming);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-linear-to-br from-gray-900 to-black rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Media Sync & Stream
            </h2>
            <p className="text-gray-400 mt-2">
              Sync across devices and stream seamlessly
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full">
              <div
                className={`w-2 h-2 rounded-full ${
                  syncStatus === "synced"
                    ? "bg-green-500"
                    : syncStatus === "syncing"
                    ? "bg-blue-500 animate-pulse"
                    : "bg-amber-500"
                }`}
              />
              <span className="text-white text-sm">
                {syncStatus === "synced"
                  ? "All Synced"
                  : syncStatus === "syncing"
                  ? "Syncing..."
                  : "Sync Pending"}
              </span>
            </div>
            <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all">
              <Cloud className="w-5 h-5 inline mr-2" />
              Cloud Settings
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Streaming Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Streaming Status */}
            <div className="bg-linear-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Live Streaming
                  </h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isStreaming
                          ? "bg-green-500 animate-pulse"
                          : "bg-gray-500"
                      }`}
                    />
                    <span className="text-gray-400">
                      {isStreaming
                        ? "Streaming to 3 devices"
                        : "Streaming paused"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={toggleStreaming}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    isStreaming
                      ? "bg-linear-to-r from-amber-500 to-orange-500 hover:opacity-90 text-white"
                      : "bg-linear-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white"
                  }`}
                >
                  {isStreaming ? (
                    <>
                      <Pause className="w-5 h-5 inline mr-2" />
                      Pause Stream
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 inline mr-2" />
                      Start Stream
                    </>
                  )}
                </button>
              </div>

              {/* Buffer & Connection */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-white">Buffer Progress</span>
                    </div>
                    <span className="text-gray-400">{bufferProgress}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300"
                      style={{ width: `${bufferProgress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wifi className="w-5 h-5 text-emerald-500" />
                      <span className="text-white">Connection Strength</span>
                    </div>
                    <span className="text-gray-400">{connectionStrength}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-emerald-500 to-teal-400 rounded-full"
                      style={{ width: `${connectionStrength}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sync Progress */}
            <div className="bg-linear-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Media Sync Progress
                  </h3>
                  <div className="text-gray-400 mt-2">
                    {mediaLibrary.synced} of {mediaLibrary.total} files synced (
                    {mediaLibrary.size})
                  </div>
                </div>
                <button
                  onClick={startSync}
                  disabled={syncStatus === "syncing"}
                  className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white rounded-full font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw
                    className={`w-5 h-5 inline mr-2 ${
                      syncStatus === "syncing" ? "animate-spin" : ""
                    }`}
                  />
                  {syncStatus === "syncing" ? "Syncing..." : "Start Sync"}
                </button>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Photos & Videos</span>
                    <span className="text-white">92% • 1,842 files</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-blue-500 to-cyan-400 rounded-full"
                      style={{ width: "92%" }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Music Library</span>
                    <span className="text-white">87% • 324 files</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-purple-500 to-pink-400 rounded-full"
                      style={{ width: "87%" }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Documents</span>
                    <span className="text-white">96% • 175 files</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-emerald-500 to-teal-400 rounded-full"
                      style={{ width: "96%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Connected Devices */}
            <div className="bg-gray-900/50 rounded-2xl p-6">
              <h4 className="text-white font-medium mb-4 flex items-center justify-between">
                <span>Connected Devices</span>
                <Users className="w-5 h-5 text-gray-400" />
              </h4>
              <div className="space-y-3">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          device.type === "tv"
                            ? "bg-blue-500/20"
                            : device.type === "phone"
                            ? "bg-purple-500/20"
                            : device.type === "desktop"
                            ? "bg-emerald-500/20"
                            : "bg-amber-500/20"
                        }`}
                      >
                        <div className="text-xl">
                          {device.type === "tv"
                            ? "📺"
                            : device.type === "phone"
                            ? "📱"
                            : device.type === "desktop"
                            ? "💻"
                            : "⌚"}
                        </div>
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {device.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {device.lastSync}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        device.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : device.status === "syncing"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {device.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stream Quality */}
            <div className="bg-gray-900/50 rounded-2xl p-6">
              <h4 className="text-white font-medium mb-4 flex items-center justify-between">
                <span>Stream Quality</span>
                <Zap className="w-5 h-5 text-gray-400" />
              </h4>
              <div className="space-y-3">
                {streamQualities.map((quality) => (
                  <button
                    key={quality.id}
                    onClick={() =>
                      setStreamQuality(
                        quality.id as "auto" | "low" | "medium" | "high"
                      )
                    }
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      streamQuality === quality.id
                        ? "bg-linear-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">
                          {quality.label}
                        </div>
                        <div className="text-sm text-gray-400">
                          {quality.bitrate}
                        </div>
                      </div>
                      {streamQuality === quality.id && (
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Security & Info */}
            <div className="bg-gray-900/50 rounded-2xl p-6">
              <h4 className="text-white font-medium mb-4 flex items-center justify-between">
                <span>Security Status</span>
                <Shield className="w-5 h-5 text-gray-400" />
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Encryption</span>
                  <span className="text-emerald-400 font-medium">AES-256</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">VPN</span>
                  <span className="text-emerald-400 font-medium">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Region</span>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-white font-medium">Auto</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-linear-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <Download className="w-8 h-8 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-white">42.5 Mbps</div>
                <div className="text-gray-400">Download Speed</div>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <Upload className="w-8 h-8 text-purple-400" />
              <div>
                <div className="text-2xl font-bold text-white">18.2 Mbps</div>
                <div className="text-gray-400">Upload Speed</div>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-emerald-500/10 to-teal-500/10 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <Cloud className="w-8 h-8 text-emerald-400" />
              <div>
                <div className="text-2xl font-bold text-white">15 ms</div>
                <div className="text-gray-400">Latency</div>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <Zap className="w-8 h-8 text-amber-400" />
              <div>
                <div className="text-2xl font-bold text-white">99.8%</div>
                <div className="text-gray-400">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
