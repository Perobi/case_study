import Button from "../UI-components/button/button";
import classes from "./in-touch-section.module.css";

export default function InTouchSection() {
  return (
    <>
      <section className={classes.pageWrapper}>
        <h4 className={classes.title}>
          Wir werden uns in kürze bei ihnen melden, um die nächsten Schritte zu
          besprechen.
        </h4>
        <section className={classes.buttonWrapper}>
          <Button className={classes.button} location={"/"}>
            Zurück zu Varm
          </Button>
        </section>
      </section>
    </>
  );
}
