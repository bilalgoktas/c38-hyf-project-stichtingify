import React, { useState, useContext, createContext } from "react";
import PropTypes from "prop-types";

export const EventsContext = createContext();

export function useEventsArray() {
  return useContext(EventsContext);
}

export function EventsProvider({ children }) {
  const [eventsArray, setEventsArray] = useState([]);

  return (
    <EventsContext.Provider value={{ eventsArray, setEventsArray }}>
      {children}
    </EventsContext.Provider>
  );
}

EventsProvider.propTypes = {
  children: PropTypes.array.isRequired,
};
