import {  configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice";
import addressSlice from "./addressSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        auth: authSlice,
        address: addressSlice
    }
})

export default store;
