import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const customerTestimonials = [
  {
    name: "Sophia Rahman",
    title: "Birthday Cake Lover",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    feedback: "The chocolate truffle cake was heavenly! Delivered on time and super fresh. Made my birthday extra special!",
  },
  {
    name: "Arif Khan",
    title: "Repeat Customer",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    feedback: "This is my 3rd order and you never disappoint. The Red Velvet was a crowd favorite again!",
  },
  {
    name: "Nusrat Jahan",
    title: "Wedding Planner",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    feedback: "Their custom wedding cake was stunning and delicious! The guests couldn’t stop talking about it.",
  },
  {
    name: "Tanvir Alam",
    title: "Chocolate Addict",
    image: "https://randomuser.me/api/portraits/men/62.jpg",
    feedback: "The triple chocolate mousse was the best I’ve ever tasted. Will definitely order again!",
  },
];

function CustomerTestimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="py-16 bg-sweetPink md:px-44 sm:px-0">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-berryPink">What Our Customers Say</h2>
      </div>
      <div className="px-8 max-w-7xl mx-auto">
        <Slider {...settings}>
          {customerTestimonials.map((testimonial, index) => (
            <div key={index} className="p-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg relative">
                <div className="text-5xl text-berryPink absolute -top-4 left-4">“</div>
                <p className="text-gray-700 mt-8">{testimonial.feedback}</p>
              </div>
              <div className="flex items-center mt-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-200 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default CustomerTestimonials;
