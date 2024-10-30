import LottieAnimation from "../UI-components/animations/lottie-animation";
import classes from "./how-it-works.module.css";

export default function HowItWorks() {
  const steps = [
    {
      title: "Buche deinen Moverr",
      description:
        "Gib deine Adressen ein, such dir das passende Fahrzeug aus, und sag uns wann wir da sein sollen!",
    },
    {
      title: "Den Rest machen wir!",
      description:
        "Zwei kräftige Moverrs kommen vorbei, schnappen sich deine Sachen. Wir treffen uns dann am Zielort!",
    },
    {
      title: "Bewerten & Trinkgeld",
      description:
        "Wir entladen alles und platzieren es genau da, wo du’s haben willst. Sag uns, wie’s gelaufen ist, und wenn du magst, lass ein Trinkgeld da.",
    },
  ];

  return (
    <>
      <section className={classes.pageWrapper}>
        <section className={classes.animationWrapper}>
          <LottieAnimation />
        </section>
        <section className={classes.header}>
          <h2 className={classes.title}>Alles transportiert in 3 Schritten</h2>
        </section>

        <section className={classes.stepGrid}>
          {steps.map((step, index) => (
            <section key={index} className={classes.step}>
              <div className={classes.stepHeader}>
                <div className={classes.stepNumber}>{index + 1}</div>
                <h3 className={classes.stepTitle}>{step.title}</h3>
              </div>
              <p className={classes.stepDescription}>{step.description}</p>
            </section>
          ))}
        </section>
      </section>
    </>
  );
}
