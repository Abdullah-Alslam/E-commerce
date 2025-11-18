"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AddressList from "./AddressList";
import AddressModal from "./AddressModal";

export default function AddressesTab() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", street: "" });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("addresses") || "[]");
    setAddresses(stored);
    setTimeout(() => setLoading(false), 600);
  }, []);

  const saveAddresses = (newList) => {
    setAddresses(newList);
    localStorage.setItem("addresses", JSON.stringify(newList));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.street) {
      toast.error("All fields are required!");
      return;
    }

    if (editAddress) {
      const updated = addresses.map((a) =>
        a.id === editAddress.id ? { ...editAddress, ...form } : a
      );
      saveAddresses(updated);
      toast.success("✅ Address updated!");
    } else {
      const newAddr = { id: Date.now(), ...form };
      saveAddresses([...addresses, newAddr]);
      toast.success("✅ Address added!");
    }

    setShowModal(false);
    setEditAddress(null);
    setForm({ name: "", phone: "", street: "" });
  };

  const onDelete = (id) => {
    const filtered = addresses.filter((a) => a.id !== id);
    saveAddresses(filtered);
    toast.success("🗑️ Address deleted!");
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg min-h-[60vh]">
      <h2 className="mb-6 text-3xl font-extrabold tracking-wide text-red-600 dark:text-red-400">
        My Addresses
      </h2>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-red-200 shadow-md h-28 dark:bg-red-900 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          <AddressList
            addresses={addresses}
            onEdit={(addr) => {
              setEditAddress(addr);
              setForm(addr);
              setShowModal(true);
            }}
            onDelete={onDelete}
          />

          <div className="mt-6 text-center">
            <button
              className="px-8 py-3 font-semibold text-white transition bg-red-600 shadow-lg rounded-xl hover:bg-red-700"
              onClick={() => setShowModal(true)}
            >
              + Add New Address
            </button>
          </div>
        </>
      )}

      <AddressModal
        show={showModal}
        form={form}
        setForm={setForm}
        editAddress={editAddress}
        onCancel={() => {
          setShowModal(false);
          setEditAddress(null);
          setForm({ name: "", phone: "", street: "" });
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
}
