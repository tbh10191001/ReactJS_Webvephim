import { createSlice } from '@reduxjs/toolkit';

const staffSlice = createSlice({
    name: 'staff',
    initialState: {
        staff: {},
    },
    reducers: {
        save: (state, action) => {
            state.staff = action.payload;
            localStorage.setItem('staff', JSON.stringify(action.payload));
        },
        clear: (state, action) => {
            state.staff = action.payload;
            localStorage.removeItem('staff');
        },
        updateInfo: (state, action) => {
            state.staff = action.payload;
            localStorage.setItem('staff', JSON.stringify(action.payload));
        },
    },
});

export default staffSlice;
