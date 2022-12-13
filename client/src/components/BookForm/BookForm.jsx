import React, { useState } from "react";
import styles from "./BookForm.module.scss";
import classNames from "classnames";
import { AiOutlineClose } from "react-icons/ai";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import mailSent from "../../assets/svg/mail-sent.svg";
import { MdError } from "react-icons/md";
import LoaderSpin from "../LoaderSpin/LoaderSpin";

const BookForm = ({ isBookFormOpen, setIsBookFormOpen, eventId }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    eventIds: [],
    role: "attendee",
  });
  const [attendeeDetails, setAttendeeDetails] = useState(null);

  const [isSuccess, setIsSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { performFetch: bookEvent, isLoading: bookLoading } = useFetch(
    "/events/book",
    (response) => {
      response.success === false && setError(response.msg);
      setIsSuccess(true);
    }
  );
  const { performFetch: createUser, isLoading: userLoading } = useFetch(
    "/user",
    (data) => {
      if (data.success === true) {
        setAttendeeDetails(data.user);
        bookEvent({
          method: "PUT",
          body: JSON.stringify({ eventId, userId: data.user._id }),
        });
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({
      method: "POST",
      body: JSON.stringify({ user: userData }),
    });
  };
  return (
    <div
      className={classNames(styles.container, isBookFormOpen && styles.open)}
    >
      {!isSuccess ? (
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.head}>
            <h3>Attend the event</h3>
            <AiOutlineClose
              className={styles.icon}
              onClick={() => {
                setIsSuccess(null);
                setIsBookFormOpen(false);
                setUserData({
                  name: "",
                  email: "",
                  phone: "",
                });
              }}
            />
          </div>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={userData.name}
              placeholder="Enter your name"
              required
              onChange={(e) => {
                setUserData({ ...userData, name: e.target.value });
              }}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={userData.email}
              placeholder="Enter your email address"
              required
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </label>
          <label>
            Phone
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              placeholder="Enter your phone number"
              required
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
          </label>
          <div className={styles.buttonsContainer}>
            <span
              onClick={() => {
                setIsSuccess(null);
                setUserData({
                  name: "",
                  email: "",
                  phone: "",
                });
                setIsBookFormOpen(false);
              }}
            >
              Cancel
            </span>
            <button type="submit">Confirm</button>
          </div>
        </form>
      ) : userLoading | bookLoading ? (
        <LoaderSpin />
      ) : error ? (
        <div className={styles.errorMessage}>
          <h4>Oops!</h4>
          <MdError className={styles.errorIcon} />
          <p>An error occurred</p>
          <p className={styles.msg}>{error}</p>
        </div>
      ) : (
        <div className={styles.successMessage}>
          <p className={styles.awesome}>Awesome!</p>
          <div className={styles.imageContainer}>
            <img src={mailSent} alt="" />
          </div>
          <p className={styles.id}>
            <span>attendee ID</span>
            {attendeeDetails?._id}
            <br />
            <span>email</span>
            {attendeeDetails?.email}
          </p>
          <p>
            Your booking has been confirmed
            <br />
            Please check your email for details
          </p>
        </div>
      )}
    </div>
  );
};

BookForm.propTypes = {
  isBookFormOpen: PropTypes.bool,
  setIsBookFormOpen: PropTypes.func,
  eventId: PropTypes.string,
};

export default BookForm;
