import React from "react";
import ActivityCard from "../ActivityCard/ActivityCard";
import styles from "./Activities.module.scss";
import gameSvg from "../../assets/svg/game.svg";
import lessonSvg from "../../assets/svg/lesson.svg";
import meetupSvg from "../../assets/svg/meetup.svg";
import musicSvg from "../../assets/svg/music.svg";
import outdoorSvg from "../../assets/svg/outdoor.svg";
import sportsSvg from "../../assets/svg/sports.svg";
import informativeSvg from "../../assets/svg/informative.svg";
import artSvg from "../../assets/svg/art.svg";

const Activities = () => {
  return (
    <div className={styles.container}>
      <h2>ACTIVITIES</h2>
      <div className={styles.cards}>
        <ActivityCard image={gameSvg} title="Games" />
        <ActivityCard image={lessonSvg} title="Dutch lessons" />
        <ActivityCard image={meetupSvg} title="Meet-ups" />
        <ActivityCard image={musicSvg} title="Musical activities" />
        <ActivityCard image={outdoorSvg} title="Outdoor activites" />
        <ActivityCard image={sportsSvg} title="Sports" />
        <ActivityCard image={informativeSvg} title="Informative Sessions" />
        <ActivityCard image={artSvg} title="Artistic activites" />
      </div>
    </div>
  );
};

export default Activities;
