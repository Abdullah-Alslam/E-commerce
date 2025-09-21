"use client";
import { useEffect, useState } from "react";
import axios from "axios";
export default function ProfileTab({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) fetchUser(userId);
  }, [userId]);

  async function fetchUser(id) {
    try {
      const res = await axios.get(`/api/users/${id}`);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Profile Information</h3>
      <div className="flex items-center gap-6">
        <img
          src="https://via.placeholder.com/100"
          alt="User Avatar"
          className="w-24 h-24 rounded-full border"
        />
        <div>
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-gray-500">{user.email}</p>
          <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          <button className="mt-3 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
