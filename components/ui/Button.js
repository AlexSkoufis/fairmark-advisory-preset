import styles from "./Button.module.css";
import { ArrowIcon } from "./Icons";

function isExternal(href) {
  return /^https?:\/\//.test(href);
}

export default function Button({ href, children, variant = "primary", size = "md", className = "", arrow = true, ...rest }) {
  const external = isExternal(href) && !href.includes("fairmark.example");
  return (
    <a
      href={href}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      <span className={styles.label}>{children}</span>
      {arrow && (
        <span className={styles.icon} aria-hidden="true">
          <ArrowIcon />
          <ArrowIcon />
        </span>
      )}
    </a>
  );
}
