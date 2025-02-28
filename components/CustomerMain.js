"use client";
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

const CustomerMain = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true);
      try {
        console.log('Get User from store', user);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/${user.id}`, {
          credentials: 'include', // Include credentials (cookies)
        });
        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }
        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCustomerData();
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!customer) {
    return <p>No customer data found.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Customer Dashboard</h2>
      <div className="p-4 border rounded-lg">
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Phone:</strong> {customer.phoneNumber}</p>
        <p><strong>Loyalty Points:</strong> {customer.loyaltyPoints}</p>
        <p><strong>Coupons:</strong> {(customer.coupons || []).join(", ")}</p>
        <p><strong>Next Appointment:</strong> {customer.nextAppointment ? format(new Date(customer.nextAppointment), "yyyy-MM-dd HH:mm") : "No upcoming appointment"}</p>
      </div>
    </div>
  );
};

export default CustomerMain;