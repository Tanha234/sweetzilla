import { Leaf, Egg, Apple, ShieldCheck } from "lucide-react"; // Icon import (optional)

const IngredientsSection = () => {
  const ingredients = [
    {
      title: "Organic Dairy & Eggs",
      icon: <Egg className="w-8 h-8 text-orange-500" />,
      desc: "We use organic, hormone-free milk and farm-fresh eggs to ensure a rich, creamy texture in every bite.",
    },
    {
      title: "Locally Sourced Fruits",
      icon: <Apple className="w-8 h-8 text-orange-500" />,
      desc: "From strawberries to mangoes, our fruits are sourced from trusted local farms for peak freshness.",
    },
    {
      title: "Premium Chocolate & Vanilla",
      icon: <Leaf className="w-8 h-8 text-orange-500" />,
      desc: "Only the finest Belgian chocolate and real Madagascar vanilla go into our cakes — no artificial flavorings.",
    },
    {
      title: "No Preservatives Added",
      icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
      desc: "We believe in clean baking. That means no artificial preservatives or chemicals — just wholesome goodness.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-[#fff6ec] to-[#ffe7d3] py-20 px-6 md:px-44">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-berryPink mb-4">🌿 Ingredients You Can Trust</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
          At SweetDelights, purity is our promise. Every slice is a celebration of real, wholesome ingredients.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {ingredients.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="mb-4 mx-auto flex  items-center justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
    </section>
    
  );
};

export default IngredientsSection;
