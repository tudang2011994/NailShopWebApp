"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { dayPicked } from "@/store/slices/bookingSlice"
import next from "next"

const DayPickedComponent = () => {
    const dispatch = useDispatch();
    const dayPicked = useSelector((state)=>state.booking.dayPicked);
    const [listDayToPick, setListDayToPick] = useState([]);

    const convertToDate = (timeStamp) =>{
        return new Date(timeStamp)
    };

    const getNextIndexDate= (index,date) => {
        const nextDate = new Date(date)
        nextDate.setDate(date.getDate() + index);
        return nextDate;

        // const dayOfMonth = nextDate.getDate();
        // return dayOfMonth;
    }

    const getDateInWeek= (date) => {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return daysOfWeek[date.getDay()];
    }

    const getMonth = (date) => {
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return months[date.getMonth()];
    }

    const handleDatePicked = (date) => {
        console.log("TimeStamp", date.timeStamp);
        
    }

    useEffect(()=> {
        const daysToPick = [];
        const current_day = convertToDate(dayPicked);        

        for (let i = 0; i< 7; i++){
            const nextIndexDate = getNextIndexDate(i,current_day);
            const timeStamp = nextIndexDate.toISOString();
            daysToPick.push({timeStamp: timeStamp, day: nextIndexDate.getDate(), month: getMonth(current_day), daysOfWeek: getDateInWeek(current_day) })
        }
        setListDayToPick(daysToPick);
        
    },[])
    return(
        <div>
            {listDayToPick.map((date)=> (<button onClick={()=>handleDatePicked(date)} key={date.month+date.day}>{date.month +" "+ date.day +" "+ date.daysOfWeek}</button>))}
        </div>
    ); 
}

export default DayPickedComponent;