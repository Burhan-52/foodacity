import React, { useState } from 'react';
import { server } from '../../config';

const usePayment = () => {
    const checkoutHandler = async (amount) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    amount
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
            console.log(key.key)


            const options = {
                key: "rzp_test_EzdmHFsJFXOsGK",
                amount: amount * 100,
                currency: "INR",
                name: "foodacity",
                description: "Successfully integrated Razorpay API",
                image: "https://avatars.githubusercontent.com/u/25058652?v=4",
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
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.log(error);
        }
    };

    return [checkoutHandler];
};

export default usePayment;
