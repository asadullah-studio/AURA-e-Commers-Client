'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '../../lib/CartContext';
import { loginUser } from '../../lib/api';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import Loading from '../../components/Loading';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get('redirect') || '/';
  const { isLoggedIn, checkAuth, fetchCart } = useCart();

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

    if (!email || !password) {
      setErrorMessage('Please enter both your email and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser(email, password);

      if (res?.success) {
        await checkAuth();
        await fetchCart();
        router.push(redirect);
      } else {
        setErrorMessage(res?.data?.message || res?.message || 'Invalid email or password.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
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
          Welcome back
        </h2>
        <p className="text-xs text-neutral-500">
          Sign in to access your orders, shopping cart, and saved details.
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
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition"
            />
            <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition"
            />
            <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 rounded-full bg-neutral-950 text-white font-semibold text-xs uppercase tracking-widest hover:bg-neutral-800 transition flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="pt-4 border-t border-neutral-100 text-center text-xs text-neutral-500">
        Don't have an account yet?{' '}
        <a
          href={`/register?redirect=${encodeURIComponent(redirect)}`}
          className="font-bold text-neutral-900 hover:underline"
        >
          Create an account
        </a>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 py-14">
      <Suspense fallback={<Loading />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
