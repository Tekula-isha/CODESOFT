import { addToCart } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        document.getElementById('product-detail-container').innerHTML = '<p>Product ID not found.</p>';
        return;
    }

    const productDetailContainer = document.getElementById('product-detail-container');
    
    try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const product = await response.json();

        productDetailContainer.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h2>${product.name}</h2>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <button id="add-to-cart-btn">Add to Cart</button>
            </div>
        `;

        document.getElementById('add-to-cart-btn').addEventListener('click', () => {
            addToCart(product);
        });

    } catch (error) {
        console.error('Failed to fetch product details:', error);
        productDetailContainer.innerHTML = '<p>Error loading product details. Please try again later.</p>';
    }
});