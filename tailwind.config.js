/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ✅ لتفعيل الوضع الداكن عبر إضافة كلاس "dark" على <html> أو <body>
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // ✅ مهم: مسارات Flowbite حتى يولّد Tailwind الـ CSS الخاص بها
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-react/**/*.js',
  ],
  theme: {
    extend: {}, // هنا ممكن تضيف ألوان أو خطوط مخصصة إذا احتجت لاحقاً
  },
  plugins: [
    require('flowbite/plugin'), // ✅ تفعيل Plugin الخاص بـ Flowbite
  ],
};
