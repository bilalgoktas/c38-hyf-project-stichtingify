import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import styles from "./ActionButtons.module.scss";
import propTypes from "prop-types";

const ActionButtons = ({
  onAttend = () => {},
  onDelete = () => {},
  onEdit = () => {},
  onPublish = () => {},
  organizerId,
  eventStatus,
}) => {
  const { authUser, isAuthenticated } = useContext(AuthContext);
  const isHost = authUser?._id === organizerId;
  const isDraft = eventStatus === "draft";

  const publishBtn = (
    <button className={styles.publishBtn} onPublish={onPublish}>
      Publish
    </button>
  );
  const editBtn = (
    <button className={styles.editBtn} onClick={onEdit}>
      Edit
    </button>
  );
  const deleteBtn = (
    <button className={styles.deleteBtn} onClick={onDelete}>
      Delete
    </button>
  );
  const attendBtn = (
    <button className={styles.attendBtn} onClick={onAttend}>
      Attend
    </button>
  );
  return (
    <div className={styles.btnContainer}>
      {false && isHost && isDraft && publishBtn}
      {isHost && editBtn}
      {isHost && deleteBtn}
      {!isAuthenticated && attendBtn}
    </div>
  );
};

ActionButtons.propTypes = {
  onAttend: propTypes.func,
  onDelete: propTypes.func,
  onEdit: propTypes.func,
  onPublish: propTypes.func,
  organizerId: propTypes.string,
  eventStatus: propTypes.string,
};

export default ActionButtons;
