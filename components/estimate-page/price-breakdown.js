"use client"; // Ensure this component runs on the client side

import SearchBarRow from "../UI-components/search-bar/search-bar-row";
import { useEffect, useState } from "react";
import classes from "./price-breakdown.module.css";
import { useBooking } from "@/app/context/angebot-context";
import TransportSelectionRow from "./components/transport-selection-row";
import { FaCircleInfo } from "react-icons/fa6";
import Button from "../UI-components/button/button";
import defaultQuotes from "@/utils/default-quotes";
import { motion } from "framer-motion";
import SwitchToggle from "../UI-components/switch-toggle/switch-toggle";

export default function PriceBreakdown() {
  // Get bookingDetails from context
  const { bookingDetails } = useBooking();
  const { quotes } = bookingDetails;
  const [selectedQuote, setSelectedQuote] = useState("S"); // Track selected quote
  const [displayQuotes, setDisplayQuotes] = useState([]); // Display quotes based on selected size
  const [sliderValue, setSliderValue] = useState(20); // Slider value (in minutes)

  useEffect(() => {
    if (quotes.length === 0) {
      // Set default quotes if quotes are empty
      setDisplayQuotes(defaultQuotes);
    } else {
      setDisplayQuotes(quotes);
    }
  }, [quotes]);

  const [selectXS, setSelectXS] = useState(false); // Track if XS is selected

  const availableSizes = selectXS
    ? ["XS", "M", "L", "XL"]
    : ["S", "M", "L", "XL"];

  const changeSelectedQuote = (quote) => {
    setSelectedQuote(quote);
    setSliderValue(
      displayQuotes.find((q) => q.product === quote).averageLaborDuration
    );
  };

  const selectXSorSHandler = () => {
    setSelectXS((prev) => !prev);
    changeSelectedQuote(selectXS ? "S" : "XS");
  };

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setSliderValue(value); // Update the slider value state
  };

  useEffect(() => {
    // Set the CSS variable for the background fill by
    const slider = document.getElementById("slider");
    slider.style.setProperty("--value", (sliderValue / 180) * 100 + "%"); // Assuming 180 is the max value
  }, [sliderValue]);

  const getSliderLabel = (value) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours > 0 ? `${hours}h` : ""} ${
      minutes > 0 ? `${minutes} min` : "0 min"
    }`.trim();
  };

  return (
    <>
      <section className={classes.pageWrapper}>
        <section className={classes.header}>
          <h1 className={classes.title}>Preisdarstellung? Kein Problem.</h1>
          <h2 className={classes.sectionTitle}>
            Adresse angeben, was du transportieren willst, und schau dir die
            Preise an!
          </h2>
        </section>

        <section className={classes.colSection}>
          <SearchBarRow buttonVisible={false} />
          <section className={classes.row}>
            <section className={classes.selectionsWrapper}>
              {displayQuotes &&
                displayQuotes.length > 0 &&
                displayQuotes
                  .filter((quote) => availableSizes.includes(quote.product)) // Filter based on available sizes
                  .map((quote) => (
                    <div
                      className={`${classes.selectionWrapper} ${
                        quote.product === selectedQuote ? classes.active : ""
                      }`}
                      onClick={() => changeSelectedQuote(quote.product)}
                      key={quote.productObj.id}
                    >
                      <TransportSelectionRow quote={quote} icon={quote.icon} />
                    </div>
                  ))}

              {(selectedQuote === "S" || selectedQuote === "XS") && (
                <section className={classes.badgeWrapper}>
                  <div className={classes.col}>
                    <h6 className={classes.badgeTitle}>
                      <span className={classes.colorTheme}>Spare 30%</span> –
                      mit nur einem Moverr
                    </h6>
                    <p className={classes.badgeDescription}>
                      Buche nur einen Moverr. Sei bereit zu helfen, sollte es zu
                      schwer sein.
                    </p>
                  </div>

                  <SwitchToggle
                    checked={selectXS}
                    onChange={selectXSorSHandler}
                  />
                </section>
              )}
              <div className={classes.buttonWrapper}>
                <Button className={classes.button}>Jetzt Buchen</Button>
              </div>
            </section>
            <section className={classes.priceBreakdownWrapper}>
              {/* Slider for times from 0 to 3h  with labels at 30 min, 1h, 1h 30min, 2h */}
              <section className={classes.sliderWrapper}>
                <div className={classes.labelsRow}>
                  <label className={classes.label}>
                    <span className={classes.labelText}>wenige Sachen</span>
                    <div className={classes.line} />
                  </label>
                  <label className={classes.label}>
                    <span className={classes.labelText}>ca. 1 Zimmer</span>
                    <div className={classes.line} />
                  </label>
                  <label className={classes.label}>
                    <span className={classes.labelText}>ca. 2 Zimmer</span>
                    <div className={classes.line} />
                  </label>
                  <label className={classes.label}>
                    <span className={classes.labelText}>ca. 3 Zimmer</span>
                    <div className={classes.line} />
                  </label>
                </div>
                <input
                  type="range"
                  min="0"
                  id="slider"
                  step={5}
                  max="180" // Max 3 hours in minutes
                  value={sliderValue}
                  onChange={handleSliderChange}
                  className={classes.slider}
                />
                <div className={classes.sliderValueContainer}>
                  <div
                    className={classes.valueWrapper}
                    // position absolute under the thumb of the slider
                    style={{
                      left: `calc(${(sliderValue / 180) * 100}% - 100px)`,
                    }} // Position based on slider value
                  >
                    <div className={classes.value}>
                      {getSliderLabel(sliderValue)}
                    </div>
                    <p className={classes.valueDescription}>
                      Geschätzte Zeit für das Laden und Entladen.
                    </p>
                  </div>
                </div>
              </section>
              <section className={classes.priceWrapper}>
                <section className={classes.priceRow}>
                  <div className={classes.priceDescription}>
                    <h4 className={classes.priceTitle}>Grundtarif</h4>
                    <span className={classes.priceSelectionTitle}>
                      (
                      {
                        displayQuotes?.find((q) => q.product === selectedQuote)
                          ?.productObj?.shortName
                      }
                      )
                    </span>
                  </div>
                  <span className={classes.price}>
                    €
                    {displayQuotes?.find((q) => q.product === selectedQuote)
                      ?.fareStructure?.base / 100}
                  </span>
                </section>
                <section className={classes.priceRow}>
                  <div className={classes.priceDescription}>
                    <h4 className={classes.priceTitle}>Distanz</h4>
                    <span className={classes.priceSelectionTitle}>
                      (
                      {(
                        displayQuotes?.find((q) => q.product === selectedQuote)
                          ?.travelDistance / 1000
                      ).toFixed(2)}{" "}
                      km)
                    </span>
                  </div>
                  <span className={classes.price}>
                    €
                    {(
                      (displayQuotes?.find((q) => q.product === selectedQuote)
                        ?.fareStructure?.perKm /
                        100) *
                      (displayQuotes?.find((q) => q.product === selectedQuote)
                        ?.travelDistance /
                        1000)
                    ).toFixed(0)}
                  </span>
                </section>
                <section className={classes.priceRow}>
                  <div className={classes.priceDescription}>
                    <h4 className={classes.priceTitle}>Arbeitsgebühr</h4>
                    <span className={classes.priceSelectionTitle}>
                      ({sliderValue} min)
                    </span>
                  </div>
                  <span className={classes.price}>
                    €
                    {(
                      (displayQuotes?.find((q) => q.product === selectedQuote)
                        ?.fareStructure?.perMinuteLabor *
                        sliderValue) /
                      100
                    ).toFixed(0)}
                  </span>
                </section>
                <section className={classes.priceRow}>
                  {/* total */}
                  <div className={classes.priceDescription}>
                    <h4 className={classes.priceTitle}>Gesamtpreis</h4>
                    <div className={classes.priceSelectionTitle}>
                      (Geschätzt)
                    </div>
                  </div>
                  <span className={classes.price}>
                    €
                    {(
                      (displayQuotes?.find((q) => q.product === selectedQuote)
                        ?.fareStructure?.base +
                        displayQuotes?.find((q) => q.product === selectedQuote)
                          ?.fareStructure?.perKm *
                          (displayQuotes?.find(
                            (q) => q.product === selectedQuote
                          )?.travelDistance /
                            1000) +
                        displayQuotes?.find((q) => q.product === selectedQuote)
                          ?.fareStructure?.perMinuteLabor *
                          sliderValue) /
                      100
                    ).toFixed(0)}
                  </span>
                </section>
              </section>
              <section className={`${classes.badgeWrapper} ${classes.yellow}`}>
                <FaCircleInfo className={classes.icon} />

                <div className={classes.col}>
                  <h6 className={classes.badgeTitle}>
                    Dies ist nur ein Schätzwert
                  </h6>
                  <p className={classes.badgeDescription}>
                    Der Endpreis kann etwas fluktuieren, jeh nach tatsächlichem
                    Zeitaufwand
                  </p>
                </div>
              </section>
            </section>
          </section>
        </section>
      </section>
    </>
  );
}
