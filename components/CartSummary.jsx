import React from 'react';
import { formatPrice } from '../lib/format';
import { ShieldCheck, ArrowRight, Truck } from 'lucide-react';

export default function CartSummary({
  subtotal = 0,
  shippingFee = 60,
  showCheckoutButton = true,
  onCheckout,
}) {
  const isFreeDelivery = subtotal >= 3000;
  const deliveryCharge = isFreeDelivery ? 0 : shippingFee;
  const grandTotal = subtotal + deliveryCharge;

  return (
    <div className="bg-neutral-50 rounded-2xl border border-neutral-200/80 p-6 space-y-6">
      <h3 className="font-serif text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-3">
        Order Summary
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal</span>
          <span className="font-semibold text-neutral-900">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-neutral-600">
          <div className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-neutral-400" />
            <span>Estimated Delivery</span>
          </div>
          <span className="font-semibold text-neutral-900">
            {isFreeDelivery ? (
              <span className="text-emerald-600 font-bold">FREE</span>
            ) : (
              formatPrice(deliveryCharge)
            )}
          </span>
        </div>

        {subtotal < 3000 && (
          <p className="text-[11px] text-amber-700 bg-amber-50 rounded-lg p-2 border border-amber-200">
            Add {formatPrice(3000 - subtotal)} more to qualify for <strong>FREE Delivery</strong> inside Dhaka!
          </p>
        )}

        <div className="border-t border-neutral-200 pt-3 flex justify-between items-baseline">
          <span className="text-base font-bold text-neutral-950">Total</span>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-neutral-950 font-serif">
              {formatPrice(grandTotal)}
            </span>
            <p className="text-[11px] text-neutral-400">Inclusive of VAT & Delivery</p>
          </div>
        </div>
      </div>

      <div className="p-3 bg-white rounded-xl border border-neutral-200 text-xs text-neutral-600 space-y-1">
        <div className="flex items-center gap-2 text-neutral-900 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Cash on Delivery Available</span>
        </div>
        <p className="text-[11px] text-neutral-500 pl-6">
          Inspect items upon delivery and pay the delivery rider in cash.
        </p>
      </div>

      {showCheckoutButton && (
        <a
          href="/checkout"
          onClick={onCheckout}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-neutral-950 text-white font-semibold text-sm uppercase tracking-wider hover:bg-neutral-800 transition shadow-sm hover:shadow-md"
        >
          Proceed to Checkout
          <ArrowRight className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}
