export default function SweetCakeCollection() {
    const cakes = [
      {
        id: 1,
        name: "Chocolate Cake",
        price: 30,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2OcF7ILrr57x1hcQNy0ZLhowqT8tI0yz0mg&s",
      },
      {
        id: 2,
        name: "Cheese Cake",
        price: 35,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpD3bgFzy4F3mA5f6Xb7YGmQVfv3xE3Yc2_A&s",
      },
      {
        id: 3,
        name: "Mango Cake",
        price: 35,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqgCrzDTfpKnkLFhbmgSv1aF19tInP0Wgr8w&s",
      },
      {
        id: 4,
        name: "Strawberry Cake",
        price: 40,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1UvoZlIw3DoEb303GYD8Tx4zNM9tn6Qr0xw&",
      },
    ];
  
    return (
      <section className="bg-[#FAF3ED] py-20  font-sans text-center">
        {/* Section Title */}
        <h2 className="text-5xl font-bold text-[#493628] mb-2 tracking-wide">Most Loved Cakes</h2>
        <p className="text-lg tracking-[4px] text-[#AF8F6F] uppercase mb-14 font-medium">Collection</p>
  
        {/* Cake Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {cakes.map((cake) => (
            <div
              key={cake.id}
              className="relative bg-white text-[#493628] p-6 rounded-3xl shadow-xl transition hover:scale-[1.02]"
            >
              {/* Price */}
              <div className="absolute -top-3 -left-3 bg-[#E7D7C9] text-[#493628] font-semibold text-sm px-4 py-1 rounded-full shadow">
                ${cake.price}
              </div>
  
              {/* Image */}
              <div className="w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden border-4 border-[#EADACD] shadow-md">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-full object-cover"
                />
              </div>
  
              {/* Info */}
              <h3 className="text-xl font-bold mb-1">{cake.name}</h3>
              <p className="text-sm text-gray-700 px-2 mb-4">
                Made with the finest ingredients and crafted with love and precision.
              </p>
  
              {/* Order Now Button */}
              <button
                onClick={() => alert(`Order placed for ${cake.name}!`)}
                className="mt-auto bg-gradient-to-r from-[#AF8F6F] to-[#493628] text-white text-sm px-6 py-2 rounded-full font-semibold shadow hover:opacity-90 transition"
              >
                Order Now
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  }
  