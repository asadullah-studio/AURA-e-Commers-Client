'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../lib/CartContext';
import { getOrders } from '../../lib/api';
import OrderCard from '../../components/OrderCard';
import EmptyState from '../../components/EmptyState';
import Loading from '../../components/Loading';
import { Package } from 'lucide-react';

export default function OrdersPage() {
  const router = useRouter();
  const { isLoggedIn, authLoading } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push('/login?redirect=/orders');
    }
  }, [authLoading, isLoggedIn, router]);

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        const res = await getOrders();
        if (res?.success && res?.data) {
          setOrders(res.data);
        }
      } catch (err) {
        console.error('Fetch orders error:', err);
      } finally {
        setLoading(false);
      }
    }

    if (isLoggedIn) {
      loadOrders();
    }
  }, [isLoggedIn]);

  if (authLoading || loading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
      <div className="pb-6 mb-8 border-b border-neutral-200 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-950">
            My Orders
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Track and view your recent clothing and lifestyle purchases.
          </p>
        </div>
        <div className="p-3 bg-neutral-100 rounded-full text-neutral-700">
          <Package className="w-5 h-5" />
        </div>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          type="orders"
          title="You haven't placed any orders yet."
          subtitle="Explore our new arrivals and find something that suits your personal style."
          actionText="Start Shopping"
          actionHref="/products"
        />
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
