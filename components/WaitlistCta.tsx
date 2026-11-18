import Reveal from "./Reveal";
import WaitlistForm, { ArrowIcon } from "./WaitlistForm";
import styles from "./WaitlistCta.module.css";

export default function WaitlistCta() {
  return (
    <section id="why-join" className={styles.section}>
      <div className={styles.card}>
        <div className={styles.inner}>
          <Reveal as="h2" className={styles.headline}>
            Your journey doesn’t wait.
            <br />
            Be first in.
          </Reveal>
          <Reveal as="p" delay={2} className={styles.sub}>
            Athlio is coming soon. Join the waitlist and be among the first athletes to build
            their profile when we launch.
          </Reveal>
          <Reveal delay={3}>
            <WaitlistForm
              source="cta"
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
