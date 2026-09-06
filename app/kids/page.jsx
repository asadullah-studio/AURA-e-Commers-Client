import React from 'react';
import ProductGrid from '../../components/ProductGrid';

export const metadata = {
  title: "Kids' Collection | AURA Lifestyle",
  description: "Shop Boys' Panjabis, Girls' Party Frocks, Casual T-Shirts & Dresses at AURA Lifestyle.",
};

export default function KidsPage() {
  const kidsSubCategories = ['Boys', 'Girls', 'Kids T-Shirt', 'Kids Dress'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <ProductGrid
        initialCategory="kids"
        title="Kids' Collection"
        description="Soft, breathable, hypoallergenic fabrics made for playful days, family festivities, and vibrant daily adventures."
        availableSubCategories={kidsSubCategories}
      />
    </div>
  );
}
