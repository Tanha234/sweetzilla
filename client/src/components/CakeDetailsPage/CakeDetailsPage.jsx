import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase.init'; // Ensure this is imported

const CakeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cake, setCake] = useState(null);
  const [allCakes, setAllCakes] = useState([]);
  const [activeTab, setActiveTab] = useState('description');
  const [currentUser, setCurrentUser] = useState(null); // Add this state for current user

  useEffect(() => {
    // Fetch the cake data
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        const cakes = [...data['By Flavor'], ...data['By Type/Design']];
        setAllCakes(cakes);
        const selectedCake = cakes.find(c => String(c.id) === id);
        setCake(selectedCake);
      });
  }, [id]);

  useEffect(() => {
    // Fetch user from Firebase
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); // Update current user when auth state changes
    });
    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  if (!cake) return <div className="p-8 text-center text-gray-600">Loading cake details...</div>;

  const relatedProducts = allCakes.filter(item => item.id !== cake.id).slice(0, 4);

  const handleAddToWishlist = async () => {
    if (!currentUser || !currentUser.displayName) {
      alert('You must be logged in and have a display name to add to wishlist!');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser.displayName,  // Using displayName here
          item: {
            id: cake.id,
            name: cake.name,
            image: cake.image,
            description:cake.description,
            price: cake.sizes.find(size => size.available)?.price || 'N/A',  // Send the price
          },
        }),
      });
  
      if (!response.ok) {
        console.error('Error adding to wishlist:', response.statusText);
        return;
      }
  
      const data = await response.json();
      alert(data.message || 'Added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };
  
  
  

  const handleAddToCart = () => {
    const selectedSize = cake.sizes.find(size => size.available)?.name;
    const quantity = parseInt(document.querySelector('input[type="number"]').value, 10) || 1;
    const selectedSizeData = cake.sizes.find(size => size.name === selectedSize);

    const cartItem = {
      id: cake.id,
      name: cake.name,
      image: cake.image,
      size: selectedSize,
      quantity,
      price: selectedSizeData?.price || 0,
      ingredients: cake.ingredients || [],
      details: cake.details || cake.description || '',
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));

    // 🔔 Notify Navbar that the cart was updated
    window.dispatchEvent(new Event('cartUpdated'));

    navigate('/cart');
  };

  const handleBuyNow = () => {
    const selectedSize = cake.sizes.find(size => size.available)?.name;
    const quantity = parseInt(document.querySelector('input[type="number"]').value, 10) || 1;
    const selectedSizeData = cake.sizes.find(size => size.name === selectedSize);

    const checkoutItem = {
      id: cake.id,
      name: cake.name,
      image: cake.image,
      size: selectedSize,
      quantity,
      price: selectedSizeData?.price || 0,
      ingredients: cake.ingredients || [],
      details: cake.details || cake.description || '',
    };

    navigate('/checkout', { state: { cart: [checkoutItem] } });
  };

  const handleRelatedProductClick = (productId) => {
    navigate(`/cake/${productId}`);
  };

  return (
    <div>
      <div className="h-60 bg-sweetPink flex items-center justify-center" style={{ backgroundImage: `url('/cake-header.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1 className="text-white text-4xl font-bold drop-shadow">Cake Details</h1>
      </div>

      <div className="max-w-6xl mx-auto -mt-20 bg-orange-50 p-8 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 relative z-10">
        <div>
          <img src={cake.image} alt={cake.name} className="w-full max-h-[400px] rounded-lg object-contain" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">{cake.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="text-yellow-500 text-sm">{'★'.repeat(Math.floor(cake.rating || 0))}</div>
            <span className="text-gray-600 text-sm">({cake.reviews || 0} reviews)</span>
          </div>
          <p className="text-berryPink text-2xl font-semibold mt-3">${cake.sizes.find(size => size.available)?.price || 'N/A'}</p>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <input type="number" min="1" defaultValue="1" className="w-16 border border-gray-900 px-2 py-1 text-sm rounded" />
          </div>

          <div className="flex gap-4 mt-6">
            <button onClick={handleBuyNow} className="bg-berryPink text-white text-sm px-6 py-2 rounded hover:opacity-90">Buy Now</button>
            <button onClick={handleAddToCart} className="border border-sweetPink text-sm px-6 py-2 rounded hover:bg-black hover:text-white">Add to Cart</button>
            <button onClick={handleAddToWishlist} className="border border-gray-400 text-sm px-6 py-2 rounded hover:bg-gray-100">Wishlist</button>
          </div>

          <div className="text-xs text-gray-900 mt-6 space-y-1">
            <p>SKU: 1233</p>
            <p>Category: Cakes, Sweet Touch</p>
            <p>Tags: Classic, Modern</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-10">
        <div className="flex border-b mb-4 space-x-6 text-sm font-semibold text-gray-600">
          {['description', 'info', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 capitalize ${activeTab === tab ? 'border-b-2 border-berryPink text-berryPink' : 'hover:text-berryPink'}`}
            >
              {tab === 'info' ? 'Additional Information' : tab === 'description' ? 'Description' : `Reviews (${cake.reviews || 0})`}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-700 leading-relaxed">
          {activeTab === 'description' && <p>{cake.details || cake.description || 'No description available.'}</p>}
          {activeTab === 'info' && (
            <ul className="list-disc list-inside">
              {cake.ingredients?.length ? cake.ingredients.map((ing, i) => <li key={i}>{ing}</li>) : <li>No additional information available.</li>}
            </ul>
          )}
          {activeTab === 'reviews' && <p>No reviews yet. Be the first to review this cake!</p>}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-12 mb-12">
        <h3 className="text-2xl font-bold mb-4">Related Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map(item => (
            <div key={item.id} className="border rounded-lg p-4 shadow text-center">
              <img src={item.image} alt={item.name} className="h-44 w-full object-contain bg-gray-50 rounded mb-2" />
              <h4 className="text-sm font-semibold">{item.name}</h4>
              <p className="text-xs text-berryPink mt-1">Cake • Sweet</p>
              <p className="text-berryPink text-sm font-medium">${item.sizes.find(size => size.available)?.price || 'N/A'}</p>
              <button className="mt-2 bg-berryPink hover:bg-pink-600 text-white text-xs px-3 py-1 rounded" onClick={() => handleRelatedProductClick(item.id)}>View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CakeDetailsPage;
