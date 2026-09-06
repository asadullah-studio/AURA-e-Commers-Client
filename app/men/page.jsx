import React from 'react';
import ProductGrid from '../../components/ProductGrid';

export const metadata = {
  title: "Men's Collection | AURA Lifestyle",
  description: "Shop Men's Panjabis, Linen Shirts, Polos, Jeans, and Trousers at AURA Lifestyle.",
};

export default function MenPage() {
  const menSubCategories = ['Panjabi', 'Shirt', 'T-Shirt', 'Polo', 'Jeans', 'Pant'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <ProductGrid
        initialCategory="men"
        title="Men's Collection"
        description="Refined craftsmanship meeting everyday versatility. Explore our signature Panjabis, pure linen shirts, pique polos, and premium denim."
        availableSubCategories={menSubCategories}
      />
    </div>
  );
}
