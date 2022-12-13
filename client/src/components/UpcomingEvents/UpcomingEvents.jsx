import React, { useEffect, useState } from "react";
import UpcomingEventCard from "../UpcomingEventCard/UpcomingEventCard";
import styles from "./UpcomingEvents.module.scss";
import useFetch from "../../hooks/useFetch";

const UpcomingEvents = () => {
  const [activities, setActivities] = useState([]);

  const { performFetch } = useFetch("/events/upcomingevents", (response) => {
    setActivities(response.result);
  });

  useEffect(() => {
    performFetch();
  }, []);
  return (
    <div className={styles.container}>
      <h2>UPCOMING EVENTS</h2>
      <div className={styles.cards}>
        {activities.map((activity) => (
          <div key={activity._id}>
            <UpcomingEventCard
              eventId={activity._id}
              thumbnail={activity.thumbnailUrl}
              title={activity.details[0].title}
              description={activity.details[0].description}
              price={activity.price}
              address={activity.address}
              startDate={activity.startDate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
