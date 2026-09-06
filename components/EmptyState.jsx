import React from 'react';
import { ShoppingBag, PackageOpen, SearchX } from 'lucide-react';

export default function EmptyState({
  type = 'products',
  title,
  subtitle,
  actionText = 'Start Shopping',
  actionHref = '/products',
}) {
  const icons = {
    cart: <ShoppingBag className="w-12 h-12 text-neutral-400 stroke-1" />,
    orders: <PackageOpen className="w-12 h-12 text-neutral-400 stroke-1" />,
    products: <SearchX className="w-12 h-12 text-neutral-400 stroke-1" />,
  };

  const defaultTitles = {
    cart: 'Your cart is empty.',
    orders: "You haven't placed any orders yet.",
    products: 'No products found.',
  };

  const defaultSubtitles = {
    cart: 'Discover something you love from our latest collection.',
    orders: 'Browse our latest fashion styles and place your first order today.',
    products: 'Try adjusting your search terms or filters to find what you are looking for.',
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-5">
        {icons[type] || icons.products}
      </div>

      <h3 className="text-xl font-bold text-neutral-900 mb-2">
        {title || defaultTitles[type] || defaultTitles.products}
      </h3>

      <p className="text-sm text-neutral-500 mb-8 max-w-xs leading-relaxed">
        {subtitle || defaultSubtitles[type] || defaultSubtitles.products}
      </p>

      {actionHref && (
        <a
          href={actionHref}
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-neutral-950 text-white font-semibold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-sm hover:shadow-md"
        >
          {actionText}
        </a>
      )}
    </div>
  );
}
