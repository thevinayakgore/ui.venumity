"use client";
import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Settings,
  SkipBack,
  SkipForward,
  Captions,
  PictureInPicture,
} from "lucide-react";

export default function VideoPlayer_9_1() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + playbackRate;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, playbackRate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    setCurrentTime(percent * duration);
  };

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    setIsFullscreen(!isFullscreen);
  };

  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div
      className={`${
        isFullscreen ? "fixed inset-0 z-50 bg-black" : "max-w-7xl mx-auto p-6"
      }`}
    >
      <div
        ref={playerRef}
        className={`${
          isFullscreen ? "h-screen" : "rounded-3xl shadow-2xl"
        } bg-white dark:bg-gray-900 overflow-hidden`}
      >
        <div className="p-8">
          {!isFullscreen && (
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Advanced Video Player
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Professional controls and settings
                </p>
              </div>
              <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all">
                Upload Video
              </button>
            </div>
          )}

          {/* Video Container */}
          <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-purple-900 to-pink-900">
            {/* Video Area */}
            <div className="aspect-video relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-6">🎬</div>
                  {!isPlaying && (
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center"
                    >
                      <Play className="w-12 h-12 text-white ml-2" />
                    </button>
                  )}
                </div>
              </div>

              {/* Captions */}
              {showCaptions && (
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-white text-center">
                    This is an example caption text
                  </div>
                </div>
              )}

              {/* Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6">
                {/* Progress Bar */}
                <div className="mb-4">
                  <div
                    onClick={handleProgressClick}
                    className="h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer"
                  >
                    <div
                      className="h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-white/80 text-sm mt-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white ml-1" />
                      )}
                    </button>

                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center">
                      <SkipBack className="w-5 h-5 text-white" />
                    </button>

                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center">
                      <SkipForward className="w-5 h-5 text-white" />
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center"
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5 text-white" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-white" />
                        )}
                      </button>
                      {!isMuted && (
                        <div className="w-32">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) =>
                              setVolume(parseInt(e.target.value))
                            }
                            className="w-full accent-white"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setShowCaptions(!showCaptions)}
                      className={`w-10 h-10 rounded-full ${
                        showCaptions ? "bg-purple-500/30" : "bg-white/20"
                      } backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center`}
                    >
                      <Captions className="w-5 h-5 text-white" />
                    </button>

                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center">
                      <PictureInPicture className="w-5 h-5 text-white" />
                    </button>

                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center"
                    >
                      <Settings className="w-5 h-5 text-white" />
                    </button>

                    <button
                      onClick={toggleFullscreen}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center"
                    >
                      <Maximize2 className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Settings Panel */}
              {showSettings && (
                <div className="absolute bottom-24 right-6 bg-black/80 backdrop-blur-sm rounded-xl p-4 w-48">
                  <div className="space-y-4">
                    <div>
                      <div className="text-white text-sm font-medium mb-2">
                        Playback Speed
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {playbackRates.map((rate) => (
                          <button
                            key={rate}
                            onClick={() => setPlaybackRate(rate)}
                            className={`px-3 py-1 rounded text-sm ${
                              playbackRate === rate
                                ? "bg-purple-500 text-white"
                                : "bg-white/10 text-white/80 hover:bg-white/20"
                            }`}
                          >
                            {rate}x
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium mb-2">
                        Quality
                      </div>
                      <div className="space-y-1">
                        {["Auto", "1080p", "720p", "480p"].map((quality) => (
                          <button
                            key={quality}
                            className="w-full text-left px-3 py-2 rounded text-sm text-white/80 hover:bg-white/10"
                          >
                            {quality}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Video Info */}
          {!isFullscreen && (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Mountain Adventure Documentary
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Join us on an epic journey through the Swiss Alps. This
                  documentary captures the raw beauty of nature.
                </p>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Live • 2.4K watching
                    </span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">•</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    3:00 duration
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Format
                  </span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    MP4 • 1080p
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Size</span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    245 MB
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Bitrate
                  </span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    8 Mbps
                  </span>
                </div>
                <button className="w-full py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-lg font-medium transition-all">
                  Download Video
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
