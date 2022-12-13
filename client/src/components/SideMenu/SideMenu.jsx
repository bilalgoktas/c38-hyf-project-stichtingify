import React, { useContext } from "react";
import PropTypes from "prop-types";
import styles from "./SideMenu.module.scss";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { AuthContext } from "../../context/AuthContext";
import ThemeToggleSwitch from "../ThemeToggleSwitch/ThemeToggleSwitch";

const SideMenu = ({ isSideMenuOpen, setIsSideMenuOpen }) => {
  const { isAuthenticated, logOut } = useContext(AuthContext);

  return (
    <nav
      className={classNames(styles.container, isSideMenuOpen && styles.open)}
    >
      {isAuthenticated ? (
        <ul>
          <li onClick={() => setIsSideMenuOpen(false)}>
            <NavLink to="/main-page">Explore events</NavLink>
          </li>
          <li onClick={() => setIsSideMenuOpen(false)}>
            <NavLink to="/my-events">My events</NavLink>
          </li>
          <li onClick={() => setIsSideMenuOpen(false)}>
            {/* Change the path when profile page is ready */}
            <NavLink to="/">Profile</NavLink>
          </li>
          <li onClick={() => setIsSideMenuOpen(false)}>
            <span onClick={logOut}>Log out</span>
          </li>
        </ul>
      ) : (
        <ul>
          <li onClick={() => setIsSideMenuOpen(false)}>
            <NavLink to="/main-page">Explore events</NavLink>
          </li>
          <li onClick={() => setIsSideMenuOpen(false)}>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li onClick={() => setIsSideMenuOpen(false)}>
            <NavLink to="/signup">Signup</NavLink>
          </li>
        </ul>
      )}
      <ul>
        <li>
          <ThemeToggleSwitch className={styles.toggle} />
        </li>
      </ul>
    </nav>
  );
};

SideMenu.propTypes = {
  isSideMenuOpen: PropTypes.bool,
  setIsSideMenuOpen: PropTypes.func,
};

export default SideMenu;
