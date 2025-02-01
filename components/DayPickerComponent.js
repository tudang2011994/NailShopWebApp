"use client"

import { useState } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"; // Import the default styling

const DayPickerComponent = ({ onDateSelect }) => {
    const [selected, setSelected] = useState(new Date());
  
    const handleDayClick = (day) => {
      setSelected(day);
      if (onDateSelect) {
        onDateSelect(day); // Notify parent component
      }
    };
  
    return (
      <div style={{ textAlign: "center" }}>
        <h2>Select a Date</h2>
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={handleDayClick}
          disabled={[{ before: new Date() }]}
        />
        {selected && (
          <p>
            You selected: <strong>{selected.toDateString()}</strong>
          </p>
        )}
      </div>
    );
  };
  
  export default DayPickerComponent;