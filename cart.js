document.addEventListener('DOMContentLoaded', function () {
    function loadCartItems() {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        cartItems.forEach((item, index) => {
            const itemRow = document.createElement('tr');
            
            itemRow.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" style="width: 100px;"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><button class="remove-btn" data-index="${index}">Remove</button></td>
            `;

            cartItemsContainer.appendChild(itemRow);
        });

        // Add event listeners for the remove buttons
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const itemIndex = this.getAttribute('data-index');
                removeCartItem(itemIndex);
            });
        });
    }

    function removeCartItem(index) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCartItems();
    }

    // Initial load
    loadCartItems();
});
