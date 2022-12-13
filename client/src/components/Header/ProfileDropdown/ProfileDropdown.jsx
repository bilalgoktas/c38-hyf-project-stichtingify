import React from "react";
import PropTypes from "prop-types";
import styles from "./ProfileDropdown.module.scss";
import ContextMenu from "../../ContextMenu/ContextMenu";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { BsFillCaretDownFill as CaretDownIcon } from "react-icons/bs";
import OrganizerImagePlaceholder from "../../../assets/svg/organizer-placeholder.svg";
import AttendeeImagePlaceholder from "../../../assets/svg/attendee-placeholder.svg";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProfileDropdown = ({ name, imageUrl }) => {
  const { logOut, authUser } = useContext(AuthContext);
  const imagePlaceholder =
    authUser?.role === "organizer"
      ? OrganizerImagePlaceholder
      : AttendeeImagePlaceholder;
  imageUrl = imageUrl || imagePlaceholder;
  const [isUserProfile, setIsUserProfile] = useState(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState("");
  const handleClickDropdownButton = () =>
    setIsContextMenuOpen(!isContextMenuOpen);

  // Close when click outside
  const dropdownEl = useRef(null);
  useEffect(() => {
    const handleDocumentClick = (e) => {
      const target = e.target;
      if (dropdownEl.current && !dropdownEl.current.contains(target))
        setIsContextMenuOpen(false);
    };
    if (isContextMenuOpen)
      document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isContextMenuOpen, dropdownEl]);

  useEffect(() => {
    if (isUserProfile) {
      setIsUserProfile(false);
    }
  }, [isUserProfile]);

  return (
    <div className={styles.profileDropdown} ref={dropdownEl}>
      <div
        className={`${styles.profileDropdownButton} ${
          isContextMenuOpen ? styles.selected : ""
        }`}
        onClick={handleClickDropdownButton}
      >
        <img src={imageUrl} alt="userpic" />
        <span className={styles.userName}>{name}</span>
        <div className={styles.caretWrapper}>
          <CaretDownIcon />
        </div>
      </div>
      {isContextMenuOpen && (
        <ContextMenu
          style={{ top: "calc(100% + 8px)" }}
          buttonList={[
            {
              name: "Profile",
              onClick: () => setIsUserProfile(true),
            },
            {
              name: "Log out",
              onClick: logOut,
            },
          ]}
        />
      )}
      {isUserProfile ? <Navigate to={`/user-profile/${authUser._id}`} /> : ""}
    </div>
  );
};

ProfileDropdown.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default ProfileDropdown;
