import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./EventCard.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsDot } from "react-icons/bs";
import ContextMenu from "../ContextMenu/ContextMenu";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import EventStatus from "../EventStatus/EventStatus";
import { padTo2Digits, dayNames, monthNames } from "../../util/dateFixer";

function EventCard({ event, showStatus }) {
  const navigate = useNavigate();
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const { authUser } = useContext(AuthContext);
  const doesUserOwnEvent = authUser?._id === event?.organizerId;

  const navigateToEventPage = () => navigate(`/events/${event._id}`);
  const handleClickMore = () => setIsContextMenuOpen(!isContextMenuOpen);

  // Detect click outside of context menu and close it
  const moreEl = useRef(null);
  useEffect(() => {
    const handleDocumentClick = (e) => {
      const target = e.target;
      if (moreEl.current && !moreEl.current.contains(target))
        setIsContextMenuOpen(false);
    };
    if (isContextMenuOpen)
      document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isContextMenuOpen, moreEl]);

  const completeContextButtonList = [
    {
      name: "Publish",
      onClick: () => {},
    },
    {
      name: "Edit",
      onClick: () => {},
    },
    {
      name: "Delete",
      onClick: () => {},
    },
  ];

  // Remove "Publish" button if event is already published
  const finalContextButtonList = completeContextButtonList.filter((button) =>
    event?.status === "published" && button.name === "Published" ? false : true
  );

  return (
    <div className={styles.container}>
      <img
        src={
          event.thumbnailUrl ||
          "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        }
        alt="Event image"
        onClick={navigateToEventPage}
      />
      <div className={styles.titleAndDetail} onClick={navigateToEventPage}>
        <div>
          <h3>{event.details[0]?.title || "Sample"}</h3>
          <p>
            {dayNames[new Date(event.startDate).getDay()]},{" "}
            {monthNames[new Date(event.startDate).getMonth()]}{" "}
            {new Date(event.startDate).getDate()}
            <BsDot className={styles.dot} />
            {padTo2Digits(new Date(event.startDate).getHours())}:
            {padTo2Digits(new Date(event.startDate).getMinutes())}{" "}
            <span>|</span>{" "}
            <span className={styles.attendeeAmount}>
              {event.attendeeIds.length}{" "}
              {event.attendeeIds.length > 1 ? "Attendees" : "Attendee"}
            </span>
          </p>
        </div>
        {showStatus && <EventStatus status={event.status} />}
      </div>

      <div className={styles.more} ref={moreEl}>
        {false && doesUserOwnEvent && (
          <>
            <div onClick={handleClickMore} className={styles.moreButton}>
              <BsThreeDotsVertical className={styles.icon} />
            </div>
            {isContextMenuOpen && (
              <ContextMenu buttonList={finalContextButtonList} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  showStatus: PropTypes.bool,
};
export default EventCard;
