const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

   
document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // Check login state from localStorage
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Function to update the UI based on login state
    function updateUI() {
        if (isLoggedIn) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
        } else {
            loginBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
        }
    }

    // Event listener for login (redirect to login page)
    loginBtn.addEventListener('click', function (e) {
        // No default action prevention so the user can go to the login page
        // Simulate login process
        // In actual implementation, you'd check login credentials and then set isLoggedIn to true
        isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        updateUI();
    });

    // Event listener for logout
    logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        isLoggedIn = false;
        localStorage.setItem('isLoggedIn', 'false');
        updateUI();
    });

    // Initial UI update
    updateUI();
});


document.addEventListener("DOMContentLoaded", function () {
    const cartButtons = document.querySelectorAll(".add-to-cart");
    const cartIcon = document.querySelector("#lg-bag i");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartIcon() {
        cartIcon.setAttribute("data-count", cart.length);
    }

    function addToCart(productId) {
        if (!cart.includes(productId)) {
            cart.push(productId);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartIcon();
        }
    }

    cartButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            const product = this.closest(".pro");
            const productId = product.getAttribute("data-id");
            addToCart(productId);
        });
    });

    updateCartIcon();
});


document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    function addToCart(event) {
        event.preventDefault();
        const productElement = event.target.closest('.pro');
        const productId = productElement.getAttribute('data-id');
        const productImage = productElement.querySelector('img').src;
        const productName = productElement.querySelector('h5').innerText;
        const productPrice = productElement.querySelector('h4').innerText;

        const cartItem = {
            id: productId,
            image: productImage,
            name: productName,
            price: productPrice
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));

        alert('Item added to cart!');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Existing add to cart code...
    
    // Display cart items if on the cart page
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.forEach(item => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><button class="remove-from-cart" data-id="${item.id}">Remove</button></td>
            `;

            cartItemsContainer.appendChild(row);
        });

        // Add event listeners for remove buttons
        const removeButtons = document.querySelectorAll('.remove-from-cart');
        removeButtons.forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }
    
    function removeFromCart(event) {
        const button = event.target;
        const productId = button.getAttribute('data-id');
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        button.closest('tr').remove();
    }
});
