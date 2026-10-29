import React, { useEffect, useRef, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const InteractiveMouseEffect: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const glowRef = useRef<HTMLDivElement | null>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const lastSpawnTime = useRef(0);

  useEffect(() => {
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      const now = performance.now();
      // Spawn gentle bioluminescent oceanic water sparkles when moving
      if (now - lastSpawnTime.current > 45) {
        lastSpawnTime.current = now;
        const colors = [
          'rgba(29, 43, 150, 0.45)', // Ultramarine
          'rgba(135, 210, 227, 0.65)', // Cyan wave
          'rgba(70, 84, 188, 0.45)', // Deep cobalt
          'rgba(244, 190, 91, 0.55)', // Maritime gold
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        sparklesRef.current.push({
          id: Math.random(),
          x: e.clientX + (Math.random() - 0.5) * 16,
          y: e.clientY + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.3,
          size: Math.random() * 3.5 + 1.5,
          alpha: 0.85,
          color: randomColor,
        });

        if (sparklesRef.current.length > 45) {
          sparklesRef.current.shift();
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Spawn click wave ripples
      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: 0,
        color: 'rgba(29, 43, 150, 0.4)',
      };
      setRipples((prev) => [...prev.slice(-6), newRipple]);

      // Spawn burst of sparkles on click
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.5;
        const speed = Math.random() * 2.5 + 1;
        sparklesRef.current.push({
          id: Math.random(),
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4 + 2,
          alpha: 1,
          color: i % 2 === 0 ? 'rgba(29, 43, 150, 0.7)' : 'rgba(244, 190, 91, 0.8)',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    // Canvas particle loop for bioluminescent ocean spray
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      // Lerp mouse spotlight
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.14;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.14;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentPos.current.x - 220}px, ${currentPos.current.y - 220}px, 0)`;
      }

      // Draw sparkles
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = sparklesRef.current.length - 1; i >= 0; i--) {
          const s = sparklesRef.current[i];
          s.x += s.vx;
          s.y += s.vy;
          s.alpha -= 0.016;
          s.size *= 0.98;

          if (s.alpha <= 0 || s.size <= 0.2) {
            sparklesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = Math.max(0, s.alpha);
          ctx.shadowBlur = 8;
          ctx.shadowColor = s.color;
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Remove old ripples after animation
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 900);
    return () => clearTimeout(timer);
  }, [ripples]);

  return (
    <>
      {/* 1. Canvas for Bioluminescent Ocean Sparkles / Sea Dust */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      />

      {/* 2. Soft Luminous Oceanic Cursor Spotlight Following Mouse */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[440px] h-[440px] rounded-full pointer-events-none z-20 transition-opacity duration-300 will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(29, 43, 150, 0.12) 0%, rgba(135, 210, 227, 0.08) 35%, rgba(244, 190, 91, 0.04) 55%, transparent 72%)',
          mixBlendMode: 'multiply',
          filter: 'blur(12px)',
        }}
      />

      {/* 3. Concentrated Inner Water Spotlight */}
      <div
        className="fixed top-0 left-0 w-[140px] h-[140px] rounded-full pointer-events-none z-20 will-change-transform"
        style={{
          transform: `translate3d(${currentPos.current.x - 70}px, ${currentPos.current.y - 70}px, 0)`,
          background:
            'radial-gradient(circle, rgba(135, 210, 227, 0.22) 0%, rgba(29, 43, 150, 0.08) 50%, transparent 80%)',
          filter: 'blur(8px)',
        }}
      />

      {/* 4. Click Expand Wave Ripples */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full border border-[#1d2b96]/50 animate-ping pointer-events-none"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
              boxShadow: '0 0 15px rgba(29, 43, 150, 0.35)',
              animationDuration: '0.85s',
            }}
          />
        ))}
      </div>
    </>
  );
};
