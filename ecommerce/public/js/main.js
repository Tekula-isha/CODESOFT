import { addToCart } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    const productGrid = document.getElementById('product-grid');

    if (productGrid) {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products = await response.json();

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <a href="product.html?id=${product._id}">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                    </a>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <button data-product-id="${product._id}">Add to Cart</button>
                `;
                productGrid.appendChild(productCard);
            });

            // Add event listeners for "Add to Cart" buttons
            productGrid.addEventListener('click', (event) => {
                if (event.target.tagName === 'BUTTON' && event.target.dataset.productId) {
                    const productId = event.target.dataset.productId;
                    // Find the product in the fetched list
                    const productToAdd = products.find(p => p._id === productId);
                    if (productToAdd) {
                        addToCart(productToAdd);
                    }
                }
            });

        } catch (error) {
            console.error('Failed to fetch products:', error);
            productGrid.innerHTML = '<p>Error loading products. Please try again later.</p>';
        }
    }
});