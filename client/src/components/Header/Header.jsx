import React, { useContext } from "react";
import PropTypes from "prop-types";
import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown/ProfileDropdown";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import ThemeToggleSwitch from "../ThemeToggleSwitch/ThemeToggleSwitch";
import AttendeeImagePlaceholder from "../../assets/svg/attendee-placeholder.svg";
import OrganizerImagePlaceholder from "../../assets/svg/organizer-placeholder.svg";

const Header = ({ isSideMenuOpen, setIsSideMenuOpen }) => {
  const { authUser, isAuthenticated } = useContext(AuthContext);
  const imagePlaceholder =
    authUser?.role === "organizer"
      ? OrganizerImagePlaceholder
      : AttendeeImagePlaceholder;
  const imageUrl = authUser?.imageUrl || imagePlaceholder;
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {isSideMenuOpen ? (
          <AiOutlineClose
            className={styles.bars}
            onClick={() => setIsSideMenuOpen(false)}
          />
        ) : (
          <GiHamburgerMenu
            className={styles.bars}
            onClick={() => setIsSideMenuOpen(true)}
          />
        )}

        <div className={styles.leftContainer}>
          <NavLink to="/">Stichtingify</NavLink>
        </div>
        <div className={styles.rightContainer}>
          <ThemeToggleSwitch />
          {isAuthenticated ? (
            <>
              <NavLink
                to="/main-page"
                className={({ isActive }) => isActive && styles.active}
              >
                Explore events
              </NavLink>
              <NavLink
                to="/my-events"
                className={({ isActive }) => isActive && styles.active}
              >
                My Events
              </NavLink>
              <ProfileDropdown
                name={authUser?.name}
                imageUrl={authUser?.imageUrl}
              />
            </>
          ) : (
            <>
              <NavLink
                to="/main-page"
                className={({ isActive }) => isActive && styles.active}
              >
                Explore events
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) => isActive && styles.active}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) => isActive && styles.active}
              >
                Signup
              </NavLink>
            </>
          )}
          {authUser?.role === "organizer" && (
            <div className={styles.buttonWrapper}>
              <NavLink className={styles.organizeEvent} to="/create-event">
                Add event
              </NavLink>
            </div>
          )}
        </div>
        {isAuthenticated && (
          <Link
            className={styles.responsiveProfilePic}
            to={`/user-profile/${authUser._id}`}
          >
            <img src={imageUrl} alt="" />
          </Link>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  isSideMenuOpen: PropTypes.bool,
  setIsSideMenuOpen: PropTypes.func,
};

export default Header;
