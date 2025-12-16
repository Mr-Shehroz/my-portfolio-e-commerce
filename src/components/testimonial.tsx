"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "David Wilson",
    role: "Pro Basketball Player",
    text: "Every piece of gear is crafted perfectly. Truly the best for serious athletes.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sarah Lee",
    role: "Soccer Coach",
    text: "The quality is unmatched. Every athlete I recommend this to sees instant improvement.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "John Doe",
    role: "Fitness Enthusiast",
    text: "This sports equipment is top-notch. I feel unbeatable every time I step on the field!",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Emily Chen",
    role: "Tennis Pro",
    text: "Lightweight, durable, and perfectly balanced. It`s like an extension of my body.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Marcus Green",
    role: "Track & Field Athlete",
    text: "From training to competition — this gear delivers peak performance every time.",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Aisha Patel",
    role: "Cricket Captain",
    text: "We`ve switched our entire team to this brand. The difference in performance is real.",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((str) => str[0])
    .join("")
    .slice(0, 2);

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="py-20 bg-linear-to-br from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* Red radial glow — matches your other sections */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.1)_0%,transparent_20%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.1)_0%,transparent_20%)]"></div>
      </div>

      <div className="max-w-360 mx-auto px-4 xl:px-10 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
            WHAT <span className="text-red-600">CHAMPIONS</span> SAY
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Trusted by athletes worldwide
          </p>
        </div>

        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 6,
            stretch: 20,
            depth: 120,
            modifier: 1.2,
            slideShadows: true,
          }}
          centeredSlides={true}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.4 },
            1024: { slidesPerView: 2.2 },
            1280: { slidesPerView: 2.6 },
          }}
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={true}
          className="pb-10"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="px-4">
                <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-red-600/50 transition-all duration-300 shadow-xl group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full border-2 border-red-600 overflow-hidden shrink-0 bg-gray-800 flex items-center justify-center">
                      {t.avatar ? (
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-red-500 font-bold">{getInitials(t.name)}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{t.name}</h4>
                      <p className="text-red-500 text-sm">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">"{t.text}"</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-red-600 text-red-600" />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;