import classes from "./next-steps.module.css";

export default function NextSteps() {
  const steps = [
    {
      title: "Vor-Ort-Termin und Hohlraumuntersuchung",
      description:
        "Beim Vor-Ort-Termin untersucht einer unserer Experten durch Bohrungen in der Fassade den Hohlraum mit einer Kamera.",
    },
    {
      title: "Angebot und Förderantrag",
      description:
        "Nach dem Vor-Ort-Termin erhältst du ein digitales Angebot. Wir helfen dir auch gerne bei der Antragstellung für die Förderung.",
    },
    {
      title: "Durchführung der Einblasdämmung",
      description:
        "Nach dem bestätigten Angebot erhältst du einen Termin für die Einblasdämmung, bei dem unsere eigenen Handwerker die Dämmung durchführen.",
    },
  ];
  return (
    <>
      <section className={classes.pageWrapper}>
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
