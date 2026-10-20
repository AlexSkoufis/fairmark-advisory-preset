"use client";

import { useEffect, useRef, useState } from "react";
import home from "@/content/home.json";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { ArrowIcon, QuoteIcon } from "../ui/Icons";
import styles from "./Testimonials.module.css";

const { testimonials } = home;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const quoteRef = useRef(null);
  const first = useRef(true);
  const count = testimonials.items.length;
  const item = testimonials.items[active];

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    const tween = gsap.from(quoteRef.current.children, {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.08,
    });
    return () => tween.revert();
  }, [active]);

  const go = (dir) => setActive((a) => (a + dir + count) % count);

  return (
    <section className={`section ${styles.section}`} aria-labelledby="testimonials-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.aside} data-reveal>
          <p className="eyebrow">{testimonials.eyebrow}</p>
          <h2 id="testimonials-title" className={`h-section ${styles.title}`}>
            {testimonials.title}
          </h2>
          <ul className={styles.companies}>
            {testimonials.items.map((t, i) => (
              <li key={t.company}>
                <button
                  type="button"
                  className={styles.company}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => setActive(i)}
                >
                  {t.company}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.stage}>
          <figure className={styles.card} aria-live="polite">
            <QuoteIcon className={styles.mark} aria-hidden="true" />
            <div ref={quoteRef} className={styles.quoteWrap}>
              <blockquote className={`${styles.quote} ${item.quote.length > 420 ? styles.long : ""}`}>
                <p>{item.quote}</p>
              </blockquote>
              <figcaption className={styles.author}>
                <span className={styles.avatar} aria-hidden="true">
                  {item.company.charAt(0)}
                </span>
                <span>
                  <strong>{item.company}</strong>
                  <span>{item.role}</span>
                </span>
              </figcaption>
            </div>
          </figure>

          <div className={styles.controls}>
            <span className={styles.count} aria-hidden="true">
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <span className={styles.bar} aria-hidden="true">
              <span style={{ transform: `scaleX(${(active + 1) / count})` }} />
            </span>
            <div className={styles.arrows}>
              <button type="button" onClick={() => go(-1)} aria-label={testimonials.prev}>
                <ArrowIcon style={{ transform: "rotate(180deg)" }} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label={testimonials.next}>
                <ArrowIcon aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
