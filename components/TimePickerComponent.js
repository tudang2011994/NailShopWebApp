import Booking from "@/app/booking/page";
import { getBookedList, addBookingDetail } from "@/store/slices/bookingSlice";
import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"

const TimePickerComponent = ({dayPicked , onTimeSelect, bookedList}) => {

    const [timeSlots, setTimeSlot] = useState([]);
    const [isModalOpen, setOpenModal] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);
    const [existingUser, setExistingUser] = useState(null);

    const bookingDetails = useSelector((state)=> state.booking.bookingDetails);

    const user = useSelector((state)=> state.auth.user);
    const services = useSelector((state)=>state.booking.services);
    const staffs = useSelector((state)=>state.booking.staffs);
    //const bookedList = useSelector((state)=>state.booking.bookedList)

    const dispatch = useDispatch();

    const generateTimeSlots = (startHour = 9, endHour = 19, interval = 15) =>
    {      
        const current_day = new Date(dayPicked);
        const slots = [];
        if(dayPicked != null)
        {
            for( let hour = startHour; hour < endHour; hour++ ){
                for (let minute = 0; minute <60; minute += interval) {
                    const time = new Date(current_day)
                    time.setHours(hour,minute,0,0);
                    slots.push({timeSlot: time, available: true })
                }
            }
        } 

        return slots;
    }

    const getBookedByDate = (date) => {
        return bookedList.fliter((booked) => booked.BookingTime)
    }

    const getDateInWeek= (date) => {
        const daysOfWeek = ["U", "M", "T", "W", "H", "F", "S"];
        return daysOfWeek[date.getDay()];
    }

    const getWorkingStaff = (date) => {
        const dayInWeek = getDateInWeek(date);
        const workingStaffs = staffs.filter((staff)=> staff.workingDay.includes(dayInWeek) === true );
        return workingStaffs;
    }

    const generateSlot = (start = 9, end = 19, interval = 25) => {
        const slot = [];
        for(let i = start*100; i< end*100; i += interval)
        {
            slot.push(i);
        }
        console.log("slot",slot);
    }

    const convertToBookingDTO =(bookingDetails) => {

        bookingDetails.map((booking)=>console.log(booking.id));
        //const utcDate = new Date(selectedTime.timeSlot.toISOString())
        return bookingDetails.map((booking) => (
            {
            ServiceId: booking.id,
            UserId: booking.UserId || "00000000-0000-0000-0000-000000000000",
            StaffId: booking.selectedStaffId || 0,
            BookingTime: selectedTime.timeSlot.toISOString(),
            Status: 0
        }));

    };

    const handleSelectedTime = (time) => {
        setSelectedTime(time);
        setOpenModal(true);
    }

    const handleModalConfirm = () => { 
        console.log("Booking Detail in Convert",bookingDetails);               
        const bookingDTOs = convertToBookingDTO(bookingDetails);
        console.log(bookingDTOs);
        dispatch(addBookingDetail(bookingDTOs));
    }

    const handleModalCancel = () => {

    }

    useEffect(()=>{
        const date = new Date(dayPicked);
        const workingStaffs = getWorkingStaff(date);
        const slots = generateTimeSlots();
        console.log("Booked List",bookedList);
        console.log("services in Time Picker",services);
        console.log("WorkingStaff in Time Picker",workingStaffs);
        const slot_temp = generateSlot();
        const bookedListByDate = getBookedByDate(date);
        console.log("Booked List when day picked",bookedList);
        setTimeSlot(slots);
    }, [dayPicked]
    );

    useEffect(()=>{
        console.log("Time slots",timeSlots);
    }, [timeSlots]
    );

    useEffect(()=>{
        console.log("Time slots generate",timeSlots);
    }, []
    );

    return (
    <div>
        <h3>Available Time Slots</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {timeSlots.map((time, index) => (
          <button
            key={index}
            onClick={() => handleSelectedTime(time)}
            style={{
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              background: "#f5f5f5",
              cursor: "pointer",
            }}
          >
            {time.timeSlot.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </button>
        ))}
      </div>

      {/* Modal */}
      { isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="model-content">
              <h2>Confirm</h2>
              <div className="booking-detail">
                {bookingDetails.map((booked, index) => (
                    <div key={index}>
                        <p>You book {booked.name} with {booked.staffName}</p>
                    </div>
                ))}
              </div>            
              <div className="modal-action">
                <h2>Do you want to confirm this?</h2>
                <button onClick={handleModalConfirm}>
                  Confirm
                </button>
                <button onClick={handleModalCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
          </div>
      )}

      {/* Modal Styles */}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal {
          background: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .modal-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        button {
          padding: 8px 12px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background: #0056b3;
        }
      `}</style>

    </div>

    );
};

export default TimePickerComponent;