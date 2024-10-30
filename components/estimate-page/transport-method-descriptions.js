import classes from "./transport-method-descriptions.module.css";
import Image from "next/image";
import defaultQuotes from "@/utils/default-quotes";

export default function TransportMethodDescriptions() {
  return (
    <>
      <section className={classes.pageWrapper}>
        <section className={classes.header}>
          <h2 className={classes.title}>Für Umzüge von klein bis groß</h2>
        </section>
        <section className={classes.grid}>
          {defaultQuotes.map((quote) => (
            <section key={quote.product} className={classes.card}>
              <section className={classes.cardSection}>
                <section className={classes.productHeader}>
                  <h3 className={classes.productName}>
                    {quote.productObj.shortName}
                  </h3>
                  <span className={classes.badge}>
                    {quote.productObj.crewSize} Moverr
                  </span>
                </section>
                <p className={classes.description}>
                  {quote.productObj.description}
                </p>
              </section>
              <Image
                src={quote.icon}
                alt={quote.product}
                height={110}
                width={200}
                className={classes.icon}
              />
            </section>
          ))}
        </section>
      </section>
    </>
  );
}
