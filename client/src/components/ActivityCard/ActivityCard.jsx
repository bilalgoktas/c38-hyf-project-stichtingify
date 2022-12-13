import React from "react";
import styles from "./ActivityCard.module.scss";
import PropTypes from "prop-types";

const ActivityCard = ({ image, title }) => {
  return (
    <div className={styles.container}>
      <img src={image} alt="" />
      <p>{title}</p>
    </div>
  );
};

ActivityCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
};

export default ActivityCard;
