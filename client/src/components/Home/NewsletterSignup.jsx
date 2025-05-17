import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }
    setMessage("Thank you for signing up! 🎉 You'll get sweet deals in your inbox.");
    setEmail("");
  };

  return (
    <section
      className="py-16 px-4 text-white"
      style={{
        background: "linear-gradient(20deg, #AF8F6F 0%, #493628 90%)",
      }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-6">
          🍰 Get Sweet Deals in Your Inbox!
        </h2>
        <p className="text-xl mb-8">
          Sign up for exclusive offers, discounts, and cake updates!
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-wrap gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-4 w-80 rounded-xl border-2 border-white bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#AF8F6F] transition"
            required
          />
          <button
            type="submit"
            className="bg-white text-[#AF8F6F] font-semibold py-3 px-8 rounded-xl hover:bg-[#f7f3f0] transition ease-in-out duration-200"
          >
            Subscribe
          </button>
        </form>

        {message && (
          <div className="mt-6 text-lg font-semibold text-green-200">
            {message}
          </div>
        )}
      </div>
    </section>
  );
}
