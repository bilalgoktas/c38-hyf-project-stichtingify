import React, { useState, useEffect } from "react";
import styles from "./MyEvents.module.scss";
import EventCard from "../../components/EventCard/EventCard.jsx";
import useFetch from "../../hooks/useFetch";
import LoaderSpin from "../../components/LoaderSpin/LoaderSpin.jsx";
import NoEventFound from "../../components/NoEventFound/NoEventFound";
import penSvg from "../../assets/svg/pen.svg";
import calendarSvg from "../../assets/svg/calendar.svg";
import eventSvg from "../../assets/svg/event.svg";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");

  const filters = [
    { value: "", label: "All Events" },
    { value: "published", label: "Published" },
    { value: "draft", label: "Drafts" },
  ];

  const { isLoading, performFetch: eventFetch } = useFetch(
    "/events/myevents",
    (response) => {
      setEvents(response.result);
    }
  );

  useEffect(() => {
    eventFetch();
  }, []);

  const renderSwitch = (activeFilter) => {
    switch (activeFilter) {
      case "":
        return (
          <NoEventFound
            svgImage={calendarSvg}
            msg={"<p>You don't have any events<br/>Try to create one</p>"}
            isOrganizer={true}
          />
        );
      case "published":
        return (
          <NoEventFound
            svgImage={eventSvg}
            msg={"<p>You don't host any events now</p>"}
            isOrganizer={true}
          />
        );
      case "draft":
        return (
          <NoEventFound
            svgImage={penSvg}
            msg={"<p>You don't have any draft-events</p>"}
            isOrganizer={true}
          />
        );
    }
  };

  return (
    <div className={styles.container}>
      <h1>My events</h1>
      <div className={styles.main}>
        <div className={styles.events}>
          {isLoading ? (
            <LoaderSpin />
          ) : events?.filter((event) =>
              activeFilter === "" ? true : event.status === activeFilter
            ).length > 0 ? (
            events
              .filter((event) =>
                activeFilter === "" ? true : event.status === activeFilter
              )
              .map((item, index) => (
                <EventCard key={index} event={item} showStatus={true} />
              ))
          ) : (
            renderSwitch(activeFilter)
          )}
        </div>
        <div className={styles.filters}>
          {filters.map((filter, index) => (
            <p
              key={index}
              onClick={() => setActiveFilter(filter.value)}
              className={activeFilter === filter.value && styles.active}
            >
              {filter.label}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyEvents;
