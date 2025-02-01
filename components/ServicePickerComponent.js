"use client";
import { useSelector, useDispatch } from "react-redux";
import { bookingPicked, getServices, getStaffs } from "../store/slices/bookingSlice";
import { useState, useEffect } from "react";
// import { tree } from "next/dist/build/templates/app-page";

function ServicePickerComponent() {
  const [servicesPicked, setServicesPicked] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [servicePickedIndex, setServicePickedIndex] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSelected, setCurrentSelected] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fenceData = async () => {
      try {
        const serviceResponse = await fetch("https://localhost:44361/api/Service/getAll");
        if (!serviceResponse.ok) {
          throw new Error("Failed to fetch Data");
        }
        const resultServices = await serviceResponse.json();
        setServices(resultServices);
        dispatch(getServices(resultServices));
        console.log("Fetched services:", resultServices);

        const staffResponse = await fetch("https://localhost:44361/api/Staff/getAll");
        if (!staffResponse.ok) {
          throw new Error("Failed to fetch Data");
        }
        const resultStaff = await staffResponse.json();
        dispatch(getStaffs(resultStaff));
        console.log("Fetched services:", resultStaff);


      } catch (error) {
        console.error("Error fetching services:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fenceData();
  }, [dispatch]);

  // Function to toggle the state for demonstration
  const handleToggleNextStep = () => {
    dispatch(bookingPicked({bookingDetails: servicesPicked}));
  };

  const handleServicesPicked = (service) => {
    setCurrentSelected(service)
    setModalOpen(true);
  }


  const handleRemoveService= (indexToRemove) => {
    setServicesPicked((preServicesPicked)=>preServicesPicked.filter((item,index) => index !== indexToRemove));
  }

  const handleStaffSelected = (e,index) =>{
    const selectedStaffId = parseInt(e.target.value);
    const staffName = currentSelected.staffDTOs.find((staff)=> staff.id === selectedStaffId)?.name || "Anyone";
    setCurrentSelected((preState) => ({...preState,selectedStaffId,staffName}));
  }

  const handleCurrentService = (i) =>{
    setServicePickedIndex(i);
  }

  //This function handle button confirm and cancel after customer confirm chossen service
  const handleModalConfirm = () => {
    setServicesPicked((preServicesPicked) => [...preServicesPicked,currentSelected]);
    // dispatch(getServices(services));
    setCurrentSelected(null);
    setModalOpen(false);
  }

  const handleModalCancel = () => {
    setCurrentSelected(null);
    setModalOpen(false);
  }


  useEffect(() => {
    console.log("Updated servicesPicked:", servicesPicked);
  }, [servicesPicked]);

  useEffect(() => {
    console.log("Current servicesPicked:", currentSelected);
  }, [currentSelected]);

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

      {/* Modal */}
      { isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="model-content">
              <h2>{currentSelected.name}</h2>
              <div className="staffs-choice">
                <select value={currentSelected.selectStaffId || ""}  onChange={(e)=>handleStaffSelected(e)}>
                  <option value="" disabled>{currentSelected.selectStaffId === 0 ? "Anyone" :  currentSelected.staffDTOs.find((staff)=> staff.id === currentSelected.selectedStaffId)?.name || "Anyone"}</option>
                  {(currentSelected.staffDTOs || []).map((staff) => (<option key={staff.id} value={staff.id}>{staff.name}</option>))}
                  <option value={0} >Anyone</option>
                </select>
              </div>            
              <div className="modal-action">
                <h2>Do you want to chose this service?</h2>
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


      <div>
        <h2>Selected Service</h2>
        {servicesPicked.length === 0 ? (
          <p>No service picked</p>
        ) : (
          <ul>
            {servicesPicked.map((service,index) => (
              <li key={index}>
                <button disabled={index === servicePickedIndex} onClick={()=>handleCurrentService(index)}>{service.name}</button>
                <h2>{service.selectedStaffId == 0 ? "Anyone" : service.staffDTOs.find((staff)=>staff.id == service.selectedStaffId)?.name || "Anyone"}</h2>
                <button onClick={()=> handleRemoveService(index)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <button disabled={servicesPicked.length === 0} onClick={()=> handleToggleNextStep()}>Next Step</button>
      </div>

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
}

export default ServicePickerComponent;