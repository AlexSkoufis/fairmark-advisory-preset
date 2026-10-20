import home from "@/content/home.json";
import site from "@/content/site.json";
import Button from "../ui/Button";
import { PhoneIcon } from "../ui/Icons";
import styles from "./FinalCta.module.css";

const { cta } = home;
const { contact } = site;

export default function FinalCta() {
  return (
    <section id="contact" className={`section ${styles.section}`} aria-labelledby="cta-title">
      <div className={styles.dots} aria-hidden="true" data-parallax="50" />
      <div className={`container ${styles.inner}`} data-reveal="stagger">
        <p className="eyebrow">{cta.eyebrow}</p>
        <h2 id="cta-title" className={`h-display ${styles.title}`}>
          {cta.title}
        </h2>
        <p className={`lead ${styles.text}`}>{cta.text}</p>
        <div className={styles.actions}>
          <Button href={cta.primary.href} variant="dark">
            {cta.primary.label}
          </Button>
          <a href={contact.phone.href} className={styles.phone}>
            <PhoneIcon aria-hidden="true" />
            <span>
              {cta.phoneLabel} <strong>{contact.phone.label}</strong>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
