"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { scrollToHeroForm } from "@/lib/supabase";
import { CONTACT_EMAIL, NAV_LINKS } from "@/lib/site";
import styles from "./Navbar.module.css";

/** Sections the navbar can sit over, and whether their background is dark. */
const NAV_SECTIONS = [
  { id: "hero", dark: true },
  { id: "social-proof", dark: false },
  { id: "the-app", dark: false },
  { id: "why-join", dark: true },
  { id: "faq", dark: false },
  { id: "footer", dark: false },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [lightBg, setLightBg] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenRef = useRef(menuOpen);
  menuOpenRef.current = menuOpen;

  useEffect(() => {
    let prevY = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      const hero = document.getElementById("hero");
      setScrolled(hero ? y > hero.offsetHeight : y > 60);

      const checkY = navRef.current?.offsetHeight ?? 0;
      let isDark = true;
      for (const { id, dark } of NAV_SECTIONS) {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        if (rect && rect.top <= checkY && rect.bottom > checkY) {
          isDark = dark;
          break;
        }
      }
      setLightBg(!isDark);

      if (y < 80 || y < prevY - 4 || menuOpenRef.current) setHidden(false);
      else if (y > prevY + 4) setHidden(true);
      prevY = y;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    setHidden(false);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const navClass = [
    styles.navbar,
    scrolled && styles.scrolled,
    lightBg && styles.lightBg,
    hidden && styles.hidden,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <nav ref={navRef} className={navClass}>
        <div className={styles.logoSlot}>
          <a href="#" className={styles.logo}>
            <Image
              src="/logo-white.png"
              alt="Athlio"
              width={4253}
              height={961}
              priority
              className={`${styles.logoImg} ${styles.logoWhite}`}
            />
            <Image
              src="/logo-black.png"
              alt="Athlio"
              width={2127}
              height={481}
              className={`${styles.logoImg} ${styles.logoBlack}`}
            />
          </a>
        </div>

        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button type="button" className={styles.btnPrimary} onClick={scrollToHeroForm}>
            Join waitlist
          </button>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.btnGhost}>
            Talk to us
          </a>
        </div>

        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        <button type="button" className={styles.mobileClose} onClick={closeMenu} aria-label="Close menu">
          ✕
        </button>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <a
          href="#"
          className={styles.mobileCta}
          onClick={(e) => {
            e.preventDefault();
            closeMenu();
            scrollToHeroForm();
          }}
        >
          Join waitlist
        </a>
      </div>
    </>
  );
}
