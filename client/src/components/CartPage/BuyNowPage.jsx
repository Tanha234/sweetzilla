import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const BuyNowPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);

    const cost = storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(cost.toFixed(2));
  }, []);

  const groupedItems = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.totalPrice += item.price * item.quantity;
    } else {
      acc.push({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.price * item.quantity,
      });
    }
    return acc;
  }, []);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!userDetails.name.trim() || !userDetails.address.trim() || !userDetails.phone.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all the fields!',
      });
      return;
    }

    if (cart.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Empty Cart',
        text: 'Your cart is empty. Please add some items before ordering.',
      });
      return;
    }

    const orderDetails = {
      items: groupedItems,
      total,
      user: userDetails,
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();

      if (data.message === 'Order placed successfully!') {
        Swal.fire({
          icon: 'success',
          title: 'Order Confirmed!',
          text: 'Thank you for your purchase.',
        });
        localStorage.removeItem('cart');
        setCart([]);
        setUserDetails({ name: '', address: '', phone: '' });
        navigate('/cakes');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to place order. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 my-4">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-1/2 w-full">
          <img
            src="https://i.pinimg.com/736x/84/fb/01/84fb01dd7c03bfb9233a884387758b65.jpg"
            alt="Checkout Illustration"
            className="w-full h-96"
          />
        </div>

        <div className="md:w-1/2 w-full">
          <div className="mb-6 p-4 border rounded shadow bg-white">
            <h3 className="text-xl font-semibold mb-2">Items in Your Cart:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {groupedItems.map((item, i) => (
                <li key={i}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-lg font-medium">
              Total: <span className="text-berryPink">${total}</span>
            </p>
          </div>

          <form onSubmit={handleOrderSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full border p-2 rounded"
              value={userDetails.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Delivery Address"
              className="w-full border p-2 rounded"
              value={userDetails.address}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full border p-2 rounded"
              value={userDetails.phone}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-berryPink text-white px-6 py-2 rounded-2xl shadow hover:bg-pink-600 transition-all duration-200"
            >
              Confirm Purchase
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyNowPage;
