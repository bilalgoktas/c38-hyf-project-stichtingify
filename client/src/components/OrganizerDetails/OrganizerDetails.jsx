import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import PropTypes from "prop-types";
import styles from "../../views/EventDetail/EventDetail.module.scss";
import OrganizerImagePlaceholder from "../../assets/svg/organizer-placeholder.svg";

function OrganizerDetails({ event }) {
  const [organization, setOrganization] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const imageUrl = organization?.imageUrl || OrganizerImagePlaceholder;

  const { performFetch } = useFetch(`/user/${event.organizerId}`, (data) => {
    if (data.success) {
      setOrganization(data.result);
    } else {
      setErrorMessage(data.msg);
    }
  });

  useEffect(() => {
    performFetch({ method: "GET" });
  }, []);

  return (
    <div className={styles.hostedBy}>
      <img src={imageUrl} alt="organization logo" />
      <div>
        <p>Hosted by</p>
        {errorMessage ? <p>Unknown Organizer</p> : <p>{organization.name}</p>}
      </div>
    </div>
  );
}

export default OrganizerDetails;

OrganizerDetails.propTypes = {
  event: PropTypes.object.isRequired,
};
