import React, { useContext } from "react";
import Select, { components } from "react-select";
import styles from "./MultipleSelect.module.scss";
import makeAnimated from "react-select/animated";
import PropTypes from "prop-types";
import { ThemeContext } from "../../context/ThemeContext";

const Option = (props) => {
  return (
    <components.Option {...props}>
      <div className={styles.option}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </div>
    </components.Option>
  );
};

const MultiValue = (props) => (
  <components.MultiValue {...props}>
    <span className={styles.multiValue}>{props.data.label}</span>
  </components.MultiValue>
);

const animatedComponents = makeAnimated({
  Option,
  MultiValue,
});

const MultipleSelect = ({
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

    multiValueLabel: (provided, state) => ({
      ...provided,
      color: state.hasValue ? "#468C11" : "inherit",
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: state.hasValue ? "#468C11" : "inherit",
    }),
  };
  return (
    <Select
      styles={customStyles}
      className={styles.container}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      isMulti={true}
      closeMenuOnSelect={false}
      components={animatedComponents}
      value={selectedState}
      hideSelectedOptions={false}
    />
  );
};

MultipleSelect.propTypes = {
  options: PropTypes.array,
  handleChange: PropTypes.func,
  selectedState: PropTypes.object,
  placeholder: PropTypes.string,
};

Option.propTypes = {
  isSelected: PropTypes.boolean,
  label: PropTypes.string,
};

MultiValue.propTypes = {
  data: PropTypes.object,
};

export default MultipleSelect;
