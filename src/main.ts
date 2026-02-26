// Elements
const productGrid = document.getElementById('product-grid') as HTMLElement;
const detailScreen = document.getElementById('detail-screen') as HTMLElement;
const cartScreen = document.getElementById('cart-screen') as HTMLElement;
const successScreen = document.getElementById('success-screen') as HTMLElement;
const backBtn = document.getElementById('back-btn') as HTMLElement;
const cartNavBtn = document.getElementById('cart-nav-btn') as HTMLElement;
const closeCartBtn = document.getElementById('close-cart') as HTMLElement;
const addToCartBtn = document.getElementById('add-to-cart-btn') as HTMLElement;
const checkoutConfirmBtn = document.getElementById('checkout-confirm-btn') as HTMLElement;
const returnHomeBtn = document.getElementById('return-home-btn') as HTMLElement;

const detailImg = document.getElementById('detail-img') as HTMLImageElement;
const detailTitle = document.getElementById('detail-title') as HTMLElement;
const detailPrice = document.getElementById('detail-price') as HTMLElement;
const cartCountLabel = document.querySelector('.cart-count') as HTMLElement;

// Data
const products = [
  { id: 1, name: 'Minimalist Hoodie', price: 85, img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
  { id: 2, name: 'Eco Sneakers', price: 120, img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop' },
  { id: 3, name: 'Leather Tote', price: 210, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop' },
  { id: 4, name: 'Artisan Watch', price: 350, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', trending: true },
  { id: 5, name: 'Denim Jacket', price: 95, img: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=400&fit=crop' },
  { id: 6, name: 'Summer Cap', price: 45, img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop', trending: true }
];

let cartCount = 0;

// Render Products
function initShop() {
  productGrid.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="img-wrapper">
        ${(product as any).trending ? '<span class="badge">Trending</span>' : ''}
        <img src="${product.img}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <span>$${product.price}</span>
      </div>
    `;

    // Prototyping: On Click Product -> Scale & Navigate to PDP
    card.onclick = () => {
      detailImg.src = product.img;
      detailTitle.innerText = product.name;
      detailPrice.innerText = `$${product.price}`;
      navigateTo('detail');
    };

    productGrid.appendChild(card);
  });
}

// Navigation Logic (Figma "Navigate to" simulation)
function navigateTo(screen: 'home' | 'detail' | 'cart' | 'success') {
  if (screen === 'detail') {
    detailScreen.classList.remove('screen-hidden');
  } else if (screen === 'home') {
    detailScreen.classList.add('screen-hidden');
    cartScreen.classList.add('screen-hidden');
    successScreen.classList.add('screen-hidden');
  } else if (screen === 'cart') {
    cartScreen.classList.remove('screen-hidden');
  } else if (screen === 'success') {
    successScreen.classList.remove('screen-hidden');
  }
}

// Event Listeners
backBtn.onclick = () => navigateTo('home');
cartNavBtn.onclick = () => navigateTo('cart');
closeCartBtn.onclick = () => navigateTo('home');
checkoutConfirmBtn.onclick = () => navigateTo('success');
returnHomeBtn.onclick = () => navigateTo('home');

addToCartBtn.onclick = () => {
  cartCount++;
  cartCountLabel.innerText = cartCount.toString();

  // Feedback Animation
  addToCartBtn.innerText = 'Added!';
  addToCartBtn.style.background = '#27ae60';

  setTimeout(() => {
    addToCartBtn.innerText = 'Add to Cart';
    addToCartBtn.style.background = 'black';
    navigateTo('home'); // Prototype: After adding, take user back to home
  }, 1000);
};

// Initialize
initShop();
