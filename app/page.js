import EstimateCTA from "@/components/landing-page/estimate-cta";
import classes from "./page.module.css";
import Hero from "@/components/landing-page/hero";
import ServicesProvided from "@/components/landing-page/services-provided";
import ValueProps from "@/components/landing-page/value-props";

export default function Home() {
  return (
    <section className={classes.pageWrapper}>
      <Hero />
      <ValueProps />
      <ServicesProvided />
      <EstimateCTA />
    </section>
  );
}
