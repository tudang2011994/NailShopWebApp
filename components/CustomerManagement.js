import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterName, setFilterName] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState("");
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  const fetchCustomers = async () => {
    if (!filterName && !filterPhone) {
      setError("Please enter either a name or the last 4 digits of a phone number.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/User?`;
      if (filterName) {
        url += `name=${filterName}&`;
      }
      url += `phone=${filterPhone || ''}`;
      
      console.log("Fetching customers with URL:", url);
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error("Failed to fetch customers");
      }
      const data = await response.json();
      setCustomers(data.$values);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRewards = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Reward`);
      if (!response.ok) {
        throw new Error("Failed to fetch rewards");
      }
      const data = await response.json();
      setRewards(data.$values);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  const handleAddLoyaltyPoints = async () => {
    if (loyaltyPoints) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/addLoyaltyPoints`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ UserId: selectedCustomerId, Points: parseInt(loyaltyPoints, 10) }),
        });
        if (!response.ok) {
          throw new Error("Failed to add loyalty points");
        }
        alert("Loyalty points added successfully.");
        setShowModal(false);
        setLoyaltyPoints("");
      } catch (error) {
        console.error("Error adding loyalty points:", error);
        alert("Failed to add loyalty points.");
      }
    }
  };

  const openModal = (customerId) => {
    setSelectedCustomerId(customerId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setLoyaltyPoints("");
  };

  const openRewardModal = (customerId) => {
    setSelectedCustomerId(customerId);
    setShowRewardModal(true);
  };

  const closeRewardModal = () => {
    setShowRewardModal(false);
    setSelectedReward(null);
  };

  const handleApplyReward = async () => {
    if (selectedReward) {
      const customer = customers.find(c => c.id === selectedCustomerId);
      if (customer.loyaltyPoints >= selectedReward.requiredPoints) {
        try {
          const updatedPoints = customer.loyaltyPoints - selectedReward.requiredPoints;
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/addLoyaltyPoints`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ UserId: selectedCustomerId, Points: updatedPoints }),
          });
          if (!response.ok) {
            throw new Error("Failed to apply reward");
          }
          alert("Reward applied successfully.");
          setCustomers(customers.map(c => c.id === selectedCustomerId ? { ...c, loyaltyPoints: updatedPoints } : c));
          closeRewardModal();
        } catch (error) {
          console.error("Error applying reward:", error);
          alert("Failed to apply reward.");
        }
      } else {
        alert("Not enough loyalty points to apply this reward.");
      }
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Filter by name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by phone"
          value={filterPhone}
          onChange={(e) => setFilterPhone(e.target.value)}
        />
        <button onClick={fetchCustomers}>
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <h2 className="text-xl font-bold mb-4">Customer List</h2>
        {customers.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          <ul className="space-y-2">
            {customers.map(customer => (
              <li
                key={customer.id}
                className="p-4 border rounded-lg"
              >
                <p><strong>Name:</strong> {customer.name}</p>
                <p><strong>Phone:</strong> {customer.phoneNumber}</p>
                <p><strong>Loyalty Points:</strong> {customer.loyaltyPoints}</p>
                <p><strong>Coupons:</strong> {(customer.coupons || []).join(", ")}</p>
                <p><strong>Next Appointment:</strong> {customer.nextAppointment ? format(new Date(customer.nextAppointment), "yyyy-MM-dd HH:mm") : "No upcoming appointment"}</p>
                <div className="mt-2 space-x-2">
                  <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={() => openModal(customer.id)}
                  >
                    Add Loyalty Points
                  </button>
                  <button 
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    onClick={() => openRewardModal(customer.id)}
                  >
                    Apply Reward
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl mb-4">Add Loyalty Points</h2>
            <input
              type="number"
              placeholder="Enter points"
              value={loyaltyPoints}
              onChange={(e) => setLoyaltyPoints(e.target.value)}
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={handleAddLoyaltyPoints}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showRewardModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl mb-4">Select a Reward</h2>
            <ul className="space-y-2">
              {Array.isArray(rewards) && rewards.map(reward => (
                <li key={reward.id} className="p-4 border rounded-lg">
                  <p><strong>Name:</strong> {reward.name}</p>
                  <p><strong>Required Points:</strong> {reward.requiredPoints}</p>
                  <p><strong>Description:</strong> {reward.description}</p>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-2"
                    onClick={() => setSelectedReward(reward)}
                  >
                    Select
                  </button>
                </li>
              ))}
            </ul>
            {selectedReward && (
              <div className="mt-4">
                <p>Selected Reward: {selectedReward.name}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                    onClick={closeRewardModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={handleApplyReward}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;