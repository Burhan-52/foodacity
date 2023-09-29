import React, { lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Headercomponenet from "./src/components/Header";
import Body from "./src/components/Body";
import { Footer } from "./src/components/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import Contact from "./src/components/Contact"
import Errorpage from "./src/components/Errorpage";
import Restaurantmenu from "./src/components/Restaurantmenu";
import Login from "./src/components/Login";
import Help from "./src/components/Help";
import { Provider, useDispatch } from "react-redux";
import store from "./src/utils/store/store";
import Cart from "./src/components/Cart";
import { Toaster } from "react-hot-toast";
import Signup from "./src/components/Signup";
import Address from "./src/components/Address";
import { Payment } from "./src/components/Payment";
import PaymentSuccess from "./src/components/PaymentSuccess";

const About = lazy(() => import('./src/components/About'))

const Applayout = () => {

    return (
        <>
            <Provider store={store}>
                <Headercomponenet />
                <Outlet />
                <Footer />
                <Toaster />
            </Provider>
        </>
    )
}

let appRoutes = createBrowserRouter([

    {
        path: "/",
        element: <Applayout />,
        errorElement: <Errorpage />,
        children: [
            {
                path: "/",
                element: <Body user="0hello" />
            },
            // Lazy componenet About 
            {
                path: "/about",
                element:
                    <Suspense fallback={<h1>Loading...</h1>}><About /></Suspense >
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/help",
                element: <Help />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/address",
                element: <Address />
            },
            {
                path: "/payment",
                element: <Payment />
            },
            {
                path: "/res/:id",
                element: < Restaurantmenu />
            },
            {
                path: "/paymentsuccess",
                element: < PaymentSuccess />
            },
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoutes} />);