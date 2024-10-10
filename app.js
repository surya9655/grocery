let cart = {
    items: [],
    total: 0
};

function updateCart() {
    const cartTotalElement = document.getElementById('cart-total');
    const cartItemsElement = document.getElementById('cart-items'); // Element to display cart items

    // Update total price
    cartTotalElement.textContent = `Total: ₹${cart.total.toFixed(2)}`;

    // Clear cart items display
    cartItemsElement.innerHTML = '';

    // Display each item in the cart
    cart.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;
        cartItemsElement.appendChild(itemElement);
    });
}

// Function to show a notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000); // Remove notification after 3 seconds
}

// Function to add product to cart
function addToCart(productName, productPrice) {
    cart.items.push({ name: productName, price: parseFloat(productPrice) });
    cart.total += parseFloat(productPrice);
    updateCart();
    showNotification(`${productName} has been added to the cart!`); // Show notification
}

function handleAddToCart(event) {
    const productName = event.target.getAttribute('data-product');
    const selectElement = document.querySelector(`.price-select[data-product="${productName}"]`);
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const productPrice = selectedOption.value;
    addToCart(productName, productPrice);
}

function displaySearchResults(searchTerm) {
    const searchResultsContainer = document.getElementById('search-results');
    searchResultsContainer.innerHTML = ''; // Clear previous results
    const products = document.querySelectorAll('.cart2, .cart4, .cart5, .cart6, .cart7'); // Product selectors

    products.forEach(product => {
        const productName = product.querySelector('.cartname').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            const resultItem = document.createElement('div');
            resultItem.classList.add('search-result-item');
            resultItem.textContent = product.querySelector('.cartname').textContent;
            resultItem.addEventListener('click', () => {
                product.style.display = 'block';
                searchResultsContainer.innerHTML = ''; // Clear results after selection
            });
            searchResultsContainer.appendChild(resultItem);
        }
    });
}

function attachAddToCartListeners() {
    document.querySelectorAll('.addcart .add').forEach(button => {
        button.removeEventListener('click', handleAddToCart); // Remove existing listeners
        button.removeEventListener('touchstart', handleAddToCart); // Remove touch listeners
        button.addEventListener('click', handleAddToCart);
        button.addEventListener('touchstart', handleAddToCart); // Handle touch events
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const searchbar = document.getElementById('searchbar');

    searchbar.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const products = document.querySelectorAll('.cart2, .cart4, .cart5, .cart6, .cart7');
        products.forEach(product => {
            const productName = product.querySelector('.cartname').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });

        displaySearchResults(searchTerm);
    });

    attachAddToCartListeners();

    const observer = new MutationObserver(() => {
        attachAddToCartListeners();
    });

    observer.observe(document.querySelector('.product'), { childList: true, subtree: true });
});
