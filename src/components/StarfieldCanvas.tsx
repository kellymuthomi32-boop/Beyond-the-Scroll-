import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  s: number;
  p: number;
  g: boolean;
}

export const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let rafId: number;
    let stars: Star[] = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(160, Math.floor((width * height) / 8000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.35 + Math.random() * 1.35,
        a: 0.2 + Math.random() * 0.65,
        s: 0.002 + Math.random() * 0.009,
        p: Math.random() * Math.PI * 2,
        g: Math.random() > 0.8,
      }));
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / width - 0.5) * 12;
      pointer.ty = (e.clientY / height - 0.5) * 12;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      pointer.x += (pointer.tx - pointer.x) * 0.025;
      pointer.y += (pointer.ty - pointer.y) * 0.025;

      for (const s of stars) {
        s.p += s.s;
        const a = s.a * (0.55 + 0.45 * Math.sin(s.p));
        ctx.beginPath();
        ctx.fillStyle = s.g
          ? `rgba(247, 166, 18, ${a})`
          : `rgba(176, 211, 255, ${a})`;
        ctx.arc(
          s.x + pointer.x * (s.r + 1),
          s.y + pointer.y * (s.r + 1),
          s.r,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    resize();
    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 opacity-75"
    />
  );
};
