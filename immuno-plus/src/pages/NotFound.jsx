import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar } from "../components/Navbar";
import BotRepairIllustration from '../components/ui/NotFoundBot';

const NotFound = () => {
  return (
    <div className="relative w-full min-h-[75vh] overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30">
      
      {/* 1. Navbar Layer - Forced to the absolute top to overlay the wave */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* 2. Wave Background Layer - Absolute top behind everything */}
      <div className="absolute top-0 left-0 w-full overflow-hidden z-0 leading-none">
  <svg
    className="relative block w-full h-[160px] sm:h-[280px]"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
  >
    <path
      fill="#01203D"
      fillOpacity="1"
      d="M0,288 C480,320 860,64 1440,120 L1440,0 L0,0 Z"
    ></path>
  </svg>
</div>


      {/* Background Soft Glows */}
      <div className="pointer-events-none absolute top-20 left-1/4 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl z-0" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl z-0" />      

      {/* 3. Main Content Layer - Centered flex container */}
      <main className="relative z-10 flex min-h-[75vh] w-full flex-col items-center justify-center px-4 pb-16 pt-32 sm:pt-40">
        
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-500 shadow-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          404 ERROR • PIPELINE BROKEN
        </div>

        {/* Custom Illustration Area */}
        <div className="my-2 flex w-full max-w-lg items-center justify-center drop-shadow-xl sm:max-w-2xl">
          <BotRepairIllustration className="h-32 w-auto transition-transform duration-500 hover:-rotate-1 hover:scale-105 sm:h-48" />
        </div>

        {/* Heading & Subtitle */}
        <h1 className="mt-4 text-3xl text-center font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          Whoops! We Found a Leak.
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600 sm:text-base">
          Our repair bots are on it, but the page you're looking for doesn't exist or has been moved. Let's reroute you to pure wellness.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-400 hover:-translate-y-0.5 hover:shadow-blue-500/30"
          >
            Return Home →
          </Link>
          <Link
            to="/products"
            className="rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-neutral-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-neutral-400 hover:bg-neutral-50"
          >
            Explore Products
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 w-full border-t border-neutral-200/80 pt-6">
          <span className="block text-center text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Helpful Destinations:
          </span>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-blue-500 sm:text-sm">
            <Link to="/about" className="hover:text-blue-600 hover:underline">
              About Us
            </Link>
            <span className="text-neutral-300">•</span>
            <Link to="/warranty" className="hover:text-blue-600 hover:underline">
              Warranty
            </Link>
            <span className="text-neutral-300">•</span>
            <Link to="/contact" className="hover:text-blue-600 hover:underline">
              Contact Support
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;