"use client";

import React, { useState } from 'react';
import { Play, Pause, Volume2, Maximize2, ArrowRight } from 'lucide-react';

export default function HeroWithVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Video background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/70 to-black"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Video placeholder - replace with actual video */}
          <div className="relative w-full max-w-4xl">
            <div className="aspect-video bg-linear-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 rounded-2xl overflow-hidden">
              {isPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-lg font-medium mb-2">🎬 Demo Video Playing</div>
                    <p className="text-white/70">This would be your product demo video</p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="group p-8 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
                  >
                    <Play className="w-16 h-16 text-white group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              )}
            </div>

            {/* Video controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              <div className="w-48 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-white"></div>
              </div>
              <button className="text-white hover:text-gray-300 transition-colors">
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4">
        <div className="max-w-7xl mx-auto w-full pt-20 pb-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Live Demo Available
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Experience the
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                Future Today
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-10 max-w-2xl">
              Watch how our platform transforms the way businesses operate. See real results
              from real companies in this interactive demo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="group px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all hover:scale-105 flex items-center justify-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                Schedule Live Demo
              </button>
            </div>

            {/* Stats overlay */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 backdrop-blur-sm bg-white/5 rounded-2xl p-8 max-w-2xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">98%</div>
                <div className="text-gray-300">Customer Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">3x</div>
                <div className="text-gray-300">Faster Development</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50%</div>
                <div className="text-gray-300">Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-300">Support Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="text-white text-center">
            <div className="text-sm mb-2">Scroll to explore</div>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center mx-auto">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}