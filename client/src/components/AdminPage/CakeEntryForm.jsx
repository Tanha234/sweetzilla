import { useState } from "react";
import Swal from "sweetalert2";

export default function CakeEntryForm() {
  const initialCakeState = {
    id: "",
    name: "",
    image: "",
    imageFile: null,
    tags: "",
    description: "",
    ingredients: "",
    availability: true,
    rating: "",
    reviews: "",
    category: "",
    sku: "",
    sizes: [{ weight: "", unit: "lb", price: "", available: true }],
    discount: { percentage: "", validUntil: "" },
  };

  const [cake, setCake] = useState(initialCakeState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCake((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCake((prev) => ({
        ...prev,
        imageFile: file,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...cake.sizes];
    updatedSizes[index][field] =
      field === "available" ? !updatedSizes[index][field] : value;
    setCake({ ...cake, sizes: updatedSizes });
  };

  const addSizeOption = () => {
    setCake((prev) => ({
      ...prev,
      sizes: [
        ...prev.sizes,
        { weight: "", unit: "lb", price: "", available: true },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", cake.id);
    formData.append("name", cake.name);
    formData.append("tags", JSON.stringify(cake.tags.split(",")));
    formData.append("description", cake.description);
    formData.append("ingredients", JSON.stringify(cake.ingredients.split(",")));
    formData.append("availability", cake.availability);
    formData.append("rating", cake.rating);
    formData.append("reviews", cake.reviews);
    formData.append("category", cake.category);
    formData.append("sku", cake.sku);
    formData.append("sizes", JSON.stringify(cake.sizes));
    formData.append("discount", JSON.stringify(cake.discount));

    if (cake.imageFile) {
      formData.append("image", cake.imageFile);
    }

    try {
      const res = await fetch("http://localhost:5000/api/cakes", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);

      Swal.fire({
        icon: "success",
        title: "Cake Added!",
        text: "The cake has been successfully added.",
      });

      setCake(initialCakeState); // ✅ Reset the form

    } catch (err) {
      console.error("Error:", err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add cake. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-orange-50 rounded-2xl shadow-lg border border-berryPink my-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Cake Entry Form
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <Input name="id" value={cake.id} label="Cake ID" onChange={handleChange} />
          <Input name="name" value={cake.name} label="Cake Name" onChange={handleChange} />
          <Input name="tags" value={cake.tags} label="Tags (comma separated)" onChange={handleChange} />
          <Input name="ingredients" value={cake.ingredients} label="Ingredients (comma separated)" onChange={handleChange} />
          <Input name="sku" value={cake.sku} label="SKU" onChange={handleChange} />
          <Input name="category" value={cake.category} label="Category" onChange={handleChange} />
          <TextArea name="description" value={cake.description} label="Description" onChange={handleChange} />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Upload Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-700 border rounded-md p-2" />
            {cake.image && (
              <img src={cake.image} alt="Preview" className="mt-3 w-40 h-40 object-cover rounded shadow border" />
            )}
          </div>

          <Input name="rating" value={cake.rating} label="Rating" onChange={handleChange} type="number" step="0.1" />
          <Input name="reviews" value={cake.reviews} label="Reviews" onChange={handleChange} type="number" />
          <label className="inline-flex items-center mt-2 space-x-2">
            <input type="checkbox" name="availability" checked={cake.availability} onChange={handleChange} />
            <span className="text-sm text-gray-700">Available</span>
          </label>

          {/* Discount */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Discount</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input name="percentage" value={cake.discount.percentage} label="Percentage" onChange={(e) =>
                setCake({ ...cake, discount: { ...cake.discount, percentage: e.target.value } })
              } type="number" />
              <div>
                <label className="block text-sm text-gray-700 mb-1">Valid Until</label>
                <input type="date" value={cake.discount.validUntil} onChange={(e) =>
                  setCake({ ...cake, discount: { ...cake.discount, validUntil: e.target.value } })
                } className="w-full border p-2 rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Sizes Section */}
        <div className="col-span-full mt-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Sizes</h3>
          {cake.sizes.map((size, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 mb-3">
              <Input label="Weight" type="number" value={size.weight} onChange={(e) => handleSizeChange(index, "weight", e.target.value)} />
              <Input label="Price" type="number" value={size.price} onChange={(e) => handleSizeChange(index, "price", e.target.value)} />
              <div>
                <label className="block text-sm text-gray-700 mb-1">Unit</label>
                <select value={size.unit} onChange={(e) => handleSizeChange(index, "unit", e.target.value)} className="w-full border rounded-md p-2">
                  <option value="lb">lb</option>
                  <option value="kg">kg</option>
                </select>
              </div>
              <label className="flex items-center space-x-2 mt-6">
                <input type="checkbox" checked={size.available} onChange={() => handleSizeChange(index, "available")} />
                <span className="text-sm text-gray-700">Available</span>
              </label>
            </div>
          ))}
          <button type="button" onClick={addSizeOption} className="text-blue-600 hover:underline mt-2">+ Add Size</button>
        </div>

        {/* Submit */}
        <div className="col-span-full text-center mt-6">
          <button type="submit" className="bg-berryPink hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow">
            Submit Cake
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      {label && <label className="block text-sm text-gray-700 mb-1">{label}</label>}
      <input {...props} className="w-full border rounded-md p-2" />
    </div>
  );
}

function TextArea({ label, ...props }) {
  return (
    <div>
      {label && <label className="block text-sm text-gray-700 mb-1">{label}</label>}
      <textarea {...props} rows={3} className="w-full border rounded-md p-2" />
    </div>
  );
}
