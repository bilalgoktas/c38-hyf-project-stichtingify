import classNames from "classnames";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./AddLanguage.module.scss";
import SingleSelect from "../SingleSelect/SingleSelect";
import PropTypes from "prop-types";

const AddLanguage = ({
  isAddLanguageOpen,
  setIsAddLanguageOpen,
  addLanguageButton,
  defaultLanguages,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleSubmit = () => {
    addLanguageButton(selectedLanguage.value);
    setSelectedLanguage(null);
    setIsAddLanguageOpen(false);
  };
  return (
    <div
      className={classNames(styles.container, isAddLanguageOpen && styles.open)}
    >
      <div className={styles.head}>
        <h3>Add Language</h3>
        <AiOutlineClose
          className={styles.icon}
          onClick={() => {
            setSelectedLanguage(null);
            setIsAddLanguageOpen(false);
          }}
        />
      </div>
      <SingleSelect
        handleChange={(e) => setSelectedLanguage(e)}
        options={defaultLanguages}
        selectedState={selectedLanguage}
        placeholder="Select a language"
      />
      <div className={styles.buttonsContainer}>
        <span
          onClick={() => {
            setSelectedLanguage(null);
            setIsAddLanguageOpen(false);
          }}
        >
          Cancel
        </span>
        <span onClick={handleSubmit}>Save</span>
      </div>
    </div>
  );
};

AddLanguage.propTypes = {
  isAddLanguageOpen: PropTypes.bool,
  setIsAddLanguageOpen: PropTypes.func,
  addLanguageButton: PropTypes.func,
  defaultLanguages: PropTypes.array,
};

export default AddLanguage;
