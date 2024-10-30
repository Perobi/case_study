import Button from "@/components/UI-components/button/button";
import classes from "./transport-selection-column.module.css";
import Image from "next/image";

export default function TransportSelection({ quote, icon }) {
  return (
    <>
      {quote && (
        <section className={classes.topSection}>
          <section className={classes.sectionColWrapper}>
            <section className={classes.sectionCol}>
              <div className={classes.row}>
                <h4 className={classes.title}>{quote.productObj.shortName}</h4>{" "}
                <span className={classes.bagde}>
                  {quote.productObj.crewSize} Moverr
                </span>
              </div>
              <div className={classes.row}>
                <div className={classes.price}>
                  €
                  {Math.round(
                    quote.fareStructure.base / 100 +
                      ((quote.travelDistance / 1000) *
                        quote.fareStructure.perKm) /
                        100
                  )}{" "}
                  + €{quote.fareStructure.perMinuteLabor / 100}
                </div>{" "}
                <p className={classes.priceDescription}>
                  {" "}
                  pro Minute Arbeitszeit
                </p>
              </div>
            </section>
            <Button>Jetzt Buchen</Button>
          </section>
          <section className={classes.imageWrapper}>
            <Image
              src={icon}
              alt={quote.productObj.shortName}
              width={120}
              height={210}
              className={classes.image}
            />
          </section>
        </section>
      )}
    </>
  );
}
