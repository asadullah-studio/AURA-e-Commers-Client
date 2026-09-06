import React from 'react';

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden animate-pulse">
          <div className="aspect-[3/4] bg-neutral-200" />
          <div className="p-4 space-y-3">
            <div className="h-3 bg-neutral-200 rounded w-1/3" />
            <div className="h-4 bg-neutral-200 rounded w-4/5" />
            <div className="h-3 bg-neutral-200 rounded w-1/4" />
            <div className="h-5 bg-neutral-200 rounded w-1/2 pt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Spinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={`inline-block animate-spin rounded-full border-solid border-neutral-900 border-r-transparent align-[-0.125em] ${sizeClasses[size] || sizeClasses.md} ${className}`} />
  );
}

export default function Loading() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 space-y-3">
      <Spinner size="lg" />
      <p className="text-sm font-medium text-neutral-500 animate-pulse">Loading collection...</p>
    </div>
  );
}
