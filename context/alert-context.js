"use client";

import { createContext, useState, useContext } from "react";

// Create the cart context with default values
const AlertContext = createContext({
  alerts: [],
  SET_ALERT: () => {},
  REMOVE_ALERT: () => {},
});

// Create a provider component for the cart context
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    alerts: [],
  });
  const SET_ALERT = ({ msg, type }) => {
    const id = new Date().getTime();
    const newAlert = { id, msg, type };
    setAlert((prevState) => ({
      alerts: [...prevState.alerts, newAlert],
    }));
  };
  const REMOVE_ALERT = (id) => {
    setAlert((prevState) => ({
      alerts: prevState.alerts.filter((alert) => alert.id !== id),
    }));
  };

  return (
    <AlertContext.Provider
      value={{
        alert,
        SET_ALERT,
        REMOVE_ALERT,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  return useContext(AlertContext);
};
