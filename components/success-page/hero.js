import CheckAnimation from "../UI-components/animations/check-animation";
import classes from "./hero.module.css";

export default function hero() {
  return (
    <section className={classes.hero}>
      <section className={classes.header}>
        <section className={classes.animationWrapper}>
          <CheckAnimation />
        </section>
        <h1 className={classes.title}>
          Vielen Dank für die Einreichung ihrer Dokumente
        </h1>
        <p className={classes.sectionTitle}>
          Ihre Unterlagen sind bei uns angekommen. Was passiert jetzt?{" "}
        </p>
      </section>
    </section>
  );
}
