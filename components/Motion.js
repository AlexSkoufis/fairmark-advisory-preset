"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion, setLenis } from "@/lib/motion";

/*
  Global motion layer:
  - Lenis smooth scrolling, synced with GSAP ScrollTrigger
  - [data-reveal] scroll reveals (content stays visible without JS)
  - [data-parallax] subtle parallax
  - [data-spotlight] pointer-follow highlight on cards
*/
export default function Motion() {
  useEffect(() => {
    const reduced = prefersReducedMotion();
    let lenis = null;
    let tick = null;

    if (!reduced) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Smooth in-page anchor links
      document.addEventListener("click", onAnchorClick);
    }

    function onAnchorClick(e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link || !lenis) return;
      const id = link.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -90 });
      history.replaceState(null, "", id);
    }

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        const children = el.dataset.reveal === "stagger" ? el.children : [el];
        gsap.from(children, {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax) || 60;
        gsap.fromTo(
          el,
          { y: amount },
          {
            y: -amount,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    });

    function onPointerMove(e) {
      const card = e.target.closest?.("[data-spotlight]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    }
    document.addEventListener("pointermove", onPointerMove, { passive: true });

    // Recalculate trigger positions once fonts and images settle
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      ctx.revert();
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("load", refresh);
      if (tick) gsap.ticker.remove(tick);
      if (lenis) {
        lenis.destroy();
        setLenis(null);
      }
    };
  }, []);

  return null;
}
