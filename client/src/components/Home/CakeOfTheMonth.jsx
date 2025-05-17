export default function CakeOfTheMonth() {
    return (
      <section className="bg-[#F9F4F0] py-20 px-4 md:px-44">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-[#493628] mb-6">✨ Cake of the Month</h2>
          <p className="text-lg text-[#6e4c3c] mb-12 max-w-2xl mx-auto">
            Handpicked with love – our top-selling delight that's melting hearts and taste buds.
          </p>
  
          <div className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-xl">
            <img
              src="https://i.pinimg.com/736x/0a/57/9b/0a579b9bdaf19849ca8443ba628e0b6b.jpg"
              alt="Cake of the Month"
              className="md:w-1/2 object-cover h-80 md:h-96"
            />
            <div className="p-10 flex flex-col justify-center bg-[#AF8F6F] text-white text-left">
              <h3 className="text-4xl font-extrabold mb-4">Triple Chocolate Delight</h3>
              <p className="mb-6 text-lg leading-relaxed">
                A rich, moist chocolate cake layered with ganache and topped with creamy frosting. Customer favorite for 3 months straight!
              </p>
              <button className="bg-white text-[#AF8F6F] px-6 py-3 rounded-xl font-bold hover:bg-[#f0e5dc] transition">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  