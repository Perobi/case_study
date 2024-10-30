import classes from "./page.module.css";
import Hero from "@/components/landing-page/hero";
import UploadSection from "@/components/landing-page/upload-section";
import ValueProps from "@/components/landing-page/value-props";

export default function Home() {
  return (
    <section className={classes.pageWrapper}>
      <Hero />
      <UploadSection />
      <ValueProps />
    </section>
  );
}
