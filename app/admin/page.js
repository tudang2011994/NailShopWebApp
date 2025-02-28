"use client";
import React, { useState } from "react";
import BookingSchedule from "@/components/BookingSchedule";
import CustomerManagement from "@/components/CustomerManagement";
import RewardManagement from "@/components/RewardManagement";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("booking");

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Panel</h1>
        <nav className="mb-8">
          <button
            className={`px-4 py-2 mr-2 ${activeTab === "booking" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveTab("booking")}
          >
            Booking Schedule
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "customer" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveTab("customer")}
          >
            Customer Management
          </button>          <button
            className={`px-4 py-2 ${activeTab === "reward" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveTab("reward")}
          >
            Reward Management
          </button>
        </nav>
        {activeTab === "booking" && <BookingSchedule />}
        {activeTab === "customer" && <CustomerManagement />}
        {activeTab === "reward" && <RewardManagement />}
      </div>
    </div>
  );
};

export default AdminPage;