/* ==========================================
   PRODUCT DATASET
   ========================================== */
const products = [
  {
    id: "p1",
    name: "Velvet Rose & Oud",
    category: "floral",
    price: 999,
    scentNotes: "Top: Rose Petals | Heart: Smoked Oud | Base: Warm Amber",
    description: "A rich, opulent fragrance that combines the delicate sweetness of Damask rose with the deep, woody complexity of smoked oud. Perfect for romantic evenings and cozy gatherings.",
    badge: "Bestseller",
    color: "rgba(244, 63, 94, 0.15)", // pinkish rose glow
    label: "Velvet Rose"
  },
  {
    id: "p2",
    name: "Sandalwood & Cedar",
    category: "woody",
    price: 1199,
    scentNotes: "Top: Cedarwood | Heart: Creamy Sandalwood | Base: Musk",
    description: "An earthy, grounding blend of fine Australian sandalwood and sharp Himalayan cedarwood. Brings the calming essence of an ancient forest directly into your living space.",
    badge: "Trending",
    color: "rgba(180, 83, 9, 0.15)", // amber/woody glow
    label: "Cedarwood"
  },
  {
    id: "p3",
    name: "French Lavender & Vanilla",
    category: "floral",
    price: 899,
    scentNotes: "Top: Lavender Buds | Heart: Warm Vanilla | Base: Chamomile",
    description: "Relax your senses with the soothing properties of high-altitude French lavender, perfectly sweetened with creamy Madagascar vanilla beans. Ideal for your bedtime ritual.",
    badge: "Calming",
    color: "rgba(168, 85, 247, 0.15)", // lavender glow
    label: "Lavender"
  },
  {
    id: "p4",
    name: "Ocean Breeze & Sea Salt",
    category: "fresh",
    price: 949,
    scentNotes: "Top: Sea Salt | Heart: Driftwood | Base: Eucalyptus & Sage",
    description: "Crisp, clean, and rejuvenating. Ocean Breeze captures the refreshing atmosphere of a coastal escape, combining sea minerals with earthy sage and windswept driftwood.",
    badge: "Fresh",
    color: "rgba(14, 165, 233, 0.15)", // ocean blue glow
    label: "Ocean Salt"
  },
  {
    id: "p5",
    name: "Midnight Amber",
    category: "warm",
    price: 1199,
    scentNotes: "Top: Spiced Cardamom | Heart: Black Amber | Base: Vanilla Bean",
    description: "Our signature blend of deep black amber and exotic spices. An alluring, mysterious aroma that radiates warmth and creates a highly sophisticated environment.",
    badge: "Best Seller",
    color: "rgba(251, 146, 60, 0.2)", // warm gold/orange glow
    label: "Amber"
  },
  {
    id: "p6",
    name: "Eucalyptus & Mint",
    category: "fresh",
    price: 899,
    scentNotes: "Top: Fresh Mint | Heart: Eucalyptus Leaves | Base: Tea Tree",
    description: "An invigorating and clarifying fragrance designed to clear the mind and boost energy. Excellent for workspaces, bathrooms, and morning meditation sessions.",
    badge: "New",
    color: "rgba(34, 197, 94, 0.15)", // green mint glow
    label: "Eucalyptus"
  },
  {
    id: "p7",
    name: "Cinnamon & Orange Spice",
    category: "warm",
    price: 1049,
    scentNotes: "Top: Sweet Orange | Heart: Ground Cinnamon | Base: Nutmeg & Clove",
    description: "A cozy, comforting classic that evokes memories of festive holiday baking. Spiced orange peels and cinnamon bark blend perfectly to warm up cool autumn and winter nights.",
    badge: "Warm",
    color: "rgba(239, 68, 68, 0.15)", // red spice glow
    label: "Cinnamon"
  },
  {
    id: "p8",
    name: "Jasmine & White Peach",
    category: "floral",
    price: 999,
    scentNotes: "Top: White Peach | Heart: Star Jasmine | Base: Apricot Blossom",
    description: "A delicate and sparkling floral fragrance that blends the sweet aroma of wild blooming star jasmine blossoms with the juicy brightness of white peaches.",
    badge: "Delicate",
    color: "rgba(236, 72, 153, 0.15)", // jasmin glow
    label: "Jasmine"
  }
];

/* ==========================================
   CART STATE
   ========================================== */
let cart = [];

/* ==========================================
   DOM ELEMENTS
   ========================================== */
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');
const productsGrid = document.getElementById('productsGrid');
const filterTabs = document.getElementById('filterTabs');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const productModal = document.getElementById('productModal');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');
const modalInner = document.getElementById('modalInner');
const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const newsletterMsg = document.getElementById('newsletterMsg');
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');
const toast = document.getElementById('toast');

/* ==========================================
   APP INITIALIZATION & INITIAL RENDER
   ========================================== */
window.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  setupEventListeners();
  loadCartFromLocalStorage();
});

/* ==========================================
   EVENT LISTENERS
   ========================================== */
function setupEventListeners() {
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightNavLink();
  });

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close mobile menu on click link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  // Catalog Filtering
  filterTabs.addEventListener('click', (e) => {
    if (!e.target.classList.contains('filter-tab')) return;
    
    document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
    e.target.classList.add('active');
    
    const filterValue = e.target.getAttribute('data-filter');
    if (filterValue === 'all') {
      renderProducts(products);
    } else {
      const filtered = products.filter(p => p.category === filterValue);
      renderProducts(filtered);
    }
  });

  // Cart Drawer open/close
  cartBtn.addEventListener('click', toggleCart);
  closeCart.addEventListener('click', toggleCart);
  cartOverlay.addEventListener('click', toggleCart);

  // Modal open/close
  closeModal.addEventListener('click', hideModal);
  modalOverlay.addEventListener('click', hideModal);

  // Forms submissions
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (email) {
      newsletterMsg.textContent = "Thank you! Check your inbox for your 10% discount code.";
      newsletterMsg.style.color = "#34d399";
      emailInput.value = "";
      setTimeout(() => { newsletterMsg.textContent = ""; }, 5000);
    }
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactSuccess.textContent = "Message sent successfully! We will get back to you shortly.";
    contactForm.reset();
    setTimeout(() => { contactSuccess.textContent = ""; }, 5000);
  });
}

