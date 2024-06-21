export default function calculateOriginalPrice(
  currentPrice,
  discountPercentage
) {
  let originalPrice = currentPrice / (1 - discountPercentage / 100);
  return originalPrice;
}
