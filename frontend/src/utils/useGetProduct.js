import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../config";

const useGetProduct = (productName) => {

  const [product, setProduct] = useState({});

  const user = useSelector((store) => store.auth.user);

  const getProduct = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };

      const response = await fetch(
        `${server}/api/order/${user._id}`,
        requestOptions
      );
      const data = await response.json();

      if (data.products && data.products.length > 0) {
        const matchingProduct = data.products.find(
          (pro) => pro.productname === productName
        );

        if (matchingProduct) {

          
          setProduct({
            id: matchingProduct.id,
            restaurantname: matchingProduct.restaurantname,
            location: matchingProduct.location,
            productname: matchingProduct.productname,
            quantity: matchingProduct.quantity,
            price: matchingProduct.price,
          });


        } else {
          setProduct({});
        }
      }
    } catch (error) {
      console.log("Error fetching product data:", error);
      setProduct({});
    }
  };

  return [product, getProduct];
};

export default useGetProduct;
