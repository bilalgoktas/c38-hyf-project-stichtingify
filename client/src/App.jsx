import "./App.css";
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Application from "./components/Application";
import MainPage from "./views/MainPage/MainPage";
import CreateEvent from "./views/CreateEvent/CreateEvent";
import WelcomePage from "./views/WelcomePage/WelcomePage";
import EventDetail from "./views/EventDetail/EventDetail";
import { ThemeContext } from "./context/ThemeContext";
import LoginPage from "./views/LoginPage/LoginPage";
import SignUpPage from "./views/SignUpPage/SignUpPage";
import { AuthContext } from "./context/AuthContext";
import MyEvents from "./views/MyEvents/MyEvents";
import UserProfilePage from "./views/UserProfilePage/UserProfilePage";
import PageNotFound from "./views/PageNotFound/PageNotFound";
import UpdateEvent from "./views/UpdateEvent/UpdateEvent";

function App() {
  const { currentTheme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="App" theme={currentTheme}>
      <Routes>
        <Route path="/" element={<Application />}>
          <Route
            path="/signup"
            element={
              !isAuthenticated ? <SignUpPage /> : <Navigate to="/main-page" />
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? <LoginPage /> : <Navigate to="/main-page" />
            }
          />
          <Route path="" element={<WelcomePage />} />
          <Route path="main-page" element={<MainPage />} />
          <Route path="my-events" element={<MyEvents />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="update-event/:id" element={<UpdateEvent />} />
          <Route path="events/:id" element={<EventDetail />} />
          <Route path="user-profile/:id" element={<UserProfilePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
