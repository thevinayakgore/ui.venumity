"use client";
import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Scissors,
  Music,
  Video,
  Tag,
  Clock,
  MapPin,
  ImageIcon,
} from "lucide-react";

const timelineEvents = [
  {
    id: 1,
    time: "00:00",
    title: "Opening Scene",
    description: "Establishing shot of the city skyline at dawn",
    type: "video",
    duration: "0:15",
    color: "from-blue-500 to-cyan-400",
    markers: ["establishing", "dawn", "city"],
  },
  {
    id: 2,
    time: "00:15",
    title: "Main Theme Intro",
    description: "Orchestral theme music begins",
    type: "audio",
    duration: "0:30",
    color: "from-purple-500 to-pink-400",
    markers: ["music", "theme", "orchestral"],
  },
  {
    id: 3,
    time: "00:45",
    title: "Character Entrance",
    description: "Protagonist enters the scene",
    type: "video",
    duration: "0:20",
    color: "from-emerald-500 to-teal-400",
    markers: ["character", "protagonist", "entrance"],
  },
  {
    id: 4,
    time: "01:05",
    title: "Dialogue Scene",
    description: "Main conversation between characters",
    type: "video",
    duration: "1:10",
    color: "from-amber-500 to-orange-400",
    markers: ["dialogue", "conversation", "character"],
  },
  {
    id: 5,
    time: "02:15",
    title: "Action Sequence",
    description: "High-intensity chase scene",
    type: "video",
    duration: "0:45",
    color: "from-rose-500 to-red-400",
    markers: ["action", "chase", "intense"],
  },
  {
    id: 6,
    time: "03:00",
    title: "Emotional Score",
    description: "Emotional piano soundtrack",
    type: "audio",
    duration: "0:40",
    color: "from-violet-500 to-indigo-400",
    markers: ["emotional", "piano", "soundtrack"],
  },
  {
    id: 7,
    time: "03:40",
    title: "Climax Scene",
    description: "Final confrontation and resolution",
    type: "video",
    duration: "1:20",
    color: "from-blue-600 to-purple-600",
    markers: ["climax", "confrontation", "resolution"],
  },
  {
    id: 8,
    time: "05:00",
    title: "Closing Credits",
    description: "End credits with theme reprise",
    type: "video",
    duration: "0:45",
    color: "from-gray-600 to-gray-800",
    markers: ["credits", "end", "theme"],
  },
];

