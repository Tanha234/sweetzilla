import React, { useEffect, useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { User, List, Heart, Bell } from 'lucide-react';
import { auth, storage } from '../../firebase/firebase.init';
import PersonalInfo from './PersonalInfo';

const tabs = [
  { id: 'info', label: 'Personal Info', icon: <User size={18} /> },
  { id: 'orders', label: 'My Orders', icon: <List size={18} /> },
  { id: 'wishlist', label: 'Wishlist', icon: <Heart size={18} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('info');
  const [user, setUser] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchOrdersAndWishlist = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch orders
        const ordersRes = await fetch(`http://localhost:5000/api/orders?name=${user.displayName}`);
        if (!ordersRes.ok) throw new Error('Failed to fetch orders');
        const ordersData = await ordersRes.json();

        // Fetch wishlist
        const wishlistRes = await fetch(`http://localhost:5000/api/wishlist/${user.displayName}`);
        if (!wishlistRes.ok) throw new Error('Failed to fetch wishlist');
        const wishlistData = await wishlistRes.json();

        // Set order history and wishlist data for tabs
        setOrderHistory(ordersData.message === 'No orders found' ? [] : ordersData.reverse());
        setWishlist(wishlistData.items || []);

        // Calculate total ordered items count (sum of quantities in all orders)
        const totalOrderedItems = ordersData.message === 'No orders found' ? 0 :
          ordersData.reduce((totalOrders, order) => {
            return totalOrders + order.items.reduce((sum, item) => sum + item.quantity, 0);
          }, 0);

        setOrdersCount(totalOrderedItems);
        setWishlistCount(wishlistData.items ? wishlistData.items.length : 0);
      } catch (error) {
        console.error(error);
        setError(error.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndWishlist();
  }, [user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !auth.currentUser) return;

    try {
      const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(auth.currentUser, { photoURL: downloadURL });

      // Reload user and refresh UI
      await auth.currentUser.reload();
      setUser(auth.currentUser);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await fetch(`http://localhost:5000/api/wishlist/${user.displayName}/${itemId}`, {
        method: 'DELETE',
      });

      setWishlist((prev) => prev.filter((item) => item.id !== itemId));
      setWishlistCount((count) => count - 1);
    } catch (error) {
      console.error('Failed to delete wishlist item:', error);
    }
  };

  const tabsWithCounts = tabs.map((tab) => {
    if (tab.id === 'orders') {
      return { ...tab, label: `My Orders (${ordersCount})` };
    }
    if (tab.id === 'wishlist') {
      return { ...tab, label: `Wishlist (${wishlistCount})` };
    }
    return tab;
  });

  const renderNotificationsContent = () => (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Notifications</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-md">
          <span className="text-2xl">📦</span>
          <p className="text-gray-700">
            You have ordered <strong>{ordersCount}</strong> item(s) in total.
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-pink-50 p-3 rounded-md">
          <span className="text-2xl">💖</span>
          <p className="text-gray-700">
            You have <strong>{wishlistCount}</strong> item(s) in your wishlist.
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-green-50 p-3 rounded-md">
          <span className="text-2xl">🎉</span>
          <p className="text-gray-700 font-semibold">Get 10% off on your next cake!</p>
        </div>
      </div>
    </div>
  );
  

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return <PersonalInfo />;
      case 'orders':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            {loading && <p>Loading orders...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <ul className="space-y-4">
              {orderHistory.length === 0 ? (
                <p className="text-gray-600">No orders found.</p>
              ) : (
                orderHistory.map((order) => (
                  <li
                    key={order._id}
                    className="border border-purple-300 p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-6 rounded-xl border bg-green-50 border-green-200 relative">
                        <div className="flex justify-between items-center mb-3">
                          <p className="font-semibold text-lg text-gray-800">Order #{order._id}</p>
                          <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                            {order.status}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">
                          <span className="font-medium text-gray-700">Date:</span>{' '}
                          {new Date(order.date).toLocaleDateString()}
                        </p>

                        <div className="text-sm text-gray-700">
                          <h3 className="font-semibold mb-2">Ordered Items:</h3>
                          <ul className="list-disc list-inside space-y-1">
                            {order.items.map((item) => (
                              <li key={item._id}>
                                <span className="font-medium">{item.name}</span> × {item.quantity}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="absolute top-4 right-4 text-gray-400 text-lg">📄</div>

                        <div className="text-right text-xl font-bold text-pink-500 mt-5">
                          ${order.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        );
      case 'wishlist':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
            {loading && <p>Loading wishlist...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {wishlist.length === 0 ? (
              <p className="text-gray-600">Your wishlist is empty.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border rounded-lg bg-white shadow-sm relative"
                  >
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                      title="Remove from Wishlist"
                    >
                      ✕
                    </button>
                    <div className="flex flex-col items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-32 rounded-lg object-cover mb-4"
                      />
                      <div className="text-center">
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.description || 'No details available.'}
                        </p>
                        <p className="text-berryPink font-bold text-lg">${item.price || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'notifications':
        return renderNotificationsContent();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white border-r p-6 shadow-md">
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={user?.photoURL || 'https://i.pravatar.cc/100'}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-2 object-cover"
          />
          <label className="text-xs text-blue-600 cursor-pointer hover:underline">
            Change Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <p className="mt-2 font-semibold">{user?.displayName || 'User'}</p>
          <p className="text-gray-600 text-sm">{user?.email}</p>
        </div>

        <nav className="space-y-2">
          {tabsWithCounts.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-berryPink text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-10">
        <div className="bg-white p-6 rounded-lg shadow">{renderTabContent()}</div>
      </main>
    </div>
  );
}
