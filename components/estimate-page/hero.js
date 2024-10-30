import GoogleMap from "../google-map/functional-maps/google-map";
import SearchBarRow from "../UI-components/search-bar/search-bar-row";
import classes from "./hero.module.css";
import TransportSelections from "./transport-selections";

export default function Hero() {
  return (
    <>
      <section className={classes.hero}>
        <div className={classes.header}>
          <h1 className={classes.title}>Preise vergleichen</h1>
          <h2 className={classes.sectionTitle}>
            Einfach Adressen eingeben, Preise vergleichen, Zeitraum wählen und
            Moverr buchen.
          </h2>
        </div>

        <section className={classes.sectionWrapper}>
          <section className={classes.searchBarWrapper}>
            <SearchBarRow />
          </section>

          <section className={classes.transportSelectionsWrapper}>
            <section className={classes.mapWrapper}>
              <GoogleMap />
            </section>
            <section className={classes.mapOverlay}>
              <TransportSelections />
            </section>
          </section>
        </section>
      </section>
    </>
  );
}
