import { useEffect, useState } from 'react';
import {
  LayoutDashboard, Package, ClipboardList, Users,
  AlertCircle, Cake, Percent, FileText, MessageCircle
} from 'lucide-react';
import { auth } from '../../firebase/firebase.init'; // Adjust path to your Firebase setup
import Dashboard from './Dashboard';
import CustomersPage from './CustomersPage';
import OrderPage from './OrderPage';
import CakeEntryForm from './CakeEntryForm';
import OrderManagemnetPage from './OrderManagemnetPage';
import CustomCakeOrders from './CustomCakeOrders';

const tabs = [
  { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard size={18} /> },
  { id: 'products', label: 'Product Management', icon: <Package size={18} /> },
  { id: 'orders', label: 'Order Management', icon: <ClipboardList size={18} /> },
  { id: 'customers', label: 'Customer Management', icon: <Users size={18} /> },
 
  { id: 'custom', label: 'Custom Cake Orders', icon: <Cake size={18} /> },


  // { id: 'reviews', label: 'Reviews & Feedback', icon: <MessageCircle size={18} /> },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setAdmin(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <div><Dashboard/></div>;
      case 'products':
        return <div><OrderManagemnetPage/></div>;
      case 'orders':
        return <div><OrderPage/></div>;
      case 'customers':
        return <div><CustomersPage/></div>;
    
      case 'custom':
        return <div><CustomCakeOrders/></div>;
    
     
      // case 'reviews':
      //   return <div><h2 className="text-xl font-semibold mb-4">Reviews & Feedback</h2></div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-sweetPink border-r p-4 shadow-md">
        {/* Admin Info */}
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src={admin?.photoURL || 'https://i.pravatar.cc/100'}
            alt="Admin"
            className="w-20 h-20 rounded-full object-cover mb-2"
          />
          <h3 className="text-lg font-semibold">{admin?.displayName || 'Admin User'}</h3>
          <p className="text-sm text-gray-800">{admin?.email || 'admin@example.com'}</p>
        </div>

        {/* Tabs */}
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? ' text-pink-900'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="bg-white p-6 rounded-lg shadow">{renderTabContent()}</div>
      </main>
    </div>
  );
}
