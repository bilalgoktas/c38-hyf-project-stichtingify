import React from "react";
import propTypes from "prop-types";
import attendeeImagePlaceholder from "../../../assets/svg/attendee-placeholder.svg";
import styles from "./AttendeeTable.module.scss";
import { BsTrash as DeleteIcon } from "react-icons/bs";
import useAttendees from "../../../hooks/useAttendees";
import LoaderSpin from "../../../components/LoaderSpin/LoaderSpin";

const AttendeeRow = ({ imageUrl, name, email, phone, onDelete }) => {
  imageUrl = imageUrl || attendeeImagePlaceholder;
  return (
    <tr>
      <td>
        <div className={styles.attendee}>
          <img src={imageUrl} alt="attendee's picture" />
          {name ? name : "No name"}
        </div>
      </td>
      <td>{email ? <a href={`mailto:${email}`}>{email}</a> : "–"}</td>
      <td>{phone ? <a href={`tel:${phone}`}>{phone}</a> : "–"}</td>
      <td>
        <button className={styles.deleteBtn} onClick={onDelete}>
          <DeleteIcon />
        </button>
      </td>
    </tr>
  );
};

const AttendeeTable = ({ attendeeIds, eventId }) => {
  const { attendees, deleteAttendeeFromEvent, error, isLoading } =
    useAttendees(attendeeIds);

  return (
    <>
      {isLoading && <LoaderSpin />}
      {error && <p>Error: cannot to get attendees</p>}
      {attendees?.length > 0 && (
        <table className={styles.attendeeTable}>
          <thead>
            <tr>
              <th>Attendee</th>
              <th>Email</th>
              <th colSpan="2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee) => (
              <AttendeeRow
                key={attendee?._id}
                imageUrl={attendee?.imageUrl}
                name={attendee?.name}
                email={attendee?.email}
                phone={attendee?.phone}
                onDelete={() =>
                  deleteAttendeeFromEvent({
                    attendeeId: attendee?._id,
                    eventId,
                  })
                }
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

AttendeeRow.propTypes = {
  imageUrl: propTypes.string,
  name: propTypes.string,
  email: propTypes.string,
  phone: propTypes.string,
  onDelete: propTypes.func,
};

AttendeeTable.propTypes = {
  attendeeIds: propTypes.array,
  eventId: propTypes.string,
};

export default AttendeeTable;
