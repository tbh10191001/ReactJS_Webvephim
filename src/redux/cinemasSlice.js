import { createSlice } from '@reduxjs/toolkit';

const cinemasSlice = createSlice({
    name: 'cinemas',
    initialState: {
        cinemas: {},
    },
    reducers: {
        saveCinemas: (state, action) => {
            state.cinemas = action.payload;
            localStorage.setItem('cinemas', JSON.stringify(action.payload));
        },
        clear: (state, action) => {
            state = action.payload;
            // localStorage.removeItem('customer');
        },
        // updateUser: (state, action) => {
        //     state.customer.HoTen = action.payload.hoten;
        //     state.customer.GioiTinh = action.payload.gioitinh;
        //     state.customer.CCCD = action.payload.cccd;
        //     localStorage.setItem('customer', JSON.stringify(state.customer));
        // },
    },
});

export default cinemasSlice;
