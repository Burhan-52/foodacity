import { useState } from 'react';
import { server } from '../../config';
import { useNavigate } from 'react-router-dom';

const usePayment = () => {
    const navigate = useNavigate()

    const [privatekey, setPrivateKey] = useState("")

    const checkoutHandler = async (amount) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    amount: parseInt(amount)
                }),
            };

            const response = await fetch(`${server}/api/payment`, requestOptions);
            const data = await response.json();

            const apiKey = await fetch(`${server}/api/getkey`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })
            const key = await apiKey.json();
            setPrivateKey(key.key)

            const options = {
                key: privatekey,
                amount: amount * 100,
                currency: "INR",
                name: "foodacity",
                description: "Successfully integrated Razorpay API",
                image: "",
                order_id: data.order.id, // Access order ID directly from the response data
                callback_url: `${server}/api/paymentverify`,
                prefill: {
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
                    contact: "9999999999"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                },
                modal: {
                    ondismiss: function () {
                        if (confirm("Are you sure, you want to cancel payment")) {
                            return navigate("/cart")
                        } else {
                            checkoutHandler(amount)
                        }
                    }
                }
            };

            const razor = new window.Razorpay(options);
            razor.open()

        } catch (error) {
            console.log(error);
        }
    };

    return [checkoutHandler];
};

export default usePayment;
