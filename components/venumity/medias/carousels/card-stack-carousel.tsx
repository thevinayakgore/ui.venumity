"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MoveRight,
  BookOpen,
  Sparkles,
  Zap,
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Advanced React Patterns",
    instructor: "Sarah Chen",
    duration: "12 hours",
    students: "2.4K",
    level: "Advanced",
    color: "from-blue-500 to-cyan-400",
    icon: "⚛️",
  },
  {
    id: 2,
    title: "UI/UX Masterclass",
    instructor: "Alex Rivera",
    duration: "18 hours",
    students: "3.1K",
    level: "Intermediate",
    color: "from-purple-500 to-pink-400",
    icon: "🎨",
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    instructor: "Dr. Michael Wong",
    duration: "24 hours",
    students: "4.2K",
    level: "Beginner",
    color: "from-emerald-500 to-teal-400",
    icon: "📊",
  },
  {
    id: 4,
    title: "DevOps & Cloud Native",
    instructor: "Priya Sharma",
    duration: "16 hours",
    students: "1.8K",
    level: "Intermediate",
    color: "from-amber-500 to-orange-400",
    icon: "☁️",
  },
  {
    id: 5,
    title: "Mobile App Development",
    instructor: "James Wilson",
    duration: "20 hours",
    students: "2.9K",
    level: "Intermediate",
    color: "from-violet-500 to-indigo-400",
    icon: "📱",
  },
  {
    id: 6,
    title: "AI & Machine Learning",
    instructor: "Dr. Elena Rodriguez",
    duration: "30 hours",
    students: "3.7K",
    level: "Advanced",
    color: "from-rose-500 to-red-400",
    icon: "🧠",
  },
];

export default function Carousel_3_3() {
  const [stackIndex, setStackIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const dragStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleCards = 4;
  const cardWidth = 320;
  const cardGap = 24;

  const nextCard = () => {
    setStackIndex((prev) => (prev + 1) % courses.length);
  };

  const prevCard = () => {
    setStackIndex((prev) => (prev - 1 + courses.length) % courses.length);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
  };

  const handleDragMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!dragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const delta = clientX - dragStartX.current;
      setDragOffset(delta);
    },
    [dragging, dragStartX]
  );

  const handleDragEnd = () => {
    if (!dragging) return;

    setDragging(false);

    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) {
        prevCard();
      } else {
        nextCard();
      }
    }

    setDragOffset(0);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (dragging) {
        setDragging(false);
        setDragOffset(0);
      }
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (dragging) {
        handleDragMove(e as unknown as React.MouseEvent);
      }
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("touchend", handleGlobalMouseUp);
    window.addEventListener("touchmove", (e) =>
      handleDragMove(e as unknown as React.TouchEvent)
    );

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("touchend", handleGlobalMouseUp);
      window.removeEventListener("touchmove", (e) =>
        handleDragMove(e as unknown as React.TouchEvent)
      );
    };
  }, [dragging, handleDragMove]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRotate) {
      interval = setInterval(nextCard, 4000);
    }
    return () => clearInterval(interval);
  }, [autoRotate, stackIndex]);

  const getCardStyle = (index: number) => {
    const position = (index - stackIndex + courses.length) % courses.length;
    const isVisible = position < visibleCards;

    if (!isVisible)
      return { opacity: 0, transform: "translateX(100px) scale(0.8)" };

    const scale = 1 - position * 0.1;
    const xOffset = position * (cardWidth + cardGap);
    const zIndex = 100 - position;
    const opacity = 1 - position * 0.2;
    const rotateY = position * -5;

    return {
      transform: `translateX(${
        xOffset + dragOffset
      }px) scale(${scale}) rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
      cursor: position === 0 ? "grab" : "default",
    };
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Featured Courses
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Swipe or drag to browse the stack
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
                autoRotate
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                Auto {autoRotate ? "On" : "Off"}
              </span>
            </button>
            <button className="px-6 py-2 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all flex items-center space-x-2">
              <span>View All</span>
              <MoveRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative h-[500px]">
          <div
            ref={containerRef}
            className="absolute left-0 top-0 h-full w-full overflow-visible"
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            onMouseUp={handleDragEnd}
            onTouchEnd={handleDragEnd}
          >
            {/* Cards Stack */}
            {courses.map((course, index) => (
              <div
                key={course.id}
                className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-out ${
                  dragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                style={getCardStyle(index)}
              >
                <div
                  className={`w-80 h-96 rounded-2xl bg-linear-to-br ${course.color} p-6 shadow-2xl`}
                >
                  {/* Course Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="text-4xl mb-2">{course.icon}</div>
                      <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                        <span className="text-white text-sm font-medium">
                          {course.level}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        {course.duration}
                      </div>
                      <div className="text-white/80 text-sm">Duration</div>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {course.title}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {course.instructor}
                        </div>
                        <div className="text-white/80 text-sm">Instructor</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          <span className="text-white text-sm">
                            {course.students} enrolled
                          </span>
                        </div>
                        <button className="px-6 py-2 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
            <button
              onClick={prevCard}
              className="w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white" />
            </button>
            <button
              onClick={nextCard}
              className="w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white" />
            </button>
          </div>

          {/* Drag Hint */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <Zap className="w-4 h-4" />
            <span className="text-sm">Drag or swipe to navigate</span>
          </div>
        </div>

        {/* Course Indicators */}
        <div className="mt-12">
          <div className="flex items-center justify-center space-x-4">
            {courses.map((course, index) => (
              <button
                key={course.id}
                onClick={() => setStackIndex(index)}
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                  index === stackIndex
                    ? "bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800/50"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    index === stackIndex
                      ? "bg-blue-500"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />
                <div className="text-left">
                  <div className="font-medium text-gray-800 dark:text-white">
                    {course.title}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {course.instructor}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
