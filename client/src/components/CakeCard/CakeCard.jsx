import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';


const ShopPage = () => {
  const [cakes, setCakes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCakes, setFilteredCakes] = useState([]);
  const [priceRange, setPriceRange] = useState(75);
  const [sortOrder, setSortOrder] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data.json');
        return res.json();
      })
      .then(data => {
        const allCakes = [...(data['By Flavor'] || []), ...(data['By Type/Design'] || [])];
        setCakes(allCakes);
        setFilteredCakes(allCakes);
      })
      .catch(err => console.error('Error loading data:', err));
  }, []);

  useEffect(() => {
    let filtered = cakes.filter(cake => {
      const nameMatch = cake.name.toLowerCase().includes(searchTerm.toLowerCase());
      const availableSize = cake.sizes.find(size => size.available);
      const priceMatch = availableSize?.price <= priceRange;
      return nameMatch && priceMatch;
    });

    if (sortOrder === 'Price: Low to High') {
      filtered.sort((a, b) => {
        const aPrice = a.sizes.find(size => size.available)?.price || 0;
        const bPrice = b.sizes.find(size => size.available)?.price || 0;
        return aPrice - bPrice;
      });
    } else if (sortOrder === 'Price: High to Low') {
      filtered.sort((a, b) => {
        const aPrice = a.sizes.find(size => size.available)?.price || 0;
        const bPrice = b.sizes.find(size => size.available)?.price || 0;
        return bPrice - aPrice;
      });
    }

    setFilteredCakes(filtered);
  }, [searchTerm, cakes, priceRange, sortOrder]);

  const handleAddToCart = (cake) => {
    console.log('Added to cart:', cake.name);
  };

  return (
    <div className="bg-sweetPink min-h-screen text-gray-800">
      {/* Banner */}
      <div className="relative">
        <img
          src="https://i.pinimg.com/736x/51/3d/7f/513d7fa3532f07b3d25f200f1f1dd440.jpg"
          className="w-full h-64 object-cover"
          alt="Shop Banner"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white italic">Cakes Collection</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <div className="mb-10">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Available Cakes</h2>
            <ul className="space-y-3 text-sm">
              {cakes.slice(0, 8).map((cake, idx) => (
                <li key={idx} className="flex justify-between text-md text-gray-900">
                  <span className="truncate">{cake.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Price Filter</h2>
            <input
              type="range"
              className="w-full"
              min="5"
              max="75"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
            />
            <p className="text-sm mt-1">Up to ${priceRange}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Top Sale</h2>
            <ul className="space-y-4">
              {cakes.slice(0, 3).map((cake, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <img src={cake.image} alt={cake.name} className="w-12 h-12 object-cover rounded-full" />
                  <div>
                    <p className="text-sm font-medium">{cake.name}</p>
                    <p className="text-xs text-gray-800 font-semibold">
                      ${cake.sizes.find(size => size.available)?.price || 'N/A'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="md:col-span-3">
        <div className="flex justify-between items-center mb-8">
  <input
    type="text"
    placeholder="Search cakes..."
    className="p-3 border border-gray-400 text-gray-900 rounded-md w-1/2"
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
  />
  <div className="flex items-center gap-4">
    <select
      className="border p-2 rounded-md"
      value={sortOrder}
      onChange={e => setSortOrder(e.target.value)}
    >
      <option value="">Sort by</option>
      <option>Price: Low to High</option>
      <option>Price: High to Low</option>
    </select>
    <button
      className="ml-4 bg-berryPink text-white font-semibold py-2 px-4 rounded-lg hover:bg-pink-600 transition"
      onClick={() => navigate('/addCustomCake')}
    >
      Order Custom Cake
    </button>
  </div>
</div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCakes.map((cake, idx) => {
              const availableSize = cake.sizes.find(size => size.available);
              return (
                <div
                  key={idx}
                  className="block bg-sweetPink border border-berryPink p-4 shadow rounded-xl text-center hover:shadow-lg transition"
                >
                 <Link to={`/cake/${cake.id}`}>  


                    <img src={cake.image} alt={cake.name} className="w-full h-52 object-cover rounded-md mb-4 " />
                    <h3 className="text-lg font-semibold text-berryPink">{cake.name}</h3>
                    <div className="text-yellow-400 text-sm my-1">⭐⭐⭐⭐☆</div>
                    <p className="text-berryPink font-bold text-lg mb-2">${availableSize?.price || 'N/A'}</p>
                  </Link>
                  <button
                    className="border border-berryPink text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-berryPink hover:text-white transition duration-200 mt-2"
                    onClick={() => handleAddToCart(cake)}
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShopPage;
