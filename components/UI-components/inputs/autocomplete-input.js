import { useEffect, useCallback, useRef, useState } from "react";
import classes from "./autocomplete-input.module.css";

const API_URL = "/api/autocomplete";

export default function AutoCompleteInput({ value = "", onChange }) {
  const wrapperRef = useRef(null);
  const [addressAutoCompleteResults, setAddressAutoCompleteResults] = useState(
    []
  );
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [inputValue, setInputValue] = useState(value ?? ""); // Use nullish coalescing to default to an empty string

  useEffect(() => {
    // If the parent component updates the value prop, update the internal state
    setInputValue(value);
  }, [value]);

  const fetchAutocompleteResults = async (query) => {
    if (!query) return;
    const response = await fetch(
      `${API_URL}?query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    setAddressAutoCompleteResults(data.data.autocompleteLocations);
  };

  const debouncedFetch = useCallback(
    debounce(fetchAutocompleteResults, 500),
    []
  );

  useEffect(() => {
    if (isUserInteracting) {
      debouncedFetch(inputValue); // Use the internal inputValue state
    }
  }, [inputValue, debouncedFetch, isUserInteracting]);

  const handleAddressChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue); // Update internal state with user input
    setIsUserInteracting(true); // Indicate that the user is interacting
  };

  const onPlaceSelect = (location) => {
    setInputValue(`${location.title}, ${location.subtitle}`); // Update internal input value with selected location
    setAddressAutoCompleteResults([]); // Clear results after selection
    setIsUserInteracting(false); // Stop tracking user interaction
    onChange(`${location.title}, ${location.subtitle}`); // Notify the parent component with the selected location
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setAddressAutoCompleteResults([]); // Close results if click is outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <span ref={wrapperRef} className={classes.inputWrapper}>
      <input
        className={classes.input}
        value={inputValue} // Bind to the internal state
        onChange={handleAddressChange}
        placeholder="Addresse (optional)"
      />
      {addressAutoCompleteResults.length > 0 && (
        <ul className={classes.autocompleteResults}>
          {addressAutoCompleteResults.map((location) => (
            <li
              key={location.id}
              onClick={() => onPlaceSelect(location)}
              className={classes.dropOffResult}
            >
              <section className={classes.textWrapper}>
                <h4 className={classes.dropOffTitle}>{location.title}</h4>
                <p className={classes.dropOffSubtitle}>{location.subtitle}</p>
              </section>
            </li>
          ))}
        </ul>
      )}
    </span>
  );
}

// Debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
