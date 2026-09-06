import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-900 text-white">
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80"
          alt="Fashion Hero Banner"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transition duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 lg:py-40 flex flex-col justify-center">
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-widest uppercase text-neutral-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            New Season Collection 2026
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Discover Your Style.
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Explore our latest fashion collection crafted with luxurious fabrics, timeless Bangladeshi heritage, and contemporary cuts.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="/men"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-neutral-950 font-semibold text-sm tracking-wider uppercase hover:bg-neutral-100 shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              Shop Men
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/women"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-transparent text-white font-semibold text-sm tracking-wider uppercase border border-white/40 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 group"
            >
              Shop Women
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
