
import { useState,useEffect } from "react";
const useRestaurant = (id) => {
    const [restaurant, setRestaurant] = useState(null);
    const [resimg, setResimg] = useState({});
  
    useEffect(() => {
        const isMobileView = window.innerWidth <= 800;
        const index = isMobileView ? 3 : 2;
  
        async function fetchRestaurantData() {
            try {
                const response = await fetch(`https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.1846034&lng=73.022458&restaurantId=${id}&submitAction=ENTER`);
                const json = await response.json();
                setRestaurant(json?.data?.cards[index]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards);
                setResimg(json?.data?.cards[0]?.card?.card?.info);
            } catch (error) {
                console.error('Error fetching restaurant data:', error);
            }
        }
  
        fetchRestaurantData();
    }, [id]);
  
    return [restaurant, resimg];
};

export default useRestaurant;
