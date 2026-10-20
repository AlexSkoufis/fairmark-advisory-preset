"use client";

import { useEffect, useRef, useState } from "react";
import home from "@/content/home.json";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import { CheckIcon } from "../ui/Icons";
import styles from "./Process.module.css";

const { process } = home;

export default function Process() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray(`.${styles.step}`);
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
      if (!reduced) {
        gsap.fromTo(
          `.${styles.progressFill}`,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: `.${styles.steps}`, start: "top 55%", end: "bottom 55%", scrub: true },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className={`section ${styles.section} on-dark`} aria-labelledby="process-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.aside}>
          <p className="eyebrow">{process.eyebrow}</p>
          <h2 id="process-title" className={`h-section ${styles.title}`}>
            {process.titleParts.map((part, i) => (
              <span key={part} className={`${styles.word} ${i === active ? styles.wordActive : ""}`}>
                {part}{" "}
              </span>
            ))}
          </h2>
          <p className={styles.intro}>{process.intro}</p>
          <div className={styles.counter} aria-hidden="true">
            <span className={styles.counterNow}>{process.steps[active].label}</span>
            <span className={styles.counterTotal}>/ 0{process.steps.length}</span>
          </div>
        </div>

        <div className={styles.stepsWrap}>
        <span className={styles.progress} aria-hidden="true">
          <span className={styles.progressFill} />
        </span>
        <ol className={styles.steps}>
          {process.steps.map((s, i) => (
            <li key={s.key} className={`${styles.step} ${i === active ? styles.stepActive : ""}`}>
              <span className={styles.node} aria-hidden="true" />
              <span className={styles.stepLabel}>{s.label}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepText}>{s.text}</p>
              <ul className={styles.points}>
                {s.points.map((p) => (
                  <li key={p}>
                    <CheckIcon aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
