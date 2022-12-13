import React, { useState, useEffect } from "react";
import styles from "./MainPage.module.scss";
import EventCard from "../../components/EventCard/EventCard.jsx";
import SingleSelect from "../../components/SingleSelect/SingleSelect.jsx";
import MultipleSelect from "../../components/MultipleSelect/MultipleSelect.jsx";
import useFetch from "../../hooks/useFetch";
import LoaderSpin from "../../components/LoaderSpin/LoaderSpin.jsx";
import DatePicker from "../../components/DatePicker/DatePicker.jsx";
import NoEventFound from "../../components/NoEventFound/NoEventFound";
import megaphoneSvg from "../../assets/svg/megaphone.svg";

function MainPage() {
  const [filterOptions, setFilterOptions] = useState({
    city: [
      { value: "Amsterdam", label: "Amsterdam" },
      { value: "Rotterdam", label: "Rotterdam" },
      { value: "The Hague", label: "The Hague" },
      { value: "Utrecht", label: "Utrecht" },
      { value: "Eindhoven", label: "Eindhoven" },
      { value: "Groningen", label: "Groningen" },
      { value: "Tilburg", label: "Tilburg" },
      { value: "Almere", label: "Almere" },
      { value: "Breda", label: "Breda" },
      { value: "Nijmegen", label: "Nijmegen" },
    ],
    category: null,
    languages: [
      { value: "dutch", label: "Dutch" },
      { value: "english", label: "English" },
      { value: "arabic", label: "Arabic" },
    ],
    price: [
      { value: 0, label: "Free" },
      { value: 1, label: "Paid" },
    ],
  });
  const [selectedFilter, setSelectedFilter] = useState({
    startDate: null,
    city: null,
    category: null,
    languages: null,
    price: null,
  });
  const [paramsObject, setParamsObject] = useState({});
  const [events, setEvents] = useState([]);

  const { performFetch: categoryFetch } = useFetch(
    "/categories",
    (response) => {
      setFilterOptions({
        ...filterOptions,
        category: response.result.map((option) => ({
          value: option._id,
          label: option.name,
        })),
      });
    }
  );

  const {
    isLoading,
    error,
    performFetch: eventFetch,
  } = useFetch("/events/?" + new URLSearchParams(paramsObject), (response) => {
    setEvents(response.result);
  });

  useEffect(() => {
    categoryFetch();
  }, []);

  useEffect(() => {
    let obj = {
      startDate: selectedFilter.startDate?.value,
      city: selectedFilter.city?.value,
      category: selectedFilter.category?.map((item) => item.value),
      languages: selectedFilter.languages?.map((item) => item.value),
      price: selectedFilter.price?.value,
    };

    Object.keys(obj).forEach((key) => {
      if (obj[key] === undefined || obj[key].length === 0) {
        delete obj[key];
      }
    });

    setParamsObject(obj);
  }, [selectedFilter]);

  useEffect(() => {
    eventFetch();
  }, [paramsObject]);

  return (
    <div className={styles.container}>
      <h1>Explore events</h1>
      <div className={styles.filters}>
        <DatePicker
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        <SingleSelect
          handleChange={(e) => {
            setSelectedFilter({ ...selectedFilter, city: e });
          }}
          options={filterOptions.city}
          selectedState={selectedFilter.city}
          placeholder="Any city"
        />
        <MultipleSelect
          handleChange={(e) => {
            setSelectedFilter({ ...selectedFilter, category: e });
          }}
          options={filterOptions.category}
          selectedState={selectedFilter.category}
          placeholder="Any category"
        />
        <MultipleSelect
          handleChange={(e) => {
            setSelectedFilter({ ...selectedFilter, languages: e });
          }}
          options={filterOptions.languages}
          selectedState={selectedFilter.languages}
          placeholder="Any language"
        />
        <SingleSelect
          handleChange={(e) => {
            setSelectedFilter({ ...selectedFilter, price: e });
          }}
          options={filterOptions.price}
          selectedState={selectedFilter.price}
          placeholder="Any price"
        />
      </div>
      <div className={styles.events}>
        {isLoading ? (
          <LoaderSpin />
        ) : error ? (
          <NoEventFound
            svgImage={megaphoneSvg}
            msg={
              "<p>Sorry, there are no event results that match these filters </p>"
            }
          />
        ) : (
          events?.map((event, index) => <EventCard key={index} event={event} />)
        )}
      </div>
    </div>
  );
}

export default MainPage;
