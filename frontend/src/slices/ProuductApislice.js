//only for prouduct end points
import { Prouducts_url } from "../constantvariable";
import { api_slice } from "./apiSlices";

export const prouduct_Api_slice = api_slice.injectEndpoints({
  endpoints: (builder) => ({
    GetProuducts: builder.query({
      query: () => ({
        url: Prouducts_url,
      }),
      keepUnusedDataFor: 5,
    }),
    GetOneProuduct: builder.query({
      query:(id)=>({
        url:`${Prouducts_url}/${id}`
      }),
      keepUnusedDataFor: 5,
    })
    
  }),
});

export const { useGetProuductsQuery ,useGetOneProuductQuery} = prouduct_Api_slice;
