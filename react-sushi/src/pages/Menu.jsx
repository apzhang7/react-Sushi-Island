import { useState } from "react";
import Slider from "../components/Slider";
import Cart from "../components/Cart";
import { menuItems } from "../data/menu";

export default function Menu() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.name === item.name);
      if (exists) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else return [...prev, { ...item, quantity: 1 }];
    });
  };

  return (
    <div className="menu-page flex flex-col items-center p-4">
      <h2 className="menu-title text-2xl font-bold my-4">Restaurant Menu</h2>

      <div className="menu-container flex flex-col md:flex-row gap-6">
        {/* Table */}
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
                <tr key={item.name}>
                  <td className="border-2 border-gray-300 p-2">
                    <button
                      className="bg-blue-600 text-white px-2 py-1 rounded"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </td>
                  <td className="border-2 border-gray-300 p-2">{item.name}</td>
                  <td className="border-2 border-gray-300 p-2">${item.price.toFixed(2)}</td>
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
    </div>
  );
}
