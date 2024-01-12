import { configureStore } from "@reduxjs/toolkit";
import { api_slice } from "./slices/apiSlices";
import cartsliceReducer from "./slices/cartSlice";
const store = configureStore({
    reducer: {
        //state
        [api_slice.reducerPath]: api_slice.reducer ,
        cartSlice:cartsliceReducer
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat( api_slice.middleware),
        devTools: true
});

export default store;   
