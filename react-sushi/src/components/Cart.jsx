import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Cart({ cart, setCart }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Only show cart on Menu page
  if (location.pathname !== "/menu") return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const increase = (name) =>
    setCart((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decrease = (name) =>
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );

  const clearCart = () => setCart([]);

  return (
    <div>
      {/* Cart Toggle Button */}
      {!open && (
        <button
          className="fixed top-20 right-5 z-50 bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => setOpen(true)}
        >
          Your Shopping Cart
        </button>
      )}

      {/* Cart Panel */}
      <div
        className={`fixed top-20 right-0 w-80 h-[60vh] bg-gray-100 border-l-2 border-black shadow-lg flex flex-col z-50`}
        style={{ display: open ? "flex" : "none" }}
      >
        <h3 className="text-center font-semibold py-2 border-b">Shopping Cart</h3>
        <div className="cart-items flex-1 overflow-y-auto p-2">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                className="cart-item flex justify-between items-center p-2 mb-2 bg-white rounded shadow-sm"
                key={item.name}
              >
                <span>
                  {item.name} x{item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                </span>
                <div className="flex gap-2">
                  <button
                    className="bg-orange-500 text-white px-2 rounded"
                    onClick={() => decrease(item.name)}
                  >
                    −
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 rounded"
                    onClick={() => increase(item.name)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer p-2 border-t flex flex-col gap-2">
          <div className="text-center font-bold">Total: ${total.toFixed(2)}</div>
          <button
            className="w-full bg-black text-white py-2 rounded"
            onClick={clearCart}
          >
            Clear Cart
          </button>
          <button
            className="w-full bg-gray-600 text-white py-2 rounded"
            onClick={() => setOpen(false)}
          >
            Close Cart
          </button>
        </div>
      </div>
    </div>
  );
}
