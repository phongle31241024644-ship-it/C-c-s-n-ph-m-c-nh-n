import React, { useEffect, useRef } from 'react';

export const AmbientBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized coordinates from -1 to 1
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetPos.current = { x: nx, y: ny };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      // Smooth lerp for liquid floating feeling
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.05;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.05;

      const { x, y } = currentPos.current;

      const orbs = containerRef.current?.querySelectorAll<HTMLElement>('.ambient-orb');
      if (orbs && orbs.length >= 4) {
        // Orb 1: Blue/Indigo top left
        orbs[0].style.transform = `translate3d(${x * 35}px, ${y * 35}px, 0)`;
        // Orb 2: Indigo/Cyan top right (reverse parallax)
        orbs[1].style.transform = `translate3d(${-x * 45}px, ${-y * 40}px, 0)`;
        // Orb 3: Blue/Teal bottom left
        orbs[2].style.transform = `translate3d(${x * 25}px, ${y * 30}px, 0)`;
        // Orb 4: Amber/Indigo center
        orbs[3].style.transform = `translate3d(${-x * 30}px, ${y * 25}px, 0)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div className="ambient-orb absolute -top-[15%] -left-[10%] w-[720px] h-[720px] rounded-full bg-gradient-to-br from-blue-300/30 via-indigo-200/25 to-transparent blur-3xl will-change-transform" />
      <div className="ambient-orb absolute top-[25%] -right-[12%] w-[680px] h-[680px] rounded-full bg-gradient-to-bl from-indigo-300/25 via-cyan-200/25 to-transparent blur-3xl will-change-transform" />
      <div className="ambient-orb absolute bottom-[10%] left-[15%] w-[800px] h-[600px] rounded-full bg-gradient-to-tr from-blue-200/35 via-teal-100/25 to-transparent blur-3xl will-change-transform" />
      <div className="ambient-orb absolute top-[65%] left-[40%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-amber-100/20 via-indigo-100/20 to-transparent blur-3xl will-change-transform" />
    </div>
  );
};

