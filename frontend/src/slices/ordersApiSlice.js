import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';
import { PAYPAL_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order},
                credentials: 'include',
            }),
            onError: (error, query) => {
                // Handle error, e.g., show a toast or dispatch an action
                console.error('An error occurred:', error);
            },
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
                credentials: 'include',
            }),
            keepUnusedDataFor: 5
        }),
        payOrder: builder.mutation({
            query: ({orderId, details}) => ({
                url: `${ORDERS_URL}/${orderId}/pay/`,
                method: 'PUT',
                body: {...details},
                credentials: 'include',
            }),
        }),
        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
                credentials: 'include',
            }),
            keepUnusedDataFor: 5,
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/mine`,
                credentials: 'include',
            }),
            keepUnusedDataFor: 5,
        }),
        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URL,
                credentials: 'include',
            }),
            keepUnusedDataFor: 5,
        }),
        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/delivered`,
                method: 'PUT',
                credentials: 'include',
            }),
        }),
    }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, 
    useGetPayPalClientIdQuery, useGetMyOrdersQuery,
    useDeliverOrderMutation, useGetOrdersQuery } = ordersApiSlice;