import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customer: {},
    },
    reducers: {
        save: (state, action) => {
            console.log('save customer', action.payload);
            state.customer = action.payload;
            localStorage.setItem('customer', JSON.stringify(action.payload));
        },
        clear: (state, action) => {
            state.customer = action.payload;
            console.log('delete customer', action.payload);
            localStorage.removeItem('customer');
        },
        updateInfo: (state, action) => {
            state.customer = action.payload;
            localStorage.setItem('customer', JSON.stringify(action.payload));
        },
    },
});

export default customerSlice;
