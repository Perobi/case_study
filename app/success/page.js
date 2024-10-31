import Hero from "@/components/success-page/hero";
import classes from "./page.module.css";
import NextSteps from "@/components/success-page/next-steps";
import QuestionsSection from "@/components/success-page/questions-section";

export default function Success() {
  return (
    <section className={classes.pageWrapper}>
      <Hero />
      <NextSteps />
      <QuestionsSection />
    </section>
  );
}
