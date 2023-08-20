import { useState, useEffect } from "react";

function useRestaurantCard() {
    const [allrestaurant, setallrestaurant] = useState([]);
    const [searchFilteredTxt, setsearchFilteredTxt] = useState([]);
    const [suggestion, setsuggestion] = useState([]);

    const isMobileView = window.innerWidth <= 800;
    
    const fetchData = async () => {

        try {
            let data = await fetch(
                isMobileView
                    ? 'https://corsproxy.io/?https://www.swiggy.com/mapi/homepage/getCards?lat=19.1846034&lng=73.022458'
                    : 'https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.1844709&lng=73.0235553&page_type=DESKTOP_WEB_LISTING'
            );
            let json = await data.json();
            const index = isMobileView
                ? json?.data?.success?.cards[1]?.gridWidget?.gridElements?.infoWithStyle?.restaurants
                : json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

            setallrestaurant(index);
            setsearchFilteredTxt(index);
            setsuggestion(index);
        } catch (err) {
            console.log('There was an error fetching data:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [isMobileView]); // Run the effect only on component mount

    return [allrestaurant, searchFilteredTxt, suggestion, setsearchFilteredTxt];
}

export default useRestaurantCard;
