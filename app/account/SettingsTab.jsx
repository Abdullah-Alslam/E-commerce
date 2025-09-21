export default function SettingsTab() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Change Password</label>
          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" /> Email Notifications
          </label>
        </div>
        <div>
          <label className="block font-semibold mb-1">Payment Methods</label>
          <p className="text-gray-500">No payment methods added</p>
          <button className="mt-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">
            Add Payment Method
          </button>
        </div>
      </div>
    </div>
  );
}
