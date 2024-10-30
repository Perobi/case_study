import classes from "./page.module.css";
import Hero from "@/components/estimate-page/hero";
import HowItWorks from "@/components/estimate-page/how-it-works";
import PriceBreakdown from "@/components/estimate-page/price-breakdown";
import TransportMethodDescriptions from "@/components/estimate-page/transport-method-descriptions";

export default async function EstimatePage() {
  return (
    <section className={classes.pageWrapper}>
      <Hero />
      <PriceBreakdown />
      <TransportMethodDescriptions />
      <HowItWorks />
    </section>
  );
}
