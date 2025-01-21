import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/slices/authSlice';
import bookingReducer from '../store/slices/bookingSlice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        booking: bookingReducer,
    },
});

export default store;
