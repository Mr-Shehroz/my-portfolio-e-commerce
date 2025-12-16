import { Zap, Facebook, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => (
  <footer className="relative bg-linear-to-br from-black via-gray-900 to-black border-t border-gray-800 py-12 overflow-hidden">
    {/* Subtle red radial glow — matches other sections */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.1)_0%,transparent_20%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.1)_0%,transparent_20%)]"></div>
    </div>

    <div className="max-w-360 mx-auto px-4 xl:px-10 relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-linear-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight">
            SPORTS<span className="text-red-600">HUB</span>
          </span>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-6">
          {['Home', 'About', 'Shop', 'FAQs'].map((link) => (
            <Link
              key={link}
              href={`/${link === 'Home' ? '' : link.toLowerCase()}`}
              className="text-gray-400 hover:text-red-500 font-semibold transition-colors relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-3">
          {[
            { Icon: Facebook, label: "Facebook" },
            { Icon: Twitter, label: "Twitter" },
            { Icon: Linkedin, label: "LinkedIn" },
          ].map(({ Icon, label }, idx) => (
            <a
              key={idx}
              href="#"
              aria-label={label}
              className="w-11 h-11 bg-gray-900 hover:bg-red-600 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 shadow hover:shadow-red-500/20"
            >
              <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} SportsHub. All rights reserved. Built for champions.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;