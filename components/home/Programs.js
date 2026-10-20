"use client";

import { useEffect, useRef, useState } from "react";
import home from "@/content/home.json";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import Button from "../ui/Button";
import { ArrowIcon } from "../ui/Icons";
import styles from "./Programs.module.css";

const { programs } = home;

export default function Programs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const panelRefs = useRef([]);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    const panel = panelRefs.current[active];
    const tween = gsap.from(panel.querySelectorAll("[data-anim]"), {
      y: 24,
      autoAlpha: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.05,
    });
    return () => tween.revert();
  }, [active]);

  function onKeyDown(e) {
    const count = programs.items.length;
    let next = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (active + 1) % count;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (active - 1 + count) % count;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = count - 1;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  }

  return (
    <section id="programs" className={`section ${styles.section}`} aria-labelledby="programs-title">
      <div className="container">
        <div className={styles.head} data-reveal>
          <p className="eyebrow">{programs.eyebrow}</p>
          <h2 id="programs-title" className={`h-section ${styles.title}`}>
            {programs.title}
          </h2>
        </div>

        <div className={styles.layout}>
          <div className={styles.picker}>
            <p className={styles.question} id="programs-question">
              {programs.question}
            </p>
            <div role="tablist" aria-labelledby="programs-question" aria-orientation="vertical" className={styles.tabs}>
              {programs.items.map((item, i) => (
                <button
                  key={item.key}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`tab-${item.key}`}
                  aria-selected={active === i}
                  aria-controls={`panel-${item.key}`}
                  tabIndex={active === i ? 0 : -1}
                  className={styles.tab}
                  onClick={() => setActive(i)}
                  onKeyDown={onKeyDown}
                >
                  <span className={styles.tabIndex}>0{i + 1}</span>
                  <span className={styles.tabText}>
                    <span className={styles.tabSituation}>{item.situation}</span>
                    <span className={styles.tabName}>{item.name}</span>
                  </span>
                  <ArrowIcon className={styles.tabArrow} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.panels}>
            {programs.items.map((item, i) => (
              <div
                key={item.key}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                role="tabpanel"
                id={`panel-${item.key}`}
                aria-labelledby={`tab-${item.key}`}
                hidden={active !== i}
                className={styles.panel}
                data-spotlight
              >
                <div className={styles.panelTop}>
                  <p className={styles.panelEyebrow} data-anim>
                    {programs.eyebrow} 0{i + 1}
                  </p>
                  <h3 className={styles.panelName} data-anim>
                    {item.name}
                  </h3>
                  <p className={styles.summary} data-anim>
                    {item.summary}
                  </p>
                </div>

                <div className={styles.tiersBlock}>
                  <p className={styles.tiersHeading} data-anim>
                    {item.tiersHeading}
                  </p>
                  <ul className={styles.tiers}>
                    {item.tiers.map((t) => (
                      <li key={t.name} data-anim>
                        <strong>{t.name}</strong>
                        <span>{t.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className={styles.note} data-anim>
                  {item.note}
                </p>

                <div className={styles.actions} data-anim>
                  <Button href={item.cta.href}>{item.cta.label}</Button>
                  <a href={item.more.href} className={styles.more}>
                    {item.more.label} <span className="visually-hidden">{programs.moreHidden} {item.name}</span>
                    <ArrowIcon aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
