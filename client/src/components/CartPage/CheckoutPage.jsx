import React from 'react';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];

  return (
      <div className='bg-orange-50'style={{ backgroundImage: "url('/https://i.pinimg.com/736x/88/2a/24/882a24918759c33e2969cdb9755611ed.jpg')" }}>
    <div className="max-w-4xl mx-auto p-12 bg-cover bg-center" >
      <h2 className="text-2xl font-bold mb-6 text-berryPink">Checkout Form</h2>

      {cart.map((item, idx) => (
        <div key={idx} className="bg-white bg-opacity-80 border border-pink-200 rounded-lg p-4 mb-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-sm">Cake Name</label>
              <input type="text" value={item.name} readOnly className="w-full border p-2 rounded bg-gray-100" />
            </div>
            <div>
              <label className="block font-medium text-sm">Size</label>
              <input type="text" value={item.size}  className="w-full border p-2 rounded bg-gray-100" />
            </div>
            <div>
              <label className="block font-medium text-sm">Quantity</label>
              <input type="number" value={item.quantity} readOnly className="w-full border p-2 rounded bg-gray-100" />
            </div>
            <div>
              <label className="block font-medium text-sm">Price</label>
              <input type="text" value={`$${item.price}`} readOnly className="w-full border p-2 rounded bg-gray-100" />
            </div>

            {/* Additional User Inputs */}
            <div>
              <label className="block font-medium text-sm">Your Name</label>
              <input type="text" placeholder="Enter full name" className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block font-medium text-sm">Email Address</label>
              <input type="email" placeholder="you@example.com" className="w-full border p-2 rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium text-sm">Delivery Address</label>
              <textarea rows="3" placeholder="123 Main St, City, ZIP" className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block font-medium text-sm">Contact Number</label>
              <input type="tel" placeholder="e.g. +1234567890" className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block font-medium text-sm">Special Instructions</label>
              <input type="text" placeholder="e.g. no nuts, write message on cake" className="w-full border p-2 rounded" />
            </div>
          </form>
        </div>
      ))}

      <button className="mt-4 bg-berryPink text-white font-medium px-6 py-2 rounded-xl hover:bg-pink-600 transition">
        Submit Order
      </button>
    </div>
    </div>
  );
};

export default CheckoutPage;
