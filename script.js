const products = [
    {
        id: 1,
        name: "Canon EOS R5 Mirrorless Camera",
        price: 3899.00,
        image: "https://via.placeholder.com/300x200?text=Canon+EOS+R5",
        category: "Cameras"
    },
    {
        id: 2,
        name: "Sony FE 24-70mm f/2.8 GM Lens",
        price: 2198.00,
        image: "https://via.placeholder.com/300x200?text=Sony+24-70mm",
        category: "Lenses"
    },
    {
        id: 3,
        name: "DJI Mavic 3 Pro Drone",
        price: 2199.00,
        image: "https://via.placeholder.com/300x200?text=DJI+Mavic+3",
        category: "Drones"
    },
    {
        id: 4,
        name: "Godox AD200Pro Flash",
        price: 349.00,
        image: "https://via.placeholder.com/300x200?text=Godox+AD200Pro",
        category: "Lighting"
    },
    {
        id: 5,
        name: "Sennheiser MKE 600 Shotgun Mic",
        price: 349.95,
        image: "https://via.placeholder.com/300x200?text=Sennheiser+MKE600",
        category: "Audio"
    },
    {
        id: 6,
        name: "SanDisk 128GB Extreme Pro SD Card",
        price: 39.99,
        image: "https://via.placeholder.com/300x200?text=SanDisk+128GB",
        category: "Accessories"
    }
];

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProducts(products);
});

function loadProducts(productsToLoad) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    productsToLoad.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    }
}
