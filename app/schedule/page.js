"use client"

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaRegCalendarAlt, FaUser, FaMobileAlt, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  email: z.string().email("Invalid email").optional().or(z.literal(""))
});

const generateTimeSlots = (start, end, interval) => {
  const slots = [];
  let current = new Date(start);

  while (current <= end) {
    slots.push(current.toTimeString().slice(0, 5));
    current.setMinutes(current.getMinutes() + interval);
  }

  return slots;
};

const startTime = new Date();
startTime.setHours(9, 0, 0, 0);

const endTime = new Date();
endTime.setHours(19, 0, 0, 0);

const timeSlots = generateTimeSlots(startTime, endTime, 15);

const BookingWizard = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specialRequest, setSpecialRequest] = useState("");

  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    const fetchServices = async () => {
    console.log("Fetching services...");
      try {
        const response = await fetch("https://localhost:44361/api/Service/getAll");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceSelection = (service) => {
    setSelectedService(service);
  };

  const handleConfirmBooking = async () => {
    const customerInfo = getValues();
    const bookingData = {
      serviceId: selectedService.id,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      customerInfo,
      specialRequest
    };
    console.log(bookingData);

    try {
      const response = await fetch("https://localhost:44361/api/Booking/createBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      // Handle successful booking (e.g., show a success message or redirect)
      alert("Booking confirmed!");
    } catch (error) {
      // Handle error (e.g., show an error message)
      alert(error.message);
    }
  };

  const renderServiceSelection = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {services.map(service => (
        <div
          key={service.id}
          className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedService?.id === service.id ? "border-pink-500 bg-pink-50" : "border-gray-200 hover:border-pink-300"}`}
          onClick={() => handleServiceSelection(service)}
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium text-gray-800">{service.name}</h4>
            <span className="text-pink-600 font-semibold">${service.amount}</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{service.description}</p>
          <p className="text-sm text-gray-500 mb-2">{service.duration} hours</p>
          {service.staffDTOs && (
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700 mb-1">Available Staff:</p>
              <div className="flex flex-wrap gap-2">
                {service.staffDTOs.map((person, idx) => (
                  <span key={idx} className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">
                    {person.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderDateTimeSelection = () => (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FaRegCalendarAlt className="mr-2 text-pink-600" />
            Select Date
          </h3>
          <input
            type="date"
            className="w-full p-2 border rounded-lg"
            value={format(selectedDate, "yyyy-MM-dd")}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            min={format(new Date(), "yyyy-MM-dd")}
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Available Time Slots</h3>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map(time => (
              <button
                key={time}
                className={`p-2 rounded-lg text-sm ${selectedTime === time ? "bg-pink-600 text-white" : "bg-gray-100 hover:bg-pink-100"}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Selected Service</h3>
        {selectedService && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800">{selectedService.name}</h4>
            <p className="text-sm text-gray-600">{selectedService.duration} Hour - ${selectedService.amount}</p>
            {selectedService.image && (
              <div className="mb-4">
                <img src={selectedService.image} alt={selectedService.name} className="w-full h-40 object-cover rounded-lg" />
              </div>
            )}
            <p className="text-sm text-gray-600 mb-4">{selectedService.description}</p>
            {selectedService.benefits && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Benefits:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {selectedService.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
            {selectedService.reviews && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Customer Reviews:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {selectedService.reviews.map((review, idx) => (
                    <li key={idx}>{review}</li>
                  ))}
                </ul>
              </div>
            )}
            {selectedService.staffDTOs && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Employee Schedule</h4>
                <ul className="mb-4">
                  {selectedService.staffDTOs.map((staff, idx) => (
                    <li key={idx} className="text-sm text-gray-600">
                      {staff.name}: {staff.schedule || "_ _ _ _ _ _ _"}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Request (e.g., Preferred Employee)</label>
              <textarea
                className="w-full p-2 border rounded-lg"
                placeholder="Enter any special requests here"
                rows="4"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCustomerInfo = () => (
    <div className="max-w-2xl mx-auto">
      <form className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              {...register("fullName")}
              className="pl-10 w-full p-2 border rounded-lg"
              placeholder="Enter your full name"
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <div className="relative">
            <FaMobileAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              {...register("phone")}
              className="pl-10 w-full p-2 border rounded-lg"
              placeholder="Enter your phone number"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              {...register("email")}
              className="pl-10 w-full p-2 border rounded-lg"
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mt-8 space-y-4">
          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
            <h4 className="font-semibold text-pink-700 flex items-center">
              <FaCheckCircle className="mr-2" />
              Create Account - Get 20% Off
            </h4>
            <p className="text-sm text-pink-600 mt-1">Sign up now and save on your first booking!</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-700 flex items-center">
              <FaMobileAlt className="mr-2" />
              Download App - Additional 20% Off
            </h4>
            <p className="text-sm text-purple-600 mt-1">Get extra savings with our mobile app!</p>
            <p className="text-sm text-purple-600 mt-1 font-bold">Coming Soon</p>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Book Your Appointment</h2>
          <div className="flex justify-center items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= stepNumber ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-600"}`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className="w-20 h-1 mx-2 bg-gray-200">
                    <div
                      className={`h-full ${step > stepNumber ? "bg-pink-600" : "bg-gray-200"}`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          {step === 1 && renderServiceSelection()}
          {step === 2 && renderDateTimeSelection()}
          {step === 3 && renderCustomerInfo()}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            className={`flex items-center px-6 py-2 rounded-lg ${step === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-600 text-white hover:bg-gray-700"}`}
            disabled={step === 1}
          >
            <IoIosArrowBack className="mr-2" /> Back
          </button>
          <button
            onClick={() => {
              if (step === 3) {
                handleConfirmBooking();
              } else {
                setStep(prev => Math.min(3, prev + 1));
              }
            }}
            className={`flex items-center px-6 py-2 rounded-lg ${step === 1 && !selectedService ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-pink-600 text-white hover:bg-pink-700"}`}
            disabled={step === 1 && !selectedService}
          >
            {step === 3 ? "Confirm Booking" : "Next"} <IoIosArrowForward className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWizard;