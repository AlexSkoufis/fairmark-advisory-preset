import home from "@/content/home.json";
import { FeatureIcon } from "../ui/Icons";
import styles from "./Difference.module.css";

const { difference } = home;

export default function Difference() {
  return (
    <section id="difference" className={`section ${styles.section}`} aria-labelledby="difference-title">
      <div className="container">
        <div className={styles.head} data-reveal>
          <p className="eyebrow">{difference.eyebrow}</p>
          <h2 id="difference-title" className={`h-section ${styles.title}`}>
            {difference.title}
          </h2>
        </div>

        <ul className={styles.grid} data-reveal="stagger">
          {difference.items.map((item, i) => (
            <li key={item.title} className={styles.card} data-spotlight>
              <div className={styles.cardTop}>
                <span className={styles.icon}>
                  <FeatureIcon name={item.icon} aria-hidden="true" />
                </span>
                <span className={styles.index}>0{i + 1}</span>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
