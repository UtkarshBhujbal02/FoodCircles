import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { swiggy_api_url } from "../Constants";
import useRestaurantData from "../utils/useRestaurantData";

import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";

const Body = () => {
  const [allRestaurant, FilterRes] = useRestaurantData(swiggy_api_url);
  const [searchInput, setSearchInput] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const searchData = (searchInput, restaurants) => {
    if (searchInput !== "") {
      const filteredData = filterData(searchInput, restaurants);
      setFilteredRestaurant(filteredData);
      setErrorMessage("");
      if (filteredData?.length === 0) {
        setErrorMessage(
          `Sorry, we couldn't find any results for "${searchInput}"`
        );
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurant(restaurants);
    }
  };
  const online = useOnline();
  
  if(!online){
    return <h1>offline , please check your internet connection!!!</h1>
  }

  if (!allRestaurant) return null;

  return (
    <div className="body-container">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search a restaurant you want..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            searchData(e.target.value, allRestaurant); //This is Responsible for filter on typing any text wihtout clicking search
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            searchData(searchInput, allRestaurant);
          }}
        >
          Search
        </button >
      </div>
      {errorMessage && <div className="error-container">{errorMessage}</div>}

      {allRestaurant?.length === 0 && FilterRes?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="restaurant-list">
          {(filteredRestaurant === null ? FilterRes : filteredRestaurant).map(
            (restaurant) => {
              return (
                <Link
                  to={"/restaurant/" + restaurant?.info?.id}
                  key={restaurant?.info?.id}
                >
                  <RestaurantCard {...restaurant?.info} />
                </Link>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default Body;
