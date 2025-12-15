const FeaturedBrands = () => {
  const brands = [
    "NIKE", "ADIDAS", "PUMA", "UNDER ARMOUR", "REEBOK", 
    "NEW BALANCE", "ASICS", "MIZUNO"
  ];

  return (
    <section className="bg-gray-900 2xl:py-18 py-12">
      <div className="max-w-360 mx-auto xl:px-10 px-4">
        <h2 className="text-white text-3xl font-bold text-center mb-8">FEATURED BRANDS</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {brands.map((brand, idx) => (
            <div 
              key={idx}
              className="text-gray-400 hover:text-white text-xl font-bold transition-all transform hover:scale-110 cursor-pointer"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturedBrands;