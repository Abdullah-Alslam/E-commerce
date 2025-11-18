"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import ProfileHeader from "./ProfileHeader";
import EditProfileModal from "./EditProfileModal";

export default function ProfileTab() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [editUser, setEditUser] = useState({ name: "", email: "" });
  const [actionLoading, setActionLoading] = useState(false);

  const cookie = Cookie();
  const token = cookie.get("token");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/users/me", { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editUser.name || !editUser.email) {
      toast.error("Name and Email are required");
      return;
    }

    try {
      setActionLoading(true);
      const res = await axios.put("/api/users", {
        id: user._id,
        name: editUser.name,
        email: editUser.email,
      });

      setUser(res.data.user);
      toast.success("Profile updated successfully!");
      setShowEdit(false);
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-red-500 rounded-full border-t-transparent"
        />
      </div>
    );

  return (
    <div className="p-6 shadow-2xl md:p-10 bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl">
      <ProfileHeader
        user={user}
        onEdit={() => {
          setEditUser({ name: user.name, email: user.email });
          setShowEdit(true);
        }}
      />

      <EditProfileModal
        show={showEdit}
        editUser={editUser}
        setEditUser={setEditUser}
        onCancel={() => setShowEdit(false)}
        onSave={handleUpdate}
        actionLoading={actionLoading}
      />
    </div>
  );
}
