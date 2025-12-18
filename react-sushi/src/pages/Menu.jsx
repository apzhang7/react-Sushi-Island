import { useState, useEffect } from "react";
import Slider from "../components/Slider";
import Cart from "../components/Cart";
import RecentOrders from "../components/RecentOrders";
import toast, { Toaster } from 'react-hot-toast';

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  // Initialize cart from localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch(`${API_URL}/api/menu`)
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Failed to fetch menu:", err));
  }, []);

  // Add item to cart
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i._id === item._id);
      if (exists) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    toast.success(`${item.name} added to cart`, {
      duration: 4000,
      position: "top-left",
    });
  };

  return (
    <div className="menu-page flex flex-col items-center p-4">
      <h2 className="menu-title text-2xl font-bold my-4 text-black">
        Restaurant Menu
      </h2>

      <div className="menu-container flex flex-col md:flex-row gap-6">
        <Toaster position="top-left" reverseOrder={false} />

        {/* Menu Table */}
        <div className="menu-table overflow-x-auto">
          <table className="border-collapse border-2 border-gray-300">
            <thead>
              <tr>
                <th className="border-2 border-gray-300 p-2"></th>
                <th className="border-2 border-gray-300 p-2">Item</th>
                <th className="border-2 border-gray-300 p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item._id}>
                  <td className="border-2 border-gray-300 p-2 text-center">
                    <button
                      className="bg-rose-900 text-white px-2 py-1 rounded"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </td>
                  <td className="border-2 border-gray-300 p-2">
                    {item.name}
                  </td>
                  <td className="border-2 border-gray-300 p-2">
                    ${item.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Slider */}
        <Slider items={menuItems} />
      </div>

      {/* Cart */}
      <Cart cart={cart} setCart={setCart} />

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
}
