'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../lib/CartContext';
import { createOrder } from '../../lib/api';
import { formatPrice } from '../../lib/format';
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  ArrowRight,
  Package,
  AlertCircle,
  Clock,
} from 'lucide-react';
import Loading from '../../components/Loading';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isLoggedIn, authLoading, cart, fetchCart } = useCart();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Dhaka',
    area: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push('/login?redirect=/checkout');
    }
  }, [authLoading, isLoggedIn, router]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        customerName: prev.customerName || user.name || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  if (authLoading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    return null; // Will redirect via useEffect
  }

  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const isFreeDelivery = subtotal >= 3000;
  const deliveryCharge = isFreeDelivery ? 0 : 60;
  const totalAmount = subtotal + deliveryCharge;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please enter a valid phone number (e.g. 017XXXXXXXX).');
      return;
    }
    if (!formData.address.trim()) {
      setErrorMessage('Please enter your complete delivery street address.');
      return;
    }
    if (!formData.area.trim()) {
      setErrorMessage('Please enter your area or thana (e.g. Dhanmondi, Gulshan).');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await createOrder({
        ...formData,
      });

      if (res.success && res.data) {
        setOrderConfirmed(res.data);
        await fetchCart(); // Refresh cart (will now be empty)
      } else {
        setErrorMessage(res.message || 'Failed to place order.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred while placing your order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (orderConfirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Order Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-neutral-950">
              Order Placed Successfully!
            </h1>
            <p className="text-sm text-neutral-500">
              Thank you for your order, {orderConfirmed.customerName}. We are preparing your items for delivery.
            </p>
          </div>

          {/* Receipt Card */}
          <div className="bg-neutral-50 rounded-2xl p-6 text-left border border-neutral-200/70 space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-neutral-200 pb-3">
              <span className="text-neutral-500 font-medium">Order Number</span>
              <span className="font-mono font-bold text-neutral-900 text-base">
                #{orderConfirmed.orderNumber}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-500">Total Amount</span>
              <span className="font-bold text-neutral-950 text-xl font-serif">
                {formatPrice(orderConfirmed.totalAmount)}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-500">Payment Method</span>
              <span className="font-semibold text-neutral-900 bg-neutral-200/60 px-2.5 py-0.5 rounded text-xs">
                Cash on Delivery
              </span>
            </div>

            <div className="flex justify-between items-start text-sm pt-2 border-t border-neutral-200 text-neutral-600 text-xs">
              <span>Delivery Address</span>
              <span className="text-right font-medium text-neutral-800 max-w-[220px]">
                {orderConfirmed.address}, {orderConfirmed.area}, {orderConfirmed.city}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="/orders"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-neutral-950 text-white font-semibold text-xs uppercase tracking-wider hover:bg-neutral-800 transition"
            >
              <Package className="w-4 h-4" />
              View My Orders
            </a>
            <a
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-neutral-100 text-neutral-800 font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART CHECK
  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-neutral-900">Your bag is empty</h2>
        <p className="text-sm text-neutral-500">You need to have items in your shopping bag to checkout.</p>
        <a
          href="/products"
          className="inline-block py-3 px-6 rounded-full bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold"
        >
          Browse Products
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
      <div className="pb-6 mb-8 border-b border-neutral-200">
        <h1 className="font-serif text-3xl font-bold text-neutral-950">
          Checkout
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Complete your delivery details to confirm your Cash on Delivery order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left 2 Cols: Delivery Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="font-serif text-xl font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Delivery Information
            </h2>

            {errorMessage && (
              <div className="flex items-center gap-2.5 p-4 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="e.g. Tanvir Ahmed"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 01712345678"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. tanvir@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition"
                />
              </div>

              {/* Delivery Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Street Address & House / Flat No. <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  rows={2}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. House 42, Road 7/A, Sector 4"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 bg-white cursor-pointer"
                >
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Barishal">Barishal</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                </select>
              </div>

              {/* Area / Thana */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Area / Thana <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g. Dhanmondi / Uttara / Mirpur"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition"
                />
              </div>
            </div>

            {/* Payment Method Option */}
            <div className="pt-4 border-t border-neutral-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-3">
                Payment Method
              </label>

              <div className="p-4 rounded-2xl border-2 border-neutral-900 bg-neutral-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-4 border-neutral-900 bg-white" />
                  <div>
                    <p className="text-sm font-bold text-neutral-900">Cash on Delivery (COD)</p>
                    <p className="text-xs text-neutral-500">Pay cash in hand when your order arrives at your door.</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 bg-neutral-900 text-white rounded-full">
                  Standard
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-full bg-neutral-950 text-white font-semibold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Placing Order...</span>
                ) : (
                  <>
                    <span>Place Order (Cash on Delivery)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right 1 Col: Mini Order Items Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-neutral-50 rounded-3xl border border-neutral-200/80 p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-neutral-900 pb-2 border-b border-neutral-200">
              Order Items ({items.length})
            </h3>

            <div className="divide-y divide-neutral-200/70 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center gap-3">
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="w-12 h-14 object-cover rounded-lg bg-neutral-200 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-neutral-900 truncate">
                      {item.product?.name}
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      Size: {item.size} • Qty: {item.quantity}
                    </p>
                    <p className="text-xs font-bold text-neutral-900">
                      {formatPrice(item.activePrice * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-200 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Delivery</span>
                <span className="font-semibold text-neutral-900">
                  {isFreeDelivery ? 'FREE' : formatPrice(deliveryCharge)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-950 pt-2 border-t border-neutral-200">
                <span>Total Due</span>
                <span className="font-serif text-lg">{formatPrice(totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
