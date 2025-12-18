import { useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart({ cart, setCart }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;

  if (location.pathname !== "/menu") return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const increase = (id) => {
    setCart(prev =>
      prev.map(item =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrease = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const submitOrder = async () => {
    if (cart.length === 0) return;

    const order = {
      items: cart.map(item => ({ menuItemId: item._id, quantity: item.quantity })),
      total,
    };

    try {
      await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      toast.success("Order placed successfully!", {
        duration: 4000,
        position: "bottom-left",
      });

      setCart([]);
      setOpen(false);
    } catch (err) {
      toast.error("Failed to place order", {
        duration: 4000,
        position: "bottom-left",
      });
      console.error(err);
    }
  };

  return (
    <>
      {!open && (
        <button
          className="fixed top-20 right-5 z-50 bg-rose-900 text-white py-2 px-4 rounded"
          onClick={() => setOpen(true)}
        >
          Your Shopping Cart
        </button>
      )}

      {open && (
        <div className="fixed top-20 right-0 w-80 h-[60vh] bg-gray-100 border-l-2 border-black shadow-lg flex flex-col z-50">
          <h3 className="text-center font-semibold py-2 border-b">Shopping Cart</h3>

          <div className="flex-1 overflow-y-auto p-2">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500">Cart is empty</p>
            ) : (
              cart.map(item => (
                <div
                  key={item._id}
                  className="flex justify-between items-center p-2 mb-2 bg-white rounded shadow-sm"
                >
                  <span className="text-black">
                    {item.name} x{item.quantity} — $
                    {(item.price * item.quantity).toFixed(2)}
                  </span>

                  <div className="flex gap-2">
                    <button
                      className="bg-gray-400 text-white px-2 rounded"
                      onClick={() => decrease(item._id)}
                    >
                      −
                    </button>
                    <button
                      className="bg-rose-900 text-white px-2 rounded"
                      onClick={() => increase(item._id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-2 border-t flex flex-col gap-2">
            <div className="text-center font-bold text-black">
              Total: ${total.toFixed(2)}
            </div>

            <button className="w-full bg-black text-white py-2 rounded" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="w-full bg-rose-900 text-white py-2 rounded" onClick={submitOrder}>
              Place Order
            </button>
            <button className="w-full bg-gray-600 text-white py-2 rounded" onClick={() => setOpen(false)}>
              Close Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
