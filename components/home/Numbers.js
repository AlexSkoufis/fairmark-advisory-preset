"use client";

import { useEffect, useRef } from "react";
import home from "@/content/home.json";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import styles from "./Numbers.module.css";

const { numbers } = home;
const format = (n) => Math.round(n).toLocaleString("en-US");

export default function Numbers() {
  const ref = useRef(null);

  // Final values are server rendered; the count-up only runs when motion is allowed.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const state = { v: 0 };
        el.textContent = format(0);
        gsap.to(state, {
          v: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => (el.textContent = format(state.v)),
          onComplete: () => (el.textContent = format(target)),
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className={`section ${styles.section}`} aria-labelledby="numbers-title">
      <div className="container">
        <div className={styles.head} data-reveal>
          <p className="eyebrow">{numbers.eyebrow}</p>
          <h2 id="numbers-title" className={`h-section ${styles.title}`}>
            {numbers.title}
          </h2>
        </div>
        <ul className={styles.grid}>
          {numbers.items.map((item) => (
            <li key={item.label} className={styles.item}>
              <p className={styles.value}>
                <span className="visually-hidden">
                  {item.prefix}
                  {format(item.value)}
                  {item.suffix}
                </span>
                <span aria-hidden="true">
                  {item.prefix}
                  <span data-count={item.value}>{format(item.value)}</span>
                  <span className={styles.suffix}>{item.suffix}</span>
                </span>
              </p>
              <p className={styles.label}>{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
