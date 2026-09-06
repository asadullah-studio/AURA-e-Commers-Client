import React from 'react';
import ProductGrid from '../../components/ProductGrid';

export const metadata = {
  title: 'All Products | AURA Lifestyle',
  description: 'Browse our complete catalog of men, women, kids clothing and accessories.',
};

export default function ProductsPage({ searchParams }) {
  const search = searchParams?.search || '';
  const category = searchParams?.category || '';

  const pageTitle = search
    ? `Search Results for "${search}"`
    : category
    ? `${category.charAt(0).toUpperCase() + category.slice(1)} Collection`
    : 'All Products';

  const pageDescription = search
    ? `Browsing products matching your search term.`
    : 'Discover our comprehensive catalog of ready-to-wear lifestyle fashion.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <ProductGrid
        key={`${search}-${category}`}
        initialCategory={category}
        initialSearch={search}
        title={pageTitle}
        description={pageDescription}
      />
    </div>
  );
}
