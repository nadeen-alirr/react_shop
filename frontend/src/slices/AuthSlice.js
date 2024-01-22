// this Auth slice to Authorization : contain user information about the authorization will add to store and provide it to the application (Lohin ,Regestration ,Logout) 

//set user credentials to local storage or remove them .

import { createSlice } from "@reduxjs/toolkit";

const initialState ={ userInfo: localStorage.getItem("userinfo")
?  JSON.parse(localStorage.getItem('userinfo')): null
} 

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        //actions
        setUserInformation: (state, action) => {
            state.userInfo =action.payload;
            localStorage.setItem("userinfo", JSON.stringify(action.payload));
        },

        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem("userinfo");
        },
}})

// export the action 
export const { setUserInformation , logout ,registration } = authSlice.actions;
//export to store
export default authSlice.reducer;
