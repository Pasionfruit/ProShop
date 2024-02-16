import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order}
            })
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/myorders`
            })
        }),
        getOrderById: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`
            })
        }),
        updateOrderToPaid: builder.mutation({
            query: (id, paymentResult) => ({
                url: `${ORDERS_URL}/${id}/pay`,
                method: 'PUT',
                body: {...paymentResult}
            })
        }),
        updateOrderToDelivered: builder.mutation({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}/deliver`,
                method: 'PUT'
            })
        }),
        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URL
            })
        })
    }),
    overrideExisting: false
});

export const {
    useCreateOrderMutation,
    useGetMyOrdersQuery,
    useGetOrderByIdQuery,
    useUpdateOrderToPaidMutation,
    useUpdateOrderToDeliveredMutation,
    useGetOrdersQuery
} = ordersApiSlice;