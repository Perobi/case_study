"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Button from "../button/button";
import classes from "./search-bar.module.css";
import { IoHomeOutline } from "react-icons/io5";
import SearchBarInput from "./components/search-bar-input";
import { useAngebot } from "@/app/context/angebot-context";
import { useRouter } from "next/navigation";

const API_URL = "/api/autocomplete";

export default function SearchBarRow() {
  const router = useRouter(); // Initialize router
  const { angebotDetails } = useAngebot();
  const { address } = angebotDetails;

  const [addressValue, setAddressValue] = useState({
    title: address?.name || "",
    id: address?.id || undefined,
  });

  const [addressAutoCompleteResults, setAddressAutoCompleteResults] = useState(
    []
  );

  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (address) {
      setAddressValue({ title: address.name, id: address.id });
    }
  }, [address]);

  const fetchAutocompleteResults = async (value) => {
    if (!value) return;
    const response = await fetch(
      `${API_URL}?query=${encodeURIComponent(value)}`
    );
    const data = await response.json();
    setAddressAutoCompleteResults(data.data.autocompleteLocations);
  };

  const debouncedFetch = useCallback(
    debounce(fetchAutocompleteResults, 500),
    []
  );

  useEffect(() => {
    if (!isAddressSelected && hasUserInteracted) {
      debouncedFetch(addressValue.title);
    }
  }, [
    addressValue.title,
    debouncedFetch,
    isAddressSelected,
    hasUserInteracted,
  ]);

  const handleAddressChange = (event) => {
    setAddressValue({ title: event.target.value, id: undefined });
    setIsAddressSelected(false);
    setHasUserInteracted(true);
  };

  const onPlaceSelect = (location) => {
    const newValue = { title: location.title, id: location.id };
    setAddressValue(newValue);
    setAddressAutoCompleteResults([]);
    setIsAddressSelected(true);
    setHasUserInteracted(false);
  };
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setAddressAutoCompleteResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Construct the URL with selected locations
  const constructUrl = () => {
    const addressId = address.id;
    const params = new URLSearchParams();

    if (addressId) {
      params.set("address", encodeURIComponent(addressId));
    }

    return `/angebot?${params.toString()}`;
  };

  const handleButtonClick = () => {
    const url = constructUrl();
    router.push(url); // Use the router to navigate
  };

  return (
    <div ref={wrapperRef} className={classes.searchBarWrapper}>
      <SearchBarInput
        icon={IoHomeOutline}
        label="Address fur die Einspritzdämmung"
        value={addressValue.title || ""}
        onChange={handleAddressChange}
        placeholder="Addresse eingeben"
        autocompleteResults={addressAutoCompleteResults}
        onPlaceSelect={(location) => onPlaceSelect(location)}
      />
      <Button onClick={handleButtonClick}>Angebot erhalten</Button>
      {/* Update the Button to handle onClick */}
    </div>
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
