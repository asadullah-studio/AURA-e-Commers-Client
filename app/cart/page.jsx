'use client';

import React from 'react';
import { useCart } from '../../lib/CartContext';
import CartItem from '../../components/CartItem';
import CartSummary from '../../components/CartSummary';
import EmptyState from '../../components/EmptyState';
import Loading from '../../components/Loading';
import { ArrowLeft, Trash2 } from 'lucide-react';

export default function CartPage() {
  const {
    user,
    isLoggedIn,
    cart,
    cartLoading,
    updateItemQty,
    removeItem,
    emptyCart,
  } = useCart();

  if (!isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-md mx-auto space-y-4 bg-neutral-50 p-8 rounded-3xl border border-neutral-200">
          <h2 className="font-serif text-2xl font-bold text-neutral-900">
            Sign in to view your bag
          </h2>
          <p className="text-sm text-neutral-500">
            Sign in to your account to view your saved bag items, sync across devices, and check out securely.
          </p>
          <a
            href="/login?redirect=/cart"
            className="inline-block w-full py-3.5 px-6 rounded-full bg-neutral-950 text-white font-semibold text-xs uppercase tracking-wider hover:bg-neutral-800 transition"
          >
            Sign In Now
          </a>
        </div>
      </div>
    );
  }

  if (cartLoading) {
    return <Loading />;
  }

  const items = cart?.items || [];

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          type="cart"
          title="Your cart is empty."
          subtitle="Discover something you love from our new season arrivals."
          actionText="Start Shopping"
          actionHref="/products"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-200">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-950">
            Shopping Cart
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            You have {cart.totalQuantity} {cart.totalQuantity === 1 ? 'item' : 'items'} in your bag
          </p>
        </div>

        <button
          type="button"
          onClick={emptyCart}
          className="text-xs text-neutral-500 hover:text-red-600 flex items-center gap-1.5 transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left 2 Cols: Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQty={updateItemQty}
              onRemove={removeItem}
            />
          ))}

          <div className="pt-4">
            <a
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-700 hover:text-black transition"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </a>
          </div>
        </div>

        {/* Right 1 Col: Summary Card */}
        <div className="lg:col-span-1 sticky top-24">
          <CartSummary subtotal={cart.subtotal} showCheckoutButton={true} />
        </div>
      </div>
    </div>
  );
}
