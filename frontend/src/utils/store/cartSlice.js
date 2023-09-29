import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},
    totalItemsCount: 0,
  },

  reducers: {

    additem: (state, action) => {
      const { id, restaurantname, location, productname, quantity, price } = action.payload;

      if (quantity <= 0) {
        // If quantity becomes zero or negative, remove the item from the state
        delete state.items[id];
      } else {
        const newItem = { id, restaurantname, location, productname, quantity, price };
        state.items[id] = newItem; // Use the id as the key to store the item
      }

      const total = Object.values(state.items).reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.totalItemsCount = total;
    },

    emptyCart: (state) => {
      state.items = {}; // Set cart items to an empty object to clear the cart
    },

    removeitem: (state, action) => {
      const { id } = action.payload;
      delete state.items[id];
      state.count = state.count - 1;
    },

    clearitem: (state, action) => {
      state.items = []
    },

  },
  deleteitem: (state) => {
    state.items = {},
      state.totalItemsCount = 0
  }

})
export const { additem, emptyCart, topay, deleteitem } = cartSlice.actions;
export default cartSlice.reducer;