export default function Footer() {
    return (
      <footer className="bg-[#493628] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo and Description */}
          <div>
            <h2 className="text-3xl font-extrabold text-[#AF8F6F] mb-4">Sweet Delight</h2>
            <p className="text-sm text-gray-300">
              Indulge in handcrafted cakes made with love and the finest ingredients. Taste joy in every bite.
            </p>
          </div>
  
          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-[#AF8F6F] transition">Home</a></li>
              <li><a href="/shop" className="hover:text-[#AF8F6F] transition">Shop</a></li>
              <li><a href="/about" className="hover:text-[#AF8F6F] transition">About</a></li>
              <li><a href="/contact" className="hover:text-[#AF8F6F] transition">Contact</a></li>
            </ul>
          </div>
  
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-300">📞 +1 (123) 456-7890</p>
            <p className="text-sm text-gray-300">📧 support@cakebliss.com</p>
            <p className="text-sm text-gray-300">📍 123 Sweet Street, Dessert City</p>
          </div>
  
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Subscribe</h3>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="p-3 rounded-lg text-black focus:outline-none"
              />
              <button className="bg-[#AF8F6F] hover:bg-[#c2a17a] text-white py-2 rounded-lg transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
  
        {/* Bottom Text */}
        <div className="mt-12 text-center text-gray-400 text-sm border-t border-gray-600 pt-6">
          &copy; {new Date().getFullYear()} Sweet Delight. All rights reserved.
        </div>
      </footer>
    );
  }
  