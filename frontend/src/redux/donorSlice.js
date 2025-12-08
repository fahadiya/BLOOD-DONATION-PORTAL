// src/redux/donorSlice.js
import { createSlice } from "@reduxjs/toolkit";

const donorSlice = createSlice({
    name: "donors",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },

    reducers: {
        setDonors: (state, action) => {
            state.list = action.payload;
        },

        addDonor: (state, action) => {
            state.list.push(action.payload);
        },

        updateDonor: (state, action) => {
            const index = state.list.findIndex(
                (donor) => donor._id === action.payload._id
            );
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },

        removeDonor: (state, action) => {
            state.list = state.list.filter(
                (donor) => donor._id !== action.payload
            );
        },
    },
});

// Export actions
export const { setDonors, addDonor, updateDonor, removeDonor } =
    donorSlice.actions;

// Export reducer
export default donorSlice.reducer;
