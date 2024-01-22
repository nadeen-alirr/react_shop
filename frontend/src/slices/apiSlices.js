import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { Base_url } from '../constantvariable';


const baseQuery= fetchBaseQuery({url: Base_url})
export const api_slice = createApi({
    baseQuery,
    tagTypes:['Product','Order','User'],
    endpoints: (builder) => ({
     //endpoints quires
    })
})
