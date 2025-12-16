const Footer = () => {
  const links = ["Home", "About Us", "Shop", "Faqs" ];

  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Logo */}
        <div className="text-2xl font-bold text-red-600 cursor-pointer">
          Sports Store
        </div>

        {/* Center: Links */}
        <div className="flex flex-wrap justify-center gap-6">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={`${link.toLowerCase().replace(/\s/g, '-')}`}
              className="text-gray-400 hover:text-red-600 font-semibold transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
            <span className="text-sm">f</span>
          </a>
          <a href="https://twitter.com" target="_blank" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
            <span className="text-sm">t</span>
          </a>
          <a href="https://linkedin.com" target="_blank" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
            <span className="text-sm">in</span>
          </a>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-800 mt-6 pt-4 text-center text-gray-400 text-sm">
        © 2026 Sports Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
