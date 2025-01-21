"use client";
import { useSelector, useDispatch } from "react-redux";
import { bookingPicked } from "../store/slices/bookingSlice";
import { useState, useEffect } from "react";
// import { tree } from "next/dist/build/templates/app-page";

function ServicePickerComponent() {
  const [servicesPicked, setServicesPicked] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [servicePickedIndex, setServicePickedIndex] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fenceData = async () => {
      try {
        const response = await fetch("https://localhost:44361/api/Service/getAll");
        if (!response.ok) {
          throw new Error("Failed to fetch Data");
        }
        const result = await response.json();

        setServices(result);
        console.log("Fetched services:", result);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fenceData();
  }, []);

  // Function to toggle the state for demonstration
  const handleToggleNextStep = () => {
    dispatch(bookingPicked({bookingDetails: servicesPicked}));
  };

  const handleServicesPicked = (service) => {
    setServicesPicked((preState) => [...preState, {id: service.id, name: service.name, staffs: service.staffDTOs || [], selectedStaffId: 0}]);
  }

  const mapStaffSelectedToState=(index, selectedStaffId) =>{
    setServicesPicked( (preServicesPicked) => preServicesPicked.map((service,i)=> i===index ? {...service,selectedStaffId} : service ));
  }

  const handleRemoveService= (indexToRemove) => {
    setServicesPicked((preServicesPicked)=>preServicesPicked.filter((item,index) => index !== indexToRemove));
  }

  const handleStaffSelected = (e,index) =>{
    const selectedStaffId = parseInt(e.target.value);
    console.log("target value: " + index);
    mapStaffSelectedToState(index,selectedStaffId);

  }
  const handleCurrentService = (i) =>{
    setServicePickedIndex(i);
  }

  useEffect(() => {
    console.log("Updated servicesPicked:", servicesPicked);
  }, [servicesPicked]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div>
        {services.map((service) => (
          <button key={service.id} onClick={() =>handleServicesPicked(service)}>
            {service.name}
          </button>
        ))}
      </div>
      <div>
        <h2>Selected Service</h2>
        {servicesPicked.length === 0 ? (
          <p>No service picked</p>
        ) : (
          <ul>
            {servicesPicked.map((service,index) => (
              <li key={index}>
                <button disabled={index === servicePickedIndex} onClick={()=>handleCurrentService(index)}>{service.name}</button>
                <button onClick={()=> handleRemoveService(index)}>Remove</button>
                
                {/* Drop Down List to Chose Staff for that Service */}
                <select value={service.selectStaffId || ""}  onChange={(e)=>handleStaffSelected(e,index)}>
                  <option value="" disabled>{service.selectStaffId === 0 ? "Anyone" :  service.staffs.find((staff)=> staff.id === service.selectedStaffId)?.name || "Anyone"}</option>
                  {(service.staffs || []).map((staff) => (<option key={staff.id} value={staff.id}>{staff.name}</option>))}
                  <option value={0} >Anyone</option>
                </select>
            </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <button disabled={servicesPicked.length === 0} onClick={()=> handleToggleNextStep()}>Next Step</button>
      </div>
    </div>
  );
}

export default ServicePickerComponent;