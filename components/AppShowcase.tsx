"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import styles from "./AppShowcase.module.css";

interface StatCardData {
  label: string;
  number: string;
  accent?: string;
  sub: string;
}

interface Slide {
  num: string;
  title: string;
  desc: string;
  badges: string[];
  image: string;
  imageAlt: string;
  stats: StatCardData[];
}

const SLIDES: Slide[] = [
  {
    num: "01",
    title: "Your football story, backed by your coach.",
    desc: "Your position, your style, your highlights, all in one place. Get your coach to back you up, so scouts know your game is the real deal.",
    badges: ["Matches", "Clubs", "Posts"],
    image: "/players_mockup.png",
    imageAlt: "Athlio player profile displayed in an iPhone mockup",
    stats: [
      {
        label: "Average trust score",
        number: "87",
        accent: "%",
        sub: "given to verified profiles by beta scouts",
      },
    ],
  },
  {
    num: "02",
    title: "Track every season",
    desc: "Log every match, track your goals and assists, and watch your stats build across seasons. Set personal targets, monitor your progress and always know where you stand compared to players at your level.",
    badges: ["Teammates", "Progress", "Challenges"],
    image: "/performance_mockup.png",
    imageAlt: "Athlio performance dashboard displayed in an iPhone mockup",
    stats: [
      { label: "Partners", number: "5", sub: "connect your Strava, Apple Health and more" },
      {
        label: "Stats tracked",
        number: "20",
        accent: "+",
        sub: "everything in one place to progress",
      },
    ],
  },
  {
    num: "03",
    title: "BE found by scouts",
    desc: "Scouts search Athlio by position, playing style, level, and region. When your profile is complete and verified, you show up. No connections needed, no luck involved.",
    badges: ["Filters", "Verification", "Free Connections"],
    image: "/search_mockup.png",
    imageAlt: "Athlio player search displayed in an iPhone mockup",
    stats: [
      {
        label: "Future scouts in app",
        number: "320",
        accent: "+",
        sub: "estimated amount for the launch",
      },
    ],
  },
];

function StatCard({ label, number, accent, sub }: StatCardData) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statCardLabel}>{label}</div>
      <div className={styles.statCardNumber}>
        {number}
        {accent && <span className={styles.accent}>{accent}</span>}
      </div>
      <div className={styles.statCardSub}>{sub}</div>
    </div>
  );
}

function Badges({ items }: { items: string[] }) {
  return (
    <div className={styles.badges}>
      {items.map((b) => (
        <span key={b} className={styles.badge}>
          {b}
        </span>
      ))}
    </div>
  );
}

const SWAP_DELAY = 180;

export default function AppShowcase() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);

  // Map scroll progress through the tall scene to a slide index.
  useEffect(() => {
    const onScroll = () => {
      const scene = sceneRef.current;
      if (!scene) return;
      const scrollable = scene.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, -scene.getBoundingClientRect().top / scrollable));
      setActive(Math.min(SLIDES.length - 1, Math.floor(progress * SLIDES.length)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fade the text out, swap it, then fade back in.
  useEffect(() => {
    if (active === displayed) return;
    setContentVisible(false);
    const t = setTimeout(() => {
      setDisplayed(active);
      setContentVisible(true);
    }, SWAP_DELAY);
    return () => clearTimeout(t);
  }, [active, displayed]);

  const goToSlide = (index: number) => {
    const scene = sceneRef.current;
    if (!scene) return;
    const sectionTop = window.scrollY + scene.getBoundingClientRect().top;
    const target =
      sectionTop + (index / SLIDES.length) * (scene.offsetHeight - window.innerHeight);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const slide = SLIDES[displayed];
  const fadeClass = `${styles.fade} ${contentVisible ? "" : styles.fadeOut}`;

  return (
    <section id="the-app" className={styles.section}>
      <Reveal as="h2" className={styles.title}>
        Your career
        <br />
        <span className={styles.accent}>in your pocket</span>
      </Reveal>

      {/* Mobile: stacked slides */}
      <div className={styles.mobileSlides}>
        {SLIDES.map((s) => (
          <div key={s.num} className={styles.mobileSlide}>
            <div className={styles.slideNum}>{s.num}</div>
            <h3 className={styles.slideTitle}>{s.title}</h3>
            <p className={styles.slideDesc}>{s.desc}</p>
            <Badges items={s.badges} />
            <div className={styles.phoneWrapper}>
              <div className={styles.phoneFrame}>
                <Image src={s.image} alt={s.imageAlt} fill sizes="220px" className={styles.phoneImg} />
              </div>
            </div>
            <div className={styles.mobileStats}>
              {s.stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: sticky scroll scene */}
      <div ref={sceneRef} className={styles.scene}>
        <div className={styles.stickyRow}>
          <div className={`${styles.slideLeft} ${fadeClass}`}>
            <div className={styles.slideNum}>{slide.num}</div>
            <h3 className={styles.slideTitle}>{slide.title}</h3>
            <p className={styles.slideDesc}>{slide.desc}</p>
            <Badges items={slide.badges} />
          </div>

          <div className={styles.phoneWrapper}>
            <div className={styles.phoneFrame}>
              {SLIDES.map((s, i) => (
                <div
                  key={s.num}
                  className={`${styles.screen} ${i === active ? "" : styles.screenHidden}`}
                  aria-hidden={i !== active}
                >
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="320px"
                    priority={i === 0}
                    className={styles.phoneImg}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.slideRight} ${fadeClass}`}>
            {slide.stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <div className={styles.dots}>
            {SLIDES.map((s, i) => (
              <button
                key={s.num}
                type="button"
                className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
