import { useEffect, useState } from "react";

export default function RecentOrders() {
  const [recentOrders, setRecentOrders] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/orders/recent?limit=3`)
      .then(res => res.json())
      .then(data => setRecentOrders(data))
      .catch(err => console.error("Failed to fetch recent orders:", err));
  }, []);

  if (!recentOrders || recentOrders.length === 0) {
    return (
      <div className="recent-orders p-4 border rounded shadow-md w-full max-w-3xl mt-8">
        <h3 className="font-bold text-lg mb-2">Recent Orders</h3>
        <p>No recent orders.</p>
      </div>
    );
  }

  return (
    <div className="recent-orders p-4 border rounded shadow-md w-full max-w-3xl mt-8">
      <h3 className="font-bold text-lg mb-2">Recent Orders</h3>
      {recentOrders.map(order => (
        <div key={order._id} className="mb-4 p-2 border-b last:border-b-0">
          <ul>
            {order.items.map(item => (
              <li key={item.menuItemId._id}>
                {item.quantity} × {item.menuItemId.name}
              </li>
            ))}
          </ul>
          <p className="font-semibold mt-1">Total: ${order.total.toFixed(2)}</p>
          <p className="text-gray-500 text-sm">
            Placed at: {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
