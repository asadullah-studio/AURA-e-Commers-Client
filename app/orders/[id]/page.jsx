'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../../lib/CartContext';
import { getOrder } from '../../../lib/api';
import { formatPrice } from '../../../lib/format';
import Loading from '../../../components/Loading';
import {
  ArrowLeft,
  Calendar,
  Truck,
  ShieldCheck,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  User,
} from 'lucide-react';

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isLoggedIn, authLoading } = useCart();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push(`/login?redirect=/orders/${id}`);
    }
  }, [authLoading, isLoggedIn, router, id]);

  useEffect(() => {
    async function loadOrder() {
      try {
        setLoading(true);
        const res = await getOrder(id);
        if (res?.success && res?.data) {
          setOrder(res.data);
        } else {
          setError(res?.message || 'Order not found.');
        }
      } catch (err) {
        setError(err.message || 'Failed to load order details.');
      } finally {
        setLoading(false);
      }
    }

    if (id && isLoggedIn) {
      loadOrder();
    }
  }, [id, isLoggedIn]);

  if (authLoading || loading) {
    return <Loading />;
  }

  if (error || !order) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Order Not Found</h2>
        <p className="text-sm text-neutral-500">{error || "Could not retrieve order details."}</p>
        <a
          href="/orders"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </a>
      </div>
    );
  }

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 space-y-8">
      {/* Back button */}
      <div>
        <a
          href="/orders"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-black transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to My Orders
        </a>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
            Order Reference
          </span>
          <h1 className="font-mono text-2xl sm:text-3xl font-bold text-neutral-950">
            #{order.orderNumber}
          </h1>
          <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Placed on {formattedDate}
          </p>
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {order.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ordered Items (2 cols) */}
        <div className="md:col-span-2 bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold text-neutral-900 border-b border-neutral-100 pb-3">
            Items in this Order ({order.items?.length || 0})
          </h2>

          <div className="divide-y divide-neutral-100">
            {order.items?.map((item) => (
              <div key={item.id} className="py-4 flex items-center gap-4">
                {item.product?.image ? (
                  <img
                    src={item.product.image}
                    alt={item.productName}
                    className="w-16 h-20 object-cover rounded-xl bg-neutral-100 flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-20 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-400">
                    <Package className="w-6 h-6" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-neutral-900 truncate">
                    {item.productName}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Size: <span className="font-semibold text-neutral-700">{item.size}</span> • Qty: <span className="font-semibold text-neutral-700">{item.quantity}</span>
                  </p>
                  <p className="text-xs font-bold text-neutral-900 mt-1">
                    {formatPrice(item.price)} each
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-sm font-bold text-neutral-950 font-serif">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-200 space-y-2 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-900">{formatPrice(order.totalAmount)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Delivery Charge</span>
              <span className="font-semibold text-emerald-600">Standard COD</span>
            </div>
            <div className="flex justify-between text-base font-bold text-neutral-950 pt-2 border-t border-neutral-200">
              <span>Grand Total</span>
              <span className="text-xl font-serif">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Meta (1 col) */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <div className="bg-neutral-50 rounded-3xl border border-neutral-200/80 p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700">
              <MapPin className="w-4 h-4 text-neutral-500" />
              <span>Delivery Destination</span>
            </div>
            <div className="text-xs space-y-1 text-neutral-600">
              <p className="font-bold text-neutral-900 text-sm">{order.customerName}</p>
              <p>{order.address}</p>
              <p>{order.area}, {order.city}</p>
              <p className="pt-1 flex items-center gap-1.5 text-neutral-700">
                <Phone className="w-3 h-3" /> {order.phone}
              </p>
              {order.email && <p className="text-neutral-500">{order.email}</p>}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-neutral-50 rounded-3xl border border-neutral-200/80 p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Payment Details</span>
            </div>
            <div className="text-xs text-neutral-600 space-y-1">
              <p className="font-semibold text-neutral-900">Cash on Delivery</p>
              <p className="text-neutral-500">
                Please keep exact cash ready upon delivery by the courier rider.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
