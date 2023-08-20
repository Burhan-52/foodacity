import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { additem, emptyCart } from "../utils/store/cartSlice";
import useGetProduct from "../utils/useGetProduct";
import useSaveProduct from "../utils/useSaveProduct";
import useDeleteProduct from "../utils/useDeleteProduct";

const ItemQuantity = (props) => {
  const [count, setCount] = useState(0);
  const [product, getProduct] = useGetProduct(props.item?.card?.info.name);
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const auth = useSelector((store) => store.auth.user || "");
  const [deleteproduct] = useDeleteProduct()

  const [saveProduct] = useSaveProduct();

  const handleAddItem = (productInfo, action) => {
    setCount(count + 1);
    savepro(productInfo, action);
  };

  const handleRemoveItem = (productInfo, action) => {

    setCount(count - 1);
    savepro(productInfo, action);

  };
  const savepro = async (productInfo, action) => {
    try {
      const newQuantity = action === "add" ? count + 1 : count - 1;

      // Check if the existing product's restaurant name matches the current restaurant
      const existingProduct = Object.values(cartItems).find(
        (item) => item.productname !== productInfo.name && item.restaurantname !== props.restaurantname
      );

      if (existingProduct && existingProduct.restaurantname !== props.restaurantname) {
        const confirmClearCart = window.confirm(
          "Adding items from a different restaurant will clear your cart. Do you want to continue?"
        );
        if (confirmClearCart) {
         await deleteproduct()
          dispatch(emptyCart());
          await saveProduct(

            props.restaurantname,
            props.resimg,
            productInfo.name,
            newQuantity,
            productInfo.price / 100,
            action
          );

          const newItem = {
            id: productInfo.id, // Use the id to uniquely identify the item
            restaurantname: props.restaurantname,
            location: props.resimg,
            productname: productInfo.name,
            quantity: newQuantity,
            price: productInfo.price / 100,
          };
          dispatch(additem(newItem));

        } else {
          setCount(0)
          
        }
      } else {
        // Save the product to the backend
        await saveProduct(
          props.restaurantname,
          props.resimg,
          productInfo.name,
          newQuantity,
          productInfo.price / 100,
          action
        );

        if (existingProduct) {
          // If the product is already in the cart, update the quantity
          dispatch(
            additem({
              ...existingProduct,
              quantity: newQuantity,
            })
          );
        } else {
          // If the product is not in the cart, add it as a new item
          const newItem = {
            id: productInfo.id, // Use the id to uniquely identify the item
            restaurantname: props.restaurantname,
            location: props.resimg,
            productname: productInfo.name,
            quantity: newQuantity,
            price: productInfo.price / 100,
          };
          dispatch(additem(newItem));
        }
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  useEffect(() => {
    // Check if the user is authenticated before fetching products
    if (auth) {
      getProduct();
    }
  }, [auth]);

  if (product === null) {
    // Product data is still being fetched, show a loading message or spinner
    return <div>Loading...</div>;
  }

  const productName = product?.productname || "";

  return (
    <div className="quantity-container">
      <div className="quantity-btn" onClick={() => handleAddItem(props.item?.card?.info, "add")}>+</div>
      <div className="show-quantity">
        {product.quantity ? product.quantity + count : count}
      </div>
      <button
        className="quantity-btn"
        disabled={product.quantity <= 0 || count <= 0}
        onClick={() => handleRemoveItem(props.item?.card?.info, "sub")}
      >
        -
      </button>
    </div>
  );
};

export default ItemQuantity;
