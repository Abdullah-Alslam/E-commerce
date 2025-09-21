export default function SecurityTab() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Security</h3>
      <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
        Logout
      </button>
      <div className="mt-6">
        <h4 className="font-semibold mb-2">Active Sessions (Optional)</h4>
        <p className="text-gray-500">Session info goes here...</p>
      </div>
    </div>
  );
}
