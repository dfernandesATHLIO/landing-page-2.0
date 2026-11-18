"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";
import Reveal from "./Reveal";
import styles from "./Faq.module.css";


const FAQS = [
  {
    q: "When will Athlio launch?",
    a: "We're targeting a 2026 launch. Waitlist members will get early access before the public release and be the first to build their profiles.",
  },
  {
    q: "Is Athlio free to use?",
    a: "Yes — joining the waitlist is completely free, with no commitment required. We'll share pricing details closer to launch.",
  },
  {
    q: "Which sports does Athlio support?",
    a: "We're starting with football (soccer). More sports may be added after launch based on user demand.",
  },
  {
    q: "What devices does Athlio integrate with?",
    a: "Athlio connects with Strava, Apple Health, and more — so your fitness data flows in automatically alongside your match logs.",
  },
  {
    q: "I'm a coach. Is Athlio right for me?",
    a: "Coaches can verify their players' stats and profiles, adding an extra layer of credibility that scouts trust. Coach accounts are in the roadmap.",
  },
  {
    q: "How is my data handled?",
    a: "Your data is stored securely and never sold to third parties. You control what's public on your profile and what stays private.",
  },
  {
    q: "What countries will it be available in?",
    a: "We're launching across Europe first, with a focus on markets with strong grassroots football scenes. Global expansion will follow.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.layout}>
        <Reveal variant="left" className={styles.card}>
          <div className={styles.tag}>FAQ</div>
          <h2 className={styles.cardTitle}>
            Questions?
            <br />
            Answered.
          </h2>
          <p className={styles.contact}>
            Can&apos;t find your answer? Email us at
            <br />
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </Reveal>

        <Reveal variant="right" className={styles.list}>
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q} className={`${styles.item} ${open ? styles.open : ""}`}>
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={open}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className={styles.toggle} aria-hidden="true">
                    +
                  </span>
                </button>
                <div id={`faq-answer-${i}`} className={styles.answer} role="region">
                  {item.a}
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
