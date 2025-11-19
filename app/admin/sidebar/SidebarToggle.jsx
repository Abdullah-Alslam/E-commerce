export default function SidebarToggle({ isOpen, toggle }) {
  return (
    <button
      className="fixed z-50 p-2 text-white bg-indigo-500 rounded-lg shadow-lg md:hidden top-5 left-5"
      onClick={toggle}
    >
      ☰
    </button>
  );
}
