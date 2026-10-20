import home from "@/content/home.json";
import Button from "../ui/Button";
import HeroCanvas from "./HeroCanvas";
import styles from "./Hero.module.css";

const { hero } = home;

export default function Hero() {
  const { panel } = hero;
  const max = Math.max(...panel.rows.map((r) => r.value));
  const market = panel.rows.find((r) => r.tone === "navy");
  const marketPct = (market.value / max) * 100;

  return (
    <section className={`${styles.hero} on-dark`} aria-labelledby="hero-title">
      <HeroCanvas className={styles.canvas} />
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={`eyebrow ${styles.fadeIn}`} style={{ "--d": "0.1s" }}>
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className={`h-display ${styles.title}`}>
            {hero.titleLines.map((line, i) => (
              <span key={line} className={styles.line}>
                <span
                  className={`${styles.lineInner} ${i === hero.highlightLine ? styles.highlight : ""}`}
                  style={{ "--d": `${0.15 + i * 0.1}s` }}
                >
                  {line}
                </span>{" "}
              </span>
            ))}
          </h1>
          <p className={`lead ${styles.lead} ${styles.fadeIn}`} style={{ "--d": "0.5s" }}>
            {hero.lead}
          </p>
          <div className={`${styles.ctas} ${styles.fadeIn}`} style={{ "--d": "0.62s" }}>
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
            </Button>
          </div>
          <p className={`${styles.note} ${styles.fadeIn}`} style={{ "--d": "0.72s" }}>
            <span className={styles.noteDot} aria-hidden="true" />
            {hero.note}
          </p>
        </div>

        <figure className={`${styles.panel} ${styles.fadeIn}`} style={{ "--d": "0.45s" }}>
          <div className={styles.panelHead}>
            <span className={styles.panelLabel}>{panel.label}</span>
            <span className={styles.status}>
              <span className={styles.pulse} aria-hidden="true" />
              {panel.status}
            </span>
          </div>

          <div className={styles.bars}>
            {panel.rows.map((row, i) => (
              <div key={row.label} className={styles.barRow}>
                <div className={styles.barMeta}>
                  <span>{row.label}</span>
                  <span className={styles.barValue}>{row.display}</span>
                </div>
                <div className={styles.track}>
                  <span
                    className={`${styles.bar} ${styles[row.tone]}`}
                    style={{ width: `${(row.value / max) * 100}%`, "--d": `${0.9 + i * 0.25}s` }}
                  />
                  {row.tone === "navy" && (
                    <span className={styles.gap} style={{ left: `${marketPct}%`, width: `${100 - marketPct}%` }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <figcaption className={styles.gapCallout}>
            <span className={styles.gapValue}>{panel.gapValue}</span>
            <span>{panel.gapLabel}</span>
          </figcaption>
          <p className={styles.footnote}>{panel.footnote}</p>
        </figure>
      </div>

      <div className={`container ${styles.proofWrap}`}>
        <ul className={`${styles.proof} ${styles.fadeIn}`} style={{ "--d": "0.85s" }}>
          {hero.proof.map((p) => (
            <li key={p.label}>
              <strong>{p.value}</strong>
              <span>{p.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
