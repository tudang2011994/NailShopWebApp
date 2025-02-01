import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

export const addBookingDetail = createAsyncThunk("addBookingDetail", async (bookingDetails,thunkAPI)=>{
    try{
        const response = await fetch(`https://localhost:44361/api/Booking/addAllBookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingDetails)
        });

        if(!response.ok){
            throw new Error("Failed to create booking");
        }
        
        const result = await response.json();
        return result;
    } catch(error){
        return thunkAPI.rejectWithValue({message: error.message});
    }

});

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {currentStep: 0, bookingDetails: [], dayPicked: new Date().toISOString(), bookedList: [], services: [], staffs: [] },
    reducers: {
        bookingPicked: (state, action) => {
            console.log("Call day in reducer",state.dayPicked);
            state.currentStep = state.currentStep + 1;
            state.bookingDetails = action.payload.bookingDetails;
          },
        getServices:(state,action) => {
            state.services = action.payload;
        },
        getBookedList: (state,action) => {
            state.bookedList = action.payload.bookedList;
        },
        getStaffs: (state,action) => {
            state.staffs = action.payload;
        },
        addBookingSelectedTime: (state,action) => {
            state.bookingDetails = [...state.bookingDetails, ...action.payload];
        },
        dayPicked: (state,action) => {
            state.dayPicked = action.payload.dayPicked;
        },
        clearPicked: (state) => {
            state.currentStep = 0;
            state.bookingDetails = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addBookingDetail.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(addBookingDetail.fulfilled, (state,action) =>{
            state.loading = false;
            state.error = null;
        })
        .addCase(addBookingDetail.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
        })

    },

});


export const {bookingPicked, clearPicked, dayPicked, getBookedList, getServices, getStaffs} = bookingSlice.actions;
export default bookingSlice.reducer;