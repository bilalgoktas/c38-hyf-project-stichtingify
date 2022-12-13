import React, { useEffect, useState } from "react";
import styles from "./EventDetail.module.scss";
import { NavLink, useParams } from "react-router-dom";
import { AiOutlineClockCircle } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoLanguageOutline } from "react-icons/io5";
import useFetch from "../../hooks/useFetch";
import { Navigate } from "react-router";
import BookForm from "../../components/BookForm/BookForm";
import BackDrop from "../../components/BackDrop/BackDrop";
import EventDetailsButtons from "../../components/EventDetailsButtons/EventDetailsButtons";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import OrganizerDetails from "../../components/OrganizerDetails/OrganizerDetails";
import Category from "../../components/Category/Category";
import EventStatus from "../../components/EventStatus/EventStatus";
import AttendeeTable from "./AttendeeTable/AttendeeTable";
import classNames from "classnames";
import ActionButtons from "./ActionButtons/ActionButtons";
import Popup from "../../components/Popup/Popup";
import DeleteItem from "../../components/DeleteItem/DeleteItem";

function EventDetail() {
  const { id } = useParams();
  const [isBookFormOpen, setIsBookFormOpen] = useState(false);
  const { authUser, isAuthenticated } = useContext(AuthContext);

  const [event, setEvent] = useState("");

  // Delete
  const [isDelete, setIsDelete] = useState(false);
  const [isPopupTrigger, setIsPopupTrigger] = useState(false);

  // Update
  const [isUpdate, setIsUpdate] = useState(false);

  const [details, setDetails] = useState(null);

  const [isNavigate, setIsNavigate] = useState(false);

  const [displayLanguage, setDisplayLanguage] = useState("english");

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const rulesPlaceholders = {
    english: "No rules assigned",
    turkish: "Atanan kural yok",
    dutch: "Geen regels toegewezen",
    russian: "Правила не назначены",
    arabic: "لم يتم تعيين قواعد",
  };
  const toBringPlaceholders = {
    english: "Not specified",
    turkish: "Belirtilmedi",
    dutch: "Niet gespecificeerd",
    russian: "Не определен",
    arabic: "غير محدد",
  };

  const titles = {
    description: {
      english: "Description",
      turkish: "Açıklama",
      dutch: "Beschrijving",
      russian: "Описание",
      arabic: "وصف",
    },
    whatToBring: {
      english: "What to bring",
      turkish: "Getirilmesi gerekenler",
      dutch: "Wat mee te brengen",
      russian: "Что принести",
      arabic: "ماذا أحضر",
    },
    rulesToFollow: {
      english: "Rules to follow",
      turkish: "Kurallar",
      dutch: "Regels om te volgen",
      russian: "Правила, которым нужно следовать",
      arabic: "القواعد الواجب اتباعها",
    },
  };

  const { performFetch } = useFetch(`/events/${id}`, (data) => {
    if (data.success) {
      setEvent(data.result);
    }
  });

  useEffect(() => {
    performFetch({ method: "GET" });
  }, []);

  useEffect(() => {
    if (event) {
      setDetails(event.details[0]);
    }
  }, [event]);

  function padTo2Digits(num) {
    return String(num).padStart(2, "0");
  }

  const getDate = (date) => {
    return `
    ${dayNames[new Date(date).getDay()]},
    ${monthNames[new Date(date).getMonth()]} 
    ${new Date(date).getDate()}
  `;
  };
  const getHour = (date) => {
    return `
    ${padTo2Digits(new Date(date).getHours() - 1)}:${padTo2Digits(
      new Date(date).getMinutes()
    )}
  `;
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleAndCategories}>
        <div>
          {!event ? (
            ""
          ) : (
            <EventDetailsButtons
              event={event}
              setDetails={setDetails}
              setDisplayLanguage={setDisplayLanguage}
            />
          )}
        </div>
        <h2>{details ? details.title : ""}</h2>
        <div className={styles.categoryAndStatus}>
          {event ? <Category event={event} /> : "No categories"}
          {authUser?._id === event?.organizerId && (
            <EventStatus status={event.status} />
          )}
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.leftContainer}>
          <img className={styles.thumbnail} src={event.thumbnailUrl} alt="" />
          {event ? (
            <NavLink to={`/user-profile/${event.organizerId}`}>
              <OrganizerDetails event={event} />
            </NavLink>
          ) : (
            <p>Loading ..</p>
          )}
          <div className={styles.detailContainer}>
            <h3>{titles.description[displayLanguage]}</h3>
            <p>{details ? details.description : ""}</p>
          </div>
          <div className={styles.detailContainer}>
            <h3>{titles.whatToBring[displayLanguage]}</h3>
            <p>
              {details?.toBring[0]
                ? details.toBring[0]
                : toBringPlaceholders[displayLanguage]}
            </p>
          </div>
          <div className={styles.detailContainer}>
            <h3>{titles.rulesToFollow[displayLanguage]}</h3>
            <p>
              {details?.rules[0]
                ? details.rules[0]
                : rulesPlaceholders[displayLanguage]}
            </p>
          </div>
          {event?.attendeeIds?.length > 0 && (
            <div className={styles.detailContainer}>
              <h3>Attendees</h3>
              {event?.attendeeIds?.length > 0 && (
                <AttendeeTable
                  attendeeIds={event?.attendeeIds}
                  eventId={event?._id}
                />
              )}
            </div>
          )}
        </div>
        <div>
          <div
            className={classNames(
              !isAuthenticated | (authUser?._id !== event?.organizerId) &&
                styles.notAuth,
              styles.rightContainer
            )}
          >
            <ActionButtons
              organizerId={event?.organizerId}
              eventStatus={event?.status}
              onAttend={() => setIsBookFormOpen(true)}
              onDelete={() => {
                setIsDelete(true);
                setIsPopupTrigger(true);
              }}
              onEdit={() => {
                setIsUpdate(true);
                setIsNavigate(true);
              }}
            />
            <div>
              <div className={styles.metaContainer}>
                <AiOutlineClockCircle className={styles.icon} />
                <div>
                  <h4>When</h4>
                  <p>{getDate(event.startDate)}</p>
                  <p>{`${getHour(event.startDate)} – ${getHour(
                    event.endDate
                  )}`}</p>
                </div>
              </div>

              <div className={styles.metaContainer}>
                <GoLocation className={styles.icon} />
                <div>
                  <h4>Where</h4>
                  <p>
                    {`${event.address?.street} ${event.address?.number} ${event.address?.postalCode}`}
                  </p>
                  <p>{event.address?.city}</p>
                </div>
              </div>
              <div className={styles.metaContainer}>
                <IoLanguageOutline className={styles.icon} />
                <div>
                  <h4>Languages</h4>
                  <p>
                    {" "}
                    {event.languagesOfEvent
                      ?.map(
                        (language) =>
                          language.charAt(0).toUpperCase() + language.slice(1)
                      )
                      .join(", ")}
                  </p>
                </div>
              </div>
              <div className={styles.metaContainer}>
                <FaRegMoneyBillAlt className={styles.icon} />
                <div>
                  <h4>Price</h4>
                  <p>{event.price === 0 ? "Free" : `€ ${event.price}.-`}</p>
                </div>
              </div>
            </div>
          </div>

          {!isDelete ? (
            ""
          ) : (
            <Popup
              className="delete-popup"
              isTrigger={isPopupTrigger}
              setIsPopupTrigger={setIsPopupTrigger}
            >
              <DeleteItem
                setIsPopupTrigger={setIsPopupTrigger}
                url={`/events/${id}`}
              />
            </Popup>
          )}

          {isNavigate ? (
            isUpdate && event ? (
              <Navigate to={`/update-event/${event._id}`} />
            ) : (
              <Navigate to="/main-page" />
            )
          ) : (
            ""
          )}
        </div>
      </div>
      <BookForm
        isBookFormOpen={isBookFormOpen}
        setIsBookFormOpen={setIsBookFormOpen}
        eventId={id}
      />
      {isBookFormOpen && (
        <BackDrop
          handleClick={() => {
            setIsBookFormOpen(false);
            window.location.reload(false);
          }}
        />
      )}
    </div>
  );
}

export default EventDetail;
