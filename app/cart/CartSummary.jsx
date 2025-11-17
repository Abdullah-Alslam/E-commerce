export default function CartSummary({ totalPrice, cart, setCart }) {
  return (
    <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-300">Subtotal</p>
        <p className="text-2xl font-bold mt-1">${totalPrice.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg"
          onClick={() => alert("Checkout not implemented")}
        >
          Proceed to Checkout
        </button>

        <button
          className="px-4 py-2 rounded-xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-gray-700 text-sm"
          onClick={() => {
            if (confirm("Clear cart?")) {
              setCart([]);
            }
          }}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
