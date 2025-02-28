"use client";
import { useState, useEffect } from 'react';

export default function StaffPage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Staff`);
        if (!response.ok) {
          throw new Error("Failed to fetch staff");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setStaff(data);
        } else {
          throw new Error("API response is not an array");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const addStaff = async (staffMember) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Staff`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staffMember),
      });
      if (!response.ok) {
        throw new Error('Failed to add staff member');
      }
      const newStaffMember = await response.json();
      setStaff([...staff, newStaffMember]);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteStaff = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Staff/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete staff member');
      }
      setStaff(staff.filter(member => member.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStaff({ name });
    setName('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Staff Management</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Staff Name"
            required
            className="border p-2 rounded mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Staff
          </button>
        </form>
        {staff.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Staff</h2>
            <ul>
              {staff.map(member => (
                <li key={member.id} className="mb-2 flex justify-between items-center">
                  <span>{member.name}</span>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deleteStaff(member.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}