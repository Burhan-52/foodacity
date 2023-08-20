import { useSelector } from 'react-redux';
import { server } from '../../config';

const useSaveProduct = () => {
    const auth = useSelector((store) => store.auth.user || "");

    const saveProduct = async (restaurantname, location, name, quantity, price, action) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({

                    restaurantname,
                    location,
                    productname: name,
                    quantity,
                    price,
                    action
                }),
            }

            const response = await fetch(`${server}/api/order`, requestOptions);
            const data = await response.json();
           
        } catch (error) {
            console.log("Error saving product:", error);
        }
    };

    return [saveProduct];
};

export default useSaveProduct;
