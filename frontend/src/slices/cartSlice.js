//this Cart slice contain reducer function() that will be called  when the slice is modified ,wil put it into store and provide it to app 

import { createSlice } from "@reduxjs/toolkit";
import { updatedState } from "../utils/CartUtils";

const initialState = localStorage.getItem("cart")
  ?  JSON.parse(localStorage.getItem("cart")) 
  : { cartItem : []}

const cartslice = createSlice({
  
  name: "cart",
  initialState,
  reducers: {
    //add action
    addToCart: (state, action) => {
      const Item_Add_To_Cart = action.payload;

      const existingItem = state.cartItem.find((n) => n._id === Item_Add_To_Cart._id);
      
      //quntity
      if (existingItem) {
        state.cartItem = state.cartItem.map((n) =>
          n._id === existingItem._id ? Item_Add_To_Cart : n
        );
      } else {
        state.cartItem = [...state.cartItem, Item_Add_To_Cart];
      }
      updatedState(state);
    },

    //removing action
    removeFromCart: (state, action) => {
      const Item_Remove_From_Cart_id = action.payload;
      state.cartItem = state.cartItem.filter((n) => n._id !== Item_Remove_From_Cart_id);
      return updatedState(state);
    }
  },
});

export const { addToCart ,removeFromCart } = cartslice.actions;

export default cartslice.reducer;
