'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProduct } from '../../../lib/api';
import { formatPrice, calculateDiscountPercentage } from '../../../lib/format';
import { useCart } from '../../../lib/CartContext';
import {
  Star,
  ShoppingBag,
  Zap,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import Loading from '../../../components/Loading';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem, isLoggedIn } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const res = await getProduct(id);
        if (res?.success && res?.data) {
          setProduct(res.data);
          // Auto select if only 1 size or first color
          if (res.data.colors?.length > 0) {
            setSelectedColor(res.data.colors[0]);
          }
          if (res.data.sizes?.length === 1) {
            setSelectedSize(res.data.sizes[0]);
          }
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        setError(err.message || 'Error loading product details.');
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Product Not Found</h2>
        <p className="text-sm text-neutral-500 mb-6">{error || "The product you are looking for doesn't exist."}</p>
        <a
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </a>
      </div>
    );
  }

  const discountPercent = calculateDiscountPercentage(product.price, product.discountPrice);
  const activePrice = product.discountPrice || product.price;

  const handleAddToCart = async (redirectToCheckout = false) => {
    // Size validation: Required before adding clothing products to cart
    if (product.sizes?.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);

    if (!isLoggedIn) {
      router.push(`/login?redirect=/products/${product.id}`);
      return;
    }

    try {
      setIsAdding(true);
      const res = await addItem(product.id, selectedSize || 'Standard', quantity);
      if (res.success) {
        setAddedSuccess(true);
        setTimeout(() => setAddedSuccess(false), 2500);

        if (redirectToCheckout) {
          router.push('/checkout');
        }
      } else if (res.requireAuth) {
        router.push(`/login?redirect=/products/${product.id}`);
      } else {
        alert(res.message || 'Failed to add item to cart.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-xs font-medium text-neutral-500 mb-8 space-x-2">
        <a href="/" className="hover:text-neutral-900 transition">Home</a>
        <span>/</span>
        <a href={`/${product.category?.slug}`} className="hover:text-neutral-900 transition capitalize">
          {product.category?.name}
        </a>
        <span>/</span>
        <span className="text-neutral-900 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left Column: Large Product Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {discountPercent > 0 && (
              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                {discountPercent}% OFF
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Product Details & Purchase Form */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              {product.category?.name} {product.subCategory && `• ${product.subCategory}`}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-950 mt-1">
              {product.name}
            </h1>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating || 4)
                        ? 'fill-current'
                        : 'text-neutral-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-neutral-800">
                {product.rating?.toFixed(1) || '4.5'}
              </span>
              <span className="text-xs text-neutral-400">
                ({product.reviewsCount || 18} customer reviews)
              </span>
              <span className="text-neutral-300">•</span>
              <span className="text-xs font-medium text-emerald-600">In Stock ({product.stock} units)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/70 flex items-baseline gap-3">
            <span className="font-serif text-3xl font-extrabold text-neutral-950">
              {formatPrice(activePrice)}
            </span>
            {discountPercent > 0 && (
              <>
                <span className="text-base text-neutral-400 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs font-bold text-red-600 bg-red-100 px-2.5 py-0.5 rounded-full">
                  Save {formatPrice(product.price - activePrice)}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
              Description
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Colors Selection */}
          {product.colors?.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Color: <span className="font-normal text-neutral-600">{selectedColor}</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition ${
                      selectedColor === color
                        ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes Selection (Mandatory for clothing) */}
          {product.sizes?.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Select Size <span className="text-red-500">*</span>
                </span>
                {sizeError && (
                  <span className="text-xs font-semibold text-red-600 animate-pulse">
                    Please choose a size!
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`min-w-[48px] h-10 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                      selectedSize === size
                        ? 'bg-neutral-950 text-white border-neutral-950 shadow-md ring-2 ring-neutral-950 ring-offset-2'
                        : sizeError
                        ? 'border-red-300 bg-red-50/50 text-neutral-800 hover:border-red-500'
                        : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2 block">
              Quantity
            </span>
            <div className="inline-flex items-center border border-neutral-300 rounded-xl bg-neutral-50 overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-neutral-600 hover:text-black hover:bg-neutral-200/70 transition font-bold"
              >
                -
              </button>
              <span className="px-4 py-2 text-sm font-bold text-neutral-900 min-w-[44px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-neutral-600 hover:text-black hover:bg-neutral-200/70 transition font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="space-y-3 pt-4 border-t border-neutral-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleAddToCart(false)}
                disabled={isAdding}
                className={`w-full py-4 px-6 rounded-full font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-neutral-950 border-2 border-neutral-950 hover:bg-neutral-950 hover:text-white'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> {isAdding ? 'Adding...' : 'Add to Cart'}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleAddToCart(true)}
                disabled={isAdding}
                className="w-full py-4 px-6 rounded-full bg-neutral-950 text-white font-semibold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                Buy Now (Cash on Delivery)
              </button>
            </div>
          </div>

          {/* Value Propositions */}
          <div className="pt-6 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-neutral-700" />
              <span>Fast 2-3 Day Nationwide Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neutral-700" />
              <span>100% Genuine Bangladeshi Apparel</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-neutral-700" />
              <span>7-Day Return & Size Exchange</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
