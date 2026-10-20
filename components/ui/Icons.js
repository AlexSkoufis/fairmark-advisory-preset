export function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 8h12M9 3l5 5-5 5" />
    </svg>
  );
}

export function ChevronIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" />
    </svg>
  );
}

export function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

export function QuoteIcon(props) {
  return (
    <svg viewBox="0 0 48 36" fill="currentColor" {...props}>
      <path d="M0 36V22.8C0 9.6 6.4 2 19.2 0l1.6 5.2C13.6 7 10.4 11 10 17h9.2v19H0zm27.6 0V22.8C27.6 9.6 34 2 46.8 0l1.2 5.2C41.2 7 38 11 37.6 17H47v19H27.6z" />
    </svg>
  );
}

const featureIcons = {
  shield: (
    <>
      <path d="M16 3l11 4v8c0 7-4.7 12-11 14C9.7 27 5 22 5 15V7l11-4z" />
      <path d="M11 15.5l3.5 3.5L21 12.5" />
    </>
  ),
  data: (
    <>
      <ellipse cx="16" cy="7" rx="10" ry="3.5" />
      <path d="M6 7v9c0 1.9 4.5 3.5 10 3.5s10-1.6 10-3.5V7" />
      <path d="M6 16v9c0 1.9 4.5 3.5 10 3.5s10-1.6 10-3.5v-9" />
    </>
  ),
  repeat: (
    <>
      <path d="M6 13a10 10 0 0117.5-5.5L26 10" />
      <path d="M26 4v6h-6" />
      <path d="M26 19a10 10 0 01-17.5 5.5L6 22" />
      <path d="M6 28v-6h6" />
    </>
  ),
  people: (
    <>
      <circle cx="12" cy="11" r="4.5" />
      <path d="M4 27c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      <circle cx="23" cy="9" r="3.5" />
      <path d="M22 18.2c3.4.4 6 3.3 6 6.8" />
    </>
  ),
};

export function FeatureIcon({ name, ...props }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {featureIcons[name]}
    </svg>
  );
}

const socialPaths = {
  linkedin:
    "M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.4 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v7.44h-4.56v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.49V22H7.62V8z",
  x: "M17.75 1h3.37l-7.36 8.4L22.4 21h-6.78l-5.31-6.94L4.24 21H.86l7.87-9L.43 1h6.95l4.8 6.35L17.75 1zm-1.18 18h1.87L6.4 2.9H4.4L16.57 19z",
  facebook:
    "M13.5 22v-8.2h2.75l.41-3.2H13.5V8.56c0-.93.26-1.56 1.59-1.56h1.69V4.14A22.6 22.6 0 0014.32 4c-2.44 0-4.11 1.49-4.11 4.23v2.37H7.45v3.2h2.76V22h3.29z",
  instagram:
    "M12 2.2c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-9.6a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z",
};

export function SocialIcon({ name, ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d={socialPaths[name]} />
    </svg>
  );
}
