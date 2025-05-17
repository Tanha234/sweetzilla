import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bakers = [
  {
    name: "Emma Rose",
    role: "Cake Artist",
    image:
      "https://i.pinimg.com/736x/7b/ad/bc/7badbcf2ff487ab4c20bf9c491d592f2.jpg",
  },
  {
    name: "Liam Walker",
    role: "Pastry Chef",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Sophia Lane",
    role: "Sugar Craft Specialist",
    image:
      "https://i.pinimg.com/736x/67/dd/33/67dd333696cf3b13702f83e97e16167d.jpg",
  },
  {
    name: "Oliver Brooks",
    role: "Chocolate Expert",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
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

const MeetOurBakers = () => {
  return (
    <section className="py-12 px-4 md:px-44 bg-gray-50 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-berryPink mb-8">
      👨‍🍳Meet Our Bakers
      </h2>

      <Slider {...sliderSettings}>
        {bakers.map((baker, index) => (
          <div key={index} className="px-2">
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
              <img
                src={baker.image}
                alt={baker.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{baker.name}</h3>
              <p className="text-sm text-gray-500">{baker.role}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default MeetOurBakers;
