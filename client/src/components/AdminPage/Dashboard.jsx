import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { db } from '../../firebase/firebase.init';
import { collection, getDocs } from 'firebase/firestore';

import { FaShoppingCart, FaUserFriends, FaBirthdayCake, FaWrench } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const SummaryCard = ({ title, value, icon: Icon, color }) => (
  <div
    className="bg-white rounded-xl shadow-md p-5 flex items-center space-x-4 border-l-8 hover:shadow-lg transition-shadow duration-300"
    style={{ borderColor: color }}
  >
    <Icon className="text-3xl" style={{ color }} />
    <div>
      <h3 className="text-md font-semibold text-gray-700">{title}</h3>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [summaryStats, setSummaryStats] = useState({
    cakeOrders: 0,
    customCakeOrders: 0,
    revenue: 0,
    customers: 0,
    outOfStock: 0,
    availableCakes: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders');
        const data = await res.json();
        setOrders(data);

        const resCustom = await fetch('http://localhost:5000/api/customorders');
        const customData = await resCustom.json();

        const resCakes = await fetch('http://localhost:5000/api/cakes');
        const cakesData = await resCakes.json();

        const availableCakes = Array.isArray(cakesData)
          ? cakesData.filter(cake => cake.availability === true).length
          : 0;

        const usersSnapshot = await getDocs(collection(db, "users"));
        const users = usersSnapshot.docs.map(doc => doc.data());
        const totalCustomers = users.length;

        const cakeOrders = data.filter(order => order.type === 'cake').length;
        const customCakeOrders = customData.length;

        setSummaryStats({
          cakeOrders,
          customCakeOrders,
          revenue: data.reduce((sum, order) => sum + order.totalPrice, 0),
          customers: totalCustomers,
          outOfStock: 5,
          availableCakes,
        });
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const colors = {
    latestOrders: '#6366F1',   // Indigo
    customOrders: '#EC4899',   // Pink
    availableCakes: '#F59E0B', // Amber
    customers: '#10B981',      // Emerald
  };

  const barData = {
    labels: ['Latest Orders', 'Custom Orders', 'Available Cakes', 'Total Customers'],
    datasets: [
      {
        label: 'Count',
        data: [
          orders.length,
          summaryStats.customCakeOrders,
          summaryStats.availableCakes,
          summaryStats.customers,
        ],
        backgroundColor: [
          colors.latestOrders,
          colors.customOrders,
          colors.availableCakes,
          colors.customers,
        ],
        borderRadius: 4,
        maxBarThickness: 40,
      },
    ],
  };

  const pieData = {
    labels: ['Latest Orders', 'Custom Orders', 'Available Cakes', 'Total Customers'],
    datasets: [
      {
        label: 'Distribution',
        data: [
          orders.length,
          summaryStats.customCakeOrders,
          summaryStats.availableCakes,
          summaryStats.customers,
        ],
        backgroundColor: [
          colors.latestOrders,
          colors.customOrders,
          colors.availableCakes,
          colors.customers,
        ],
        hoverOffset: 20,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1,
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 12, padding: 10, font: { size: 14 } },
      },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="p-6 space-y-8 mx-auto">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <SummaryCard
          title="Latest Orders"
          value={orders.length}
          icon={FaShoppingCart}
          color={colors.latestOrders}
        />
        <SummaryCard
          title="Custom Orders"
          value={summaryStats.customCakeOrders}
          icon={FaWrench}
          color={colors.customOrders}
        />
        <SummaryCard
          title="Available Cakes"
          value={summaryStats.availableCakes}
          icon={FaBirthdayCake}
          color={colors.availableCakes}
        />
        <SummaryCard
          title="Total Customers"
          value={summaryStats.customers}
          icon={FaUserFriends}
          color={colors.customers}
        />
      </div>

      {/* Charts side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-4 h-80 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">Summary Bar Chart</h2>
          <Bar data={barData} options={chartOptions} />
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 h-80 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">Summary Pie Chart</h2>
          <Pie data={pieData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
