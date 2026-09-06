export function formatPrice(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '৳0';
  }
  const numericAmount = Math.round(Number(amount));
  return `৳${numericAmount.toLocaleString('en-IN')}`;
}

export function calculateDiscountPercentage(originalPrice, discountPrice) {
  if (!discountPrice || discountPrice >= originalPrice) return 0;
  return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
}
