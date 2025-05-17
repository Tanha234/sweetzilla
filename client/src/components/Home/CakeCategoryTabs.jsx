// CakeCategoryTabs.js
import { useState } from "react";

const cakeData = {
  "By Flavor": [
    { name: "Chocolate", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSVXC9OmveSj8zlPuRIQWAmnLU2Bd-cgWxsQ&s" },
    { name: "Vanilla", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhp7mgqfbD3R4a3EN1fDSDh_HyMtUHo5s5g&s" },
    { name: "Red Velvet", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBwGCVGySe5g2TNEP7kYlBMHykraE2a3yZ7A&s" },
    { name: "Strawberry", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1UvoZlIw3DoEb303GYD8Tx4zNM9tn6Qr0xw&s" },
    { name: "Mango", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqgCrzDTfpKnkLFhbmgSv1aF19tInP0Wgr8w&s" },
  ],
  // "By Occasion": [
  //   { name: "Birthday", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTKQI1PC4CugmvWbhdFTwPaSLSI7OnBck_hw&s" },
  //   { name: "Wedding", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlSPTWNI70eORzaU1_ZL0egAXTd8Oqa4P_xg&s" },
  //   { name: "Anniversary", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf9qwfFoIq9XW7M991NrvVuomzqAKIOU49tw&s" },
  //   { name: "Baby Shower", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStMceTHQ4A3wP3tXNHAH_PpMgSfbq06SJu-g&s" },
  //   { name: "Graduation", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL-YjSeapIfK-VBLyydoPXwgKrZe9-pXu4iw&s" },
  // ],
  "By Type/Design": [
    { name: "Fondant", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkayY52tOyr1-YfKekZHjQqwUU99hb-vp4ew&s" },
    { name: "Photo Cake", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_kvbCjra1pogeHP-8itBkureeMLLAaM3x_Q&s" },
    { name: "Cupcake", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQK8lo9tEMVq8uCx-FEabHajFf0kzcdpWDVQ&s" },
    { name: "Tier Cake", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGkpuDqT_L1hZxs9IQVUCQp45QA_SZLhJZiQ&s" },
    { name: "Pinata", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwIm4GNSkWvVeIe3NIdAR1oK9AXIvtVn0r3g&s" },
  ],

};

export default function CakeCategoryTabs() {
  const tabs = Object.keys(cakeData);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="py-20 px-4 text-center bg-sweetPink">
      <h2 className="text-4xl font-bold mb-6 text-berryPink ">Explore Cake Categories</h2>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 border-b ${
              activeTab === tab
                ? "border-white text-berryPink"
                : " text-gray-900 border-berryPink"
            } transition duration-200`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Icons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
        {cakeData[activeTab].map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-sweetPink shadow-md hover:scale-105 transition duration-300">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm font-medium">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
