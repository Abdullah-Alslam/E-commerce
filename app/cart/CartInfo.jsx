"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import useCart from "./useCart";
import CartSkeleton from "./CartSkeleton";
import CartEmpty from "./CartEmpty";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function CartInfo() {
  const { cart, loading, savingIds, removeFromCart, totalPrice, setCart } =
    useCart();

  const variants = {
    hidden: { opacity: 0, y: 8 },
    enter: { opacity: 1, y: 0 },
    hover: { scale: 1.02 },
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl px-4 mx-auto">
        <h1 className="mb-8 text-4xl font-bold">My Cart</h1>

        {loading ? (
          <CartSkeleton />
        ) : cart.length === 0 ? (
          <CartEmpty />
        ) : (
          <>
            <div className="grid gap-6">
              {cart.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  savingIds={savingIds}
                  removeFromCart={removeFromCart}
                  variants={variants}
                />
              ))}
            </div>

            <CartSummary
              totalPrice={totalPrice}
              cart={cart}
              setCart={setCart}
            />
          </>
        )}
      </div>
    </div>
  );
}
