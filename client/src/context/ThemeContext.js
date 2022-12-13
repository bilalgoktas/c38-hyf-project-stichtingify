import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext(null);

export const ThemeContextProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(
    JSON.parse(localStorage.getItem("currentTheme")) || "light"
  );

  useEffect(() => {
    localStorage.setItem("currentTheme", JSON.stringify(currentTheme));
  }, [currentTheme]);

  const value = {
    currentTheme,
    setCurrentTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
  children: PropTypes.element,
};

export default ThemeContextProvider;
