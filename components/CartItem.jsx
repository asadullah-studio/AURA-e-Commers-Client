'use client';

import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatPrice } from '../lib/format';

export default function CartItem({ item, onUpdateQty, onRemove }) {
  const product = item.product || {};
  const activePrice = item.activePrice || product.discountPrice || product.price;
  const lineTotal = activePrice * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-neutral-100 hover:border-neutral-200 transition">
      {/* Product Image and Meta */}
      <div className="flex items-center gap-4">
        <a
          href={`/products/${product.id}`}
          className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl bg-neutral-100 overflow-hidden flex-shrink-0"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </a>

        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
            {product.category?.name || 'Apparel'}
          </p>
          <a
            href={`/products/${product.id}`}
            className="text-sm sm:text-base font-semibold text-neutral-900 hover:text-neutral-600 line-clamp-1 transition"
          >
            {product.name}
          </a>

          <div className="inline-flex items-center gap-2 pt-0.5">
            <span className="text-xs bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded font-medium">
              Size: {item.size}
            </span>
            <span className="text-xs font-semibold text-neutral-950">
              {formatPrice(activePrice)} each
            </span>
          </div>
        </div>
      </div>

      {/* Quantity Controls & Line Total */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
        {/* Qty +/- */}
        <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
          <button
            type="button"
            onClick={() => onUpdateQty(item.id, item.quantity - 1)}
            className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-200/60 transition"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center text-xs font-semibold text-neutral-900">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQty(item.id, item.quantity + 1)}
            className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-200/60 transition"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Line Total */}
        <div className="text-right min-w-[80px]">
          <span className="text-base font-bold text-neutral-950">
            {formatPrice(lineTotal)}
          </span>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
          title="Remove from cart"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
