import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import PropTypes from "prop-types";
import "../Category/Category.css";

function Category({ event }) {
  const [allCategories, setAllCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { isLoading, performFetch } = useFetch("/categories/", (data) => {
    if (data.success) {
      setAllCategories(data.result);
    } else {
      setErrorMessage(data.msg);
    }
  });

  useEffect(() => {
    performFetch({ method: "GET" });
  }, []);

  const getEventCategory = () => {
    const categoryNames = [];

    allCategories.forEach((category) => {
      event.categoryIds.forEach((categoryId) => {
        if (categoryId === category._id) {
          categoryNames.push(category.name);
        }
      });
    });
    return categoryNames;
  };

  return (
    <div>
      {isLoading ? (
        <p className="loading">Loading..</p>
      ) : errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : getEventCategory().length > 0 ? (
        <div className="category-container">
          {getEventCategory().map((category, index) => (
            <p key={index} className="category-item">
              {category}
            </p>
          ))}
        </div>
      ) : (
        <p>No category.</p>
      )}
    </div>
  );
}

export default Category;

Category.propTypes = {
  event: PropTypes.object,
};
