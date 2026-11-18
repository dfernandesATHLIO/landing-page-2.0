import Image from "next/image";
import WaitlistForm, { ArrowIcon } from "./WaitlistForm";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.card}>
        <div className={styles.bg}>
          <Image src="/hero-bg.png" alt="Football player" fill priority sizes="100vw" />
        </div>

        <div className={styles.content}>
          <h1 className={styles.headline}>
            Get discovered
            <br />
            Not just seen
          </h1>
          <p className={styles.desc}>
            Your talent deserves to be seen. Showcase your game and put yourself in front of the
            clubs and scouts who can take you to the next level.
          </p>
          <WaitlistForm
            source="hero"
            inputId="hero-email"
            className={styles.form}
            inputClassName={styles.input}
            buttonClassName={styles.button}
            label={
              <>
                Join the waitlist
                <ArrowIcon />
              </>
            }
          />
        </div>

        <div className={styles.trust}>
          <span>Free to join</span>
          <div className={styles.dot} />
          <span>No commitment</span>
          <div className={styles.dot} />
          <span>Be first when we launch</span>
        </div>
      </div>
    </section>
  );
}
