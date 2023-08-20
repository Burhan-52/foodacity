import { useParams } from "react-router-dom";
import { Img_Url } from "../../config";
import { MenuShimmer, Shimmer } from "./Shimmer";
import Star from "../assests/star.png";
import Clock from "../assests/clock.png";
import useRestaurant from "../utils/useRestaurant";
import { additem } from "../utils/store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Menuitem from "./Menuitem";
import ViewCart from "./ViewCart";

const Restaurantmenu = () => {
  const [count, setcount] = useState(0);
  const { id } = useParams();
  const [restaurant, resimg] = useRestaurant(id);
  const dispatch = useDispatch();

  const cartitem = useSelector((store) => store.cart.items);

  return (
    <>
      <div key={resimg?.id} className="carousel-container">
        <div className="carousel">
          <img className="carousel-img" src={Img_Url + resimg?.cloudinaryImageId} alt={resimg?.name} />
          <div>
            <div className="carousel-restaurant-name">{resimg?.name}</div>
            <div className="carousel-restaurant-cuisines">{resimg?.cuisines?.join(", ")}</div>
            <div className="carousel-restaurant-star-minutes">
              <div
                className="rating"
                style={
                  resimg?.avgRatingString < 4
                    ? { backgroundColor: "red" }
                    : resimg?.avgRatingString === "--"
                      ? { backgroundColor: "#939499", color: "black" }
                      : { color: "white" }
                }
              >
                {resimg.avgRatingString}
                {resimg?.avgRatingString !== "--" && <img className="star" src={Star} alt="Star" />}
              </div>
              <span>|</span>
              <div className="clock">
                <img src={Clock} alt="Clock" />
              </div>
              <div>{resimg?.sla?.slaString}</div>
            </div>
          </div>
        </div>
      </div>
      {!restaurant ? (
        <MenuShimmer />
      ) : (
        <div className="menu-container">
          <div className="recommended">Recommended ({restaurant.length})</div>
          {Object.keys(cartitem).length ? <ViewCart /> : ""}
          <div className="menu-items">
            {restaurant.map((item) => {
              return <Menuitem key={item.card?.info?.id} item={item} restaurantname={resimg.name} resimg={resimg.areaName}/>;
            })}
          </div>
        </div>
      )}

    </>
  );
};

export default Restaurantmenu;
