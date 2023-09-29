import { Img_Url } from "../../config";
import { useEffect } from "react";
import ItemQuantity from "./ItemQuantity";
import useGetProduct from "../utils/useGetProduct";

const Menuitem = (props) => {

    const [product, getProduct] = useGetProduct(props.item?.card?.info?.name)

    useEffect(() => {
        if(localStorage.getItem("authToken")){
            getProduct();
        }
    }, []);

    return (
        <>
            <div key={props.item?.card?.info?.id} className="restaurant-menu-container">
                <div className="restaurant-menu">
                    <div>
                        <div className="restaurant-menu-name">
                            {product.productname === props.item?.card?.info?.name
                                ? product.productname
                                : props.item?.card?.info?.name}
                        </div>
                        <div className="restaurant-menu-price">
                            &#8377;{!(props.item?.card?.info?.price) ? "--" : props.item?.card?.info?.price / 100}
                        </div>
                    </div>
                    <div>
                        <img className="restaurant-menu-img" src={Img_Url + props.item?.card?.info?.imageId} />

                        <ItemQuantity  {...props} />

                    </div>
                </div>
            </div>

            <div className="divider"></div>
        </>
    );
};

export default Menuitem;
