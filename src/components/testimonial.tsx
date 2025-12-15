'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      position: "Professional Basketball Player",
      text: "This sports equipment is top-notch. I feel unbeatable every time I step on the court!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Sarah Lee",
      position: "Soccer Coach",
      text: "The quality is unmatched. Every athlete I recommend this to sees instant improvement.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Michael Smith",
      position: "Fitness Enthusiast",
      text: "Absolutely love the gear! Durable, stylish, and performs exactly as promised.",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg"
    },
    {
      name: "Emma Johnson",
      position: "Marathon Runner",
      text: "Lightweight, durable, and stylish. These products have improved my performance!",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      name: "David Wilson",
      position: "Soccer Player",
      text: "Every piece of gear is crafted perfectly. Truly the best for serious athletes.",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ];

  return (
    <section className="bg-gray-900 py-20">
      <div className="max-w-360 mx-auto xl:px-10 px-4 text-center">
        <h2 className="text-white text-4xl sm:text-5xl font-bold mb-4">WHAT CHAMPIONS SAY</h2>
        <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto mb-12">
          Hear directly from athletes and sports enthusiasts who trust our gear for performance and style.
        </p>

        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet !bg-white/50', bulletActiveClass: '!bg-red-600' }}
          navigation
          loop
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="max-w-[7xl] mx-auto"
        >
          {testimonials.map((testimonial, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-gray-800 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl transition-transform hover:scale-101">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-red-600"
                />
                <p className="text-gray-200 mb-4">{testimonial.text}</p>
                <h3 className="text-white font-bold text-lg sm:text-xl">{testimonial.name}</h3>
                <span className="text-red-600 text-sm sm:text-base">{testimonial.position}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
