'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../lib/api';
import ProductCard from './ProductCard';
import { ProductGridSkeleton } from './Loading';
import EmptyState from './EmptyState';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function ProductGrid({
  initialCategory = '',
  initialSearch = '',
  title = '',
  description = '',
  availableSubCategories = [],
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subCategory, setSubCategory] = useState('');
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState(initialSearch);

  const fetchProductsList = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        category: initialCategory,
        subCategory,
        search,
        sort,
      };

      const res = await getProducts(params);
      if (res?.success) {
        setProducts(res.data);
      }
    } catch (err) {
      console.error('Fetch products error:', err);
    } finally {
      setLoading(false);
    }
  }, [initialCategory, subCategory, search, sort]);

  useEffect(() => {
    fetchProductsList();
  }, [fetchProductsList]);

  // Derive subcategories dynamically if none provided
  const subCategories = availableSubCategories.length > 0
    ? availableSubCategories
    : Array.from(new Set(products.map((p) => p.subCategory).filter(Boolean)));

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          {title && (
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-sm text-neutral-500 mt-1 max-w-xl">
              {description}
            </p>
          )}
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mt-2">
            Showing {products.length} {products.length === 1 ? 'Product' : 'Products'}
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
            <span>Sort By:</span>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-xs font-medium bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-500 cursor-pointer"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Subcategory Filter Pills */}
      {subCategories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setSubCategory('')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition shrink-0 ${
              subCategory === ''
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            All Subcategories
          </button>
          {subCategories.map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => setSubCategory(subCategory === sub ? '' : sub)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition shrink-0 ${
                subCategory === sub
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid / Loading / Empty */}
      {loading ? (
        <ProductGridSkeleton count={8} />
      ) : products.length === 0 ? (
        <EmptyState
          type="products"
          title="No products found"
          subtitle="No products match your selected filters. Try clearing your search or subcategory filter."
          actionText="View All Products"
          actionHref="/products"
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
