"use client";

import { useEffect, useRef } from "react";
import { Sparkles, Rocket, Zap, Star, ArrowRight } from "lucide-react";

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = `rgba(${Math.random() * 100 + 155}, ${
      Math.random() * 100 + 155
    }, 255, ${Math.random() * 0.5 + 0.2})`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > this.canvas.width) this.x = 0;
    else if (this.x < 0) this.x = this.canvas.width;
    if (this.y > this.canvas.height) this.y = 0;
    else if (this.y < 0) this.y = this.canvas.height;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

export default function AnimatedParticleHeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas, ctx));
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 100, 255, ${
              0.1 * (1 - distance / 100)
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-b from-gray-900 via-black to-purple-900">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 0.5 }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Animated badges */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="animate-bounce">
              <div className="inline-flex items-center px-4 py-2 bg-linear-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered
              </div>
            </div>
            <div className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              <div className="inline-flex items-center px-4 py-2 bg-linear-to-r from-purple-500/20 to-pink-500/20 text-pink-300 rounded-full text-sm font-medium border border-pink-500/30">
                <Rocket className="w-4 h-4 mr-2" />
                Lightning Fast
              </div>
            </div>
          </div>

          {/* Main headline with typing effect */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4">
              <span className="inline-block animate-pulse">✨</span>
              <span className="block">
                Welcome to the
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 animate-gradient">
                  Future of Tech
                </span>
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Where innovation meets execution. Build, deploy, and scale your
            vision with cutting-edge technology and unparalleled support.
          </p>

          {/* CTA Buttons with hover effects */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button className="group relative px-10 py-5 bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600 text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-3">
                <Zap className="w-5 h-5 animate-pulse" />
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
            <button className="group px-10 py-5 bg-transparent border-2 border-white/30 text-white font-bold rounded-2xl hover:border-white hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center gap-3">
                <Star className="w-5 h-5" />
                View Demo
              </div>
            </button>
          </div>

          {/* Animated features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              {
                icon: "⚡",
                label: "Lightning Fast",
                desc: "Instant load times",
              },
              { icon: "🛡️", label: "Secure", desc: "Enterprise security" },
              { icon: "🌐", label: "Global", desc: "Worldwide coverage" },
              { icon: "🎯", label: "Accurate", desc: "Precision results" },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-linear-to-b from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div className="text-lg font-bold text-white mb-1">
                  {feature.label}
                </div>
                <div className="text-sm text-gray-400">{feature.desc}</div>
              </div>
            ))}
          </div>

          {/* Floating elements */}
          <div className="absolute top-20 left-10 animate-float">
            <div className="w-16 h-16 bg-linear-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl backdrop-blur-sm border border-blue-500/30 flex items-center justify-center">
              <div className="text-2xl">🚀</div>
            </div>
          </div>
          <div
            className="absolute bottom-20 right-10 animate-float"
            style={{ animationDelay: "1s" }}
          >
            <div className="w-20 h-20 bg-linear-to-r from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm border border-purple-500/30 flex items-center justify-center">
              <div className="text-3xl">💡</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
