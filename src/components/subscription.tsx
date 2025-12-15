'use client';

const Subscription = () => {
  return (
    <section className="bg-gradient-to-r from-red-600 to-red-700 py-16">
      <div className="max-w-360 mx-auto xl:px-10 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 text-center md:text-left">
          
          {/* Text Content */}
          <div className="text-white max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">SUBSCRIBE AND SAVE</h2>
            <p className="text-lg font-semibold mb-2">30% OFF YOUR ORDER</p>
            <p className="text-sm sm:text-base opacity-90">
              Get exclusive access to new products, special offers, and athlete tips delivered directly to your inbox.
            </p>
          </div>

          {/* Email Input & Button */}
          <div className="w-full md:w-auto">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-6 py-3 rounded-lg w-full sm:w-80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white transition-all border border-white bg-white"
              />
              <button className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 whitespace-nowrap">
                SIGN UP
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Subscription;
