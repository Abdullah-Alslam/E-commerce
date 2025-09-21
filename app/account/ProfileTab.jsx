export default function ProfileTab() {
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
          <p className="text-lg font-semibold">John Doe</p>
          <p className="text-gray-500">johndoe@email.com</p>
          <button className="mt-3 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
