'use client';

import React, { useState } from 'react';
import Link from 'next/navigation';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Menu, X, ChevronDown, Package, LogOut } from 'lucide-react';
import { useCart } from '../lib/CartContext';
import SearchBar from './SearchBar';

export default function Navbar() {
  const pathname = usePathname();
  const { user, isLoggedIn, cart, handleLogout } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Men', href: '/men' },
    { name: 'Women', href: '/women' },
    { name: 'Kids', href: '/kids' },
    { name: 'Accessories', href: '/accessories' },
    { name: 'All Products', href: '/products' },
  ];

  const totalCartCount = cart?.totalQuantity || 0;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all">
      {/* Top micro-bar */}
      <div className="bg-neutral-900 text-neutral-200 text-xs py-1.5 px-4 text-center tracking-wider uppercase font-medium">
        Free Cash on Delivery inside Dhaka on orders over ৳3,000 | Hot Line: 09612-000000
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-neutral-700 hover:text-black focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="group flex flex-col items-center sm:items-start">
              <span className="font-serif tracking-widest text-2xl md:text-3xl font-bold uppercase text-neutral-950 group-hover:text-neutral-700 transition">
                AURA
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-neutral-500 -mt-1 font-sans">
                Lifestyle
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm tracking-wider uppercase font-medium transition-colors duration-200 relative py-1 ${
                    isActive
                      ? 'text-neutral-950 font-semibold'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-950 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons: Search, Auth, Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Search */}
            <div className="hidden md:block w-52 lg:w-64">
              <SearchBar />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-neutral-700 hover:text-black"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* User Profile / Auth */}
            <div className="relative">
              {isLoggedIn ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 py-1 px-2.5 rounded-full hover:bg-neutral-100 text-sm font-medium text-neutral-800 transition"
                  >
                    <div className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs uppercase font-bold">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="hidden sm:inline max-w-[90px] truncate text-xs font-semibold">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                  </button>

                  {userDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setUserDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-neutral-100 py-1.5 z-20 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="px-4 py-2 border-b border-neutral-100">
                          <p className="text-xs text-neutral-500">Signed in as</p>
                          <p className="text-xs font-semibold text-neutral-900 truncate">
                            {user?.email}
                          </p>
                        </div>
                        <a
                          href="/orders"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 transition"
                        >
                          <Package className="w-4 h-4 text-neutral-500" />
                          My Orders
                        </a>
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            handleLogout();
                          }}
                          className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition"
                        >
                          <LogOut className="w-4 h-4 text-red-500" />
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <a
                  href="/login"
                  className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-neutral-800 hover:text-black py-1.5 px-3 rounded-full hover:bg-neutral-100 transition"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </a>
              )}
            </div>

            {/* Shopping Cart Button */}
            <a
              href="/cart"
              className="relative p-2 text-neutral-800 hover:text-black transition"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-0.5 min-w-[18px] h-[18px] px-1 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {totalCartCount > 99 ? '99+' : totalCartCount}
                </span>
              )}
            </a>
          </div>
        </div>

        {/* Mobile Search Input Expanded */}
        {searchOpen && (
          <div className="md:hidden pb-3 pt-1 border-t border-neutral-100 animate-in fade-in duration-150">
            <SearchBar onClose={() => setSearchOpen(false)} />
          </div>
        )}
      </div>

      {/* Mobile Sidebar Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                <span className="font-serif tracking-widest text-xl font-bold uppercase text-neutral-950">
                  AURA <span className="text-xs text-neutral-500 font-sans tracking-normal">Lifestyle</span>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-neutral-500 hover:text-neutral-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base uppercase tracking-wider font-medium text-neutral-800 hover:text-neutral-950 py-1"
                  >
                    {link.name}
                  </a>
                ))}
                {isLoggedIn && (
                  <a
                    href="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base uppercase tracking-wider font-medium text-neutral-800 hover:text-neutral-950 py-1 flex items-center gap-2"
                  >
                    <Package className="w-4 h-4 text-neutral-500" />
                    My Orders
                  </a>
                )}
              </nav>
            </div>

            <div className="pt-6 border-t border-neutral-100">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-neutral-100 text-red-600 font-semibold text-sm hover:bg-red-50 flex items-center justify-center gap-2 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              ) : (
                <a
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center w-full py-2.5 px-4 rounded-lg bg-neutral-950 text-white font-semibold text-sm hover:bg-neutral-800 transition"
                >
                  Sign In / Register
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
