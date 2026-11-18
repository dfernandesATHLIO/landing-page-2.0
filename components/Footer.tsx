import Image from "next/image";
import { NAV_LINKS } from "@/lib/site";
import WaitlistForm from "./WaitlistForm";
import styles from "./Footer.module.css";

const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

export default function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.card}>
        <div className={styles.top}>
          <div>
            <a href="#" className={styles.logo}>
              <Image
                src="/logo-accent.png"
                alt="Athlio"
                width={4253}
                height={961}
                className={styles.logoImg}
              />
            </a>
            <p className={styles.tagline}>Every effort deserves to be seen</p>
          </div>

          <div>
            <div className={styles.navLabel}>Navigation</div>
            <ul className={styles.navLinks}>
              <li>
                <a href="#">Home</a>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className={styles.navLabel}>Legal</div>
            <ul className={styles.navLinks}>
              {LEGAL_LINKS.map((label) => (
                <li key={label}>
                  <a href="#">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className={styles.navLabel}>Stay updated</div>
            <WaitlistForm
              source="footer"
              placeholder="Email address"
              label="Join"
              className={styles.emailForm}
              inputClassName={styles.emailInput}
              buttonClassName={styles.joinButton}
            />
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.socialRow}>
            <span className={styles.socialLabel}>Stay in touch:</span>
            <div className={styles.social}>
              <a
                href="https://www.instagram.com/athlio.app/?hl=uk"
                className={styles.socialBtn}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="#111" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
          <p className={styles.copyright}>Copyright: Athlio 2025. All rights reserved.</p>
        </div>
      </div>

      <div className={styles.watermark} aria-hidden="true">
        ATHLIO
      </div>
    </footer>
  );
}
