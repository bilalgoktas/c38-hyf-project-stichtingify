import React from "react";
import PropTypes from "prop-types";
import "./DeleteItem.css";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function DeleteItem({ setIsPopupTrigger, url }) {
  const [deleteResponse, setDeleteResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [isNavigate, setIsNavigate] = useState(false);
  const { logOut } = useContext(AuthContext);

  const { isLoading, performFetch } = useFetch(url, (data) => {
    if (data.success) {
      setDeleteResponse(data);
    } else {
      setErrorMessage(data.msg);
    }
  });

  useEffect(() => {
    if (deleteResponse.success) {
      setTimeout(() => {
        if (url.includes("user")) {
          logOut();
        }

        setIsNavigate(true);
      }, 2000);
    }
  }, [deleteResponse]);

  useEffect(() => {
    if (isDelete) {
      performFetch({ method: "DELETE" });
      setIsDelete(false);
    }
  }, [isDelete]);

  return (
    <>
      {isLoading ? (
        <p className="loading DeleteMsg">Loading..</p>
      ) : errorMessage ? (
        <p className="error DeleteMsg">{errorMessage}</p>
      ) : deleteResponse ? (
        <p className="deleted DeleteMsg">{deleteResponse.msg}</p>
      ) : (
        <div className="delete-container">
          <h3>Delete the {url.includes("user") ? "user" : "event"}</h3>
          <p>
            Are you sure you want to delete{" "}
            {url.includes("user") ? "your account" : "this event"}?
          </p>
          <p>You cannot revert this change!</p>
          <div className="delete-buttons">
            <button onClick={() => setIsPopupTrigger(false)}>Cancel</button>
            <button onClick={() => setIsDelete(true)}>Delete</button>
          </div>
        </div>
      )}
      {isNavigate ? <Navigate to="/main-page" /> : ""}
    </>
  );
}

export default DeleteItem;

DeleteItem.propTypes = {
  setIsPopupTrigger: PropTypes.func,
  url: PropTypes.string,
};
