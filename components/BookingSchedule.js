"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const statusMap = {
  0: "pending",
  1: "approved",
  2: "rejected"
};

const statusReverseMap = {
  "pending": 0,
  "approved": 1,
  "rejected": 2
};

const BookingSchedule = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterDays, setFilterDays] = useState(7); // Default to 7 days
  const [sortOrder, setSortOrder] = useState("asc"); // Default to ascending order
  const [smsContents, setSmsContents] = useState({});
  const [lastSms, setLastSms] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const startDate = filterStartDate 
          ? new Date(filterStartDate).toISOString() 
          : new Date().toISOString();
        console.log(`Fetching bookings from ${startDate} for ${filterDays} days`);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Booking/getAllInRange?startDate=${startDate}&days=${filterDays}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch bookings: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched bookings data:", data);
        if (!data.$values || !Array.isArray(data.$values)) {
          console.error("API response is not an array:", data);
          throw new Error("API response is not an array");
        }
        const dereferencedData = data.$values.map(item => {
          if (item.$ref) {
            return data.$values.find(refItem => refItem.$id === item.$ref);
          }
          return item;
        });
        setBookings(dereferencedData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [filterStartDate, filterDays]);

  const handleApprove = async (bookingId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Booking/approve/${bookingId}`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to approve booking");
      }
      setBookings(bookings.map(booking => booking.id === bookingId ? { ...booking, status: 1 } : booking));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleReject = async (bookingId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Booking/reject/${bookingId}`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to reject booking");
      }
      setBookings(bookings.map(booking => booking.id === bookingId ? { ...booking, status: 2 } : booking));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSendSms = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Booking/sendSms/${currentBookingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: smsContents[currentBookingId] })
      });
      if (!response.ok) {
        throw new Error("Failed to send SMS");
      }
      setLastSms({ ...lastSms, [currentBookingId]: smsContents[currentBookingId] });
      setSmsContents({ ...smsContents, [currentBookingId]: "" });
      setShowModal(false);
      alert("SMS sent successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSmsContentChange = (content) => {
    setSmsContents({ ...smsContents, [currentBookingId]: content });
  };

  const openModal = (bookingId) => {
    setCurrentBookingId(bookingId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentBookingId(null);
  };

  const filteredBookings = Array.isArray(bookings) ? bookings.filter(booking => {
    const bookingDate = new Date(booking.bookingTime);
    const startDate = filterStartDate ? new Date(filterStartDate) : null;
    const statusMatch = filterStatus ? statusMap[booking.status] === filterStatus : true;
    const dateMatch = !startDate || bookingDate >= startDate;
    return statusMatch && dateMatch;
  }).sort((a, b) => {
    const dateA = new Date(a.bookingTime);
    const dateB = new Date(b.bookingTime);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  }) : [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded-lg"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Days</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            value={filterDays}
            onChange={(e) => setFilterDays(e.target.value)}
            min="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort by Date</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Customer Name</th>
              <th className="py-2">Service</th>
              <th className="py-2">Date</th>
              <th className="py-2">Time</th>
              <th className="py-2">Status</th>
              <th className="py-2">Last SMS</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(booking => (
              <tr key={booking.id}>
                <td className="py-2">{booking.username}</td>
                <td className="py-2">{booking.serviceName}</td>
                <td className="py-2">{booking.bookingTime ? format(new Date(booking.bookingTime), "yyyy-MM-dd") : ""}</td>
                <td className="py-2">{booking.bookingTime ? booking.bookingTime.split("T")[1] : ""}</td>
                <td className="py-2">{statusMap[booking.status]}</td>
                <td className="py-2">{lastSms[booking.id] || "No SMS sent"}</td>
                <td className="py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
                    onClick={() => openModal(booking.id)}
                  >
                    Send SMS
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleApprove(booking.id)}
                    disabled={booking.status === 1}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleReject(booking.id)}
                    disabled={booking.status === 2}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-bold">Send SMS</h2>
            <textarea
              className="w-full p-2 border rounded-lg"
              placeholder="Enter SMS content"
              value={smsContents[currentBookingId] || ""}
              onChange={(e) => handleSmsContentChange(e.target.value)}
            />
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSendSms}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSchedule;