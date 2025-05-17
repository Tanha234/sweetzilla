import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase.init";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Power } from "lucide-react";

export default function CustomersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const userList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  // Chart Data
  const chartData = [
    {
      name: "Customers",
      Total: users.length,
      Active: users.filter(u => !u.isBanned).length,
      Banned: users.filter(u => u.isBanned).length,
    },
  ];

  // Toggle ban status
  const toggleStatus = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, "users", id), { isBanned: !currentStatus });
      setUsers(prev =>
        prev.map(user =>
          user.id === id ? { ...user, isBanned: !currentStatus } : user
        )
      );
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-berryPink">Customers Overview</h2>

      {/* Chart Section */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="Total" fill="#8884d8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Active" fill="#82ca9d" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Banned" fill="#f87171" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone || "-"}</td>
                  <td className="p-3">{user.isBanned ? "Banned" : "Active"}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => toggleStatus(user.id, user.isBanned)}
                      className={`p-2 rounded-full ${
                        user.isBanned ? "bg-red-100" : "bg-green-100"
                      } hover:opacity-80 transition`}
                      title={user.isBanned ? "Unban User" : "Ban User"}
                    >
                      <Power
                        className={`w-4 h-4 ${
                          user.isBanned ? "text-red-500" : "text-green-500"
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
