export default function AboutUs() {
    return (
      <section className="bg-sweetPink text-[#493628] py-20 px-6 font-sans md:px-44">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About Us</h2>
            <p className="text-[#AF8F6F] uppercase tracking-wider mb-6 text-sm font-medium">
              Baked with love, delivered with joy
            </p>
            <p className="text-gray-800 text-base leading-relaxed mb-6">
              Welcome to <span className="text-orange-900 font-semibold">Sweet Delights</span>, where every cake tells a story. 
              We're a team of passionate bakers crafting artisanal cakes with the finest natural ingredients. 
              Whether you're celebrating a birthday, wedding, or just a sweet craving, our creations bring joy in every slice.
            </p>
            <ul className="space-y-3 text-sm text-orange-950 mb-8">
              <li>✅ Made fresh daily with local ingredients</li>
              <li>✅ 100% preservative-free & eggless options</li>
              <li>✅ Custom cakes for every celebration</li>
            </ul>
            <button className="bg-berryPink text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition">
              Explore Our Cakes
            </button>
          </div>
  
          {/* Right: Image */}
          <div className="w-full">
            <img
              src="https://i.pinimg.com/736x/1a/44/26/1a44268338c83d2fe92ac847d266a272.jpg"
              alt="Cake shop"
              className="rounded-2xl shadow-lg w-full h-96 object-cover max-h-[500px]"
            />
          </div>
        </div>
      </section>
    );
  }
  