/* ==========================================
   RENDER CATALOG PRODUCTS
   ========================================== */
function renderProducts(productsList) {
  productsGrid.innerHTML = '';
  
  if (productsList.length === 0) {
    productsGrid.innerHTML = `
      <div class="glass-card" style="grid-column: 1/-1; padding: 3rem; text-align: center; color: var(--text-muted);">
        No candles found in this category.
      </div>
    `;
    return;
  }
  
  productsList.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card glass-card';
    card.innerHTML = `
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      <div class="product-visual" onclick="showProductDetails('${product.id}')" style="cursor: pointer;">
        <div class="showcase-glow" style="background: radial-gradient(circle, ${product.color} 0%, transparent 60%); width: 180px; height: 180px;"></div>
        <div class="flame-wrap sm" style="top: 25px;"><div class="flame sm"><div class="flame-inner"></div></div></div>
        <div class="card-candle">
          <div class="card-label">${product.label}</div>
          <div class="card-wax"></div>
        </div>
      </div>
      <div class="product-details">
        <div class="product-meta" onclick="showProductDetails('${product.id}')" style="cursor: pointer;">
          <h3>${product.name}</h3>
          <p class="product-scent">${product.scentNotes}</p>
        </div>
        <div class="product-purchase">
          <span class="product-price">₹${product.price}</span>
          <button class="btn-add-cart" onclick="addToCart('${product.id}')" aria-label="Add to cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

/* ==========================================
   CART OPERATIONS
   ========================================== */
function toggleCart() {
  cartSidebar.classList.toggle('active');
  cartOverlay.classList.toggle('active');
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      label: product.label,
      qty: 1
    });
  }
  
  saveCartToLocalStorage();
  updateCartUI();
  showToast(`"${product.name}" added to cart`);
}

// Global hook for the banner
window.addToCartById = function(productId) {
  addToCart(productId);
};

function changeQty(productId, amount) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;
  
  item.qty += amount;
  
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }
  
  saveCartToLocalStorage();
  updateCartUI();
}

function removeFromCart(productId) {
  const item = cart.find(i => i.id === productId);
  cart = cart.filter(item => item.id !== productId);
  saveCartToLocalStorage();
  updateCartUI();
  if (item) {
    showToast(`"${item.name}" removed from cart`);
  }
}

function updateCartUI() {
  // Update count badge
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalCount;
  
  // Show / Hide empty cart state
  if (cart.length === 0) {
    cartEmpty.style.display = 'flex';
    cartFooter.style.display = 'none';
    cartItemsContainer.style.innerHTML = '';
    // Empty list container
    while (cartItemsContainer.children.length > 1) {
      cartItemsContainer.removeChild(cartItemsContainer.lastChild);
    }
  } else {
    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'block';
    
    // Clear items (except the empty state element)
    const items = cartItemsContainer.querySelectorAll('.cart-item');
    items.forEach(el => el.remove());
    
    // Render current items
    cart.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <div class="cart-item-candle">
          <div class="cart-item-label">${item.label}</div>
        </div>
        <div class="cart-item-details">
          <div>
            <h4>${item.name}</h4>
            <span class="cart-item-price">₹${item.price}</span>
          </div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
            <button class="btn-remove" onclick="removeFromCart('${item.id}')">Remove</button>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(itemEl);
    });
  }
  
  // Update total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  cartTotal.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
}

function saveCartToLocalStorage() {
  localStorage.setItem('lumiere_cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
  const saved = localStorage.getItem('lumiere_cart');
  if (saved) {
    try {
      cart = JSON.parse(saved);
      updateCartUI();
    } catch (e) {
      cart = [];
    }
  }
}

/* ==========================================
   PRODUCT DETAILS MODAL
   ========================================== */
function showProductDetails(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  modalInner.innerHTML = `
    <div class="modal-visual">
      <div class="showcase-glow" style="background: radial-gradient(circle, ${product.color} 0%, transparent 60%); width: 220px; height: 220px;"></div>
      <div class="flame-wrap" style="top: 25px;"><div class="flame"><div class="flame-inner"></div></div></div>
      <div class="modal-candle">
        <div class="modal-label">${product.label}</div>
        <div class="modal-wax"></div>
      </div>
    </div>
    <div class="modal-details">
      <h2 class="modal-title">${product.name}</h2>
      <div class="modal-price">₹${product.price}</div>
      <div class="modal-scent-notes">
        <strong>Scent Profile</strong>
        <span>${product.scentNotes}</span>
      </div>
      <p class="modal-desc">${product.description}</p>
      <button class="btn-primary" onclick="addToCart('${product.id}'); hideModal();" style="align-self: flex-start; margin-top: 1rem;">Add to Cart</button>
    </div>
  `;
  
  productModal.classList.add('active');
  modalOverlay.classList.add('active');
}

function hideModal() {
  productModal.classList.remove('active');
  modalOverlay.classList.remove('active');
}

/* ==========================================
   TOAST NOTIFICATION SYSTEM
   ========================================== */
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ==========================================
   SCROLL ACTIVE NAVIGATION HIGHLIGHT
   ========================================== */
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;
  
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);
    
    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
}
