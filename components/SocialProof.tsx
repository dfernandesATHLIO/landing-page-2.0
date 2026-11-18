import { Fragment } from "react";
import Counter from "./Counter";
import Reveal from "./Reveal";
import styles from "./SocialProof.module.css";

const STATS: { count?: number; text?: string; suffix?: string; label: string }[] = [
  { count: 2847, label: "Players on the waitlist" },
  { count: 190, suffix: "+", label: "Leagues represented" },
  { count: 320, label: "Scouts and clubs asking to be on Athlio" },
  { text: "2026", label: "Launching" },
];

export default function SocialProof() {
  return (
    <section id="social-proof" className={styles.section}>
      <div className={styles.row}>
        {STATS.map((stat, i) => (
          <Fragment key={stat.label}>
            {i > 0 && <div className={styles.divider} />}
            <Reveal className={styles.item} delay={(i + 1) as 1 | 2 | 3 | 4}>
              {stat.count !== undefined ? (
                <Counter
                  target={stat.count}
                  suffix={stat.suffix}
                  className={styles.number}
                  suffixClassName={styles.accent}
                />
              ) : (
                <div className={styles.number}>{stat.text}</div>
              )}
              <div className={styles.label}>{stat.label}</div>
            </Reveal>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
