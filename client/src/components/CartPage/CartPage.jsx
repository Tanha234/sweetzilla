import React, { useEffect, useState } from 'react';
import { Trash2, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';


const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const updateLocalStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDelete = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    updateLocalStorage(updatedCart);
  
    // Dispatch the cartUpdated event to notify Navbar
    window.dispatchEvent(new Event('cartUpdated'));
  };
  

  const handleQuantityChange = (index, type) => {
    const updatedCart = [...cart];
    if (type === 'increase') {
      updatedCart[index].quantity += 1;
    } else if (type === 'decrease' && updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }
    updateLocalStorage(updatedCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (cart.length === 0) {
    return <div className="p-8 text-center text-gray-600">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
  <h2 className="text-3xl font-bold mb-6 text-berryPink">Your Shopping Cart</h2>

  {/* Flex Layout for Cart and Summary */}
  <div className="flex flex-col lg:flex-row gap-8">
    {/* Cart Items - Left */}
    <div className="flex-1">
      {cart.map((item, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4 shadow">
          <div className="flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-32 h-32 object-contain rounded" />
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              
              <p className="text-berryPink text-lg font-medium mt-2">
                Price: ${item.price} × {item.quantity} = ${item.price * item.quantity}
              </p>
              <p className="mt-2 text-sm text-gray-700">{item.details}</p>

              {item.ingredients?.length > 0 && (
                <ul className="text-xs text-gray-600 mt-1 list-disc list-inside">
                  {item.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              )}

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <button
                  onClick={() => handleQuantityChange(i, 'decrease')}
                  className="px-2 py-1 border rounded text-sm"
                >
                  −
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(i, 'increase')}
                  className="px-2 py-1 border rounded text-sm"
                >
                  +
                </button>
                <button
                  onClick={() => handleDelete(i)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Checkout Summary - Right */}
    <div className="w-full lg:w-80 h-fit border rounded-lg shadow p-6 sticky top-24">
      <h3 className="text-xl font-bold mb-4">Summary</h3>
      <p className="text-gray-700 text-base mb-6">
        Total Cost: <span className="text-berryPink font-semibold">${getTotalPrice()}</span>
      </p>
      <Link to="/buy-now">
  <button className="w-full inline-flex items-center justify-center gap-2 bg-berryPink text-white text-base font-medium px-5 py-2 rounded-2xl shadow hover:bg-pink-600 transition-all duration-200">
    <CreditCard className="w-5 h-5" />
    Buy Now
  </button>
</Link>
    </div>
  </div>
</div>

  );
};

export default CartPage;
