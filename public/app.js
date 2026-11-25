const IMAGE = {
  hero: '/manus-storage/async-images/JFg76RZg3MHpDuNQtqq7B3/image-1.webp',
  staples: '/manus-storage/async-images/JFg76RZg3MHpDuNQtqq7B3/image-2.webp',
  produce: '/manus-storage/async-images/JFg76RZg3MHpDuNQtqq7B3/image-3.webp',
  pantry: '/manus-storage/async-images/JFg76RZg3MHpDuNQtqq7B3/image-4.webp',
  dairy: '/manus-storage/async-images/JFg76RZg3MHpDuNQtqq7B3/image-4.webp',
  snacks: '/manus-storage/async-images/JFg76RZg3MHpDuNQtqq7B3/image-4.webp'
};

const products = [
  { id: 'rice-miniket', name: 'মিনিকেট চাল', category: 'staples', unit: '৫ কেজি', price: 390, image: IMAGE.staples, tag: 'দৈনন্দিন' },
  { id: 'mung-dal', name: 'মুগ ডাল', category: 'staples', unit: '১ কেজি', price: 145, image: IMAGE.staples, tag: 'স্থানীয় পছন্দ' },
  { id: 'potato', name: 'দেশি আলু', category: 'produce', unit: '১ কেজি', price: 40, image: IMAGE.produce, tag: 'তাজা' },
  { id: 'tomato', name: 'পাকা টমেটো', category: 'produce', unit: '১ কেজি', price: 55, image: IMAGE.produce, tag: 'তাজা' },
  { id: 'onion', name: 'দেশি পেঁয়াজ', category: 'produce', unit: '১ কেজি', price: 65, image: IMAGE.produce, tag: 'স্থানীয় পছন্দ' },
  { id: 'soybean-oil', name: 'সয়াবিন তেল', category: 'pantry', unit: '১ লিটার', price: 165, image: IMAGE.pantry, tag: 'রান্নাঘরের দরকার' },
  { id: 'eggs', name: 'খামারের ডিম', category: 'dairy', unit: '১২টি', price: 150, image: IMAGE.dairy, tag: 'দৈনন্দিন' },
  { id: 'tea', name: 'চা পাতা', category: 'snacks', unit: '২০০ গ্রাম', price: 120, image: IMAGE.snacks, tag: 'চায়ের আড্ডা' }
];

const categoryLabels = { staples: 'চাল ও ডাল', produce: 'শাক-সবজি', pantry: 'তেল ও মসলা', dairy: 'ডিম ও দুধ', snacks: 'চা ও নাস্তা' };
const bnDigits = '০১২৩৪৫৬৭৮৯';
const toBn = (value) => String(value).replace(/\d/g, (digit) => bnDigits[Number(digit)]);
const money = (value) => `৳${toBn(Number(value).toLocaleString('en-US'))}`;
const storageKey = 'mujibazar-cart-v1';
let cart = loadCart();
let selectedCategory = 'all';
let searchTerm = '';
let toastTimer;

const productGrid = document.getElementById('productGrid');
const resultLine = document.getElementById('resultLine');
const emptyState = document.getElementById('emptyState');
const cartDialog = document.getElementById('cartDialog');
const checkoutDialog = document.getElementById('checkoutDialog');

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    return saved && typeof saved === 'object' ? saved : {};
  } catch {
    return {};
  }
}

function saveCart() {
  try { localStorage.setItem(storageKey, JSON.stringify(cart)); } catch { /* Cart remains usable for this visit. */ }
}

function visibleProducts() {
  const term = searchTerm.trim().toLocaleLowerCase('bn-BD');
  return products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const haystack = `${product.name} ${categoryLabels[product.category] || ''} ${product.unit}`.toLocaleLowerCase('bn-BD');
    return matchesCategory && (!term || haystack.includes(term));
  });
}

function renderProducts() {
  const list = visibleProducts();
  productGrid.innerHTML = list.map((product) => `
    <article class="product-card">
      <div class="product-photo">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <span class="product-tag">${product.tag}</span>
      </div>
      <div class="product-info">
        <span class="product-store"><i class="store-dot"></i> স্থানীয় দোকান</span>
        <h3>${product.name}</h3>
        <span class="product-unit">${product.unit}</span>
        <div class="product-bottom">
          <strong class="product-price">${money(product.price)}<small>নমুনা দাম</small></strong>
          <button class="add-button" type="button" data-add="${product.id}" aria-label="${product.name} কার্টে যোগ করুন"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>কার্টে রাখুন</button>
        </div>
      </div>
    </article>
  `).join('');
  const count = toBn(list.length);
  resultLine.textContent = searchTerm || selectedCategory !== 'all'
    ? `${count}টি পণ্য দেখানো হচ্ছে${searchTerm ? ` — “${searchTerm}”` : ''}`
    : 'দোকানভেদে দাম ও প্রাপ্যতা যাচাই করে নিন।';
  emptyState.hidden = list.length !== 0;
  productGrid.hidden = list.length === 0;
}

function cartEntries() {
  return Object.entries(cart)
    .map(([id, quantity]) => ({ product: products.find((item) => item.id === id), quantity: Number(quantity) }))
    .filter((entry) => entry.product && entry.quantity > 0);
}

function cartQuantity() {
  return cartEntries().reduce((total, entry) => total + entry.quantity, 0);
}

function cartSubtotal() {
  return cartEntries().reduce((total, entry) => total + entry.product.price * entry.quantity, 0);
}

function updateCartCount() {
  const quantity = cartQuantity();
  document.getElementById('cartCount').textContent = toBn(quantity);
  document.getElementById('mobileCartCount').textContent = toBn(quantity);
  document.getElementById('mobileCartTotal').textContent = money(cartSubtotal());
  document.getElementById('mobileCartBar').classList.toggle('is-empty', quantity === 0);
}

