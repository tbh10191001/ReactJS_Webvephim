import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        payment: {},
    },
    reducers: {
        save: (state, action) => {
            state.cinemas = action.payload;
            localStorage.setItem('payment', JSON.stringify(action.payload));
        },
    },
});

export default paymentSlice;
