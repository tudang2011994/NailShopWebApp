"use client";
import React, { useState, useEffect } from 'react';

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newCoupon, setNewCoupon] = useState({ code: '', discountAmount: '' });
  const [editingCoupon, setEditingCoupon] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Coupon`);
        if (!response.ok) {
          throw new Error("Failed to fetch coupons");
        }
        const data = await response.json();
        if (Array.isArray(data.$values)) {
          setCoupons(data.$values);
        } else {
          throw new Error("API response is not an array");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const addCoupon = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Coupon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newCoupon, discountAmount: parseFloat(newCoupon.discountAmount) }),
      });
      if (!response.ok) {
        throw new Error('Failed to add coupon');
      }
      const addedCoupon = await response.json().catch(() => ({})); // Handle empty response
      setCoupons([...coupons, addedCoupon]);
      setNewCoupon({ code: '', discountAmount: '' });
    } catch (error) {
      setError(error.message);
    }
  };

  const updateCoupon = async (coupon) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Coupon/${coupon.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...coupon, discountAmount: parseFloat(coupon.discountAmount) }),
      });
      if (!response.ok) {
        throw new Error('Failed to update coupon');
      }
      const updatedCoupon = await response.json().catch(() => ({})); // Handle empty response
      console.log('Updated Coupon:', updatedCoupon); // Debugging log
      setCoupons(coupons.map(c => (c.id === coupon.id ? { ...c, ...updatedCoupon } : c)));
      setEditingCoupon(false); // Exit editing mode
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteCoupon = async (couponId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Coupon/${couponId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete coupon');
      }
      setCoupons(coupons.filter(c => c.id !== couponId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Coupon Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <h3 className="text-lg font-bold mb-2">Add New Coupon</h3>
        <input
          type="text"
          placeholder="Code"
          value={newCoupon.code}
          onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Discount Amount"
          value={newCoupon.discountAmount}
          onChange={(e) => setNewCoupon({ ...newCoupon, discountAmount: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={addCoupon}
        >
          Add Coupon
        </button>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Coupons List</h3>
        <ul className="space-y-2">
          {Array.isArray(coupons) && coupons.length > 0 ? (
            coupons.map(coupon => (
              <li key={coupon.id} className="p-4 border rounded-lg">
                {editingCoupon && editingCoupon.id === coupon.id ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Code"
                      value={editingCoupon.code}
                      onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value })}
                      className="border p-2 mb-2 w-full"
                    />
                    <input
                      type="number"
                      placeholder="Discount Amount"
                      value={editingCoupon.discountAmount}
                      onChange={(e) => setEditingCoupon({ ...editingCoupon, discountAmount: e.target.value })}
                      className="border p-2 mb-2 w-full"
                    />
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                      onClick={() => updateCoupon(editingCoupon)}
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                      onClick={() => setEditingCoupon(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <p><strong>Code:</strong> {coupon.code}</p>
                    <p><strong>Discount Amount:</strong> {coupon.discountAmount}</p>
                    <button
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                      onClick={() => setEditingCoupon(coupon)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                      onClick={() => deleteCoupon(coupon.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <p>No coupons available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CouponManagement;