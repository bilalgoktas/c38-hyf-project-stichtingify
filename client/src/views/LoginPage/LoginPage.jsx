import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import "../SignUpPage/SignUpPage.css";

function LoginPage() {
  const [response, setResponse] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });

  const { setAuthUser } = useContext(AuthContext);

  const { isLoading, performFetch } = useFetch("/auth/login", (data) => {
    setResponse(data);
    setIsSubmit(false);
    if (data.success) {
      setAuthUser(data.authUser);
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
        return "input-container error";
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
          <h1>Login</h1>
          {isSubmit && isLoading ? <h4>Loading ..</h4> : ""}
        </div>
        <form className="signUp-form" onSubmit={(e) => handleSubmit(e)}>
          <div className={getInputClassName("account")}>
            <label>Email </label>
            <input
              type="email"
              placeholder="Enter your email address."
              required
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <p>{handleErrorMessage("account")}</p>
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
            <p>{handleErrorMessage("password")}</p>
          </div>
          <div className="login-message">
            <p>Do not have an account?</p>
            <NavLink to="/signup" className="login-button">
              SignUp
            </NavLink>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
