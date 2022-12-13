import React, { useState } from "react";
import PropTypes from "prop-types";
import "../EventDetailsButtons/EventDetailsButtons.css";
import { useEffect } from "react";

function EventDetailsButtons({ event, setDetails, setDisplayLanguage }) {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    setSelectedLanguage(event.details[0].language);
  }, []);

  const getEventDetails = (e) => {
    const details = event.details.filter(
      (detailsByLanguage) =>
        detailsByLanguage.language === e.target.innerText.toLowerCase()
    );
    setDetails(details[0]);
    setSelectedLanguage(details[0].language);
  };

  const getButtonTitle = (detail) => {
    return detail.charAt(0).toUpperCase() + detail.slice(1);
  };

  return (
    <ul className="details-buttons">
      {event.details.map((detail, index) => (
        <li
          key={index}
          onClick={(e) => {
            getEventDetails(e);
            setDisplayLanguage(detail.language);
          }}
          className={
            detail.language === selectedLanguage
              ? "languageBtn active"
              : "languageBtn"
          }
        >
          {getButtonTitle(detail.language)}
        </li>
      ))}
    </ul>
  );
}

export default EventDetailsButtons;

EventDetailsButtons.propTypes = {
  event: PropTypes.object.isRequired,
  setDetails: PropTypes.func,
  setDisplayLanguage: PropTypes.func,
};
