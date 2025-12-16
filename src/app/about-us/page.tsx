"use client";

import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="relative bg-[url(/about-banner.jpg)] bg-center bg-cover py-24 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl">
          We are passionate about bringing the best sports equipment to athletes and enthusiasts
          worldwide. Quality, innovation, and customer satisfaction are at the heart of everything we do.
        </p>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 xl:px-10 max-w-360 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-400 mb-4">
            Founded with a mission to make top-notch sports gear accessible to everyone, we have
            been serving athletes, teams, and hobbyists with dedication and care. Every product we
            offer is carefully selected for quality, durability, and performance.
          </p>
          <p className="text-gray-400">
            From beginners to professionals, our store caters to all sports enthusiasts. We believe
            in innovation, trust, and building a community that shares our passion for sports.
          </p>
        </div>

        <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=800&h=600&fit=crop"
            alt="Our Story"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-900 py-20 px-4">
        <div className="max-w-360 px-4 xl:px-10 mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-400 text-lg">
            To empower athletes and sports lovers by providing high-quality equipment, innovative
            products, and unmatched customer service. We aim to inspire performance, passion, and
            growth in every sport we touch.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 xl:px-10 max-w-360 mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div className="bg-gray-800 p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Quality</h3>
          <p className="text-gray-400">
            We ensure that every product meets the highest standards for durability and
            performance.
          </p>
        </div>
        <div className="bg-gray-800 p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Innovation</h3>
          <p className="text-gray-400">
            Staying ahead with the latest sports technology to enhance your performance and
            experience.
          </p>
        </div>
        <div className="bg-gray-800 p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Community</h3>
          <p className="text-gray-400">
            Building a supportive network of athletes, teams, and sports enthusiasts worldwide.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-red-600 py-16 px-4 text-center rounded-t-xl mt-auto">
        <h2 className="text-4xl font-bold mb-4">Join Our Journey</h2>
        <p className="mb-6 text-gray-100">
          Explore our latest collections, connect with our community, and experience the best in
          sports gear.
        </p>
        <a
          href="/shop"
          className="inline-block bg-black text-white px-8 py-4 font-bold rounded-xl hover:bg-gray-800 transition-colors"
        >
          Shop Now
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
