import { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
    .sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
  
      .then(
        (result) => {
          Swal.fire("Success!", "Message sent successfully!", "success");
          form.current.reset();
        },
        (error) => {
          Swal.fire("Error!", "Failed to send message.", "error");
        }
      );
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-64">
        <img
          src="https://i.pinimg.com/736x/0f/60/69/0f606931554cb863681d0b039fa8cab4.jpg"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 flex items-center justify-center h-full bg-black/30">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Text Section */}
        <div className="flex flex-col justify-center space-y-6  bg-orange-50">
          <h2 className="text-3xl font-bold text-gray-800 text-center">We’d love to hear from you!</h2>
          <p className="text-gray-600 text-center">
            Fill out the form and our team will get back to you as soon as possible.
          </p>
          <div>
            <Link to="/" className="text-pink-600 hover:underline text-center mx-auto flex justify-center">
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Right Form Section */}
        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full border p-3 rounded-md"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full border p-3 rounded-md"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            className="w-full border p-3 rounded-md"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            className="w-full border p-3 rounded-md"
          ></textarea>
          <button
            type="submit"
            className="bg-berryPink hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
