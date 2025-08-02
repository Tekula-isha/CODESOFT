import { getCart, saveCart, updateCartItemQuantity, removeCartItem, clearCart } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutSummaryList = document.getElementById('checkout-summary-list');
    const checkoutTotalPrice = document.getElementById('checkout-total-price');
    const placeOrderBtn = document.getElementById('place-order-btn');

    const renderCart = () => {
        let cart = getCart();
        cartItemsList.innerHTML = ''; // Clear existing items

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalPrice.textContent = '$0.00';
            return;
        }

        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="item-quantity">
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="remove-btn" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
        });
        cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    };

    const renderCheckoutSummary = () => {
        let cart = getCart();
        checkoutSummaryList.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            checkoutSummaryList.innerHTML = '<li>No items in cart.</li>';
            checkoutTotalPrice.textContent = '$0.00';
            return;
        }

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            checkoutSummaryList.appendChild(li);
            total += item.price * item.quantity;
        });
        checkoutTotalPrice.textContent = `$${total.toFixed(2)}`;
    };

    // Event Delegation for Cart Quantity Change and Remove Buttons
    if (cartItemsList) {
        cartItemsList.addEventListener('change', (event) => {
            if (event.target.tagName === 'INPUT' && event.target.dataset.id) {
                const productId = event.target.dataset.id;
                const newQuantity = parseInt(event.target.value);
                updateCartItemQuantity(productId, newQuantity);
                renderCart(); // Re-render cart to update total
            }
        });

        cartItemsList.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-btn') && event.target.dataset.id) {
                const productId = event.target.dataset.id;
                removeCartItem(productId);
                renderCart(); // Re-render cart
            }
        });
    }

    // Place Order Button (Conceptual)
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length === 0) {
                alert('Your cart is empty. Please add items before placing an order.');
                return;
            }

            alert('Order placed successfully! (This is a demo, no actual payment processed)');
            clearCart();
            window.location.href = '/'; // Redirect to home page
        });
    }

    // Determine which page we are on and render accordingly
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    } else if (window.location.pathname.includes('checkout.html')) {
        renderCheckoutSummary();
    }
});