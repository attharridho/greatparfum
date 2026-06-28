"use client";

import React, { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;
  maxLife: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    // Randomize initial velocity
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 0.5;
    this.speedX = Math.cos(angle) * speed;
    this.speedY = Math.sin(angle) * speed;
    
    // Spark sizes
    this.size = Math.random() * 2.5 + 0.5;
    
    // Subtle, high-end colors (blues, purples, cyans to match Great Parfum's palette or Antigravity's look)
    const colors = [
      "rgba(15, 0, 64, 0.8)", // Deep Blue
      "rgba(54, 232, 20, 0.8)", // Lime Green
      "rgba(100, 150, 255, 0.8)", // Soft Light Blue
      "rgba(200, 200, 255, 0.8)", // Whiteish Blue
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    
    // Lifespan
    this.maxLife = Math.random() * 40 + 30;
    this.life = this.maxLife;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Add subtle gravity or upward drift
    this.speedY -= 0.02; // Antigravity drift upwards
    
    // Friction
    this.speedX *= 0.98;
    this.speedY *= 0.98;
    
    // Shrink size over time
    if (this.size > 0.1) {
      this.size -= 0.02;
    }
    
    this.life--;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    // Add subtle glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.restore();
  }
}

export function SparkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000, moving: false };
    let timeoutId: NodeJS.Timeout;

    const resizeCanvas = () => {
      // Use parent container size
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.moving = true;

      // Spawn a few particles on movement
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
      }

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        mouse.moving = false;
      }, 100);
    };

    // Keep particles from growing infinitely
    const MAX_PARTICLES = 150;

    const animate = () => {
      // Clear canvas with a very slight trail effect or fully clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }

      // Remove dead particles
      particles = particles.filter((p) => p.life > 0);
      
      // Cap max particles for performance
      if (particles.length > MAX_PARTICLES) {
        particles.splice(0, particles.length - MAX_PARTICLES);
      }

      // Idle subtle floating particles when mouse isn't moving
      if (!mouse.moving && Math.random() < 0.05) {
        particles.push(
          new Particle(
            Math.random() * canvas.width,
            canvas.height + 10 // spawn slightly below
          )
        );
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ display: "block" }}
    />
  );
}
