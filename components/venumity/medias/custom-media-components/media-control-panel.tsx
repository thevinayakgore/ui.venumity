"use client";
import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Settings,
  ListMusic,
  Clock,
  Zap,
  RotateCw,
} from "lucide-react";

export default function CustomMediaComponent_4_2() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(125);
  const [volume, setVolume] = useState(85);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [equalizer, setEqualizer] = useState([60, 75, 85, 70, 65, 80, 75, 70]);
  const [activeTab, setActiveTab] = useState<"player" | "effects" | "queue">(
    "player"
  );
  const duration = 245;

  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const eqBands = [
    "60Hz",
    "150Hz",
    "400Hz",
    "1kHz",
    "2.5kHz",
    "6kHz",
    "15kHz",
    "20kHz",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            if (isLooping) return 0;
            setIsPlaying(false);
            return 0;
          }
          return prev + playbackRate;
        });
      }, 1000 / playbackRate);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, isLooping, playbackRate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEqChange = (index: number, value: number) => {
    const newEq = [...equalizer];
    newEq[index] = value;
    setEqualizer(newEq);
  };

  const [visualizerData, setVisualizerData] = useState<
    Array<{
      baseHeight: number;
      randomHeight: number;
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    const data = Array.from({ length: 32 }).map((_, i) => ({
      baseHeight: 20 + Math.sin(i * 0.5) * 15,
      randomHeight: Math.random() * 10,
      duration: 1 + Math.random(),
      delay: i * 0.05,
    }));
    setTimeout(() => {
      setVisualizerData(data);
    }, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-linear-to-br from-gray-900 to-black rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Media Control Panel
            </h2>
            <p className="text-gray-400 mt-2">
              Advanced controls for media playback
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors">
              <Settings className="w-5 h-5 inline mr-2" />
              Settings
            </button>
            <button className="px-4 py-2 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full transition-all">
              <Zap className="w-5 h-5 inline mr-2" />
              Enhance
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Player */}
          <div className="lg:col-span-2 space-y-8">
            {/* Now Playing */}
            <div className="bg-linear-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-6">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-xl bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <div className="text-4xl">🎵</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-sm text-purple-400 font-medium">
                        NOW PLAYING
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        Synthwave Dreams
                      </h3>
                      <div className="text-gray-400">
                        Retrowave • 4:05 • 2024
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ListMusic className="w-5 h-5 text-gray-400" />
                      </button>
                      <button
                        onClick={() => setIsLooping(!isLooping)}
                        className={`p-2 rounded-full transition-colors ${
                          isLooping
                            ? "text-blue-400 bg-blue-400/10"
                            : "hover:bg-white/10"
                        }`}
                      >
                        <RotateCw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Control Tabs */}
            <div className="bg-gray-900/50 rounded-2xl overflow-hidden">
              <div className="flex border-b border-gray-800">
                {["player", "effects", "queue"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() =>
                      setActiveTab(tab as "player" | "effects" | "queue")
                    }
                    className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                      activeTab === tab
                        ? "text-white border-b-2 border-blue-500"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "player" && (
                  <div className="space-y-8">
                    {/* Main Controls */}
                    <div className="flex items-center justify-center space-x-8">
                      <button className="p-4 hover:bg-white/10 rounded-full transition-colors">
                        <SkipBack className="w-6 h-6 text-gray-400" />
                      </button>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-20 h-20 rounded-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white ml-1" />
                        )}
                      </button>
                      <button className="p-4 hover:bg-white/10 rounded-full transition-colors">
                        <SkipForward className="w-6 h-6 text-gray-400" />
                      </button>
                    </div>

                    {/* Volume & Rate */}
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Volume2 className="w-5 h-5 text-gray-400" />
                            <span className="text-white">Volume</span>
                          </div>
                          <span className="text-gray-400">{volume}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) => setVolume(parseInt(e.target.value))}
                          className="w-full accent-purple-500"
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-5 h-5 text-gray-400" />
                            <span className="text-white">Playback Speed</span>
                          </div>
                          <span className="text-gray-400">{playbackRate}x</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {playbackRates.map((rate) => (
                            <button
                              key={rate}
                              onClick={() => setPlaybackRate(rate)}
                              className={`px-3 py-1.5 rounded-lg transition-all ${
                                playbackRate === rate
                                  ? "bg-blue-500 text-white"
                                  : "bg-white/5 text-gray-400 hover:bg-white/10"
                              }`}
                            >
                              {rate}x
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "effects" && (
                  <div className="space-y-6">
                    <div className="text-white font-medium mb-4">Equalizer</div>
                    <div className="flex items-end justify-between h-32 px-4">
                      {equalizer.map((value, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center space-y-2"
                        >
                          <div className="text-xs text-gray-400">
                            {eqBands[index]}
                          </div>
                          <div className="relative w-8">
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-white/10 rounded-t">
                              <div
                                className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-purple-500 to-pink-500 rounded-t transition-all duration-300"
                                style={{ height: `${value}%` }}
                              />
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={value}
                              onChange={(e) =>
                                handleEqChange(index, parseInt(e.target.value))
                              }
                              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 -rotate-90 opacity-0 cursor-pointer"
                              style={{ transformOrigin: "center" }}
                            />
                          </div>
                          <div className="text-xs text-gray-400">{value}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "queue" && (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-4 p-3 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg bg-linear-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
                          <div className="text-xl">🎵</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">
                            Track {i}
                          </div>
                          <div className="text-sm text-gray-400">
                            Artist • 3:{45 - i * 10}
                          </div>
                        </div>
                        <div className="text-gray-400 text-sm">Up Next</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Presets */}
            <div className="bg-gray-900/50 rounded-2xl p-6">
              <h4 className="text-white font-medium mb-4">Sound Presets</h4>
              <div className="space-y-3">
                {[
                  "Bass Boost",
                  "Treble Focus",
                  "Vocal Enhance",
                  "Flat",
                  "Rock",
                  "Jazz",
                  "Classical",
                  "Podcast",
                ].map((preset) => (
                  <button
                    key={preset}
                    className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-left rounded-lg transition-colors"
                  >
                    <div className="text-white font-medium">{preset}</div>
                    <div className="text-sm text-gray-400">
                      Optimized for {preset.toLowerCase()} content
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-gray-900/50 rounded-2xl p-6">
              <h4 className="text-white font-medium mb-4">Playback Stats</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Bitrate</span>
                  <span className="text-white font-medium">320 kbps</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Sample Rate</span>
                  <span className="text-white font-medium">44.1 kHz</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Channels</span>
                  <span className="text-white font-medium">Stereo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Format</span>
                  <span className="text-white font-medium">Lossless</span>
                </div>
              </div>
            </div>

            {/* Visualizer */}
            <div className="bg-gray-900/50 rounded-2xl p-6">
              <h4 className="text-white font-medium mb-4">Live Visualizer</h4>
              <div className="h-32 flex items-end justify-center space-x-1">
                {visualizerData.map((v, i) => (
                  <div
                    key={i}
                    className="w-2 bg-linear-to-t from-cyan-500 to-blue-500 rounded-t transition-all duration-300"
                    style={{
                      height: `${v.baseHeight + v.randomHeight}px`,
                      animation: `visualizer ${v.duration}s infinite ${v.delay}s alternate`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
@keyframes visualizer {
  0% { height: 20%; }
  100% { height: 100%; }
}
`}</style>
    </div>
  );
}
