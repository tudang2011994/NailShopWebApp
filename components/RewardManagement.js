"use client";
import React, { useState, useEffect } from 'react';

const RewardManagement = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newReward, setNewReward] = useState({ name: '', requiredPoints: 0, description: '' });
  const [editingReward, setEditingReward] = useState(null);

  useEffect(() => {
    const fetchRewards = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Reward`);
        if (!response.ok) {
          throw new Error("Failed to fetch rewards");
        }
        const data = await response.json();
        setRewards(data.$values);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  const addReward = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Reward`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReward),
      });
      if (!response.ok) {
        throw new Error('Failed to add reward');
      }
      const addedReward = await response.json();
      setRewards([...rewards, addedReward]);
      setNewReward({ name: '', requiredPoints: 0, description: '' });
    } catch (error) {
      setError(error.message);
    }
  };

  const updateReward = async (reward) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Reward/${reward.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reward),
      });
      if (!response.ok) {
        throw new Error('Failed to update reward');
      }
      // No need to parse response as JSON since it's a 204 No Content
      setRewards(rewards.map(r => (r.id === reward.id ? reward : r)));
      setEditingReward(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteReward = async (rewardId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Reward/${rewardId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete reward');
      }
      setRewards(rewards.filter(r => r.id !== rewardId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Reward Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <h3 className="text-lg font-bold mb-2">Add New Reward</h3>
        <input
          type="text"
          placeholder="Name"
          value={newReward.name}
          onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Required Points"
          value={newReward.requiredPoints}
          onChange={(e) => setNewReward({ ...newReward, requiredPoints: parseInt(e.target.value, 10) })}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={newReward.description}
          onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={addReward}
        >
          Add Reward
        </button>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Rewards List</h3>
        {rewards.length === 0 ? (
          <p>No rewards available.</p>
        ) : (
          <ul className="space-y-2">
            {rewards.map(reward => (
              <li key={reward.id} className="p-4 border rounded-lg">
                {editingReward && editingReward.id === reward.id ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      value={editingReward.name}
                      onChange={(e) => setEditingReward({ ...editingReward, name: e.target.value })}
                      className="border p-2 mb-2 w-full"
                    />
                    <input
                      type="number"
                      placeholder="Required Points"
                      value={editingReward.requiredPoints}
                      onChange={(e) => setEditingReward({ ...editingReward, requiredPoints: parseInt(e.target.value, 10) })}
                      className="border p-2 mb-2 w-full"
                    />
                    <textarea
                      placeholder="Description"
                      value={editingReward.description}
                      onChange={(e) => setEditingReward({ ...editingReward, description: e.target.value })}
                      className="border p-2 mb-2 w-full"
                    />
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                      onClick={() => updateReward(editingReward)}
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                      onClick={() => setEditingReward(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <p><strong>Name:</strong> {reward.name}</p>
                    <p><strong>Required Points:</strong> {reward.requiredPoints}</p>
                    <p><strong>Description:</strong> {reward.description}</p>
                    <button
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                      onClick={() => setEditingReward(reward)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                      onClick={() => deleteReward(reward.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RewardManagement;