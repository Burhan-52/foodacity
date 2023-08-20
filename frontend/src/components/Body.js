import { useEffect, useState } from "react";
import Resturantcard from "./Restarantcard";
import { Shimmer } from "./Shimmer";
import { Link } from "react-router-dom";
import useRestaurantCard from "../utils/useRestaurantCard";
import useOnline from "../utils/useOnline";
import { useDispatch, useSelector } from "react-redux";
import { additem } from "../utils/store/cartSlice";
import RestaurantFilter from "./RestaurantFilter";
import SearchBar from "./SearchBar";
import { server } from "../../config";

const Body = () => {

  const [allrestaurant, searchFilteredTxt, suggestion, setsearchFilteredTxt] = useRestaurantCard()

  const auth = useSelector((store) => store.auth.isauth)

  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch()

  const getProductsFromAPI = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
  
      const response = await fetch(`${server}/api/order`, requestOptions);
      const data = await response.json();
  
      if (data.success && Array.isArray(data.products)) {
        data.products.forEach((product) => {
          const existingProduct = Object.values(cartItems).find(item => item.productname ===  product.productname);
  
          if (existingProduct) {
            // Update the existing product's quantity
            dispatch(
              additem({
                ...existingProduct,
                id: existingProduct.id,
              })
            );
          } else {
            // Add the new product
            dispatch(
              additem({
                id: product.id,
                restaurantname: product.restaurantname,
                location: product.location,
                productname: product.productname,
                quantity: product.quantity,
                price: product.price,
              })
            );
          }
        });
      }
    } catch (error) {
      console.log("Error fetching product data:", error);
    }
  };
  
  useEffect(() => {
    if (auth) {
      getProductsFromAPI();
    }
  }, [auth]);

  // TO check if user is online or offline
  const isonline = useOnline()
  if (!isonline) {
    return <h1>Are you offline,please check your internet </h1>
  }

  if (!allrestaurant) return null;

  return (
    <>
      <div className="search-filter-container">
        <SearchBar setsearchFilteredTxt={setsearchFilteredTxt} />
        <RestaurantFilter setsearchFilteredTxt={setsearchFilteredTxt} />
      </div>

      <div className="recommended-card">{searchFilteredTxt.length} restaurants</div>
      {
        allrestaurant == 0 ? <Shimmer /> : searchFilteredTxt.length == 0 ? <h3 className="restaurantnotfound">Restaurant is not Found!!</h3> :
          <div className="component-card">
            {searchFilteredTxt.map((res) => {
              return <Link key={res?.info?.id} to={"res/" + res?.info?.id}> <Resturantcard  {...res.info} /></Link>;
            })}
          </div>
      }

    </>
  );
};

export default Body;
