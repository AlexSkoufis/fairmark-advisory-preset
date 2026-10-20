"use client";

import { useId, useState } from "react";
import home from "@/content/home.json";
import Button from "../ui/Button";
import styles from "./Estimate.module.css";

const { estimate } = home;

function money(n) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(n >= 1e8 ? 0 : 1).replace(/\.0$/, "")}M`;
  return `$${Math.round(n / 1e3)}K`;
}

export default function Estimate() {
  const id = useId();
  const [value, setValue] = useState(estimate.default);
  const pct = ((value - estimate.min) / (estimate.max - estimate.min)) * 100;
  // Spend that carries a premium of up to 40% over market value
  const premium = value - value / (1 + estimate.premiumRate);
  const savings = value * estimate.savingsRate;

  return (
    <section id="estimate" className={`section ${styles.section}`} aria-labelledby="estimate-title">
      <div className="container">
        <div className={styles.card} data-reveal>
          <div className={styles.copy}>
            <p className="eyebrow on-dark">{estimate.eyebrow}</p>
            <h2 id="estimate-title" className={`h-section ${styles.title}`}>
              {estimate.title}
            </h2>
            <p className={styles.text}>{estimate.text}</p>
          </div>

          <div className={styles.tool}>
            <label htmlFor={id} className={styles.sliderLabel}>
              {estimate.sliderLabel}
            </label>
            <output htmlFor={id} className={styles.spend}>
              {money(value)}
            </output>
            <input
              id={id}
              type="range"
              min={estimate.min}
              max={estimate.max}
              step={estimate.step}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              aria-valuetext={money(value)}
              className={styles.range}
              style={{ "--pct": `${pct}%` }}
            />
            <div className={styles.scale} aria-hidden="true">
              <span>{money(estimate.min)}</span>
              <span>{money(estimate.max)}+</span>
            </div>

            <dl className={styles.results}>
              <div>
                <dt>{estimate.premiumLabel}</dt>
                <dd>{money(premium)}</dd>
              </div>
              <div className={styles.highlight}>
                <dt>{estimate.savingsLabel}</dt>
                <dd aria-live="polite">{money(savings)}</dd>
              </div>
            </dl>

            <p className={styles.disclaimer}>{estimate.disclaimer}</p>

            <div className={styles.actions}>
              <Button href={estimate.cta.href}>{estimate.cta.label}</Button>
              <a href={estimate.secondary.href} className={styles.secondary} target="_blank" rel="noopener noreferrer">
                {estimate.secondary.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
