import home from "@/content/home.json";
import styles from "./ClientLogos.module.css";

const { clients } = home;

export default function ClientLogos() {
  // The set is repeated so the marquee loops without a gap; copies are hidden from assistive tech.
  const groups = [0, 1];
  return (
    <section id="clients" className={styles.section} aria-labelledby="clients-title">
      <div className="container">
        <h2 id="clients-title" className={styles.heading}>
          {clients.heading}
        </h2>
      </div>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {groups.map((g) => (
            <ul key={g} className={styles.group} aria-hidden={g > 0 ? "true" : undefined}>
              {[...clients.logos, ...clients.logos].map((logo, i) => (
                <li key={`${logo.name}-${i}`} aria-hidden={i >= clients.logos.length ? "true" : undefined}>
                  <span className={`${styles.logo} ${styles[logo.style]}`}>{logo.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
