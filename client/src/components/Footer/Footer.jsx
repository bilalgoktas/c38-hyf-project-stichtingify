import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
import {
  BsInstagram,
  BsLinkedin,
  BsYoutube,
  BsTwitter,
  BsFacebook,
  BsGithub,
} from "react-icons/bs";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.firstContainer}>
          <h1>Stichtingify</h1>
          <p>Let&apos;s get integrated together</p>
          <div className={styles.socialLinks}>
            <Link className={styles.socialLink} to="/">
              <BsInstagram className={styles.icon} />
            </Link>
            <Link className={styles.socialLink} to="/">
              <BsLinkedin className={styles.icon} />
            </Link>
            <Link className={styles.socialLink} to="/">
              <BsYoutube className={styles.icon} />
            </Link>
            <Link className={styles.socialLink} to="/">
              <BsTwitter className={styles.icon} />
            </Link>
            <Link className={styles.socialLink} to="/">
              <BsFacebook className={styles.icon} />
            </Link>
            <Link className={styles.socialLink} to="/">
              <BsGithub className={styles.icon} />
            </Link>
          </div>
          <p className={styles.copyright}>
            © 2022 Stichtingify, All rights reserved.
          </p>
        </div>
        <div className={styles.quickLinks}>
          <h3>Our Service</h3>
          <ul>
            <li>
              <Link to="/">Our Work</Link>
            </li>
            <li>
              <Link to="/">About us</Link>
            </li>
            <li>
              <Link to="/">Contact us</Link>
            </li>
            <li>
              <Link to="/">FAQs</Link>
            </li>
          </ul>
        </div>
        <div className={styles.quickLinks}>
          <h3>Company</h3>
          <ul>
            <li>
              <Link to="/">Press</Link>
            </li>
            <li>
              <Link to="/">Careers</Link>
            </li>
            <li>
              <Link to="/">Privacy policy</Link>
            </li>
            <li>
              <Link to="/">Terms of service</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
