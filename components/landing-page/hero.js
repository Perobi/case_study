import classes from "./hero.module.css";
import LottieAnimation from "../UI-components/animations/lottie-animation";

export default function Hero() {
  return (
    <>
      <section className={classes.hero}>
        <section className={classes.animationWrapper}>
          <LottieAnimation />
        </section>
        <div className={classes.header}>
          <section className={classes.titleWrapper}>
            <h1 className={classes.title}>
              Laden sie ihre Gebäudeinfos zur{" "}
              <span className={classes.themeColor}>Einspritzdämmung</span> hoch
            </h1>
          </section>
          <h2 className={classes.sectionTitle}>
            Bis zu <span className={classes.themeColor}>50%</span> Heizkosten
            sparen. In nur <span className={classes.themeColor}>30 Tagen</span>{" "}
            gedämmt. <span className={classes.themeColor}>20%</span> Förderung
            erhalten.
          </h2>
        </div>
      </section>
    </>
  );
}
