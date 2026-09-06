'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '../../lib/CartContext';
import { registerUser } from '../../lib/api';
import { User, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import Loading from '../../components/Loading';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get('redirect') || '/';
  const { isLoggedIn, checkAuth, fetchCart } = useCart();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      router.push(redirect);
    }
  }, [isLoggedIn, redirect, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !email || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    try {
      setLoading(true);
      const res = await registerUser(name, email, password);

      if (res?.success) {
        await checkAuth();
        await fetchCart();
        router.push(redirect);
      } else {
        setErrorMessage(res?.data?.message || res?.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Registration error. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200/80 shadow-sm">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="font-serif text-3xl font-bold uppercase tracking-widest text-neutral-950">
          AURA
        </span>
        <h2 className="text-xl font-bold text-neutral-900">
          Create an Account
        </h2>
        <p className="text-xs text-neutral-500">
          Join AURA Lifestyle for fast checkout and order tracking.
        </p>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tanvir Ahmed"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition"
            />
            <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tanvir@example.com"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition"
            />
            <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
            Password (Min. 8 characters)
          </label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition"
            />
            <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-full bg-neutral-950 text-white font-semibold text-xs uppercase tracking-widest hover:bg-neutral-800 transition flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      <div className="pt-4 border-t border-neutral-100 text-center text-xs text-neutral-500">
        Already have an account?{' '}
        <a
          href={`/login?redirect=${encodeURIComponent(redirect)}`}
          className="font-bold text-neutral-900 hover:underline"
        >
          Sign in
        </a>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-14">
      <Suspense fallback={<Loading />}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
