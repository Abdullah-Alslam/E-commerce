"use client";

export default function ProfileHeader({ user, onEdit }) {
  return (
    <div>
      <h2 className="mb-8 text-3xl font-extrabold text-red-700 md:text-4xl dark:text-red-400">
        Welcome, {user.name}!
      </h2>

      <div className="mb-6 space-y-4 text-gray-700 dark:text-gray-200">
        <p>
          <span className="font-semibold text-red-600 dark:text-red-400">
            Email:
          </span>{" "}
          {user.email}
        </p>
        <p>
          <span className="font-semibold text-red-600 dark:text-red-400">
            Username:
          </span>{" "}
          {user.name}
        </p>
        <p>
          <span className="font-semibold text-red-600 dark:text-red-400">
            Password:
          </span>{" "}
          {"********"}
        </p>
      </div>

      <button
        onClick={onEdit}
        className="px-6 py-3 font-semibold text-white transition-all duration-200 bg-red-600 shadow-lg hover:bg-red-700 rounded-2xl"
      >
        Edit Profile
      </button>
    </div>
  );
}
