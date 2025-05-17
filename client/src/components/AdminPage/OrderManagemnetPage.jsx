import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const CakeManagementPage = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCakes = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/cakes");
      if (!res.ok) throw new Error("Failed to fetch cakes");
      const data = await res.json();
      setCakes(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCakes();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This cake will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#27ae60",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/api/cakes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete cake");
      }

      setCakes((prevCakes) => prevCakes.filter((cake) => cake._id !== id));

      Swal.fire("Deleted!", "Cake has been deleted.", "success");
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-berryPink">Cake Management</h2>
        <button
          onClick={() => navigate("/addCake")}
          className="bg-orange-400 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Add a New Cake
        </button>
      </div>

      <h1 className="text-xl font-semibold mb-6">
        Total Cakes Available: {cakes.length}
      </h1>

      {loading ? (
        <p className="text-gray-600">Loading cakes...</p>
      ) : cakes.length === 0 ? (
        <p className="text-gray-600">No cakes found.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {cakes.map((cake) => (
            <div
              key={cake._id}
              className="flex gap-4 border rounded-lg p-4 shadow hover:shadow-lg transition bg-white"
            >
              <img
                src={cake.image}
                alt={cake.name}
                className="w-32 h-32 object-cover rounded"
              />
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-bold">{cake.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {cake.description || cake.category}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">
                      Price: ${cake.sizes?.[0]?.price ?? "15.00"}
                    </span>
                  </p>
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => navigate(`/cakes/edit/${cake._id}`)}
                    className="flex items-center gap-1 bg-orange-400 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cake._id)}
                    className="flex items-center gap-1 bg-berryPink hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CakeManagementPage;
