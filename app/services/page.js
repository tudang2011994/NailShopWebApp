"use client";
import { useState, useEffect } from 'react';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Service`);
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        console.log('API response:', data); // Debugging line
        if (Array.isArray(data)) {
          setServices(data.$values);
        } else if (data.$values && Array.isArray(data.$values)) {
          setServices(data.$values);
        } else {
          throw new Error("API response is not an array");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const addService = async (service) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Service`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      });
      if (!response.ok) {
        throw new Error('Failed to add service');
      }
      const newService = await response.json();
      setServices([...services, newService]);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteService = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Service/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete service');
      }
      setServices(services.filter(service => service.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addService({ serviceName: name });
    setName('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Management</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Service Name"
            required
            className="border p-2 rounded mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Service
          </button>
        </form>
        <h2 className="text-2xl font-bold mb-4">Services</h2>
        {loading ? (
          <p>Loading...</p>
        ) : services.length === 0 ? (
          <p>No services available. Add a new service above.</p>
        ) : (
          <ul>
            {services.map(service => (
              <li key={service.id} className="mb-2 flex justify-between items-center">
                <span>{service.serviceName}</span>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteService(service.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}