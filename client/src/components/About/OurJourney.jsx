const AboutSection = () => {
  return (
    <section className="bg-[#fce9db] py-16 px-6 md:px-44">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Image + Text */}
        <div className="flex flex-col md:flex-row gap-24 items-center">
          {/* Image */}
          <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-lg">
            <img
              src="https://i.pinimg.com/736x/95/e3/48/95e34840e9aee13f131b97351de194fe.jpg"
              alt="Delicious Cake"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🍰 SweetDelights</h2>
            <p className="text-gray-600 mb-4">
              At Cake Haven, we craft premium, handcrafted cakes for every occasion. From elegant
              wedding cakes to fun birthday treats, our creations are baked with love and the
              finest ingredients.
            </p>
            <p className="text-gray-600 mb-6">
              Whether you’re celebrating a milestone or simply craving something sweet, we’ve got
              the perfect cake to delight your taste buds. With stunning designs, irresistible
              flavors, and quick delivery, we’re here to make your special moments unforgettable.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition duration-300">
              Explore Cakes
            </button>
          </div>
        </div>

      {/* Bottom Cards */}
<div className="mt-16 grid gap-6 grid-cols-1 md:grid-cols-3">
  {[
    {
      num: "01",
      text: `Each cake is baked fresh to order, ensuring moist layers and rich, unforgettable flavors.
We use the finest ingredients including farm-fresh eggs, real butter, and Belgian chocolate.
Our baking process is handled by skilled artisans who pour love into every creation.
Allergen-friendly and vegan options are available for those with dietary needs.
You can choose from a variety of sponge types — vanilla, chocolate, red velvet, and more.
We focus on delivering consistent quality and taste in every batch we bake.
Fresh fruit toppings and house-made fillings add bursts of flavor in every bite.
We don’t freeze our cakes; they’re made just in time for delivery or pickup.
`,
      bg: "bg-orange-400",
      textColor: "text-white",
    },
    {
      num: "02",
      text: `Custom designs are our specialty — from kid-friendly cartoon characters to classy floral aesthetics.
We work closely with our clients to ensure their vision is brought to life in cake form.
Want a cake shaped like a guitar or a unicorn? We’ve made those and more.
Edible printing is also available for logos, photos, or custom messages.
Our team includes expert decorators skilled in fondant, buttercream, and sculpting techniques.
You can personalize flavors, colors, shapes, and even the height of your cake tiers.
We also offer tiered wedding cakes with elegant finishes and modern textures.
.`,
      bg: "bg-gray-900",
      textColor: "text-white",
    },
    {
      num: "03",
      text: `We ensure timely delivery so your cake arrives fresh and picture-perfect, right on schedule.
Same-day or next-day delivery is available in selected areas.
Our team carefully packages each cake in a secure, chilled box to prevent damage during transport.
You can track your order status in real-time through our website or mobile app.
We offer contactless delivery options for your convenience and safety.
Need a last-minute cake? Check our ready-to-go daily specials.
Our customer service is available 7 days a week for any questions or issues.
!`,
      bg: "bg-orange-400",
      textColor: "text-white",
    },
  ].map((item, index) => (
    <div
      key={index}
      className={`${item.bg} ${item.textColor} p-6 rounded-lg shadow-md transition duration-300 whitespace-pre-line`}
    >
      
      <h3 className="text-xl font-bold mb-4">{item.num}</h3>
      <p className="text-sm leading-relaxed">{item.text}</p>
    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default AboutSection;
