'use client';

import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { formatPrice, calculateDiscountPercentage } from '../lib/format';
import { useCart } from '../lib/CartContext';

export default function ProductCard({ product }) {
  const { addItem, isLoggedIn } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [sizePickerOpen, setSizePickerOpen] = useState(false);

  const discountPercent = calculateDiscountPercentage(product.price, product.discountPrice);
  const activePrice = product.discountPrice || product.price;

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      window.location.href = `/login?redirect=/products/${product.id}`;
      return;
    }

    // If product has sizes and size picker is not open, toggle picker
    if (product.sizes?.length > 1 && !sizePickerOpen) {
      setSizePickerOpen(true);
      return;
    }

    try {
      setIsAdding(true);
      const res = await addItem(product.id, selectedSize, 1);
      if (res.success) {
        setAdded(true);
        setSizePickerOpen(false);
        setTimeout(() => setAdded(false), 2000);
      } else if (res.requireAuth) {
        window.location.href = `/login?redirect=/products/${product.id}`;
      } else {
        alert(res.message || 'Could not add to cart');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-md hover:border-neutral-200 transition-all duration-300">
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
        <a href={`/products/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </a>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
            {discountPercent}% OFF
          </div>
        )}

        {/* Quick View Floating Button */}
        <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <a
            href={`/products/${product.id}`}
            className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-neutral-800 hover:text-black shadow-md hover:bg-white flex items-center justify-center transition"
            aria-label="View Details"
          >
            <Eye className="w-4 h-4" />
          </a>
        </div>

        {/* Quick Size Picker Drawer on hover/click */}
        {sizePickerOpen && (
          <div
            className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm p-3 border-t border-neutral-200 animate-in slide-in-from-bottom duration-200 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
                Select Size:
              </span>
              <button
                type="button"
                onClick={() => setSizePickerOpen(false)}
                className="text-[10px] text-neutral-400 hover:text-black font-bold"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium border transition ${
                    selectedSize === size
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={isAdding}
              className="w-full py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition"
            >
              {isAdding ? 'Adding...' : `Confirm Size (${selectedSize}) & Add`}
            </button>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Category / SubCategory */}
          <p className="text-[11px] uppercase tracking-wider font-medium text-neutral-500 mb-1">
            {product.category?.name || 'Fashion'} {product.subCategory && `• ${product.subCategory}`}
          </p>

          {/* Product Name */}
          <a
            href={`/products/${product.id}`}
            className="block text-sm font-semibold text-neutral-900 hover:text-neutral-600 line-clamp-1 transition"
            title={product.name}
          >
            {product.name}
          </a>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-medium text-neutral-700">
              {product.rating ? product.rating.toFixed(1) : '4.5'}
            </span>
            <span className="text-[11px] text-neutral-400">
              ({product.reviewsCount || 15})
            </span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-neutral-950">
                {formatPrice(activePrice)}
              </span>
              {discountPercent > 0 && (
                <span className="text-xs text-neutral-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={isAdding}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
              title="Add to Cart"
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
