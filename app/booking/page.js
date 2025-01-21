"use client"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {bookingPicked, clearPicked } from '../../store/slices/bookingSlice'
import ServicePickerComponent from '../../components/ServicePickerComponent'
import BookingTimeComponent from '@/components/BookingTimeComponent';

const Booking = () => {

    const currentStep = useSelector((state) => state.booking.currentStep);
    const currentUser = useSelector((state) => state.auth.user);
    const bookingDetails = useSelector((state)=> state.booking.bookingDetails)
    const dispatch = useDispatch();
    return (
        <div>
            {currentStep === 0 && (<ServicePickerComponent/>)}
            {currentStep === 1 && (
                <>
                <p>This is next pick</p>
                <BookingTimeComponent/>
                {/* <TimePickerComponent/> */}
                </>
                )}
        </div>
    );
};


export default Booking;