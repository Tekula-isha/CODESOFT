// Utility functions for localStorage cart management

export const getCart = () => {
    const cartItems = localStorage.getItem('cart');
    return cartItems ? JSON.parse(cartItems) : [];
};

export const saveCart = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
};

export const addToCart = (product, quantity = 1) => {
    let cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.id === product._id);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    saveCart(cart);
    alert(`${product.name} added to cart!`);
};

export const updateCartItemQuantity = (productId, newQuantity) => {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            cart.splice(itemIndex, 1); // Remove if quantity is 0 or less
        } else {
            cart[itemIndex].quantity = newQuantity;
        }
    }
    saveCart(cart);
};

export const removeCartItem = (productId) => {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
};

export const clearCart = () => {
    localStorage.removeItem('cart');
};