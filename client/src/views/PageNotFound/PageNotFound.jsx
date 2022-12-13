import React from "react";
import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.scss";

const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>404</h1>
        <p>Page not found. Check the request or return to the home page.</p>
        <Link to="/">To the homepage</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
