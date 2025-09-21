export default function OrdersTab() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">My Orders</h3>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-3">#1234</td>
            <td className="p-3">2025-09-10</td>
            <td className="p-3">$250</td>
            <td className="p-3 text-green-600 font-semibold">Delivered</td>
            <td className="p-3">
              <button className="text-sky-500 hover:underline">View Details</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
