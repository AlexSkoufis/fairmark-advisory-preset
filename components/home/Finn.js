import home from "@/content/home.json";
import Button from "../ui/Button";
import styles from "./Finn.module.css";

const { finn } = home;

export default function Finn() {
  return (
    <section className={`section ${styles.section} on-dark`} aria-labelledby="finn-title">
      <div className={styles.rings} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy} data-reveal>
          <p className="eyebrow">{finn.eyebrow}</p>
          <h2 id="finn-title" className={`h-section ${styles.title}`}>
            {finn.title}
          </h2>
          <p className={styles.text}>{finn.text}</p>
          <div className={styles.actions}>
            <Button href={finn.cta.href}>{finn.cta.label}</Button>
            <span className={styles.availability}>{finn.availability}</span>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.phone} data-parallax="40">
            <div className={styles.screen} role="img" aria-label={finn.app.label}>
              <div className={styles.appBar}>
                <span className={styles.burger} aria-hidden="true" />
                <span className={styles.appName}>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <circle cx="9" cy="9" r="6" />
                    <path d="M13.5 13.5L18 18" />
                  </svg>
                  {finn.app.name}
                </span>
                <span className={styles.compose} aria-hidden="true" />
              </div>
              <span className={styles.category}>{finn.app.category}</span>
              <ul className={styles.chips}>
                {finn.app.chips.map((c, i) => (
                  <li key={c} className={i === 1 ? styles.chipActive : undefined}>
                    {c}
                  </li>
                ))}
              </ul>
              <div className={styles.input}>
                <span>{finn.app.placeholder}</span>
                <span className={styles.send} aria-hidden="true">
                  <svg viewBox="0 0 16 16">
                    <path d="M8 13V3M4 7l4-4 4 4" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <ul className={styles.prompts}>
            {finn.prompts.map((p, i) => (
              <li key={p} className={styles.prompt} style={{ "--i": i }}>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
