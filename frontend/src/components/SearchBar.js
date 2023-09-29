import React, { useState } from 'react'
import useRestaurantCard from '../utils/useRestaurantCard';
import Search from "../assests/search.png"
import { filterData } from '../utils/helper';

const SearchBar = ({ setsearchFilteredTxt }) => {

    const [searchTxt, setsearchTxt] = useState("");

    const [allrestaurant, suggestion] = useRestaurantCard()

    const onsearch = (search) => {
        setsearchTxt(search)
    }
    
    return (
        <div style={{width:"100%"}} >
            <div className="search-container">

                <input
                    data-testid="search"
                    className="search"
                    type="Text"
                    placeholder="Search"
                    value={searchTxt}
                    onChange={(e) => setsearchTxt(e.target.value)}
                />
                <button
                    data-testid="btn"
                    className="search-btn"
                    onClick={() => {
                        let data = filterData(searchTxt, allrestaurant)
                        setsearchFilteredTxt(data)
                    }}>
                    <img className="search-img" src={Search}
                    />
                </button>
            </div>

            <div className="dropdown-container ">
                {suggestion && suggestion.filter((item) => {
                    const s = searchTxt.toLowerCase()
                    const name = item.info.name.toLowerCase()
                    return s && name.startsWith(s)
                })
                    .map((item, i) => {
                        return (
                            <div
                                key={i}
                                className="dropdown-row"
                                onClick={() => {
                                    onsearch(item.info.name)
                                }
                                }>{searchTxt != item.info.name ? item.info.name : ""}
                            </div>
                        )
                    })}
            </div>

        </div>
    )
}

export default SearchBar