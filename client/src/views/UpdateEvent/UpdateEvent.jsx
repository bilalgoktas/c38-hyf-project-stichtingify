import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import CreateEvent from "../CreateEvent/CreateEvent";
import "../UpdateEvent/UpdateEvent.css";

function UpdateEvent() {
  const { id: eventId } = useParams();
  const [event, setEvent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { isLoading, performFetch } = useFetch(`/events/${eventId}`, (data) => {
    if (data.success) {
      setEvent(data.result);
    } else {
      setErrorMessage(data.msg);
    }
  });

  useEffect(() => {
    performFetch({ method: "GET" });
  }, [eventId]);

  return (
    <div className="update-page">
      {isLoading ? (
        <p className="loading">Loading..</p>
      ) : errorMessage ? (
        <div className="error-div">
          <p className="error">Sorry, something went wrong! try again later.</p>
          <p className="error">{errorMessage}</p>
          <NavLink className="back-button" to={`/events/${eventId}`}>
            Back to event
          </NavLink>
        </div>
      ) : (
        <CreateEvent event={event} />
      )}
    </div>
  );
}

export default UpdateEvent;
