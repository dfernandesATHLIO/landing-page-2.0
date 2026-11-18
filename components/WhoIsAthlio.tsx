import Image from "next/image";
import Reveal from "./Reveal";
import styles from "./WhoIsAthlio.module.css";

const CARDS = [
  {
    title: "Track Your Progress",
    desc: "Monitor performance, goals, and development over time.",
    tone: "lime",
  },
  {
    title: "Connect With Others",
    desc: "Increase your visibility and reach the people who matter.",
    tone: "navy",
  },
  {
    title: "Get Noticed by Scouts",
    desc: "Build connections and unlock new career possibilities.",
    tone: "blue",
  },
] as const;

export default function WhoIsAthlio() {
  return (
    <section className={styles.section} aria-labelledby="wia-headline">
      <div className={styles.layout}>
        <div>
          <Reveal as="h2" variant="left" id="wia-headline" className={styles.headline}>
            The Home of
            <br />
            Football Ambition
          </Reveal>
          <Reveal as="p" variant="left" delay={1} className={styles.desc}>
            Football is about more than talent. It’s about being seen. Show how far you’ve come,
            connect with the people who matter, and give your potential a real chance to be
            noticed.
          </Reveal>
          <Reveal delay={2} className={styles.cards}>
            {CARDS.map((card) => (
              <div key={card.title} className={`${styles.card} ${styles[card.tone]}`}>
                <p className={styles.cardTitle}>{card.title}</p>
                <p className={styles.cardDesc}>{card.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal variant="right" className={styles.right}>
          <Image
            className={styles.photo}
            src="/wia-player.png"
            alt="Footballer sitting on the pitch with a ball"
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
          />
        </Reveal>
      </div>
    </section>
  );
}
