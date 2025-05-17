import hero from '../../images/4c7fa20e81f74ea09c87e6473db485db-removebg-preview.png';

export default function Hero() {
  return (
    <section
      className="pb-28 pt-16 px-4 md:px-44 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/thumbnails/057/424/148/small_2x/chocolate-cake-on-wooden-table-blurred-background-photo.jpg')",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Side Text */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-berryPink mb-4 leading-tight  mt-10">
            Celebrate Every Moment <br /> with SweetDelights 🎂
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Discover our delightful collection of handcrafted cakes made with love
            and the finest ingredients.
          </p>
          <a
            href="#cakes"
            className="inline-block bg-berryPink text-white px-6 py-3 rounded-full shadow hover:bg-pink-600 transition"
          >
            Explore Cakes
          </a>
        </div>

        {/* Right Side Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={hero}
            alt="Delicious cake"
            className="w-80 max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
