import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useRef, useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./DatePicker.module.scss";

const DatePicker = ({ setSelectedFilter, selectedFilter }) => {
  const { currentTheme } = useContext(ThemeContext);

  const [inputType, setInputType] = useState("button");

  const datePicker = useRef();
  const handleShowPicker = async (e) => {
    e.preventDefault();
    await datePicker.current.focus();
    datePicker.current.showPicker();
  };

  return (
    <div
      className={classNames(
        styles.datePicker,
        selectedFilter.startDate?.value !== undefined &&
          selectedFilter.startDate?.value !== ""
          ? styles.selected
          : null
      )}
      style={{
        backgroundColor:
          currentTheme === "light"
            ? selectedFilter.startDate?.value !== undefined &&
              selectedFilter.startDate?.value !== ""
              ? "#F0F6EC"
              : "transparent"
            : selectedFilter.startDate?.value !== undefined &&
              selectedFilter.startDate?.value !== ""
            ? "#272727"
            : "#222222",
        // border:
        //   currentTheme === "light"
        //     ? "1px solid #00000014"
        //     : "1px solid #303030",
      }}
      onClick={handleShowPicker}
    >
      <input
        ref={datePicker}
        type={inputType}
        value={
          inputType === "button"
            ? (selectedFilter.startDate === null) |
              (selectedFilter.startDate?.value === "")
              ? "Any time"
              : selectedFilter.startDate.label
            : selectedFilter.startDate === null
            ? "Any time"
            : selectedFilter.startDate.value
        }
        onClick={handleShowPicker}
        onFocus={() => {
          setInputType("date");
        }}
        onBlur={() => setInputType("button")}
        onChange={(e) => {
          setSelectedFilter({
            ...selectedFilter,
            startDate: {
              value: e.target.value,
              label: new Date(e.target.value).toLocaleDateString("en-us", {
                weekday: "short",
                month: "short",
                day: "numeric",
              }),
            },
          });
        }}
      />
      <svg
        height="20"
        width="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
        focusable="false"
        className={styles.downArrow}
      >
        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
      </svg>
    </div>
  );
};

DatePicker.propTypes = {
  setSelectedFilter: PropTypes.func.isRequired,
  selectedFilter: PropTypes.object.isRequired,
};

export default DatePicker;
