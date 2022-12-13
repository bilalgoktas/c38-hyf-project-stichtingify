import React, { useState } from "react";
import styles from "./Application.module.scss";
import { Outlet } from "react-router-dom";
import { EventsProvider } from "../context/EventsProvider";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import SideMenu from "./SideMenu/SideMenu";
import BackDrop from "./BackDrop/BackDrop";

function Application() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  return (
    <div>
      <EventsProvider>
        <Header
          isSideMenuOpen={isSideMenuOpen}
          setIsSideMenuOpen={setIsSideMenuOpen}
        />
        <SideMenu
          isSideMenuOpen={isSideMenuOpen}
          setIsSideMenuOpen={setIsSideMenuOpen}
        />
        {isSideMenuOpen && (
          <BackDrop handleClick={() => setIsSideMenuOpen(false)} />
        )}
        <div className={styles.content}>
          <Outlet />
        </div>
        <Footer />
      </EventsProvider>
    </div>
  );
}

export default Application;
