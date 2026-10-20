"use client";

import { useEffect, useRef, useState } from "react";
import site from "@/content/site.json";
import Logo from "./Logo";
import Button from "./ui/Button";
import { ChevronIcon, PhoneIcon } from "./ui/Icons";
import { getLenis } from "@/lib/motion";
import styles from "./Header.module.css";

const { header, contact, brand } = site;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const menuButtonRef = useRef(null);
  const panelRef = useRef(null);

  // Solid background after leaving the top, hide on scroll down, show on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 320);
        lastY = y;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape, keep focus inside
  useEffect(() => {
    const lenis = getLenis();
    if (!menuOpen) {
      lenis?.start();
      document.documentElement.style.overflow = "";
      return;
    }
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector("a, button")?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (e.key === "Tab" && panel) {
        const items = [...panel.querySelectorAll("a, button")];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Close desktop dropdown on Escape or outside click
  useEffect(() => {
    if (openDropdown === null) return;
    const onKey = (e) => e.key === "Escape" && setOpenDropdown(null);
    const onClick = (e) => !e.target.closest(`.${styles.hasDropdown}`) && setOpenDropdown(null);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [openDropdown]);

  const solid = scrolled && !menuOpen;

  return (
    <header
      className={[styles.header, solid && styles.solid, hidden && !menuOpen && styles.hidden, menuOpen && styles.menuOpen]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={`container ${styles.bar}`}>
        <a href={brand.homeHref} className={styles.logo} aria-label={`${brand.name} home`}>
          <Logo tone={solid ? "dark" : "light"} preload />
        </a>

        <nav className={styles.nav} aria-label="Main">
          <ul className={styles.navList}>
            {header.nav.map((item, i) =>
              item.children ? (
                <li
                  key={item.label}
                  className={styles.hasDropdown}
                  onMouseEnter={() => setOpenDropdown(i)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className={styles.navLink}
                    aria-expanded={openDropdown === i}
                    aria-controls={`dropdown-${i}`}
                    onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                  >
                    {item.label}
                    <ChevronIcon className={styles.chevron} aria-hidden="true" />
                  </button>
                  <div id={`dropdown-${i}`} className={`${styles.dropdown} ${openDropdown === i ? styles.dropdownOpen : ""}`}>
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <a href={child.href} className={styles.dropdownLink} tabIndex={openDropdown === i ? 0 : -1}>
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.label}>
                  <a href={item.href} className={styles.navLink}>
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={header.login.href} className={styles.login} target="_blank" rel="noopener noreferrer">
            {header.login.label}
          </a>
          <Button href={header.cta.href} size="sm" className={styles.cta}>
            {header.cta.label}
          </Button>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.burger}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? header.menuClose : header.menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={panelRef} className={styles.panel} hidden={!menuOpen} data-lenis-prevent>
        <div className={`container ${styles.panelInner}`}>
          <nav aria-label="Mobile">
            <ul className={styles.mobileList}>
              {header.nav.map((item, i) => (
                <li key={item.label} style={{ "--i": i }}>
                  <a href={item.href} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </a>
                  {item.children && (
                    <ul className={styles.mobileSub}>
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <a href={child.href} onClick={() => setMenuOpen(false)}>
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.panelFoot}>
            <Button href={header.cta.href}>{header.cta.label}</Button>
            <a href={contact.phone.href} className={styles.panelPhone}>
              <PhoneIcon aria-hidden="true" />
              {contact.phone.label}
            </a>
            <a href={header.login.href} className={styles.panelLogin} target="_blank" rel="noopener noreferrer">
              {header.login.label}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
