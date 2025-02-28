import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APIKEY = "yum-i0jmhtjgqKZhp6Hl";
const TENANT_ID = "etj2"; 

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/",
    prepareHeaders: (headers) => {
      headers.set("x-zocom", APIKEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: () => "menu",
    }),
    postOrder: builder.mutation({
      query: (orderData) => ({
        url: `${TENANT_ID}/orders`,
        method: "POST",
        body: orderData,
      }),
    }),
    getOrder: builder.query({
      query: (orderId) => `${TENANT_ID}/orders/${orderId}`,
    }),
  }),
});

export const { useGetMenuQuery, usePostOrderMutation, useGetOrderQuery } = apiSlice;
