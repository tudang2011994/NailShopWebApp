"use client"
import { useState, useEffect } from "react";
import DayPickedComponent from "./DayPickerComponent";

const BookingTimeComponent = () => {
    const [dayPicked, setDayPicked] = useState(new Date());
    const [bookedList, setBookedList] = useState([]);

    const handleDateSelect = (date) => {
        console.log("handle date select",date);
    }

    //Fetch Booking List from Database, the last 14 days 
    useEffect(()=> {
        const fenceData = async () => {
            try{
                const dayString = dayPicked.toISOString();
                const response = await fetch(`https://localhost:44361/api/Booking/getAllInRange?startDate=${dayString}&days=14`);

                if(!response.ok) {
                    throw new Error("Failed to Fetch Data")
                }

                const result = await response.json();
                setBookedList(result);
            } catch (error){
                console.log(error);
            } finally {
                console.log("End Loading");
            }
        };
        fenceData();
    },[]
    );

    //Test fetch booking data
    useEffect(()=>{
        console.log("Update Fence Booking In range",bookedList)
    },[bookedList]);

    return(
    <div>
        <h1>React Day Picker Example</h1>
        <DayPickedComponent onDateSelect={handleDateSelect} />
    </div>
    );
}

export default BookingTimeComponent;