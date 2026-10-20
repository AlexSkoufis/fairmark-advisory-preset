import site from "@/content/site.json";
import Logo from "./Logo";
import Button from "./ui/Button";
import { MailIcon, PhoneIcon, SocialIcon } from "./ui/Icons";
import styles from "./Footer.module.css";

const { footer, contact, brand } = site;

export default function Footer() {
  return (
    <footer className={`${styles.footer} on-dark`}>
      <div className={styles.dots} aria-hidden="true" />
      <div className="container">
        <div className={styles.top}>
          <p className={styles.ctaTitle}>{footer.ctaTitle}</p>
          <Button href={footer.ctaButton.href}>{footer.ctaButton.label}</Button>
        </div>

        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href={brand.homeHref} className={styles.logo} aria-label={`${brand.name} home`}>
              <Logo tone="light" />
            </a>
            <p className={styles.tagline}>{footer.tagline}</p>
            <ul className={styles.social}>
              {footer.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    <SocialIcon name={s.icon} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className={styles.heading}>{col.heading}</h2>
              <ul className={styles.links}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className={styles.heading}>{footer.contactHeading}</h2>
            <address className={styles.address}>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <ul className={styles.contactList}>
              <li>
                <a href={contact.phone.href}>
                  <PhoneIcon aria-hidden="true" />
                  {contact.phone.label}
                </a>
              </li>
              <li>
                <a href={contact.email.href}>
                  <MailIcon aria-hidden="true" />
                  {contact.email.label}
                </a>
              </li>
            </ul>
            <a href={footer.newsletter.href} className={styles.newsletter}>
              {footer.newsletter.label}
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{footer.copyright}</p>
          <ul className={styles.legal}>
            {footer.legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} target={l.href.includes("fairmark.example") ? undefined : "_blank"} rel="noopener noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.credit}>
            {footer.credit.prefix}{" "}
            <a href={footer.credit.href} target="_blank" rel="noopener noreferrer">
              {footer.credit.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
