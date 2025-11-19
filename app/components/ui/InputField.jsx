"use client";

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  showToggle,
  toggleHandler,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-800 dark:text-gray-100"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl px-4 py-3 bg-white/70 dark:bg-neutral-800/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E30613] transition-shadow shadow-sm"
        />
        {showToggle && toggleHandler && (
          <button
            type="button"
            onClick={toggleHandler}
            className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            {type === "password" ? "👁️" : "🙈"}
          </button>
        )}
      </div>
    </div>
  );
}
