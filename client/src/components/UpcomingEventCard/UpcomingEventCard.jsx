import React from "react";
import styles from "./UpcomingEventCard.module.scss";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { padTo2Digits, dayNames, monthNames } from "../../util/dateFixer";

const UpcomingEventCard = ({
  thumbnail,
  title,
  description,
  price,
  address,
  eventId,
  startDate,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.flipCard}>
        <div className={styles.flipCardInner}>
          <div className={styles.flipCardFront}>
            <img src={thumbnail} alt="" />
            <div className={styles.details}>
              <div className={styles.title}>
                <p>
                  {dayNames[new Date(startDate).getDay()]},{" "}
                  {monthNames[new Date(startDate).getMonth()]}{" "}
                  {new Date(startDate).getDate()}
                  <BsDot className={styles.dot} />
                  {padTo2Digits(new Date(startDate).getHours())}:
                  {padTo2Digits(new Date(startDate).getMinutes())}{" "}
                </p>
                <h3>{title}</h3>
              </div>
              <div className={styles.address}>
                <p>
                  {`${address.street} ${address.number}`}
                  <br />
                  {address.city}
                </p>
              </div>
              <p className={styles.price}>
                {price === 0 ? "Free" : `€${price}`}
              </p>
            </div>
          </div>
          <div className={styles.flipCardBack}>
            <h3>{title}</h3>
            <p>{description}</p>
            <Link to={`/events/${eventId}`}>See details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

UpcomingEventCard.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  address: PropTypes.string,
  eventId: PropTypes.string,
  startDate: PropTypes.string,
};

export default UpcomingEventCard;
