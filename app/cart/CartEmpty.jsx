export default function CartEmpty() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
          Your cart is empty.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Browse products and add them to your cart.
        </p>
      </div>
    </div>
  );
}
