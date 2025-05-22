import { createSlice } from '@reduxjs/toolkit';

const filmLocalSlice = createSlice({
    name: 'film',
    initialState: {
        film: {},
    },
    reducers: {
        saveFilm: (state, action) => {
            state.film = action.payload;
            localStorage.setItem('filmInfo', JSON.stringify(action.payload));
        },

        // updateUser: (state, action) => {
        //     state.customer.HoTen = action.payload.hoten;
        //     state.customer.GioiTinh = action.payload.gioitinh;
        //     state.customer.CCCD = action.payload.cccd;
        //     localStorage.setItem('customer', JSON.stringify(state.customer));
        // },
    },
});

export default filmLocalSlice;
