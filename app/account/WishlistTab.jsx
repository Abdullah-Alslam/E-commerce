export default function WishlistTab() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">My Wishlist</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 border rounded-lg">
          <img
            src="https://via.placeholder.com/150"
            alt="Product"
            className="rounded mb-3"
          />
          <p className="font-semibold">Laptop HP</p>
          <p className="text-gray-500">$700</p>
          <div className="mt-2 space-x-2">
            <button className="px-3 py-1 bg-sky-500 text-white rounded hover:bg-sky-600">
              Move to Cart
            </button>
            <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
