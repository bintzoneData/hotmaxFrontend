export const addToCart = (id) => {
  // Check if it's not logged in then add to local storage
  const product = { id: id };

  // Retrieve cart from localStorage
  const cartString = localStorage.getItem('cart');
  const cart = cartString ? JSON.parse(cartString) : [];

  // Check if item is already in cart
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    return {
      ok: false,
      msg: 'Already in cart',
    };
  }

  // Add the new product to cart
  cart.push(product);

  // Update localStorage with the updated cart
  localStorage.setItem('cart', JSON.stringify(cart));

  return {
    ok: true,
    msg: 'Added to cart',
  };
};
