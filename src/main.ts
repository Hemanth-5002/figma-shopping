// Elements - Using a safer selector method
const getEl = (id: string) => document.getElementById(id);

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

// Initialize Shop when DOM is ready
function initShop() {
  console.log('initShop called...');
  const productGrid = getEl('product-grid');

  if (!productGrid) {
    console.error('Product grid element #product-grid NOT FOUND!');
    return;
  }

  console.log('Clearing grid and rendering products...');
  productGrid.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.opacity = '1';
    card.style.display = 'block';
    card.innerHTML = `
      <div class="img-wrapper">
        ${(product as any).trending ? '<span class="badge">Trending</span>' : ''}
        <img src="${product.img}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400?text=No+Image'">
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <span>$${product.price}</span>
      </div>
    `;

    card.onclick = () => {
      console.log('Product clicked:', product.name);
      const detailImg = getEl('detail-img') as HTMLImageElement;
      const detailTitle = getEl('detail-title');
      const detailPrice = getEl('detail-price');

      if (detailImg) detailImg.src = product.img;
      if (detailTitle) detailTitle.innerText = product.name;
      if (detailPrice) detailPrice.innerText = `$${product.price}`;
      navigateTo('detail');
    };

    productGrid.appendChild(card);
  });

  console.log('Successfully injected', products.length, 'cards into #product-grid');
}

// Navigation Logic (Figma "Navigate to" simulation)
function navigateTo(screen: 'home' | 'detail' | 'cart' | 'success') {
  const detailScreen = getEl('detail-screen');
  const cartScreen = getEl('cart-screen');
  const successScreen = getEl('success-screen');

  if (screen === 'detail') {
    if (detailScreen) detailScreen.classList.remove('screen-hidden');
  } else if (screen === 'home') {
    if (detailScreen) detailScreen.classList.add('screen-hidden');
    if (cartScreen) cartScreen.classList.add('screen-hidden');
    if (successScreen) successScreen.classList.add('screen-hidden');
  } else if (screen === 'cart') {
    if (cartScreen) cartScreen.classList.remove('screen-hidden');
  } else if (screen === 'success') {
    if (successScreen) successScreen.classList.remove('screen-hidden');
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded event fired');
  initShop();

  const backBtn = getEl('back-btn');
  const cartNavBtn = getEl('cart-nav-btn');
  const closeCartBtn = getEl('close-cart');
  const checkoutConfirmBtn = getEl('checkout-confirm-btn');
  const returnHomeBtn = getEl('return-home-btn');
  const addToCartBtn = getEl('add-to-cart-btn');
  const cartCountLabel = document.querySelector('.cart-count') as HTMLElement;

  if (backBtn) backBtn.onclick = () => navigateTo('home');
  if (cartNavBtn) cartNavBtn.onclick = () => navigateTo('cart');
  if (closeCartBtn) closeCartBtn.onclick = () => navigateTo('home');
  if (checkoutConfirmBtn) checkoutConfirmBtn.onclick = () => navigateTo('success');
  if (returnHomeBtn) returnHomeBtn.onclick = () => navigateTo('home');

  if (addToCartBtn) {
    addToCartBtn.onclick = () => {
      cartCount++;
      if (cartCountLabel) cartCountLabel.innerText = cartCount.toString();

      // Feedback Animation
      const originalText = addToCartBtn.innerText;
      addToCartBtn.innerText = 'Added!';
      (addToCartBtn as HTMLElement).style.background = '#27ae60';

      setTimeout(() => {
        addToCartBtn.innerText = originalText;
        (addToCartBtn as HTMLElement).style.background = 'black';
        navigateTo('home');
      }, 1000);
    };
  }
});

// Fallback: If DOMContentLoaded already fired or missed
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('Document already ready, triggering manual init');
  initShop();
} else {
  console.log('Wait for document ready...');
}

// Global reveal to debug
(window as any).debugInit = initShop;

// Initialize - Not needed here since it's in DOMContentLoaded now
