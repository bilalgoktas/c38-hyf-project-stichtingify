import React from "react";
import styles from "./ScrollDown.module.scss";

const ScrollDown = () => {
  return (
    <div className={styles.scrollDowns}>
      <div className={styles.mousey}>
        <div className={styles.scroller}></div>
      </div>
    </div>
  );
};

export default ScrollDown;
