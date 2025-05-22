import { configureStore } from '@reduxjs/toolkit';
import customerSlice from './customerSlice';
import filmsSlice from './filmsSlice';
import cinemasSlice from './cinemasSlice';
import showtimeSlice from './showtimeSlice';
import staffSlice from './staffSlice';
import filmLocalSlice from './filmLocalSlice';

const store = configureStore({
    reducer: {
        customer: customerSlice.reducer,
        staff: staffSlice.reducer,
        films: filmsSlice.reducer,
        film: filmLocalSlice.reducer,
        cinemas: cinemasSlice.reducer,
        showtime: showtimeSlice.reducer,
    },
});

export default store;
