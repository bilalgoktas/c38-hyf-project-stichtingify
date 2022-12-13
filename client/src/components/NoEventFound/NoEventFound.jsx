import React from "react";
import { Link } from "react-router-dom";
import styles from "./NoEventFound.module.scss";
import PropTypes from "prop-types";

const NoEventFound = ({ svgImage, msg, isOrganizer = false }) => {
  return (
    <div className={styles.container}>
      <img src={svgImage} alt="" />
      <div className={styles.msg} dangerouslySetInnerHTML={{ __html: msg }} />
      {isOrganizer && (
        <div className={styles.buttonWrapper}>
          <Link className={styles.organizeEvent} to="/create-event">
            Add event
          </Link>
        </div>
      )}
    </div>
  );
};

NoEventFound.propTypes = {
  svgImage: PropTypes.element,
  msg: PropTypes.string,
  isOrganizer: PropTypes.bool,
};

export default NoEventFound;
