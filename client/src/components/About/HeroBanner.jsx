import React from "react";

const HeroBanner = () => {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-24 px-4 md:px-16 text-white"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/5a/da/e4/5adae458e9a0466790686b40a607c875.jpg')",
      }}
    >
      <div className="max-w-4xl mx-auto bg-black bg-opacity-50 p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl md:text-2xl font-bold mb-6">
          Welcome to SweetDelights – <br /> Where Every Slice Tells a Story! 🍰
        </h1>
        <p className="text-lg leading-relaxed">
          At SweetWhisk, we believe that cakes are more than just desserts – they’re moments of joy,
          celebration, and love. Whether it’s a birthday, wedding, or just a sweet craving, we’re here to
          make every occasion extra special with our freshly baked delights.
        </p>
      </div>
    </section>
  );
};

export default HeroBanner;
