"use client";

import { useEffect, useRef } from "react";
import home from "@/content/home.json";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import styles from "./Problem.module.css";

const { problem } = home;
const MARKET = (100 / 140) * 100;

export default function Problem() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: chartRef.current, start: "top 75%", end: "bottom 45%", scrub: 0.8 },
      });
      tl.from(`.${styles.barTypical}`, { scaleX: 0, ease: "none" })
        .from(`.${styles.barMarket}`, { scaleX: 0, ease: "none" }, "<0.15")
        .from(`.${styles.barGap}`, { scaleX: 0, ease: "none" })
        .from(`.${styles.gapTag}`, { autoAlpha: 0, y: 12, ease: "none" }, "<0.3");
    }, chartRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`section ${styles.section}`} aria-labelledby="problem-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy} data-reveal>
          <p className="eyebrow">{problem.eyebrow}</p>
          <h2 id="problem-title" className={`h-section ${styles.title}`}>
            {problem.title}
          </h2>
          {problem.body.map((p) => (
            <p key={p} className={styles.body}>
              {p}
            </p>
          ))}
        </div>

        <div className={styles.side}>
          <figure ref={chartRef} className={styles.chart}>
            <figcaption className={styles.chartTitle}>{problem.chart.title}</figcaption>
            <div className={styles.rows}>
              <div className={styles.row}>
                <span className={styles.rowLabel}>{problem.chart.typical.label}</span>
                <div className={styles.track}>
                  <span className={styles.barTypical}>
                    <span className={styles.barText}>{problem.chart.typical.value}</span>
                  </span>
                </div>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>{problem.chart.market.label}</span>
                <div className={styles.track}>
                  <span className={styles.barMarket} style={{ width: `${MARKET}%` }}>
                    <span className={styles.barText}>{problem.chart.market.value}</span>
                  </span>
                  <span className={styles.barGap} style={{ left: `${MARKET}%`, width: `${100 - MARKET}%` }} />
                  <span className={styles.gapTag} style={{ left: `${MARKET}%` }}>
                    {problem.chart.gap.label}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.axis} aria-hidden="true">
              {problem.chart.axis.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
          </figure>

          <ul className={styles.compare} data-reveal="stagger">
            {problem.compare.map((c, i) => (
              <li key={c.who} className={i === 1 ? styles.us : ""}>
                <span className={styles.who}>{c.who}</span>
                <p>{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
