"use client"
import { useState, useEffect } from "react";
import DayPickedComponent from "./DayPickerComponent";
import TimePickerComponent from "./TimePickerComponent";
import { useDispatch } from "react-redux";
import { getBookedList } from "@/store/slices/bookingSlice";

const BookingTimeComponent = () => {
    const [dayPicked, setDayPicked] = useState(new Date());
    const [bookedList, setBookedList] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);

    const disPatch = useDispatch()

    const handleDateSelect = (date) => {
        console.log("handle date select",date);
        setDayPicked(date);
    }

    const handleSelectedTime = (time) => {
        console.log("Selected Time in parrent",time);
        setSelectedTime(time);
    }

    //Fetch Booking List from Database, the last 14 days 
    useEffect(()=> {
        const fenceData = async () => {
            try{
                console.log("API CALL on ",dayPicked);
                const dayString = dayPicked.toLocaleTimeString();
                console.log("dayString", dayString);
                const response = await fetch(`https://localhost:44361/api/Booking/GetAllInRange?startDate=${dayString}&days=30`);

                if(!response.ok) {
                    throw new Error("Failed to Fetch Data")
                }

                const result = await response.json();
                setBookedList(result);
                disPatch(getBookedList(bookedList));
            } catch (error){
                console.log(error);
            } finally {
                console.log("End Loading");
            }
        };
        fenceData();                
    },[]
    );

    useEffect(()=> {
        console.log("set new date after next step",dayPicked);
    },[dayPicked])

    //Test fetch booking data
    useEffect(()=>{
        console.log("Update Fence Booking In range",bookedList)
    },[bookedList]);

    return(
    <div>
        <h1>React Day Picker Example</h1>
        <DayPickedComponent onDateSelect={handleDateSelect} />
        <TimePickerComponent 
            dayPicked= {dayPicked}
            onTimeSelect={handleSelectedTime}
            bookedList={bookedList}
        />
    </div>
    );
}

export default BookingTimeComponent;