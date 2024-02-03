import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [] };

const cartSclice = createSlice({
    name: 'cart',
    initialState,
    reducers: {}
});

export default cartSclice.reducer;