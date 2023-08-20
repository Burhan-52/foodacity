import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
    name: "address",
    initialState: {
        details: {}
    },
    reducers: {
        getaddress: (state, action) => {
            state.details = action.payload
        }
    }

})
export const { getaddress } = addressSlice.actions
export default addressSlice.reducer