function renderCart() {
  const entries = cartEntries();
  const cartBody = document.getElementById('cartBody');
  const cartFooter = document.getElementById('cartFooter');
  if (!entries.length) {
    cartBody.innerHTML = '<div class="cart-empty">🛒<b>আপনার কার্ট এখনো খালি</b>পছন্দের পণ্য যোগ করে কার্ট সাজান।</div>';
    cartFooter.innerHTML = '<p class="cart-footnote">দামগুলো নমুনা। পণ্যের প্রাপ্যতা দোকানের সাথে যাচাই করুন।</p><button class="button button-green cart-checkout" disabled>আগে পণ্য বাছাই করুন</button>';
    return;
  }
  cartBody.innerHTML = entries.map(({ product, quantity }) => `
    <div class="cart-row">
      <img src="${product.image}" alt="" />
      <div><div class="cart-row-name">${product.name}</div><span class="cart-row-price">${money(product.price)} / ${product.unit}</span></div>
      <div class="quantity-control" aria-label="${product.name} পরিমাণ">
        <button type="button" data-quantity="${product.id}" data-delta="-1" aria-label="একটি কমান">−</button>
        <span>${toBn(quantity)}</span>
        <button type="button" data-quantity="${product.id}" data-delta="1" aria-label="একটি বাড়ান">+</button>
      </div>
    </div>
  `).join('');
  cartFooter.innerHTML = `<div class="cart-total-line"><span>পণ্যের মোট (${toBn(cartQuantity())}টি)</span><strong>${money(cartSubtotal())}</strong></div><div class="cart-total-line"><span>ডেলিভারি</span><span>দোকানের সাথে যাচাই হবে</span></div><div class="cart-total-line total"><span>পণ্যের মোট</span><strong>${money(cartSubtotal())}</strong></div><p class="cart-footnote">নমুনা দাম—দোকানভেদে বদলাতে পারে। checkout এখন ডেমো; তথ্য কোথাও পাঠানো হয় না।</p><button class="button button-green cart-checkout" id="startCheckout" type="button">ডেলিভারির তথ্য দিন <span aria-hidden="true">→</span></button>`;
  document.getElementById('startCheckout').addEventListener('click', openCheckout);
}

function refreshCart() {
  saveCart();
  updateCartCount();
  if (cartDialog.open) renderCart();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function openCart() {
  renderCart();
  if (!cartDialog.open) cartDialog.showModal();
}

function openCheckout() {
  if (!cartEntries().length) return;
  cartDialog.close();
  document.getElementById('checkoutSummary').innerHTML = `কার্টে ${toBn(cartQuantity())}টি পণ্য · পণ্যের মোট <strong>${money(cartSubtotal())}</strong><br />ডেলিভারি খরচ দোকানের সাথে যাচাই হবে।`;
  document.getElementById('checkoutSuccess').hidden = true;
  document.getElementById('checkoutForm').querySelector('.checkout-submit').hidden = false;
  if (!checkoutDialog.open) checkoutDialog.showModal();
}

document.getElementById('categoryList').addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  selectedCategory = button.dataset.category;
  document.querySelectorAll('.category-chip').forEach((chip) => chip.classList.toggle('active', chip === button));
  renderProducts();
  document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

productGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-add]');
  if (!button) return;
  const product = products.find((item) => item.id === button.dataset.add);
  if (!product) return;
  cart[product.id] = (Number(cart[product.id]) || 0) + 1;
  refreshCart();
  showToast(`${product.name} কার্টে যোগ হয়েছে`);
});

document.getElementById('cartBody').addEventListener('click', (event) => {
  const button = event.target.closest('[data-quantity]');
  if (!button) return;
  const id = button.dataset.quantity;
  const next = (Number(cart[id]) || 0) + Number(button.dataset.delta);
  if (next > 0) cart[id] = next;
  else delete cart[id];
  refreshCart();
});

document.getElementById('searchForm').addEventListener('submit', (event) => {
  event.preventDefault();
  searchTerm = document.getElementById('searchInput').value.trim();
  renderProducts();
  document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.getElementById('searchInput').addEventListener('input', (event) => {
  if (!event.target.value.trim() && searchTerm) {
    searchTerm = '';
    renderProducts();
  }
});

document.getElementById('resetFilters').addEventListener('click', () => {
  selectedCategory = 'all';
  searchTerm = '';
  document.getElementById('searchInput').value = '';
  document.querySelectorAll('.category-chip').forEach((chip) => chip.classList.toggle('active', chip.dataset.category === 'all'));
  renderProducts();
});

document.getElementById('openCart').addEventListener('click', openCart);
document.getElementById('mobileOpenCart').addEventListener('click', openCart);
document.querySelectorAll('.close-dialog').forEach((button) => button.addEventListener('click', () => button.closest('dialog').close()));
[cartDialog, checkoutDialog].forEach((dialog) => dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
}));

document.getElementById('checkoutForm').addEventListener('submit', (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  const success = document.getElementById('checkoutSuccess');
  success.innerHTML = '<strong>ডেমো checkout সম্পন্ন হয়েছে।</strong><br />আপনার তথ্য কোথাও পাঠানো বা সংরক্ষণ করা হয়নি। বাস্তব অর্ডারের জন্য দোকানের সাথে সরাসরি যোগাযোগ বা সক্রিয় backend দরকার।';
  success.hidden = false;
  event.currentTarget.querySelector('.checkout-submit').hidden = true;
});

renderProducts();
updateCartCount();
