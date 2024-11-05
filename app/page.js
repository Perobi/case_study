import Hero from "@/components/landing-page/hero";
import classes from "./page.module.css";
import { Suspense, lazy } from "react";

// lazy load non-critical components
const UploadSection = lazy(() =>
  import("@/components/landing-page/upload-section")
);
const ValueProps = lazy(() => import("@/components/landing-page/value-props"));

export default function Home() {
  return (
    <section className={classes.pageWrapper}>
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <UploadSection />
        <ValueProps />
      </Suspense>
    </section>
  );
}
