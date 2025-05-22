import { createSlice } from '@reduxjs/toolkit';

const showtimeSlice = createSlice({
    name: 'showtime',
    initialState: {
        showtime: {},
    },
    reducers: {
        saveShowtime: (state, action) => {
            state.films = action.payload;
            localStorage.setItem('showtime', JSON.stringify(action.payload));
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

export default showtimeSlice;
