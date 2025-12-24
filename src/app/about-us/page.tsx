"use client";

import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="bg-black text-white">
      {/* Unified Background Glow */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.1)_0%,transparent_20%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.1)_0%,transparent_20%)]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-40 px-4 text-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/about-banner.jpg"
            alt="About SportsHub"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            About <span className="text-red-600">Us</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            We are passionate about bringing the best sports equipment to athletes and enthusiasts
            worldwide. Quality, innovation, and customer satisfaction are at the heart of everything we do.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 xl:px-10 relative z-10">
        <div className="max-w-360 px-4 xl:px-10 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8">
              Our <span className="text-red-600">Story</span>
            </h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Founded with a mission to make top-notch sports gear accessible to everyone, we have
              been serving athletes, teams, and hobbyists with dedication and care. Every product we
              offer is carefully selected for quality, durability, and performance.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              From beginners to professionals, our store caters to all sports enthusiasts. We believe
              in innovation, trust, and building a community that shares our passion for sports.
            </p>
          </div>

          <div className="relative w-full h-96 lg:h-125 rounded-2xl overflow-hidden border border-gray-800 hover:border-red-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10">
            <Image
              src="/about-story.webp"
              alt="Our Story"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8">
            Our <span className="text-red-600">Mission</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            To empower athletes and sports lovers by providing high-quality equipment, innovative
            products, and unmatched customer service. We aim to inspire performance, passion, and
            growth in every sport we touch.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto px-4 xl:px-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-center mb-16">
            Our <span className="text-red-600">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                desc: "We ensure that every product meets the highest standards for durability and performance.",
              },
              {
                title: "Innovation",
                desc: "Staying ahead with the latest sports technology to enhance your performance and experience.",
              },
              {
                title: "Community",
                desc: "Building a supportive network of athletes, teams, and sports enthusiasts worldwide.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-red-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-linear-to-r from-red-600 to-red-800 rounded-2xl p-12 shadow-2xl shadow-red-600/30">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Join Our <span className="text-white">Journey</span>
            </h2>
            <p className="text-red-100 mb-8 text-lg max-w-2xl mx-auto">
              Explore our latest collections, connect with our community, and experience the best in
              sports gear.
            </p>
            <a
              href="/shop"
              className="inline-block bg-black text-white px-10 py-4 font-bold rounded-xl hover:bg-gray-900 transition-all transform hover:scale-105 shadow-lg hover:shadow-red-500/30"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;