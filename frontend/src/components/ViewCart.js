import React from 'react'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

export default function ViewCart() {
    const cartitem = useSelector(store => store.cart.items)
    return (
        <div className='popup-main-container'>
            <div className='popup-container'>
                <div className='items-price'>
                    <div>{Object.keys(cartitem).length} Items</div><span style={{ margin: "0 5px" }}>|</span>
                    <div> ₹ {Object.values(cartitem)
                        .map((item) => Math.round(item.price * item.quantity))
                        .reduce((acc, curr) => acc + curr, 0)}
                    </div>
                </div>
                <Link to={"/Cart"}> <div style={{ color: "white" }}>VIEWCART</div></Link>
            </div>
        </div>
    )
}
