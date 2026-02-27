// Elements - Using a safer selector method
const getEl = (id: string) => document.getElementById(id);

// Data - Products with category tags (last 2 are laptop-only extras)
const products = [
  { id: 1, name: 'Minimalist Hoodie', price: 85, category: 'Apparel', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
  { id: 2, name: 'Eco Sneakers', price: 120, category: 'Shoes', img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop' },
  { id: 3, name: 'Leather Tote', price: 210, category: 'Bags', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop' },
  { id: 4, name: 'Artisan Watch', price: 350, category: 'Apparel', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', trending: true },
  { id: 5, name: 'Denim Jacket', price: 95, category: 'Apparel', img: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=400&fit=crop' },
  { id: 6, name: 'Summer Cap', price: 45, category: 'Apparel', img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop', trending: true },
  // Laptop-only extra products
  { id: 7, name: 'Canvas Backpack', price: 130, category: 'Bags', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
  { id: 8, name: 'Floral Midi Dress', price: 175, category: 'Apparel', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop' },
];

let cartCount = 0;
let activeCategory = 'All';
const favorites = new Set<number>();

// ─── Helpers ─────────────────────────────────────────────────────────────────
const isLaptop = () => window.innerWidth > 600;

function getVisibleProducts() {
  const pool = isLaptop() ? products : products.slice(0, 6);
  if (activeCategory === 'All') return pool;
  return pool.filter(p => p.category === activeCategory);
}

function updateFavBadge() {
  const badge = document.querySelector('.fav-count') as HTMLElement;
  if (badge) {
    badge.textContent = favorites.size.toString();
    badge.style.display = favorites.size > 0 ? 'flex' : 'none';
  }
}

// ─── Render Product Grid ──────────────────────────────────────────────────────
function renderGrid() {
  const productGrid = getEl('product-grid');
  if (!productGrid) return;

  productGrid.innerHTML = '';
  getVisibleProducts().forEach(product => {
    const isFav = favorites.has(product.id);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="img-wrapper">
        ${(product as any).trending ? '<span class="badge">Trending</span>' : ''}
        <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${product.id}" title="Add to Favorites">
          <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
        </button>
        <img src="${product.img}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400?text=No+Image'">
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <span>$${product.price}</span>
      </div>
    `;

    // Favorite toggle
    const favBtn = card.querySelector('.fav-btn') as HTMLButtonElement;
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (favorites.has(product.id)) {
        favorites.delete(product.id);
      } else {
        favorites.add(product.id);
      }
      updateFavBadge();
      renderGrid();
    });

    // Go to detail
    card.addEventListener('click', () => {
      const detailImg = getEl('detail-img') as HTMLImageElement;
      const detailTitle = getEl('detail-title');
      const detailPrice = getEl('detail-price');
      if (detailImg) detailImg.src = product.img;
      if (detailTitle) detailTitle.innerText = product.name;
      if (detailPrice) detailPrice.innerText = `$${product.price}`;
      navigateTo('detail');
    });

    productGrid.appendChild(card);
  });
}

// ─── Render Favorites Screen ──────────────────────────────────────────────────
function renderFavoritesScreen() {
  const list = getEl('fav-items-list');
  if (!list) return;
  if (favorites.size === 0) {
    list.innerHTML = '<div class="empty-msg">No favorites yet — tap ♡ on any product!</div>';
    return;
  }
  list.innerHTML = '';
  products.filter(p => favorites.has(p.id)).forEach(p => {
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="cart-item-info">
        <h4>${p.name}</h4>
        <span>$${p.price}</span>
      </div>
      <button class="remove-fav" data-id="${p.id}"><i class="fa-solid fa-xmark"></i></button>
    `;
    item.querySelector('.remove-fav')!.addEventListener('click', () => {
      favorites.delete(p.id);
      updateFavBadge();
      renderGrid();
      renderFavoritesScreen();
    });
    list.appendChild(item);
  });
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function navigateTo(screen: 'home' | 'detail' | 'cart' | 'success' | 'favorites' | 'profile') {
  const screens = ['detail-screen', 'cart-screen', 'success-screen', 'favorites-screen', 'profile-screen'];
  screens.forEach(id => getEl(id)?.classList.add('screen-hidden'));

  // Update active nav item
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  if (screen === 'home') document.querySelector('.nav-item[data-nav="home"]')?.classList.add('active');
  if (screen === 'favorites') document.querySelector('.nav-item[data-nav="favorites"]')?.classList.add('active');
  if (screen === 'profile') document.querySelector('.nav-item[data-nav="profile"]')?.classList.add('active');

  if (screen === 'detail') getEl('detail-screen')?.classList.remove('screen-hidden');
  else if (screen === 'cart') getEl('cart-screen')?.classList.remove('screen-hidden');
  else if (screen === 'success') getEl('success-screen')?.classList.remove('screen-hidden');
  else if (screen === 'favorites') {
    renderFavoritesScreen();
    getEl('favorites-screen')?.classList.remove('screen-hidden');
  } else if (screen === 'profile') {
    getEl('profile-screen')?.classList.remove('screen-hidden');
  }
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderGrid();

  // Category pills
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = (pill as HTMLElement).dataset.cat || 'All';
      renderGrid();
    });
  });

  // Bottom nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const nav = (item as HTMLElement).dataset.nav;
      if (nav === 'home') navigateTo('home');
      else if (nav === 'favorites') navigateTo('favorites');
      else if (nav === 'profile') navigateTo('profile');
    });
  });

  // Back btn / cart nav
  getEl('back-btn')!.onclick = () => navigateTo('home');
  getEl('cart-nav-btn')!.onclick = () => navigateTo('cart');
  getEl('close-cart')!.onclick = () => navigateTo('home');
  getEl('checkout-confirm-btn')!.onclick = () => navigateTo('success');
  getEl('return-home-btn')!.onclick = () => navigateTo('home');
  getEl('close-fav')?.addEventListener('click', () => navigateTo('home'));
  getEl('close-profile')?.addEventListener('click', () => navigateTo('home'));

  const addToCartBtn = getEl('add-to-cart-btn');
  const cartCountLabel = document.querySelector('.cart-count') as HTMLElement;
  if (addToCartBtn) {
    addToCartBtn.onclick = () => {
      cartCount++;
      if (cartCountLabel) cartCountLabel.innerText = cartCount.toString();
      const original = addToCartBtn.innerText;
      addToCartBtn.innerText = 'Added!';
      (addToCartBtn as HTMLElement).style.background = '#27ae60';
      setTimeout(() => {
        addToCartBtn.innerText = original;
        (addToCartBtn as HTMLElement).style.background = 'black';
        navigateTo('home');
      }, 1000);
    };
  }

  // Re-render grid on resize (laptop ↔ mobile switch)
  window.addEventListener('resize', renderGrid);

  updateFavBadge();
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  renderGrid();
}
