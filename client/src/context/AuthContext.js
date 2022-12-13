import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null); // null if unauthenticated
  const navigate = useNavigate();
  const isAuthenticated = authUser ? true : false;
  const { performFetch: checkAuth } = useFetch("/auth", (res) => {
    if (!res.success) throw new Error(res.msg);
    setAuthUser(res.authUser);
  });

  // Log out
  const { performFetch: performLogOut } = useFetch("/auth/logout", (res) => {
    if (!res.success) throw new Error(res.msg);
    setAuthUser(res.authUser);
    navigate("/");
  });
  const logOut = () => performLogOut({ method: "DELETE" });

  // Check auth once after page loads
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, isAuthenticated, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};
