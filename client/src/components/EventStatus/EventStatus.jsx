import classNames from "classnames";
import React from "react";
import styles from "./EventStatus.module.scss";
import PropTypes from "prop-types";

const EventStatus = ({ status }) => {
  return (
    <span
      className={classNames(
        styles.status,
        status === "published" ? styles.published : styles.draft
      )}
    >
      {status}
    </span>
  );
};

EventStatus.propTypes = {
  status: PropTypes.string,
};

export default EventStatus;
