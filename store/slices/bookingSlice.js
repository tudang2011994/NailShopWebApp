import { createSlice  } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {currentStep: 0, bookingDetails: [], dayPicked: new Date().toISOString() },
    reducers: {
        bookingPicked: (state, action) => {
            console.log("Call day in reducer",state.dayPicked);
            state.currentStep = state.currentStep + 1;
            state.bookingDetails = action.payload.bookingDetails;
          },
        dayPicked: (state,action) => {
            state.dayPicked = action.payload.dayPicked;
        },
        clearPicked: (state) => {
            state.currentStep = 0;
            state.bookingDetails = [];
        },
    }

});


export const {bookingPicked,clearPicked,dayPicked} = bookingSlice.actions;
export default bookingSlice.reducer;