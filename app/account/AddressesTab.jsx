export default function AddressesTab() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">My Addresses</h3>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <p className="font-semibold">Home</p>
          <p className="text-gray-600">123 Main Street, City, Country</p>
          <div className="mt-2 space-x-3">
            <button className="text-sky-500 hover:underline">Edit</button>
            <button className="text-red-500 hover:underline">Delete</button>
          </div>
        </div>
        <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg">
          Add New Address
        </button>
      </div>
    </div>
  );
}
