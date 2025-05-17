// OrderManagement.jsx
import { useEffect, useState } from "react";
import { Download, Eye, Trash2 } from "lucide-react";

const statusOptions = ["All", "Pending", "Processing", "Delivered", "Cancelled"];

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();

        if (data.message === "No orders found") {
          setOrders([]);
        } else {
          setOrders(data.reverse());
        }
      } catch (err) {
        setError("Could not fetch orders. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (statusFilter === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === statusFilter));
    }
  }, [statusFilter, orders]);

  const updateStatus = async (id, newStatus) => {
    console.log("Updating order:", id, "to status:", newStatus); // log
  
    try {
      // Make the PATCH request
      const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (response.ok) {
        // Update the order status in the local state immediately after the update
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === id ? { ...order, status: newStatus } : order
          )
        );
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  

  const deleteOrder = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "DELETE",
      });
      setOrders(prev => prev.filter(order => order._id !== id));
    } catch (error) {
      console.error("Failed to delete order", error);
    }
  };

  const downloadInvoice = (order) => {
    const blob = new Blob([JSON.stringify(order, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `invoice-${order._id}.json`;
    link.click();
  };

  if (loading) return <p className="p-4">Loading orders...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl text-berryPink font-bold mb-4">Order Management</h2>

      <div className="mb-4">
        <label className="mr-2">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <table className="min-w-full bg-white border">
      <thead>
  <tr className="bg-gray-100">
    <th className="text-left p-2 border">Order ID</th>
    <th className="text-left p-2 border">Cake Name</th>
    <th className="text-left p-2 border">Customer Name</th>
    <th className="text-left p-2 border">Status</th>
    
    <th className="text-left p-2 border">Actions</th>
  </tr>
</thead>
<tbody>
  {filteredOrders.map((order) => (
  <tr key={order._id} className="border-t">
  <td className="p-2 border">{order._id}</td>
  <td className="p-2 border">
    {order.items.map(item => item.name).join(", ")}
  </td>
  <td className="p-2 border">{order.user?.name || "N/A"}</td>
 
  <td className="p-2 border">
  <select
    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1
      ${
        order.status === "Pending"
          ? "bg-yellow-100 text-yellow-800 ring-yellow-300"
          : order.status === "Processing"
          ? "bg-blue-100 text-blue-800 ring-blue-300"
          : order.status === "Delivered"
          ? "bg-green-100 text-green-800 ring-green-300"
          : order.status === "Cancelled"
          ? "bg-red-100 text-red-800 ring-red-300"
          : "bg-gray-100 text-gray-800 ring-gray-300"
      }`}
    value={order.status}
    onChange={(e) => updateStatus(order._id, e.target.value)}
  >
    {statusOptions.slice(1).map((status) => (
      <option key={status} value={status} className="text-black">
        {status}
      </option>
    ))}
  </select>
</td>



  <td className="p-2 border space-x-2 flex">
   
    <button
      onClick={() => downloadInvoice(order)}
      className="text-green-600"
      title="Download Invoice"
    >
      <Download size={18} />
    </button>
    <button
      onClick={() => deleteOrder(order._id)}
      className="text-red-600"
      title="Delete Order"
    >
      <Trash2 size={18} />
    </button>
  </td>
</tr>

  ))}
  {filteredOrders.length === 0 && (
    <tr>
      <td colSpan="6" className="p-4 text-center">No orders found.</td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
}
