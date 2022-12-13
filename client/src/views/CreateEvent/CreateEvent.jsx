import React, { useState } from "react";
import styles from "./CreateEvent.module.scss";
import classNames from "classnames";
import { Navigate } from "react-router";
import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import FormData from "form-data";
import uploadImage from "../../assets/svg/upload-image.svg";
import BackDrop from "../../components/BackDrop/BackDrop";
import AddLanguage from "../../components/AddLanguage/AddLanguage";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

function CreateEvent({ event }) {
  const { handleSubmit } = useForm();
  const eventForm = new FormData();

  const { id: eventId } = useParams();

  const [fetchUrl, setFetchUrl] = useState("/events");
  const [imageFile, setImageFile] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  // Event details:
  const [details, setDetails] = useState([
    { language: "english", title: "", description: "", toBring: "", rules: "" },
  ]);

  const [detailsInputs, setDetailsInputs] = useState({
    title: "",
    description: "",
    toBring: "",
    rules: "",
  });

  // Date and time:
  const [dateAndTime, setDateAndTime] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  // Event location:
  const [location, setLocation] = useState({
    city: "",
    street: "",
    number: "",
    postalCode: "",
  });

  // Event ( extra information )
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [presentationLanguages, setPresentationLanguages] = useState([]);
  const [selectedPresLanguage, setSelectedPresLanguage] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState(0);

  // Languages buttons:
  const [languageButtons, setLanguageButtons] = useState(["English"]);
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  // Draft event
  const [isDraft, setIsDraft] = useState(false);

  // Navigation after submit.
  const [isNavigate, setIsNavigate] = useState(false);

  // Inputs validation:
  const [isInputsValid, setIsInputsValid] = useState(false);

  // Clicking on submit:
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  //Is save details clicked:
  const [detailsNotSaved, setDetailsNotSaved] = useState(["english"]);

  // The response and the error:
  const [response, setResponse] = useState({});

  // The language switcher popup
  const [isAddLanguageOpen, setIsAddLanguageOpen] = useState(false);

  // All categories
  const [allCategories, setAllCategories] = useState([]);

  //Attendee IDs
  const [attendeeIds, setAttendeeIds] = useState([]);

  // ============================================================

  const defaultLanguages = [
    { _id: uuid(), value: "Arabic", label: "Arabic", name: "Arabic" },
    { _id: uuid(), value: "English", label: "English", name: "English" },
    { _id: uuid(), value: "Turkish", label: "Turkish", name: "Turkish" },
    { _id: uuid(), value: "Russian", label: "Russian", name: "Russian" },
    { _id: uuid(), value: "Dutch", label: "Dutch", name: "Dutch" },
  ];

  const defaultCities = [
    "Amsterdam",
    "Rotterdam",
    "The Hague",
    "Utrecht",
    "Eindhoven",
    "Groningen",
    "Tilburg",
    "Almere",
    "Breda",
    "Nijmegen",
  ];

  // ============================================================
  // Update an event // Set all the values //
  useEffect(() => {
    if (event) {
      // console.log(event);
      setFetchUrl(`/events/${event._id}`);
      setThumbnailUrl(event.thumbnailUrl);
      setIsDraft(false);
      setLocation(event.address);
      setCapacity(event.capacity);
      setPrice(event.price);
      setAttendeeIds(event.attendeeIds);

      // Set the details
      setDetailsNotSaved([]);
      setSelectedLanguage("english");
      setDetails(event.details);
      setLanguageButtons(
        event.details.map((detail) =>
          detail.language
            .split("")
            .map((letter, index) =>
              index === 0 ? letter.toUpperCase() : letter
            )
            .join("")
        )
      );
      setDetailsInputs(event.details[0]);

      // Set Event languages
      const eventLanguages = [];
      event.languagesOfEvent.forEach((eventLanguage) => {
        defaultLanguages.forEach((defLanguage) =>
          eventLanguage.toLowerCase() === defLanguage.value.toLocaleLowerCase()
            ? eventLanguages.push(defLanguage)
            : ""
        );
      });
      setPresentationLanguages(eventLanguages);
      setSelectedPresLanguage(eventLanguages[0]?.value);

      // Set categories
      const categories = [];
      event.categoryIds.forEach((eventCategoryId) => {
        allCategories.forEach((defCategory) =>
          eventCategoryId === defCategory._id
            ? categories.push(defCategory)
            : ""
        );
      });
      setCategories(categories);
      setSelectedCategory(categories[0]?.name);

      // Set data and time
      const dateAndTime = {
        date: event.startDate.slice(0, event.startDate.indexOf("T")),
        startTime: event.startDate.slice(event.startDate.indexOf("T") + 1, -8),
        endTime: event.endDate.slice(event.startDate.indexOf("T") + 1, -8),
      };
      setDateAndTime(dateAndTime);
    }
  }, [allCategories, eventId]);

  // Fetch hook
  // ==================================================
  const { performFetch, error, isLoading } = useFetch(fetchUrl, (data) => {
    setResponse(data);
  });

  const { performFetch: performCategoryFetch } = useFetch(
    "/categories/",
    (data) => {
      if (data.success) {
        setAllCategories(data.result);
      }
    }
  );

  useEffect(() => {
    performCategoryFetch({ method: "GET" });
  }, []);

  // ==================================================
  // To check the required inputs.
  const checkRequiredInputs = () => {
    if (
      detailsNotSaved.length === 0 &&
      detailsInputs.title &&
      detailsInputs.description
    ) {
      return true;
    } else {
      return false;
    }
  };
  // ==================================================
  // Creating the event object (schema).
  const getEventInfo = async () => {
    const isValid = checkRequiredInputs();
    if (!isValid) {
      return;
    } else {
      setIsInputsValid(true);
    }
    const newEvent = {
      status: isDraft ? "draft" : "published",
      startDate: `${dateAndTime.date}T${dateAndTime.startTime}:00.000Z`,
      endDate: `${dateAndTime.date}T${dateAndTime.endTime}:00.000Z`,
      address: location,
      capacity,
      price,
      attendeeIds: attendeeIds,
      languagesOfEvent: presentationLanguages.map((language) => language.value),
      categoryIds: categories.map((category) => category._id),
      details,
    };
    setIsSubmitClicked(true);

    eventForm.append("thumbnailUrl", imageFile);
    eventForm.append("event", JSON.stringify(newEvent));

    let requestOptions = {};
    if (eventId) {
      requestOptions = {
        method: "PUT",
        headers: {},
        body: eventForm,
      };
    } else {
      requestOptions = {
        method: "POST",
        headers: {},
        body: eventForm,
      };
    }
    performFetch(requestOptions);
    setIsNavigate(true);
  };

  // ==================================================
  // To get the language and the details which are saved in this language.
  const getLanguage = (e) => {
    e.preventDefault();
    const language = e.target.innerText.toLowerCase();
    setSelectedLanguage(language);

    const detailsByLanguage = details.find(
      (item) => item.language === language
    );

    if (detailsByLanguage) {
      setDetailsInputs({
        title: detailsByLanguage.title,
        description: detailsByLanguage.description,
        toBring: detailsByLanguage.toBring,
        rules: detailsByLanguage.rules,
      });
    } else {
      setDetailsInputs({
        title: "",
        description: "",
        toBring: "",
        rules: "",
      });
    }
  };

  // ==================================================
  // To update the details which not saved yet.
  const updateSavedDetails = (action, language) => {
    if (action === "add") {
      const savedItem = detailsNotSaved.some((item) => item === language);

      if (savedItem) {
        return;
      } else {
        setDetailsNotSaved([...detailsNotSaved, language.toLowerCase()]);
      }
    } else if (action === "remove-and-save") {
      if (!detailsInputs.title || !detailsInputs.description) {
        return;
      }
      const newDetailsNotSaved = detailsNotSaved.filter(
        (item) => item !== language
      );
      setDetailsNotSaved(newDetailsNotSaved);
    } else if (action === "remove-deleted-btn") {
      const newDetailsNotSaved = detailsNotSaved.filter(
        (item) => item !== language
      );
      setDetailsNotSaved(newDetailsNotSaved);
    }
  };
  // ==================================================
  // To save the details in a specific language.
  const saveDetails = (e) => {
    e.preventDefault();

    updateSavedDetails("remove-and-save", selectedLanguage);

    const detailsInLanguage = details.find(
      (item) => item.language === selectedLanguage
    );

    const newDetail = {
      language: selectedLanguage,
      title: detailsInputs.title,
      description: detailsInputs.description,
      toBring: detailsInputs.toBring,
      rules: detailsInputs.rules,
    };

    if (!detailsInLanguage) {
      setDetails([...details, newDetail]);
    } else {
      const newDetails = details.map((item) => {
        if (item.language === selectedLanguage) {
          return newDetail;
        } else {
          return item;
        }
      });

      setDetails(newDetails);
    }
  };
  // ==================================================
  // When the user want to add details in new language.
  const addLanguageButton = (language) => {
    const newLanguage = language;

    updateSavedDetails("add", newLanguage);

    const isLanguageButtonFound = languageButtons.includes(newLanguage);
    if (isLanguageButtonFound) {
      return;
    }
    setLanguageButtons((languageButtons) => [...languageButtons, newLanguage]);
  };

  // ==================================================
  // To delete the details in specific language.
  const deleteLanguageButton = (e) => {
    e.preventDefault();

    updateSavedDetails("remove-deleted-btn", selectedLanguage);

    const newDetails = details.filter(
      (item) => item.language !== selectedLanguage
    );
    setDetails(newDetails);

    const newLanguagesButtons = languageButtons.filter(
      (buttonTitle) => buttonTitle.toLowerCase() !== selectedLanguage
    );
    setLanguageButtons(newLanguagesButtons);
    setSelectedLanguage(languageButtons[0].toLowerCase());
    setDetailsInputs({
      title: details[0].title,
      description: details[0].description,
      rules: details[0].rules,
      toBring: details[0].toBring,
    });
  };
  // ==================================================
  // This function to cleaning the details fields.
  const clearDetails = (e) => {
    e.preventDefault();
    setDetailsInputs({
      title: "",
      description: "",
      toBring: "",
      rules: "",
    });

    const newDetails = details.map((item) => {
      if (item.language === selectedLanguage) {
        return {
          language: selectedLanguage,
          title: "",
          description: "",
          toBring: [],
          rules: [],
        };
      } else {
        return item;
      }
    });
    setDetails(newDetails);
  };
  // ==================================================
  // Adding Item (Category, presentation language) to the categories array.
  const AddItem = (e, setItems, defaultItems, items, setSelectedItem) => {
    const newItemName = e.target.value;

    const newItem = defaultItems.find((Item) => Item.name === newItemName);
    setSelectedItem(newItemName);
    const isItemFound = items.some((Item) => Item.name === newItemName);

    if (!isItemFound) {
      setItems([...items, newItem]);
    }
  };
  // ==================================================
  // Delete Item (Category, presentation language) from the categories array.
  const deleteItem = (e, setItems, Items, setSelectedItem) => {
    e.preventDefault();
    const itemId = e.target.id;
    const newItems = Items.filter((Item) => Item._id != itemId);
    setItems(newItems);

    if (newItems.length === 0) {
      setSelectedItem("");
    }
  };
  // ==================================================
  const handleMessages = () => {
    if (isInputsValid) {
      if (error) {
        return <p>Something went wrong, try again later.</p>;
      } else {
        return <h3>Valid inputs</h3>;
      }
    } else {
      return (
        <div>
          <p>Note: Please enter all fields marked with (*)</p>
          <div>
            {detailsNotSaved.length > 0 ? (
              <p>
                Fill in the tittle, description and save the details in:
                {detailsNotSaved.map(
                  (language) => ` ( ${language.toUpperCase()} ), `
                )}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    }
  };

  // ==================================================
  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(getEventInfo)}>
        <div className={styles.submitBar}>
          <div>
            <h4>Event creator</h4>
          </div>
          <div>{handleMessages()}</div>
          <div>
            <button type="submit">Publish</button>
            <button type="submit" onClick={() => setIsDraft(true)}>
              Save as draft
            </button>
          </div>
        </div>

        <div>
          {!isSubmitClicked ? "" : isLoading ? <h3>Loading.. </h3> : ""}
        </div>

        <div className={styles.inputsContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.imageUpload}>
              {imageFile ? (
                <img src={URL.createObjectURL(imageFile)} alt="Event image" />
              ) : (
                <img
                  className={styles.placeholderImage}
                  src={event ? thumbnailUrl : uploadImage}
                  alt=""
                />
              )}
              <label className={styles.customFileInput}>
                <input
                  type="file"
                  name="thumbnailUrl"
                  onChange={(e) => {
                    setImageFile(e.target.files[0]);
                  }}
                />
                {imageFile ? "Change image" : "Upload image"}
              </label>
              {imageFile && <p>{imageFile.name}</p>}
            </div>
            <div className={styles.languageNavBar}>
              {languageButtons.map((languageBtn, index) => (
                <button
                  key={index}
                  onClick={getLanguage}
                  className={
                    selectedLanguage === languageBtn.toLowerCase()
                      ? styles.active
                      : ""
                  }
                >
                  {languageBtn}
                </button>
              ))}
              <span
                className={styles.add}
                onClick={() => setIsAddLanguageOpen(true)}
              >
                + Add
              </span>
            </div>
            {selectedLanguage === "english" ? (
              ""
            ) : (
              <button
                className={styles.deleteBtn}
                onClick={deleteLanguageButton}
              >
                <FaRegTrashAlt className={styles.icon} />
                Delete{` "${selectedLanguage.toUpperCase()}"`}
              </button>
            )}

            <div className={styles.details}>
              <label>
                Title *
                <input
                  name="title"
                  value={detailsInputs.title}
                  placeholder="Title"
                  required
                  onBlur={(e) => saveDetails(e)}
                  onChange={(e) =>
                    setDetailsInputs({
                      ...detailsInputs,
                      title: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Description *
                <textarea
                  name="description"
                  value={detailsInputs.description}
                  placeholder="Event description"
                  required
                  onBlur={(e) => saveDetails(e)}
                  onChange={(e) =>
                    setDetailsInputs({
                      ...detailsInputs,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </label>

              <label>
                What to carry
                <textarea
                  name="details.toBring"
                  value={detailsInputs.toBring}
                  placeholder="What to carry"
                  onBlur={(e) => saveDetails(e)}
                  onChange={(e) =>
                    setDetailsInputs({
                      ...detailsInputs,
                      toBring: e.target.value,
                    })
                  }
                ></textarea>
              </label>

              <label>
                Rules to follow
                <textarea
                  name="details.rules"
                  value={detailsInputs.rules}
                  placeholder="Rules to follow"
                  onBlur={(e) => saveDetails(e)}
                  onChange={(e) =>
                    setDetailsInputs({
                      ...detailsInputs,
                      rules: e.target.value,
                    })
                  }
                ></textarea>
              </label>

              <div>
                <button className={styles.save} onClick={saveDetails}>
                  Save
                </button>
                <button className={styles.clear} onClick={clearDetails}>
                  Clear details
                </button>
              </div>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.section}>
              <h3>Date and Time</h3>
              <div>
                <label>
                  Date *
                  <input
                    name="startDate"
                    type="date"
                    value={dateAndTime.date}
                    placeholder="Date"
                    required
                    onChange={(e) =>
                      setDateAndTime({ ...dateAndTime, date: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className={classNames(styles.twoGrid, styles.lastRow)}>
                <label>
                  <span>Start time *</span>
                  <input
                    name="startTime"
                    type="time"
                    value={dateAndTime.startTime}
                    required
                    onChange={(e) =>
                      setDateAndTime({
                        ...dateAndTime,
                        startTime: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  <span>End time *</span>
                  <input
                    name="endTime"
                    type="time"
                    value={dateAndTime.endTime}
                    required
                    onChange={(e) =>
                      setDateAndTime({
                        ...dateAndTime,
                        endTime: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
            </div>
            <div className={styles.section}>
              <h3>Location</h3>
              <div className={styles.twoGrid}>
                <label>
                  City *
                  <select
                    name="city"
                    value={location.city}
                    placeholder="City"
                    required
                    onChange={(e) =>
                      setLocation({ ...location, city: e.target.value })
                    }
                  >
                    <option value="" hidden>
                      Choose City
                    </option>
                    {defaultCities.map((city, index) => (
                      <option key={index}>{city}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Street *
                  <input
                    name="street"
                    value={location.street}
                    placeholder="Street name"
                    required
                    onChange={(e) =>
                      setLocation({ ...location, street: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className={classNames(styles.twoGrid, styles.lastRow)}>
                <label>
                  Building number *
                  <input
                    name="number"
                    value={location.number}
                    placeholder="Building number"
                    required
                    onChange={(e) =>
                      setLocation({ ...location, number: e.target.value })
                    }
                  />
                </label>

                <label>
                  Postal Code *
                  <input
                    name="postalCode"
                    value={location.postalCode}
                    placeholder="Postal code"
                    required
                    onChange={(e) =>
                      setLocation({ ...location, postalCode: e.target.value })
                    }
                  />
                </label>
              </div>
            </div>
            <div className={styles.section}>
              <div>
                <label>
                  Category *
                  <select
                    name="categoryIds"
                    value={selectedCategory}
                    required
                    onChange={(e) =>
                      AddItem(
                        e,
                        setCategories,
                        allCategories,
                        categories,
                        setSelectedCategory
                      )
                    }
                  >
                    <option value="" hidden>
                      Choose category
                    </option>
                    {!allCategories.length > 0
                      ? ""
                      : allCategories.map((category) => (
                          <option key={category._id}>{category.name}</option>
                        ))}
                  </select>
                </label>
              </div>
              <div className={styles.selectedOptions}>
                <ul>
                  {categories.map((category) => (
                    <li key={category._id}>
                      {category.name}
                      <button
                        id={category._id}
                        onClick={(e) =>
                          deleteItem(
                            e,
                            setCategories,
                            categories,
                            setSelectedCategory
                          )
                        }
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <label>
                  Presentation language *
                  <select
                    name="languagesOfEvent"
                    value={selectedPresLanguage}
                    required
                    onChange={(e) =>
                      AddItem(
                        e,
                        setPresentationLanguages,
                        defaultLanguages,
                        presentationLanguages,
                        setSelectedPresLanguage
                      )
                    }
                  >
                    <option value="" hidden>
                      Choose language
                    </option>
                    {defaultLanguages.map((language) => (
                      <option key={language._id}>{language.name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className={styles.selectedOptions}>
                <ul>
                  {presentationLanguages.map((language, index) => (
                    <li key={index}>
                      {language.name}
                      <button
                        id={language._id}
                        onClick={(e) =>
                          deleteItem(
                            e,
                            setPresentationLanguages,
                            presentationLanguages,
                            setSelectedPresLanguage
                          )
                        }
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={classNames(styles.twoGrid, styles.lastRow)}>
                <label>
                  Capacity *
                  <input
                    type="number"
                    name="capacity"
                    value={capacity}
                    placeholder="Capacity"
                    required
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                </label>
                <label>
                  Pricing *
                  <input
                    type="number"
                    name="price"
                    value={price}
                    placeholder="Event pricing"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        {!response.success ? (
          ""
        ) : isNavigate ? (
          <Navigate to="/main-page" />
        ) : (
          ""
        )}
      </form>
      <AddLanguage
        isAddLanguageOpen={isAddLanguageOpen}
        setIsAddLanguageOpen={setIsAddLanguageOpen}
        defaultLanguages={defaultLanguages}
        addLanguageButton={addLanguageButton}
      />
      {isAddLanguageOpen && (
        <BackDrop
          handleClick={() => {
            setIsAddLanguageOpen(false);
          }}
        />
      )}
    </>
  );
}

export default CreateEvent;

CreateEvent.propTypes = {
  event: PropTypes.object,
};
