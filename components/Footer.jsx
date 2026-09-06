import React from 'react';
import { Facebook, Instagram, Twitter, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-14 pb-8 mt-20 border-t border-neutral-800">
      {/* Service Value Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-neutral-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-neutral-900 rounded-full text-white">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Nationwide Delivery</p>
              <p className="text-xs text-neutral-400">Fast delivery across Bangladesh</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-neutral-900 rounded-full text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Cash on Delivery</p>
              <p className="text-xs text-neutral-400">Pay conveniently upon receipt</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-neutral-900 rounded-full text-white">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">7-Day Hassle-Free Return</p>
              <p className="text-xs text-neutral-400">Easy size exchanges</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-neutral-900 rounded-full text-white">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Customer Support</p>
              <p className="text-xs text-neutral-400">Call 10:00 AM - 10:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-block">
              <span className="font-serif tracking-widest text-2xl font-bold uppercase text-white">
                AURA
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 block -mt-1 font-sans">
                Lifestyle
              </span>
            </a>
            <p className="mt-4 text-sm text-neutral-400 max-w-sm leading-relaxed">
              Inspired by the grace and modern vibrancy of contemporary Bangladeshi fashion. Crafted with premium fabrics, authentic tailoring, and everyday comfort.
            </p>
            <div className="mt-6 flex items-center space-x-4">
              <a href="#" className="p-2 bg-neutral-900 rounded-full hover:bg-neutral-800 text-neutral-300 hover:text-white transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-neutral-900 rounded-full hover:bg-neutral-800 text-neutral-300 hover:text-white transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-neutral-900 rounded-full hover:bg-neutral-800 text-neutral-300 hover:text-white transition">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Shop Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/men" className="hover:text-white transition">Men</a></li>
              <li><a href="/women" className="hover:text-white transition">Women</a></li>
              <li><a href="/kids" className="hover:text-white transition">Kids</a></li>
              <li><a href="/accessories" className="hover:text-white transition">Accessories</a></li>
              <li><a href="/products" className="hover:text-white transition">All Products</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping Information</a></li>
              <li><a href="#" className="hover:text-white transition">Return Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              My Account
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/login" className="hover:text-white transition">Login</a></li>
              <li><a href="/register" className="hover:text-white transition">Register</a></li>
              <li><a href="/orders" className="hover:text-white transition">My Orders</a></li>
              <li><a href="/cart" className="hover:text-white transition">Shopping Cart</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-neutral-800 text-xs text-neutral-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} AURA Lifestyle Bangladesh. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>Supported Payment:</span>
          <span className="font-semibold text-neutral-300 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-700">Cash on Delivery (৳)</span>
        </p>
      </div>
    </footer>
  );
}
