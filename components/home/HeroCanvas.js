"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// Interactive dot field behind the hero.
export default function HeroCanvas({ className }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduced = prefersReducedMotion();
    const spacing = 26;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(0);
    }

    function draw(t) {
      ctx.clearRect(0, 0, width, height);
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        const x = i * spacing;
        for (let j = 0; j < rows; j++) {
          const y = j * spacing;
          const wave = Math.sin(x * 0.011 + t * 0.00055) * Math.cos(y * 0.013 - t * 0.00045);
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const m = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 240);
          const r = 0.8 + (wave + 1) * 0.85 + m * m * 5;
          ctx.globalAlpha = Math.min(1, 0.16 + (wave + 1) * 0.12 + m * 0.7);
          ctx.fillStyle = m > 0.05 ? "#6c5cf5" : "#8a84ab";
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    function loop(t) {
      if (visible) draw(t);
      raf = requestAnimationFrame(loop);
    }

    function onPointer(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    }

    function onLeave() {
      mouse.tx = -9999;
      mouse.ty = -9999;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let io;
    if (!reduced) {
      io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
      io.observe(canvas);
      const section = canvas.parentElement;
      section.addEventListener("pointermove", onPointer, { passive: true });
      section.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
      canvas.parentElement?.removeEventListener("pointermove", onPointer);
      canvas.parentElement?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
