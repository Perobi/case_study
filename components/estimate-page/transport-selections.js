"use client"; // Ensure this component runs on the client side

import { useState } from "react"; // Import useEffect and useState
import TransportSelection from "./components/transport-selection-column";
import classes from "./transport-selections.module.css";
import { useBooking } from "@/app/context/angebot-context"; // Adjust the path as needed
import van from "@/public/assets/transporter-types/van.png";
import largeVan from "@/public/assets/transporter-types/large-van.png";
import box from "@/public/assets/transporter-types/box.png";
import largeBox from "@/public/assets/transporter-types/large-box.png";
import SwitchToggle from "../UI-components/switch-toggle/switch-toggle";

export default function TransportSelections() {
  // Get bookingDetails from context
  const { bookingDetails } = useBooking();
  const { quotes } = bookingDetails; // Destructure quotes from bookingDetails
  const [selectXS, setSelectXS] = useState(false); // Track if XS is selected

  const selectIcon = (quote) => {
    switch (quote.product) {
      case "XS" || "S":
        return van.src;
      case "M":
        return largeVan.src;
      case "L":
        return box.src;
      case "XL":
        return largeBox.src;
      default:
        return van.src;
    }
  };

  // Determine the available sizes based on the selectXS state
  const availableSizes = selectXS
    ? ["XS", "M", "L", "XL"]
    : ["S", "M", "L", "XL"];

  return (
    <section className={classes.selectionsWrapper}>
      {quotes && quotes.length > 0 ? (
        quotes
          .filter((quote) => availableSizes.includes(quote.product)) // Filter based on available sizes
          .map((quote) => (
            <div className={classes.selectionWrapper} key={quote.productObj.id}>
              <TransportSelection quote={quote} icon={selectIcon(quote)} />

              {(quote.product === "XS" || quote.product === "S") && (
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
                    onChange={() => setSelectXS((prev) => !prev)}
                  />
                </section>
              )}
            </div>
          ))
      ) : (
        <></>
      )}
    </section>
  );
}
