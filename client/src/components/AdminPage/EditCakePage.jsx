import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditCakePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    // Add other fields as needed
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCake = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/cakes/${id}`);
        if (!res.ok) throw new Error("Failed to fetch cake");
        const data = await res.json();
        setFormData({
          name: data.name,
          description: data.description,
          // Set other fields here
        });
        setImagePreview(data.image);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCake();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();

    formPayload.append("name", formData.name);
    formPayload.append("description", formData.description);
    // Append other fields here...

    if (imageFile) formPayload.append("image", imageFile);

    try {
      const res = await fetch(`http://localhost:5000/api/cakes/${id}`, {
        method: "PUT",
        body: formPayload,
      });
      if (!res.ok) throw new Error("Failed to update cake");
      alert("Cake updated successfully!");
      navigate("/admin");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-semibold mb-8 text-center text-berryPink">
        Edit Cake
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Cake Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-berryPink"
            placeholder="Enter cake name"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-berryPink"
            placeholder="Enter cake description"
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-gray-700 font-medium mb-2"
          >
            Cake Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-gray-600"
          />
        </div>

        {imagePreview && (
          <div className="mt-4 flex justify-center">
            <img
              src={imagePreview}
              alt="Cake Preview"
              className="w-64 h-64 object-cover rounded-lg border border-gray-300 shadow-md"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-berryPink hover:bg-pink-600 text-white font-semibold py-3 rounded-md transition"
        >
          Update Cake
        </button>
      </form>
    </div>
  );
};

export default EditCakePage;
