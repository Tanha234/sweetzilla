import React, { useState } from 'react';
import Swal from 'sweetalert2';

const initialState = {
  name: '',
  email: '',
  phone: '',
  cakeFlavor: '',
  cakeSize: '',
  deliveryDate: '',
  message: '',
  image: null,
  imagePreview: null,
};

const CustomCakeOrderForm = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append('name', formData.name);
    formPayload.append('email', formData.email);
    formPayload.append('phone', formData.phone);
    formPayload.append('cakeFlavor', formData.cakeFlavor);
    formPayload.append('cakeSize', formData.cakeSize);
    formPayload.append('deliveryDate', formData.deliveryDate);
    formPayload.append('message', formData.message);
    if (formData.image) {
      formPayload.append('image', formData.image);
    }

    try {
      const response = await fetch('http://localhost:5000/api/customorders', {
        method: 'POST',
        body: formPayload,
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Order submitted!',
          text: 'Your custom cake order has been received successfully.',
        });
        setFormData(initialState); // reset form
      } else {
        const errorText = await response.text();
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: `Failed to submit order: ${errorText}`,
        });
        console.error('Error response:', errorText);
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error submitting order. Please try again later.',
      });
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-orange-50 border border-sweetPink rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-berryPink mb-6 text-center">
        Order Your Custom Cake
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-gray-900">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="cakeFlavor"
          placeholder="Cake Flavor"
          required
          value={formData.cakeFlavor}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="cakeSize"
          placeholder="Cake Size"
          required
          value={formData.cakeSize}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="deliveryDate"
          placeholder="Delivery Date"
          required
          value={formData.deliveryDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="message"
          placeholder="Additional Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <div>
          <label className="block mb-1 font-semibold" htmlFor="image">
            Upload Reference Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        {formData.imagePreview && (
          <div className="mt-2">
            <p className="font-semibold">Preview:</p>
            <img
              src={formData.imagePreview}
              alt="Reference Preview"
              className="w-48 h-48 object-cover rounded-md border border-gray-400"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-berryPink text-white font-semibold py-3 rounded-lg hover:bg-pink-600 transition"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default CustomCakeOrderForm;
