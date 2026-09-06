import React from 'react';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Sparkles, Flame, Tag } from 'lucide-react';

async function getFeaturedProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    const [trendingRes, newArrivalsRes] = await Promise.all([
      fetch(`${apiUrl}/products?trending=true&limit=8`, { cache: 'no-store' }).then((r) => r.json()).catch(() => ({ data: [] })),
      fetch(`${apiUrl}/products?newArrival=true&limit=8`, { cache: 'no-store' }).then((r) => r.json()).catch(() => ({ data: [] })),
    ]);

    return {
      trending: trendingRes?.data || [],
      newArrivals: newArrivalsRes?.data || [],
    };
  } catch (err) {
    console.error('Failed to fetch home products:', err);
    return { trending: [], newArrivals: [] };
  }
}

export default async function HomePage() {
  const { trending, newArrivals } = await getFeaturedProducts();

  const categories = [
    {
      title: 'Men',
      slug: 'men',
      subtitle: 'Panjabi, Shirts & Denim',
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'Women',
      slug: 'women',
      subtitle: 'Sarees, 3-Piece & Kurtis',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'Kids',
      slug: 'kids',
      subtitle: 'Boys & Girls Fashion',
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'Accessories',
      slug: 'accessories',
      subtitle: 'Leather Bags & Watches',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Shop By Category Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1">
              Curated Collections
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Shop By Category
            </h2>
          </div>
          <a
            href="/products"
            className="mt-2 md:mt-0 text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:text-neutral-600 flex items-center gap-1 group"
          >
            Explore All Categories
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              title={category.title}
              slug={category.slug}
              image={category.image}
              subtitle={category.subtitle}
            />
          ))}
        </div>
      </section>

      {/* 3. Trending Products Section (8 Products) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 border-b border-neutral-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-600 mb-1">
              <Flame className="w-4 h-4 fill-red-600 text-red-600" />
              Customer Favorites
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Trending Products
            </h2>
          </div>
          <a
            href="/products"
            className="text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:text-neutral-600 flex items-center gap-1 group"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Promotional Offer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white shadow-xl">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&auto=format&fit=crop&q=80"
              alt="Promotional Fashion"
              className="w-full h-full object-cover object-center opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent" />
          </div>

          <div className="relative z-10 px-6 py-14 sm:px-12 sm:py-20 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-bold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              Limited Time Special Offer
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              UP TO 40% OFF
            </h2>

            <p className="text-lg text-neutral-300 font-light">
              Upgrade your wardrobe with seasonal essentials. Premium craftsmanship at unmatched prices.
            </p>

            <div className="pt-3">
              <a
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-neutral-950 font-bold text-xs uppercase tracking-widest hover:bg-neutral-100 shadow-md hover:shadow-lg transition group"
              >
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals Section (8 Products) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 border-b border-neutral-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Fresh Off The Rack
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              New Arrivals
            </h2>
          </div>
          <a
            href="/products"
            className="text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:text-neutral-600 flex items-center gap-1 group"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/products"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-neutral-900 text-neutral-900 font-semibold text-xs uppercase tracking-wider hover:bg-neutral-900 hover:text-white transition-all duration-200"
          >
            View All Products
          </a>
        </div>
      </section>
    </div>
  );
}
