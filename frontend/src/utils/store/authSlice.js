import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isauth: false,
        isLoading: false,
        user: null,
        error: null,
    },

    reducers: {
        authStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        authSuccess: (state, action) => {
            const { _id, name, email, img } = action.payload
            const newItem = { _id, name, email, img };
            state.user = newItem
            state.isLoading = false;
            state.error = null;
            state.isauth = true

        },
        authFailure: (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
            state.isauth = false
        },
        logout: (state) => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
            state.isauth = false
        },
    },
});

export const { authStart, authSuccess, authFailure, logout } = authSlice.actions;
export default authSlice.reducer;