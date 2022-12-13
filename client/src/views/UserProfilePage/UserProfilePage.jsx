import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import DeleteItem from "../../components/DeleteItem/DeleteItem";
import LoaderSpin from "../../components/LoaderSpin/LoaderSpin";
import Popup from "../../components/Popup/Popup";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import "./UserProfilePage.css";

function UserProfilePage() {
  const [userData, setUserData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPopupTrigger, setIsPopupTrigger] = useState(false);

  const { authUser } = useContext(AuthContext);
  const { id: userId } = useParams();

  const { isLoading, performFetch } = useFetch(`/user/${userId}`, (data) => {
    if (data.success) {
      setUserData(data.result);
    } else {
      setErrorMessage(data.msg);
    }
  });

  useEffect(() => {
    performFetch({ method: "GET" });
  }, [userId]);

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div>
          <h1>Profile</h1>
          <p
            className={
              isLoading ? "loading msg" : errorMessage ? "error msg" : "msg"
            }
          >
            {isLoading ? <LoaderSpin /> : errorMessage ? errorMessage : ""}
          </p>
        </div>
        <div className="user-data">
          <p>Name</p>
          <p>{userData ? userData.name : "No data!"}</p>
        </div>
        <div className="user-data">
          <p>Email</p>
          <p>{userData ? userData.email : "No data!"}</p>
        </div>
        <div className="user-data">
          <p>Phone</p>
          <p>{userData ? userData.phone : "No data!"}</p>
        </div>
        {!authUser ? (
          ""
        ) : authUser._id === userId ? (
          <NavLink
            className="delete-user-button"
            to=""
            onClick={() => setIsPopupTrigger(true)}
          >
            Delete account
          </NavLink>
        ) : (
          ""
        )}
      </div>
      <Popup
        className="delete-popup"
        isTrigger={isPopupTrigger}
        setIsPopupTrigger={setIsPopupTrigger}
      >
        <DeleteItem
          setIsPopupTrigger={setIsPopupTrigger}
          url={`/user/${userId}`}
        />
      </Popup>
    </div>
  );
}

export default UserProfilePage;
