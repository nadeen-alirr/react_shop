//customize only for users injectEndpoints to apislice endpoints

import { user_url } from "../constantvariable";
import { api_slice } from "./apiSlices";

export const User_Api_Slice = api_slice.injectEndpoints({
    endpoints: (builder) => ({
        Login: builder.mutation({
            query: (data) => ({
                url: `${user_url}/login`,
                method: "POST",
                body: data,
            }),
        }),
        Logout: builder.mutation({
            query: () => ({
                url: `${user_url}/logout`,
                method: "POST",    
            }),
        }),
        Registration : builder.mutation({
            query: (data) => ({
                url: `${user_url}/`,
                method: "POST",
                body: data,
            }),
        })
    }),
})

export const { useLoginMutation , useLogoutMutation ,useRegistrationMutation } = User_Api_Slice;