export default function CustomMediaComponent_4_5() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeEvent, setActiveEvent] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showMarkers, setShowMarkers] = useState(true);
  const timelineRef = useRef<HTMLDivElement>(null);
  const totalDuration = 345; // 5:45 in seconds

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          const newTime = prev + 1;

          // Update active event based on time
          const eventIndex = timelineEvents.findIndex((event) => {
            const eventTime = timeToSeconds(event.time);
            const eventEnd = eventTime + timeToSeconds(event.duration);
            return newTime >= eventTime && newTime < eventEnd;
          });

          if (eventIndex !== -1 && eventIndex !== activeEvent) {
            setActiveEvent(eventIndex);
          }

          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration, activeEvent]);

  const timeToSeconds = (timeStr: string) => {
    const [mins, secs] = timeStr.split(":").map(Number);
    return mins * 60 + secs;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * totalDuration;

    setCurrentTime(newTime);

    // Find event at this time
    const eventIndex = timelineEvents.findIndex((event) => {
      const eventTime = timeToSeconds(event.time);
      const eventEnd = eventTime + timeToSeconds(event.duration);
      return newTime >= eventTime && newTime < eventEnd;
    });

    if (eventIndex !== -1) {
      setActiveEvent(eventIndex);
    }
  };

  const getEventStyle = (event: (typeof timelineEvents)[0], index: number) => {
    const start = timeToSeconds(event.time);
    const duration = timeToSeconds(event.duration);
    const width = (duration / totalDuration) * 100;
    const left = (start / totalDuration) * 100;
    const isActive = index === activeEvent;

    return {
      width: `${width * zoomLevel}%`,
      left: `${left * zoomLevel}%`,
      zIndex: isActive ? 50 : 40,
      opacity: isActive ? 1 : 0.8,
    };
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "audio":
        return <Music className="w-4 h-4" />;
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Media Timeline Editor
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Edit and arrange media sequences visually
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all">
              <Scissors className="w-5 h-5 inline mr-2" />
              Export Project
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timeline Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-cyan-400 hover:opacity-90 text-white flex items-center justify-center transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" />
                  )}
                </button>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  {formatTime(currentTime)}
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  / {formatTime(totalDuration)}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowMarkers(!showMarkers)}
                  className={`p-2 rounded-lg ${
                    showMarkers
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <Tag className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      setZoomLevel(Math.max(0.5, zoomLevel - 0.25))
                    }
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg"
                  >
                    -
                  </button>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {zoomLevel.toFixed(1)}x
                  </span>
                  <button
                    onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.25))}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Main Timeline */}
            <div className="relative">
              {/* Time Ruler */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                {[0, 1, 2, 3, 4, 5].map((minute) => (
                  <div key={minute} className="text-center">
                    <div>{minute}:00</div>
                    <div className="h-4 border-l border-gray-300 dark:border-gray-700 mt-1" />
                  </div>
                ))}
              </div>

              {/* Timeline Track */}
              <div
                ref={timelineRef}
                onClick={handleTimelineClick}
                className="relative h-24 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer"
              >
                {/* Current Time Indicator */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-50"
                  style={{ left: `${(currentTime / totalDuration) * 100}%` }}
                >
                  <div className="absolute -top-2 -left-1.5 w-3 h-3 rounded-full bg-red-500" />
                </div>

                {/* Timeline Events */}
                {timelineEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={`absolute top-4 h-16 rounded-lg transition-all duration-300 ${
                      index === activeEvent
                        ? "shadow-lg shadow-blue-500/20 border-2 border-white dark:border-gray-800"
                        : "hover:shadow-md"
                    }`}
                    style={getEventStyle(event, index)}
                  >
                    <div
                      className={`h-full bg-linear-to-r ${event.color} rounded-lg p-3`}
                    >
                      <div className="flex items-center justify-between h-full">
                        <div className="text-white">
                          <div className="font-bold text-sm truncate">
                            {event.title}
                          </div>
                          <div className="text-xs opacity-80">
                            {event.duration}
                          </div>
                        </div>
                        <div className="text-white/80">
                          {getIcon(event.type)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Event Details */}
            {timelineEvents[activeEvent] && (
              <div className="bg-linear-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {timelineEvents[activeEvent].title}
                    </h3>
                    <div className="text-gray-600 dark:text-gray-400">
                      {timelineEvents[activeEvent].time} •{" "}
                      {timelineEvents[activeEvent].duration} •{" "}
                      {timelineEvents[activeEvent].type}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                      <Scissors className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                      <Tag className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {timelineEvents[activeEvent].description}
                </p>
                {showMarkers && (
                  <div className="flex flex-wrap gap-2">
                    {timelineEvents[activeEvent].markers.map((marker) => (
                      <span
                        key={marker}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-sm"
                      >
                        #{marker}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Project Details
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Duration
                    </span>
                  </div>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {formatTime(totalDuration)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Video className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Video Clips
                    </span>
                  </div>
                  <span className="font-medium text-gray-800 dark:text-white">
                    6
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Music className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Audio Tracks
                    </span>
                  </div>
                  <span className="font-medium text-gray800 dark:text-white">
                    2
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Markers
                    </span>
                  </div>
                  <span className="font-medium text-gray-800 dark:text-white">
                    24
                  </span>
                </div>
              </div>
            </div>

            {/* Sequence List */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Sequence List
              </h4>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {timelineEvents.map((event, index) => (
                  <button
                    key={event.id}
                    onClick={() => {
                      setActiveEvent(index);
                      setCurrentTime(timeToSeconds(event.time));
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      index === activeEvent
                        ? "bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg bg-linear-to-br ${event.color} flex items-center justify-center`}
                        >
                          {getIcon(event.type)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white">
                            {event.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {event.time} • {event.duration}
                          </div>
                        </div>
                      </div>
                      {index === activeEvent && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-xl transition-all">
                <span className="font-medium">Add New Clip</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <span className="font-medium">Split at Cursor</span>
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Navigation */}
        <div className="mt-8 flex items-center justify-center space-x-6">
          <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <SkipBack className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="flex items-center space-x-4">
            {timelineEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveEvent(index);
                  setCurrentTime(timeToSeconds(timelineEvents[index].time));
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeEvent
                    ? "bg-blue-500 scale-125"
                    : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                }`}
              />
            ))}
          </div>
          <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <SkipForward className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
