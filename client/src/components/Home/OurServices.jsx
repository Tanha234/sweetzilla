// components/OurServices.jsx
import { CakeSlice, Truck, Sparkles, Heart } from "lucide-react"; // Adding one more icon

export default function OurServices() {
  const services = [
    {
      title: "Custom Cakes",
      description: "Design your own cake for birthdays, weddings, and special events.",
      icon: <CakeSlice className="text-berryPink w-10 h-10" />,
    },
    {
      title: "Fast Delivery",
      description: "Fresh cakes delivered to your doorstep within hours.",
      icon: <Truck className="text-berryPink w-10 h-10" />,
    },
    {
      title: "Premium Ingredients",
      description: "We use only the finest quality ingredients in every bite.",
      icon: <Sparkles className="text-berryPink w-10 h-10" />,
    },
    {
      title: "Customer Care",
      description: "Our support team is available 24/7 for your inquiries and custom requests.",
      icon: <Heart className="text-berryPink w-10 h-10" />,
    },
  ];

  return (
    <section className="py-16 px-4 md:px-16 bg-berryPink text-center">
      <h2 className="text-3xl font-bold text-gray-100 mb-6">Our Services</h2>
      <p className="text-lg text-gray-200 mb-8">
        We offer a wide range of services to make your celebration sweeter and more memorable!
      </p>
     

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-sweetPink p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="mb-4 flex justify-center">{service.icon}</div>
            <h3 className="text-xl font-semibold text-berryPink mb-2">{service.title}</h3>
            <p className="text-gray-700">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
