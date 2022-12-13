import classNames from "classnames";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./ThemeToggleSwitch.module.scss";

const ThemeToggleSwitch = () => {
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);
  return (
    <label
      className={styles.switch}
      onChange={(e) =>
        e.target.checked ? setCurrentTheme("light") : setCurrentTheme("dark")
      }
    >
      <input
        type="checkbox"
        checked={currentTheme === "light" ? true : false}
      />
      <span className={classNames(styles.slider, styles.round)}></span>
    </label>
  );
};

export default ThemeToggleSwitch;
