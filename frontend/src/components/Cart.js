import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { additem } from "../utils/store/cartSlice";
import useSaveProduct from "../utils/useSaveProduct";
import Address from "./Address";
import emptyCartLogo from '../assests/cart.jpg'

const Cart = () => {
  const dispatch = useDispatch();
  const cartitem = useSelector((store) => store.cart.items);
  const auth = useSelector((store) => store.auth.isauth);

  const [totalpay, settotalpay] = useState(0);

  useEffect(() => {
    const totalPayment = Object.values(cartitem)
      .map((item) => Math.round(item.price * item.quantity))
      .reduce((acc, curr) => acc + curr, 0);
    settotalpay(totalPayment);

  }, [cartitem, dispatch]);

  const [saveproduct] = useSaveProduct();

  const handleUpdateQuantityInDatabase = async (id, restaurantname, location, productname, quantity, price, action) => {
    try {
      const updatedQuantity = action === "add" ? quantity + 1 : quantity - 1;
      await saveproduct(restaurantname, location, productname, updatedQuantity, price, action);
      dispatch(additem({
        id, // Assuming you have an 'id' property for each product
        restaurantname,
        location,
        productname,
        quantity: updatedQuantity,
        price
      }));
    } catch (error) {
      console.error("Error updating quantity in the database:", error);
    }
  };

  return (
    <>
      {/* <div>Cart items</div> */}
      {Object.keys(cartitem).length === 0 ? (
        <div className="empty-cart">
          <div className="cart-logo">
            <img src={emptyCartLogo} alt="empty cart" />
          </div>
        </div>
      ) : (
        <div className="cart-main-container">
          <div className="first-conatiner">
            <div>
              {auth ? (
                <button disabled={auth} className="cart-btn">Login ✔</button>
              ) : (
                <Link to={"/login"}>
                  <button className="cart-btn">Login</button>
                </Link>
              )}
              <div className="margin">
                <Address />
              </div>
            </div>
          </div>
          <div className="second-conatiner">
            <div> {Object.values(cartitem)[0].restaurantname}</div>
            <div> {Object.values(cartitem)[0].location}</div>
            {Object.values(cartitem).map((item) => (
              <div key={item.id} className="cart-name-price">
                <div className="cart-name">{item.productname}</div>

                <div className="quantity-container ">

                  <button className="quantity-btn" onClick={() => handleUpdateQuantityInDatabase(item.id, item.restaurantname, item.location, item.productname, item.quantity, item.price, "add")}>+</button>
                  <span className="show-quantity">{item.quantity}</span>
                  <button className="quantity-btn" onClick={() => handleUpdateQuantityInDatabase(item.id, item.restaurantname, item.location, item.productname, item.quantity, item.price, "sub")}>-</button>
                </div>
                <div className="cart-price">{item.price * item.quantity}</div>
              </div>
            ))}
            <div className="cart-divider"></div>
            <div>
              <div className="pay">
                <div>To pay</div>
                <div>
                  ₹ {totalpay}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
