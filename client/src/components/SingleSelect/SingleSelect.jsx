import React from "react";
import Select, { components } from "react-select";
import styles from "./SingleSelect.module.scss";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Option = (props) => {
  return (
    <components.Option {...props}>
      <div className={styles.option}>
        <input type="radio" checked={props.isSelected} onChange={() => null} />{" "}
        <label>{props.label}</label>
      </div>
    </components.Option>
  );
};

const SingleSelect = ({
  options,
  handleChange,
  selectedState,
  placeholder,
}) => {
  const { currentTheme } = useContext(ThemeContext);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor:
        currentTheme === "light"
          ? state.hasValue
            ? "#F0F6EC"
            : "transparent"
          : state.hasValue
          ? "#272727"
          : "#222222",
      border:
        currentTheme === "light" ? "1px solid #00000014" : "1px solid #303030",
      borderRadius: "8px",
      color: "#808080",
      fontSize: "16px",
      lineHeight: "16px",
    }),

    menu: (provided, state) => ({
      ...provided,
      backgroundColor:
        currentTheme === "light"
          ? state.hasValue
            ? "#F0F6EC"
            : "#ffffff"
          : state.hasValue
          ? "#272727"
          : "#222222",
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor:
        currentTheme === "light"
          ? state.isFocused
            ? "skyblue"
            : "#fff"
          : state.isFocused
          ? "smokegray"
          : "#222222",
      color: currentTheme === "light" ? "black" : "#fff",
    }),

    singleValue: (provided, state) => ({
      ...provided,
      color: state.hasValue ? "#468C11" : "inherit",
    }),
  };
  return (
    <Select
      className={styles.container}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      closeMenuOnSelect={true}
      components={{
        Option,
      }}
      value={selectedState}
      hideSelectedOptions={false}
      styles={customStyles}
      isClearable
    />
  );
};

SingleSelect.propTypes = {
  options: PropTypes.array,
  handleChange: PropTypes.func,
  selectedState: PropTypes.object,
  placeholder: PropTypes.string,
};

Option.propTypes = {
  isSelected: PropTypes.bool,
  label: PropTypes.string,
};

export default SingleSelect;
