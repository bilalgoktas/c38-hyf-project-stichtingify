import React from "react";
import "../SignUpPage/SignUpPage.css";
import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function SignUpPage() {
  const [response, setResponse] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    role: "organizer",
    email: "",
    password: "",
    phone: "",
    eventIds: [],
  });

  const onSuccess = () => {
    setUserData({
      name: "",
      role: "organizer",
      email: "",
      password: "",
      phone: "",
      eventIds: [],
    });
  };

  const { setAuthUser } = useContext(AuthContext);

  const { isLoading, performFetch } = useFetch("/auth/signup", (data) => {
    setResponse(data);
    setIsSubmit(false);
    if (data.success) {
      setAuthUser(data.authUser);
      onSuccess();
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestDetails = {
      method: "POST",
      body: JSON.stringify({ user: userData }),
    };
    performFetch(requestDetails);
    setIsSubmit(true);
  };

  const handleErrorMessage = (inputTitle) => {
    if (response) {
      if (!response.success && response.msg.includes(inputTitle)) {
        return response.msg;
      }
    }
  };

  const getInputClassName = (inputTitle) => {
    if (response) {
      if (!response.success && response.msg.includes(inputTitle)) {
        return "input-container error-status";
      } else {
        return "input-container";
      }
    } else {
      return "input-container";
    }
  };

  return (
    <div className="main-page">
      <div className="signUp-container">
        <div className="signup-title-box">
          <h1>Sign Up</h1>
          {isSubmit && isLoading ? <h4>Loading ..</h4> : ""}
        </div>
        <form className="signUp-form" onSubmit={(e) => handleSubmit(e)}>
          <div className={getInputClassName("name")}>
            <label>Organization name</label>
            <input
              type="input"
              placeholder="Enter your organization name."
              required
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </div>
          <div className={getInputClassName("email")}>
            <label>Email </label>
            <input
              type="email"
              placeholder="Enter your email address."
              required
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <p>{handleErrorMessage("email")}</p>
          </div>
          <div className={getInputClassName("phone")}>
            <label>Phone</label>
            <input
              type="tel"
              placeholder="Enter your phone number."
              required
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
            <p>{handleErrorMessage("phone")}</p>
          </div>
          <div className={getInputClassName("password")}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password."
              required
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>
          <div className="login-message">
            <p>Already have an account?</p>
            <NavLink to="/login" className="login-button">
              Login
            </NavLink>
          </div>
          <button type="submit">SignUp</button>
        </form>
        {isSubmit && response.isAuthenticated ? (
          <Navigate to="/main-page" />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SignUpPage;
