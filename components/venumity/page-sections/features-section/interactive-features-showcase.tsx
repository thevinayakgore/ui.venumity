"use client";
import { useState } from 'react';
import {
  Play,
  Pause,
  Maximize2,
  Download,
  Share2,
  Settings,
  Eye,
  Code,
  Palette,
  Zap,
} from 'lucide-react';

export default function InteractiveFeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState('editor');
  const [isPlaying, setIsPlaying] = useState(false);

  const features = [
    {
      id: 'editor',
      name: 'Code Editor',
      description: 'Advanced code editor with syntax highlighting, auto-complete, and real-time collaboration.',
      icon: Code,
      color: 'bg-blue-500',
      preview: 'Editor Preview',
    },
    {
      id: 'design',
      name: 'Design Tools',
      description: 'Powerful design tools with drag-and-drop interface and component libraries.',
      icon: Palette,
      color: 'bg-purple-500',
      preview: 'Design Preview',
    },
    {
      id: 'performance',
      name: 'Performance',
      description: 'Optimized for speed with lazy loading, code splitting, and advanced caching.',
      icon: Zap,
      color: 'bg-green-500',
      preview: 'Performance Metrics',
    },
    {
      id: 'preview',
      name: 'Live Preview',
      description: 'Instant preview of changes across all devices with hot reload capability.',
      icon: Eye,
      color: 'bg-orange-500',
      preview: 'Live Preview',
    },
  ];

  const activeFeatureData = features.find(f => f.id === activeFeature);

  return (
    <section className="py-20 px-4 bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Interactive Features Showcase
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience our powerful features in action. Click to explore each feature.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Feature Selector */}
          <div className="space-y-4">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`w-full p-6 rounded-xl text-left transition-all ${
                  activeFeature === feature.id
                    ? 'bg-white dark:bg-gray-800 shadow-lg border-l-4 border-blue-500'
                    : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800/80'
                }`}
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${feature.color} text-white mr-4`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {feature.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Feature Preview */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gray-800 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-gray-300 text-sm font-mono">
                {activeFeatureData?.preview}
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-700 rounded">
                  <Settings className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded">
                  <Share2 className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded">
                  <Maximize2 className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className={`h-64 rounded-lg ${activeFeatureData?.color} bg-opacity-20 flex items-center justify-center mb-6`}>
                <div className="text-center">
                  {activeFeatureData && (
                    <activeFeatureData.icon className="w-16 h-16 text-white mx-auto mb-4" />
                  )}
                  <div className="text-white text-lg font-medium">
                    {activeFeatureData?.preview}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-gray-300">Feature Status</div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-300">Performance</div>
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-300">Usage</div>
                  <div className="text-white">85%</div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Pause Demo
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Play Demo
                    </>
                  )}
                </button>
                <button className="px-4 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-800 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Want to Try It Yourself?
          </h3>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Get hands-on experience with our interactive demo. No installation required.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
            Launch Interactive Demo
          </button>
        </div>
      </div>
    </section>
  );
}