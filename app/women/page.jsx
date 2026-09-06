import React from 'react';
import ProductGrid from '../../components/ProductGrid';

export const metadata = {
  title: "Women's Collection | AURA Lifestyle",
  description: "Shop Women's Dhakai Jamdani Sarees, Lawn Three Pieces, Embroidered Kurtis, and Tops at AURA Lifestyle.",
};

export default function WomenPage() {
  const womenSubCategories = ['Saree', 'Three Piece', 'Kurti', 'Tops', 'Dress'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <ProductGrid
        initialCategory="women"
        title="Women's Collection"
        description="Embrace the timeless elegance of Bengali heritage with handwoven Dhakai Jamdani sarees, lawn three-pieces, and contemporary bohemian kurtis."
        availableSubCategories={womenSubCategories}
      />
    </div>
  );
}
