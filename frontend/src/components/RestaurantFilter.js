import React, { useState } from 'react'
import useRestaurantCard from '../utils/useRestaurantCard';
import { filterDataByCuisines, filterDataByDeliveryTime, filterDataByRating } from "../utils/helper";
import '../../Style/restaurantfilter.css';

const RestaurantFilter = ({ setsearchFilteredTxt }) => {
    const [allrestaurant] = useRestaurantCard();

    const [appliedFilters, setAppliedFilters] = useState([]);

    const applyFilters = () => {
        let filteredData = allrestaurant;
        // Apply the filters in the order you want
        appliedFilters.forEach((filter) => {
            switch (filter) {
                case "rating":
                    filteredData = filterDataByRating(filteredData);
                    break;
                case "deliveryTime":
                    filteredData = filterDataByDeliveryTime(filteredData);
                    break;
                case "cuisines":
                    const selectedCuisines = appliedFilters.filter(f => f !== "cuisines");
                    filteredData = filterDataByCuisines(filteredData, selectedCuisines);
                    break;
                // Add more cases for other filters if needed
                default:
                    break;
            }
        });

        setsearchFilteredTxt(filteredData);
    };

    const handleCuisineFilterChange = (selectedCuisine) => {
        setAppliedFilters((prevFilters) => {
          if (prevFilters.includes("cuisines")) {
            // If "cuisines" filter is already applied, update the selected cuisines array
            const hasSelectedCuisine = prevFilters.includes(selectedCuisine);
            const newCuisines = hasSelectedCuisine
              ? prevFilters.filter((cuisine) => cuisine !== selectedCuisine)
              : [...prevFilters, selectedCuisine];
      
            // If there are no selected cuisines, remove the "cuisines" filter as well
            if (newCuisines.length === 1) {
              return newCuisines.filter((filter) => filter !== "cuisines");
            }
      
            return newCuisines;
          } else {
            // If no "cuisines" filter is applied, add the selected cuisine
            return ["cuisines", selectedCuisine];
          }
        });
      };
      

    return (
        <div className="restaurant-filter">
            
            <button
                className={`filter-button ${appliedFilters.includes("rating") ? "active" : ""}`}
                onClick={() => {
                    // Toggle the "rating" filter in the appliedFilters array
                    setAppliedFilters((prevFilters) =>
                        prevFilters.includes("rating") ? prevFilters.filter((f) => f !== "rating") : [...prevFilters, "rating"]
                    );
                }}
            >
                rating 4.0+
            </button>

            <button
                className={`filter-button ${appliedFilters.includes("deliveryTime") ? "active" : ""}`}
                onClick={() => {
                    // Toggle the "deliveryTime" filter in the appliedFilters array
                    setAppliedFilters((prevFilters) =>
                        prevFilters.includes("deliveryTime")
                            ? prevFilters.filter((f) => f !== "deliveryTime")
                            : [...prevFilters, "deliveryTime"]
                    );
                }}
            >
                Fast Delivery
            </button>
                
            <select
                className="cuisines"
                onChange={(e) => handleCuisineFilterChange(e.target.value)}
                value={appliedFilters.includes("cuisines") ? appliedFilters[appliedFilters.length - 1] : ""}
            >
                <option value="">All Cuisines</option>
                <option value="Burger">Burger</option>
                <option value="Beverage">Beverage</option>
                <option value="Deserts">Deserts</option>
                <option value="Pizzas">Pizzas</option>
                <option value="Chinese">Chinese</option>
                <option value="Ice Cream">Ice Cream</option>
            </select>

            <button className="apply-button" onClick={applyFilters}>Apply Filters</button>
        </div>
    );
}

export default RestaurantFilter;
