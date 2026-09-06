import React from 'react';
import ProductGrid from '../../components/ProductGrid';

export const metadata = {
  title: 'Accessories Collection | AURA Lifestyle',
  description: 'Shop Full-Grain Leather Bags, Chronograph Watches, Wallets, Belts & Sunglasses at AURA Lifestyle.',
};

export default function AccessoriesPage() {
  const accessoriesSubCategories = ['Bag', 'Watch', 'Sunglasses', 'Wallet', 'Belt'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <ProductGrid
        initialCategory="accessories"
        title="Accessories Collection"
        description="The perfect finishing touches. Explore our genuine leather bags, RFID-blocking wallets, chronograph timepieces, and polarized eyewear."
        availableSubCategories={accessoriesSubCategories}
      />
    </div>
  );
}
