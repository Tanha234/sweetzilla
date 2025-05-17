import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Icons
import { FaBirthdayCake, FaRing } from "react-icons/fa";
import { GiCupcake } from "react-icons/gi";
import { MdOutlineNoFood, MdLocalShipping } from "react-icons/md";

const offers = [
  {
    icon: <FaBirthdayCake size={32} className="text-berryPink " />,
    title: "Custom birthday cakes",
  },
  {
    icon: <FaRing size={32} className="text-berryPink " />,
    title: "Wedding and engagement cakes",
  },
  {
    icon: <GiCupcake size={32} className="text-berryPink " />,
    title: "Cupcakes and cake jars",
  },
  {
    icon: <MdOutlineNoFood size={32} className="text-berryPink " />,
    title: "Eggless and gluten-free options",
  },
  {
    icon: <MdLocalShipping size={32} className="text-berryPink " />,
    title: "Same-day delivery for selected areas",
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1 },
    },
  ],
};

const WhatWeOffer = () => {
  return (
    <section className="py-16 px-4 md:px-44 bg-sweetPink text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-berryPink mb-10">
        🧁 What We Offer
      </h2>

      <Slider {...sliderSettings}>
        {offers.map((item, index) => (
          <div key={index} className="px-4">
            <div className="bg-white p-16 rounded-xl shadow-md h-full flex flex-col items-center justify-center text-lg font-medium text-gray-700 hover:bg-pink-100 transition duration-300">
              <div className="mb-3 text-berryPink ">{item.icon}</div>
              <p className="text-sm">{item.title}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default WhatWeOffer;
