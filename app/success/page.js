import Hero from "@/components/success-page/hero";
import classes from "./page.module.css";
import { Suspense, lazy } from "react";

// Lazy load non-critical components
const NextSteps = lazy(() => import("@/components/success-page/next-steps"));
const QuestionsSection = lazy(() =>
  import("@/components/success-page/questions-section")
);
const InTouchSection = lazy(() =>
  import("@/components/success-page/in-touch-section")
);

export default function Success() {
  return (
    <section className={classes.pageWrapper}>
      <Hero />
      <Suspense fallback={<div>Loading sections...</div>}>
        <NextSteps />
        <QuestionsSection />
        <InTouchSection />
      </Suspense>
    </section>
  );
}
