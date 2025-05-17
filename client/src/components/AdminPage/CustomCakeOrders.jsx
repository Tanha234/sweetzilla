import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const statusOptions = [
  { label: 'Pending', color: 'bg-yellow-300 text-yellow-800' },
  { label: 'Confirmed', color: 'bg-blue-300 text-blue-800' },
  { label: 'In Progress', color: 'bg-purple-300 text-purple-800' },
  { label: 'Completed', color: 'bg-green-300 text-green-800' },
  { label: 'Canceled', color: 'bg-red-300 text-red-800' },
];

const CustomCakeOrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/customorders');
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      const res = await fetch(`http://localhost:5000/api/customorders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      const updatedOrder = await res.json();

      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? updatedOrder : order))
      );

      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: `Order status changed to "${newStatus}"`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error updating status: ' + err.message,
      });
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const getStatusClasses = (status) => {
    const found = statusOptions.find((option) => option.label === status);
    return found ? found.color : '';
  };

  if (loading) return <div className="text-center mt-10">Loading orders...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">Error: {error}</div>;
  if (orders.length === 0) return <div className="text-center mt-10">No custom cake orders found.</div>;

  return (
    <div className="max-w-full overflow-x-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Custom Cake Orders</h1>
      <table className="min-w-full border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Flavor</th>
            <th className="px-4 py-2 border">Size</th>
            <th className="px-4 py-2 border">Delivery Date</th>
            <th className="px-4 py-2 border">Message</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">
                {order.imageUrl ? (
                  <img
                    src={`http://localhost:5000${order.imageUrl}`}
                    alt={`Cake order by ${order.name}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  '—'
                )}
              </td>
              <td className="border px-4 py-2">{order.name}</td>
              <td className="border px-4 py-2">{order.phone}</td>
              <td className="border px-4 py-2">{order.cakeFlavor}</td>
              <td className="border px-4 py-2">{order.cakeSize}</td>
              <td className="border px-4 py-2">
                {new Date(order.deliveryDate).toLocaleDateString()}
              </td>
              <td
                className="border px-4 py-2 italic max-w-xs truncate"
                title={order.message}
              >
                {order.message || '—'}
              </td>
              <td className="border px-4 py-2">
                <select
                  value={order.status || 'Pending'}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  disabled={updatingOrderId === order._id}
                  className={`border rounded px-2 py-1 font-semibold ${
                    getStatusClasses(order.status || 'Pending')
                  } ${
                    updatingOrderId === order._id ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {statusOptions.map(({ label }) => (
                    <option
                      key={label}
                      value={label}
                      className={getStatusClasses(label)}
                    >
                      {label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomCakeOrdersTable;
