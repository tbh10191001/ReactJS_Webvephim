import { createSlice } from '@reduxjs/toolkit';

const filmsSlice = createSlice({
    name: 'films',
    initialState: {
        films: {},
    },
    reducers: {
        saveFilms: (state, action) => {
            state.films = action.payload;
            localStorage.setItem('films', JSON.stringify(action.payload));
        },
        clear: (state, action) => {
            state = action.payload;
            // localStorage.removeItem('customer');
        },
        updateFilms: (state, action) => {
            const localstor = JSON.parse(localStorage.getItem('films'));
            localstor[action.payload.index] = action.payload;
            localstor.user.hoten = action.payload.hoten;
            localstor.user.gioitinh.data[0] = action.payload.gioitinh;
            localstor.user.cccd = action.payload.cccd;
            localStorage.setItem('films', JSON.stringify(localstor));
        },

        // updateUser: (state, action) => {
        //     state.customer.HoTen = action.payload.hoten;
        //     state.customer.GioiTinh = action.payload.gioitinh;
        //     state.customer.CCCD = action.payload.cccd;
        //     localStorage.setItem('customer', JSON.stringify(state.customer));
        // },
    },
});

export default filmsSlice;
