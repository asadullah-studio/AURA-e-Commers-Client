import React from 'react';
import { formatPrice } from '../lib/format';
import { Package, Calendar, ChevronRight, Clock, CheckCircle2, Truck, XCircle } from 'lucide-react';

export default function OrderCard({ order }) {
  const statusColors = {
    PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
    CONFIRMED: 'bg-blue-100 text-blue-800 border-blue-200',
    PROCESSING: 'bg-purple-100 text-purple-800 border-purple-200',
    SHIPPED: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    DELIVERED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200',
  };

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-sm hover:border-neutral-300 transition space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-100">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">Order ID</span>
          <h4 className="font-mono text-sm sm:text-base font-bold text-neutral-900">
            #{order.orderNumber}
          </h4>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              statusColors[order.status] || 'bg-neutral-100 text-neutral-800 border-neutral-200'
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* Meta info: Date and Payment */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-neutral-600 bg-neutral-50 p-3 rounded-xl">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-neutral-400" />
          <span>{formattedDate}</span>
        </div>
        <div>
          <span className="text-neutral-400">Payment: </span>
          <span className="font-semibold text-neutral-800">Cash on Delivery</span>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="text-neutral-400">Items: </span>
          <span className="font-semibold text-neutral-800">{order.items?.length || 0} product(s)</span>
        </div>
      </div>

      {/* Item Snippets */}
      <div className="space-y-2 pt-1">
        {order.items?.slice(0, 3).map((item) => (
          <div key={item.id} className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-2.5 truncate max-w-xs sm:max-w-md">
              {item.product?.image && (
                <img
                  src={item.product.image}
                  alt={item.productName}
                  className="w-8 h-10 object-cover rounded bg-neutral-100 flex-shrink-0"
                />
              )}
              <span className="truncate font-medium text-neutral-800">
                {item.productName}
              </span>
              <span className="text-neutral-400 text-[11px] font-mono">
                ({item.size}) × {item.quantity}
              </span>
            </div>
            <span className="font-semibold text-neutral-900 ml-2">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
        {order.items?.length > 3 && (
          <p className="text-xs text-neutral-400 italic">
            + {order.items.length - 3} more item(s)
          </p>
        )}
      </div>

      {/* Footer Total & Link */}
      <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
        <div>
          <span className="text-xs text-neutral-400">Total Amount</span>
          <p className="text-lg font-bold text-neutral-950 font-serif">
            {formatPrice(order.totalAmount)}
          </p>
        </div>

        <a
          href={`/orders/${order.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-900 transition"
        >
          View Order Details
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
