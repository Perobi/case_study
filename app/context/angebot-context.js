"use client"; // This component must be a client component

import React, { createContext, useContext, useState } from "react";

// Create the Booking Context
const AngebotContext = createContext();

export const useAngebot = () => {
  return useContext(AngebotContext); // Custom hook for easy access to context
};

export const AngebotProvider = ({ children, data }) => {
  // State for booking details
  const [angebotDetails, setAngebotDetails] = useState({
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    address: null,
    bauplanFiles: [],
    hausFotosFiles: [],
  });

  // Function to update booking details
  const updateAngebotDetails = (details) => {
    setAngebotDetails((prevDetails) => ({
      ...prevDetails,
      ...details,
    }));
  };

  const resetAngebotDetails = () => {
    setAngebotDetails({
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      address: null,
      bauplanFiles: [],
      hausFotosFiles: [],
    });
  };

  return (
    <AngebotContext.Provider
      value={{ angebotDetails, updateAngebotDetails, resetAngebotDetails }}
    >
      {children}
    </AngebotContext.Provider>
  );
};
