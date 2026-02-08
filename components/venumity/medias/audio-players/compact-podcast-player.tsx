"use client";
import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Clock,
  Download,
  Share2,
  Headphones,
} from "lucide-react";

export default function AudioPlayer_2_2() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(1347); // 22:27 in seconds
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const duration = 2580; // 43:00 in seconds

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

  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-linear-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
                <Headphones className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Podcast Player
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Episode 42 • Tech Talks
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Episode Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6">
                <div className="aspect-square rounded-xl overflow-hidden mb-4">
                  <div className="h-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎙️</div>
                      <div className="text-white font-bold">EP 42</div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                  Future of AI
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Exploring the latest advancements in artificial intelligence
                  and machine learning.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-400 to-indigo-500" />
                  <span>Dr. Sarah Chen</span>
                </div>
              </div>

              {/* Chapter Marks */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                  Chapters
                </h4>
                {[
                  { time: "0:00", title: "Introduction" },
                  { time: "5:30", title: "Current AI Landscape" },
                  { time: "18:45", title: "Ethical Considerations" },
                  { time: "32:10", title: "Future Predictions" },
                ].map((chapter, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          i === 1
                            ? "bg-blue-500"
                            : "bg-gray-300 dark:bg-gray-700"
                        }`}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300">
                        {chapter.title}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {chapter.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Player Controls */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {formatTime(currentTime)}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* Main Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsDownloaded(!isDownloaded)}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                  >
                    <Download
                      className={`w-5 h-5 ${
                        isDownloaded ? "text-blue-500" : "text-gray-400"
                      }`}
                    />
                  </button>
                  <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                    <Share2 className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="flex items-center space-x-6">
                  <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                    <SkipBack className="w-6 h-6 text-gray-400" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/30 flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </button>

                  <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                    <SkipForward className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <Volume2 className="w-5 h-5 text-gray-400" />
                  <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full">
                    <div className="w-3/4 h-full bg-linear-to-r from-gray-400 to-gray-600 dark:from-gray-300 dark:to-gray-500 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Playback Speed */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Playback Speed
                  </span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {playbackRate}x
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {playbackRates.map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setPlaybackRate(rate)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        playbackRate === rate
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Transcript Preview */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Live Transcript
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  &ldquo;The integration of AI in healthcare is revolutionizing
                  how we diagnose and treat diseases. Machine learning
                  algorithms can now analyze medical images with accuracy
                  surpassing human experts in certain domains...&ldquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
