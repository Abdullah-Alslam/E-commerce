"use client";

import AddressCard from "./AddressCard";

export default function AddressList({ addresses, onEdit, onDelete }) {
  return (
    <div className="grid gap-4">
      {addresses.length === 0 ? (
        <p className="py-6 text-center text-gray-600 dark:text-gray-300">
          No addresses yet. Add one below.
        </p>
      ) : (
        addresses.map((addr) => (
          <AddressCard
            key={addr.id}
            addr={addr}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}
