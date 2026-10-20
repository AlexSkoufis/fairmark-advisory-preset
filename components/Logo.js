import site from "@/content/site.json";

// Fairmark mark: an equals sign (a fair price) in a rounded square, with the
// wordmark set in the site sans. Tone switches it to white on dark backgrounds.
export default function Logo({ tone = "dark", className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 196 44"
      role="img"
      aria-label={site.brand.logo.alt}
      style={{
        height: "100%",
        width: "auto",
        color: tone === "light" ? "var(--white)" : "var(--ink)",
        transition: "color 0.4s ease",
      }}
    >
      <rect x="2" y="4" width="36" height="36" rx="10" fill="var(--blue)" />
      <path d="M11 17.5h18M11 26.5h18" stroke="var(--white)" strokeWidth="4" strokeLinecap="round" />
      <text x="50" y="30.5" fill="currentColor" className="logo-word">
        fairmark
      </text>
    </svg>
  );
}
