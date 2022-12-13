import React, { useRef } from "react";
import styles from "./WelcomePage.module.scss";
import handsImage from "../../assets/image/hands-image.png";
import ScrollDown from "../../components/ScrollDown/ScrollDown";
import { Link } from "react-router-dom";
import Activities from "../../components/Activities/Activities";
import UpcomingEvents from "../../components/UpcomingEvents/UpcomingEvents";

function WelcomePage() {
  const activitiesRef = useRef(null);
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <div>
          <h1>
            <span>Let&apos;s</span> <br />
            <span>get integrated</span> <br />
            <span>together</span>
          </h1>
          <div className={styles.upAnimation}>
            <p>
              Are you a refugee that is eager to become part of the Dutch
              community? Come then! Take part in our events and meetings where
              you can find new Dutch friends, learn the language, and get
              guidance on life in the Netherlands. All events are organized by
              non-profits for refugees.
            </p>
            <div className={styles.links}>
              <div className={styles.link}>
                <Link to="/main-page">See events</Link>
              </div>
              <div className={styles.link}>
                <Link to="/">Contact us</Link>
              </div>
            </div>
          </div>
        </div>
        <img src={handsImage} alt="" />
      </div>
      <div
        className={styles.scrollDown}
        onClick={() => {
          activitiesRef.current.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <ScrollDown />
      </div>
      <div ref={activitiesRef}>
        <Activities />
      </div>
      <UpcomingEvents />
    </div>
  );
}

export default WelcomePage;
