import { GoLocation } from "react-icons/go";
import classes from "./search-bar-input.module.css";

export default function SearchBarInput({
  value,
  onChange,
  placeholder,
  autocompleteResults,
  onPlaceSelect,
  label,
  icon: Icon,
}) {
  return (
    <section className={classes.inputWrapper}>
      <Icon className={classes.arrow} />
      <div className={classes.col}>
        <label className={classes.inputLabel}>{label}</label>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={classes.input}
        />
        {/* Render autocomplete results */}
        {autocompleteResults.length > 0 && (
          <ul className={classes.dropOffList}>
            {autocompleteResults.map((location) => (
              <li
                key={location.id}
                className={classes.dropOffResult}
                onClick={() => onPlaceSelect(location)}
              >
                <GoLocation className={classes.locationIcon} />
                <section className={classes.textWrapper}>
                  <h4 className={classes.dropOffTitle}>{location.title}</h4>
                  <p className={classes.dropOffSubtitle}>{location.subtitle}</p>
                </section>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
