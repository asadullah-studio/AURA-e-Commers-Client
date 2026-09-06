import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryCard({ title, slug, image, subtitle }) {
  return (
    <a
      href={`/${slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-neutral-100 aspect-[3/4] shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300" />

      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white flex items-end justify-between">
        <div>
          {subtitle && (
            <p className="text-[11px] font-medium tracking-widest uppercase text-neutral-300 mb-1">
              {subtitle}
            </p>
          )}
          <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide">
            {title}
          </h3>
          <span className="inline-block text-xs uppercase tracking-wider text-neutral-200 mt-1.5 font-medium underline underline-offset-4 decoration-white/50 group-hover:decoration-white transition">
            Explore Collection
          </span>
        </div>

        <div className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    </a>
  );
}
