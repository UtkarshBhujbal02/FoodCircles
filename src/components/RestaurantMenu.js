import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../Constants";
import { MenuShimmer } from "./Shimmer";
import { useEffect, useState } from "react";
import { swiggy_menu_api_URL } from "../Constants";
import { MENU_ITEM_TYPE_KEY, RESTAURANT_TYPE_KEY,  ITEM_IMG_CDN_URL, } from "../Constants";
import useRestaurant from "../utils/useRestaurantMenu";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";


const RestaurantMenu = () => {
  const { resId } = useParams();
  const dispatch = useDispatch();

  const addFoodItem = (item) => {
    dispatch(addItem(item));
  }

  // const [restaurant, setRestaurant] = useState(null);

  const [restaurant, menuItems] = useRestaurant(
    swiggy_menu_api_URL,
    resId,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY
  );


  // useEffect(() => {
  //   getRestaurantInfo();
  // }, []);

  // async function getRestaurantInfo() {
  //   try {
  //     const data = await fetch(
  //       "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.5719139&lng=73.8231593&restaurantId=" + resId
  //     );
  //     const json = await data.json();
  //     console.log(json.data);
  //     setRestaurant(json?.data?.cards[2]?.card?.card?.info);

  //     setMenuItems(
  //       json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards
  //     );
  //     const menuItemsData =
  //       json?.data?.cards
  //         .find((x) => x.groupedCard)
  //         ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
  //         ?.filter((x) => x["@type"] == MENU_ITEM_TYPE_KEY)
  //         ?.map((x) => x.itemCards)
  //         .flat()
  //         .map((x) => x.card?.info) || [];

  //     const uniqueMenuItems = [];
  //     menuItemsData.forEach((item) => {
  //       if (!uniqueMenuItems.find((x) => x.id === item.id)) {
  //         uniqueMenuItems.push(item);
  //       }
  //     });
  //     setMenuItems(uniqueMenuItems);
  //   } catch (error) {
  //     setMenuItems([]);
  //     setRestaurant(null);
  //     console.log(error);
  //   }
  // }
  return !restaurant ? (
    <MenuShimmer />
  ) : (
    <div className="restaurant-menu">
      <div className="restaurant-summary">
        <img
          className="restaurant-img"
          src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
          alt={restaurant?.name}
        />
        <div className="restaurant-summary-details">
          <h2 className="restaurant-title">{restaurant?.name}</h2>
          <p className="restaurant-tags">{restaurant?.cuisines?.join(", ")}</p>
          <div className="restaurant-details">
            <div
              className="restaurant-rating"
              style={
                restaurant?.avgRating < 4
                  ? { backgroundColor: "var(--light-red)" }
                  : restaurant?.avgRating === "--"
                  ? { backgroundColor: "white", color: "black" }
                  : { color: "white" }
              }
            >
              <i className="fa-solid fa-star"></i>
              <span>{restaurant?.avgRating}</span>
            </div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.sla?.slaString}</div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.costForTwoMessage}</div>
          </div>
        </div>
      </div>

      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-title-wrap">
            <h3 className="menu-title">Recommended</h3>
            <p className="menu-count">{menuItems.length} ITEMS</p>
          </div>
          <div className="menu-items-list">
            {menuItems.map((item) => (
              <div className="menu-item" key={item?.id}>
                <div className="menu-item-details">
                  <h3 className="item-title">{item?.name}</h3>
                  <p className="item-cost">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                  </p>
                  <p className="item-desc">{item?.description}</p>
                </div>
                <div className="menu-img-wrapper">
                  {item?.imageId && (
                    <img
                      className="menu-item-img"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )}
                  <button className="add-btn" onClick={()=>addFoodItem(item)} > ADD + </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
