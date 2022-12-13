import React from "react";
import styles from "./BackDrop.module.scss";
import PropTypes from "prop-types";

const BackDrop = ({ handleClick }) => (
  <div className={styles.backdrop} onClick={handleClick} />
);

BackDrop.propTypes = {
  handleClick: PropTypes.func,
};

export default BackDrop;
