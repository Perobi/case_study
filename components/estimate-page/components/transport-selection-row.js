import classes from "./transport-selection-row.module.css";
import Image from "next/image";

export default function TransportSelectionRow({ quote, icon }) {
  return (
    <>
      {quote && (
        <section className={classes.sectionColWrapper}>
          <div className={classes.row}>
            <h4 className={classes.title}>{quote.productObj.shortName}</h4>{" "}
            <span className={classes.bagde}>
              {quote.productObj.crewSize} Moverr
            </span>
          </div>

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
