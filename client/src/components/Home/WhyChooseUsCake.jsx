// WhyChooseUsCake.js
export default function WhyChooseUsCake() {
    return (
      <section className="relative py-20 px-6 bg-orange-50 overflow-hidden">
        <div className="text-center mb-16">
          <h3 className="text-berryPink font-semibold uppercase tracking-wide text-sm">
            Why Choose Us
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-700 mt-2">
            Make Every Celebration Sweeter
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mt-4">
            Discover the reasons why our customers keep coming back for that perfect slice.
          </p>
        </div>
  
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-2xl">
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
              <h4 className="text-lg font-semibold text-sweetPink mb-2">Expert Bakers</h4>
              <p className="text-gray-700 text-sm">
                Decades of experience crafting cakes that don’t just look stunning — they taste unforgettable.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
              <h4 className="text-lg font-semibold text-sweetPink mb-2">Premium Ingredients</h4>
              <p className="text-gray-700 text-sm">
                We never compromise on quality — only the freshest, highest-grade ingredients go into our creations.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
              <h4 className="text-lg font-semibold text-sweetPink mb-2">Custom Creations</h4>
              <p className="text-gray-700 text-sm">
                Want something truly one-of-a-kind? We design and bake cakes tailored to your theme and vision.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
              <h4 className="text-lg font-semibold text-sweetPink mb-2">Customer Delight</h4>
              <p className="text-gray-700 text-sm">
                Hundreds of glowing reviews speak for themselves — we’re committed to making your day extra special.
              </p>
            </div>
          </div>
  
          {/* Decorative Center Cake Image */}
          <div className="relative w-64 h-64 rounded-full border-8 border-white shadow-lg overflow-hidden">
            <img
              src="https://i.pinimg.com/736x/65/c9/26/65c926594d2b4318c21fefb728a94c3d.jpg"
              alt="Beautiful Cake"
              className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-500"
            />
            <div className="absolute inset-0 rounded-full bg-white/10 "></div>
          </div>
        </div>
      </section>
    );
  }
  