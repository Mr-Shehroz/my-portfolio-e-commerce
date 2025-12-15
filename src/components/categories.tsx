const Categories = () => {
  const categories = [
    {
      name: "BASKETBALL",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop"
    },
    {
      name: "SOCCER",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop"
    },
    {
      name: "TRAINING GEAR",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop"
    }
  ];

  return (
    <section className="bg-black py-16">
      <div className="max-w-360 mx-auto xl:px-10 px-4">
        <h2 className="text-white text-4xl font-bold text-center mb-12">SHOP BY SPORT</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              className="relative h-80 rounded-lg overflow-hidden group cursor-pointer"
            >
              <img 
                src={cat.image} 
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute inset-0 flex items-end justify-center p-6">
                <h3 className="text-white text-2xl font-bold group-hover:text-red-500 transition-colors">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Categories;