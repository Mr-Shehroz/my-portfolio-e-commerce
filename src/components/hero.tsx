'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

const Hero = () => {
  const slides = [
    {
      title: "THE GEAR YOU CAN'T COMPETE WITHOUT",
      subtitle: "Premium sports equipment, cutting-edge technology, and championship-grade performance.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&h=1080&fit=crop",
    },
    {
      title: "ELEVATE YOUR GAME",
      subtitle: "Professional-grade equipment for athletes who demand excellence.",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1920&h=1080&fit=crop",
    },
    {
      title: "THE GEAR YOU CAN'T COMPETE WITHOUT",
      subtitle: "Premium sports equipment, cutting-edge technology, and championship-grade performance.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&h=1080&fit=crop",
    },
    {
      title: "ELEVATE YOUR GAME",
      subtitle: "Professional-grade equipment for athletes who demand excellence.",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1920&h=1080&fit=crop",
    },
  ];

  return (
    <section className="relative h-[70vh] md:h-175 lg:min-h-[85vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx} className="relative">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-360 mx-auto h-full flex items-center px-4 xl:px-10">
              <div className="max-w-2xl text-white text-center md:text-left">
                <h1 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-4 animate-fadeIn">
                  {slide.title}
                </h1>
                <p className="text-lg xl:text-xl mb-6 text-gray-200">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link href="/shop" className="bg-red-600 hover:bg-red-700 text-white 2xl:px-8 px-6 py-3 rounded font-semibold transition-all transform hover:scale-105">
                    SHOP NOW
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
