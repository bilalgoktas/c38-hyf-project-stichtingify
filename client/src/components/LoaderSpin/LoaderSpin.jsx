import React from "react";
import styles from "./LoaderSpin.module.scss";

const LoaderSpin = () => {
  return (
    <div className={styles.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoaderSpin;
