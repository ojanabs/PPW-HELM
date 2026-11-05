/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Aplikasi Utama OJANK HELMET (app.js)
 * Sesuai arsitektur.md, instruction.md, dan prd.md:
 * - ES modules murni tanpa framework
 * - Penggabungan pencarian & filter kategori/merek
 * - Render aman anti-XSS (textContent & DOM API)
 * - Modal detail produk yang aksesibel
 * - Drawer keranjang interaktif dengan stepper 1-99
 * - Validasi formulir pembeli & pengajuan draf WhatsApp
 */

import { STORE_CONFIG } from './config.js';
import { PRODUCTS, CATEGORIES, BRANDS, getProductById } from './data.js';
import { cart, formatIDR } from './cart.js';
import { 
  validateCustomerForm, 
  generateWhatsAppMessage, 
  buildWhatsAppLink, 
  isStoreWhatsAppConfigured 
} from './checkout.js';

/* ==========================================================================
   State Aplikasi
   ========================================================================== */
const state = {
  searchQuery: '',
  selectedCategory: 'all',
  selectedBrand: 'Semua Merek',
  selectedProductForModal: null,
  isCartOpen: false,
  formErrors: {}
};

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'status');

  const textSpan = document.createElement('span');
  textSpan.textContent = message;
  toast.appendChild(textSpan);

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Tutup pemberitahuan');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.fontSize = '1.25rem';
  closeBtn.style.lineHeight = '1';
  closeBtn.style.cursor = 'pointer';
  closeBtn.onclick = () => toast.remove();
  toast.appendChild(closeBtn);

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

/* ==========================================================================
   Filter & Search Logic
   ========================================================================== */
function getFilteredProducts() {
  const query = state.searchQuery.toLowerCase().trim();

  return PRODUCTS.filter(product => {
    // Filter Kategori
    if (state.selectedCategory !== 'all' && product.category !== state.selectedCategory) {
      return false;
    }

    // Filter Merek
    if (state.selectedBrand !== 'Semua Merek' && product.brand.toLowerCase() !== state.selectedBrand.toLowerCase()) {
      return false;
    }

    // Pencarian Teks (Nama atau Merek)
    if (query) {
      const matchName = product.name.toLowerCase().includes(query);
      const matchBrand = product.brand.toLowerCase().includes(query);
      const matchDesc = product.description.toLowerCase().includes(query);
      if (!matchName && !matchBrand && !matchDesc) {
        return false;
      }
    }

    return true;
  });
}

/* ==========================================================================
   Render: Katalog Produk
   ========================================================================== */
function renderCatalog() {
  const gridContainer = document.getElementById('product-grid');
  const countEl = document.getElementById('results-count');
  const resetBtn = document.getElementById('reset-filters-btn');
  if (!gridContainer) return;

  const filtered = getFilteredProducts();

  // Perbarui indikator hasil
  if (countEl) {
    countEl.textContent = `${filtered.length} produk ditemukan`;
  }

  // Tampilkan tombol reset jika ada filter aktif
  const hasActiveFilters = state.searchQuery !== '' || state.selectedCategory !== 'all' || state.selectedBrand !== 'Semua Merek';
  if (resetBtn) {
    resetBtn.style.display = hasActiveFilters ? 'inline-block' : 'none';
  }

  // Bersihkan kontainer
  gridContainer.innerHTML = '';

  // Keadaan kosong (Empty State)
  if (filtered.length === 0) {
    const emptyWrapper = document.createElement('div');
    emptyWrapper.className = 'empty-state';
    emptyWrapper.style.gridColumn = '1 / -1';

    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    iconSvg.setAttribute('viewBox', '0 0 24 24');
    iconSvg.setAttribute('fill', 'none');
    iconSvg.setAttribute('stroke', 'currentColor');
    iconSvg.setAttribute('stroke-width', '2');
    iconSvg.setAttribute('stroke-linecap', 'round');
    iconSvg.setAttribute('stroke-linejoin', 'round');
    iconSvg.classList.add('empty-state-icon');
    iconSvg.innerHTML = '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>';

    const titleEl = document.createElement('h3');
    titleEl.className = 'empty-state-title';
    titleEl.textContent = 'Produk tidak ditemukan';

    const textEl = document.createElement('p');
    textEl.className = 'empty-state-text';
    textEl.textContent = 'Coba kata lain atau atur ulang filter untuk melihat seluruh helm premium.';

    const actionBtn = document.createElement('button');
    actionBtn.type = 'button';
    actionBtn.className = 'btn-primary';
    actionBtn.textContent = 'Atur Ulang Filter';
    actionBtn.onclick = resetFilters;

    emptyWrapper.appendChild(iconSvg);
    emptyWrapper.appendChild(titleEl);
    emptyWrapper.appendChild(textEl);
    emptyWrapper.appendChild(actionBtn);

    gridContainer.appendChild(emptyWrapper);
    return;
  }

  // Render kartu produk
  filtered.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);

    // Media Wrapper
    const mediaDiv = document.createElement('div');
    mediaDiv.className = 'card-media-wrapper';

    const img = document.createElement('img');
    img.className = 'card-img';
    img.src = product.image;
    img.alt = product.imageAlt || product.name;
    img.loading = 'lazy';
    img.referrerPolicy = 'no-referrer';

    // Resilient fallback image policy
    img.onerror = () => {
      mediaDiv.innerHTML = '';
      const fallbackDiv = document.createElement('div');
      fallbackDiv.className = 'img-fallback';
      fallbackDiv.innerHTML = `
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <circle cx="9" cy="9" r="2"/>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
        <span>${product.brand} - ${product.name}</span>
      `;
      mediaDiv.appendChild(fallbackDiv);
    };

    mediaDiv.appendChild(img);
    card.appendChild(mediaDiv);

    // Card Body
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'card-body';

    // Meta line (Zero-Pill: unboxed text with dot)
    const metaLine = document.createElement('div');
    metaLine.className = 'card-meta-line';
    
    const brandSpan = document.createElement('span');
    brandSpan.textContent = product.brand;
    
    const sepSpan = document.createElement('span');
    sepSpan.className = 'meta-separator';
    sepSpan.textContent = '·';
    
    const catSpan = document.createElement('span');
    const catObj = CATEGORIES.find(c => c.id === product.category);
    catSpan.textContent = catObj ? catObj.label : product.category;

    metaLine.appendChild(brandSpan);
    metaLine.appendChild(sepSpan);
    metaLine.appendChild(catSpan);
    bodyDiv.appendChild(metaLine);

    // Product Title
    const titleEl = document.createElement('h3');
    titleEl.className = 'card-product-name';
    titleEl.textContent = product.name;
    bodyDiv.appendChild(titleEl);

    // Description preview
    const descEl = document.createElement('p');
    descEl.className = 'card-description';
    descEl.textContent = product.description;
    bodyDiv.appendChild(descEl);

    // Specs Preview
    const specsDiv = document.createElement('div');
    specsDiv.className = 'card-specs-preview';

    const specRow1 = document.createElement('div');
    specRow1.className = 'spec-line';
    specRow1.innerHTML = `<span class="spec-key">Bahan:</span> <span class="spec-val">${product.specification.material.split('(')[0]}</span>`;
    
    const specRow2 = document.createElement('div');
    specRow2.className = 'spec-line';
    specRow2.innerHTML = `<span class="spec-key">Standar:</span> <span class="spec-val">${product.specification.certification}</span>`;

    specsDiv.appendChild(specRow1);
    specsDiv.appendChild(specRow2);
    bodyDiv.appendChild(specsDiv);

    // Card Footer (Price & Actions)
    const footerDiv = document.createElement('div');
    footerDiv.className = 'card-footer';

    const priceRow = document.createElement('div');
    priceRow.className = 'card-price-row';
    priceRow.innerHTML = `
      <span class="price-label">Harga Resmi</span>
      <span class="card-price tabular-nums">${formatIDR(product.price)}</span>
    `;
    footerDiv.appendChild(priceRow);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'card-actions';

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'btn-add-cart';
    addBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
      <span>+ Keranjang</span>
    `;
    addBtn.onclick = () => {
      const res = cart.addItem(product.id, 1);
      if (res.success) {
        showToast(res.message, 'success');
      } else {
        showToast(res.message, 'error');
      }
    };

    const detailBtn = document.createElement('button');
    detailBtn.type = 'button';
    detailBtn.className = 'btn-detail';
    detailBtn.textContent = 'Detail';
    detailBtn.onclick = () => openProductModal(product);

    actionsDiv.appendChild(addBtn);
    actionsDiv.appendChild(detailBtn);
    footerDiv.appendChild(actionsDiv);

    bodyDiv.appendChild(footerDiv);
    card.appendChild(bodyDiv);
    gridContainer.appendChild(card);
  });
}

/* ==========================================================================
   Render: Category Tabs & Brand Dropdown
   ========================================================================== */
function renderCategoryTabs() {
  const tabsContainer = document.getElementById('category-tabs');
  if (!tabsContainer) return;

  tabsContainer.innerHTML = '';

  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `tab-btn ${state.selectedCategory === cat.id ? 'active' : ''}`;
    btn.textContent = cat.label;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', state.selectedCategory === cat.id ? 'true' : 'false');
    btn.onclick = () => {
      state.selectedCategory = cat.id;
      renderCategoryTabs();
      renderCatalog();
    };
    tabsContainer.appendChild(btn);
  });
}

function initBrandSelect() {
  const select = document.getElementById('brand-select');
  if (!select) return;

  select.innerHTML = '';
  BRANDS.forEach(brand => {
    const opt = document.createElement('option');
    opt.value = brand;
    opt.textContent = brand;
    select.appendChild(opt);
  });

  select.onchange = (e) => {
    state.selectedBrand = e.target.value;
    renderCatalog();
  };
}

function resetFilters() {
  state.searchQuery = '';
  state.selectedCategory = 'all';
  state.selectedBrand = 'Semua Merek';

  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';

  const brandSelect = document.getElementById('brand-select');
  if (brandSelect) brandSelect.value = 'Semua Merek';

  renderCategoryTabs();
  renderCatalog();
}

/* ==========================================================================
   Product Modal Logic
   ========================================================================== */
function openProductModal(product) {
  state.selectedProductForModal = product;
  const modal = document.getElementById('product-modal');
  if (!modal) return;

  const titleEl = document.getElementById('modal-product-title');
  const priceEl = document.getElementById('modal-product-price');
  const descEl = document.getElementById('modal-product-desc');
  const brandEl = document.getElementById('modal-product-brand');
  const imgEl = document.getElementById('modal-product-img');
  const specsList = document.getElementById('modal-specs-list');

  if (titleEl) titleEl.textContent = product.name;
  if (priceEl) priceEl.textContent = formatIDR(product.price);
  if (descEl) descEl.textContent = product.description;
  if (brandEl) brandEl.textContent = `${product.brand} · ${product.category.toUpperCase()}`;

  if (imgEl) {
    imgEl.src = product.image;
    imgEl.alt = product.imageAlt || product.name;
  }

  if (specsList && product.specification) {
    specsList.innerHTML = `
      <div class="modal-spec-row"><span class="spec-key">Bahan Cangkang:</span> <span class="spec-val">${product.specification.material}</span></div>
      <div class="modal-spec-row"><span class="spec-key">Bobot Rata-rata:</span> <span class="spec-val">${product.specification.weight}</span></div>
      <div class="modal-spec-row"><span class="spec-key">Sertifikasi Keamanan:</span> <span class="spec-val">${product.specification.certification}</span></div>
      <div class="modal-spec-row"><span class="spec-key">Tipe Visor:</span> <span class="spec-val">${product.specification.visor}</span></div>
      <div class="modal-spec-row"><span class="spec-key">Tali Pengunci:</span> <span class="spec-val">${product.specification.retention}</span></div>
      <div class="modal-spec-row"><span class="spec-key">Ventilasi Udara:</span> <span class="spec-val">${product.specification.ventilation}</span></div>
      <div class="modal-spec-row"><span class="spec-key">Pilihan Ukuran:</span> <span class="spec-val">${product.specification.sizes.join(', ')}</span></div>
    `;
  }

  // Hook Add to cart button inside modal
  const modalAddBtn = document.getElementById('modal-add-btn');
  if (modalAddBtn) {
    modalAddBtn.onclick = () => {
      const res = cart.addItem(product.id, 1);
      if (res.success) {
        showToast(res.message, 'success');
        closeProductModal();
      } else {
        showToast(res.message, 'error');
      }
    };
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  state.selectedProductForModal = null;
  document.body.style.overflow = '';
}

/* ==========================================================================
   Cart Drawer & Checkout Form Logic
   ========================================================================== */
function toggleCart(forceState) {
  const drawerOverlay = document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (!drawer || !drawerOverlay) return;

  state.isCartOpen = forceState !== undefined ? forceState : !state.isCartOpen;

  if (state.isCartOpen) {
    drawerOverlay.classList.add('open');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  } else {
    drawerOverlay.classList.remove('open');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/**
 * Render pembaruan Keranjang Belanja secara reaktif
 */
function renderCartView(cartState) {
  // Update Header Badges
  const badgeEls = document.querySelectorAll('.cart-badge-count');
  badgeEls.forEach(el => {
    el.textContent = cartState.totalCount.toString();
  });

  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalEl = document.getElementById('cart-subtotal-val');
  const cartTotalEl = document.getElementById('cart-total-val');
  const cartNoticeEl = document.getElementById('cart-storage-notice');
  const checkoutSubmitBtn = document.getElementById('btn-submit-order');

  if (!cartItemsContainer) return;

  // Tampilkan peringatan jika storage gagal
  if (cartNoticeEl) {
    if (cartState.storageNotice) {
      cartNoticeEl.textContent = cartState.storageNotice;
      cartNoticeEl.style.display = 'block';
    } else {
      cartNoticeEl.style.display = 'none';
    }
  }

  // Update Total Nilai
  if (cartSubtotalEl) cartSubtotalEl.textContent = cartState.totalFormatted;
  if (cartTotalEl) cartTotalEl.textContent = cartState.totalFormatted;

  // Konfigurasi tombol WhatsApp
  if (checkoutSubmitBtn) {
    const isConfigured = isStoreWhatsAppConfigured();
    if (!isConfigured) {
      checkoutSubmitBtn.disabled = true;
      checkoutSubmitBtn.textContent = 'WhatsApp Toko Belum Dikonfigurasi';
    } else if (cartState.isEmpty) {
      checkoutSubmitBtn.disabled = true;
      checkoutSubmitBtn.textContent = 'Keranjang Masih Kosong';
    } else {
      checkoutSubmitBtn.disabled = false;
      checkoutSubmitBtn.textContent = 'Lanjutkan Pesanan via WhatsApp';
    }
  }

  // Jika Keranjang Kosong
  if (cartState.isEmpty) {
    cartItemsContainer.innerHTML = `
      <div class="empty-state" style="padding: 2.5rem 1rem;">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
        </svg>
        <p class="empty-state-title" style="font-size: 1.05rem;">Keranjang Masih Kosong</p>
        <p class="empty-state-text" style="font-size: 0.85rem;">Pilih helm impian Anda untuk mulai menyusun pesanan.</p>
        <button type="button" class="btn-secondary" style="margin-top: 0.5rem;" id="cart-browse-btn">Lihat Koleksi Helm</button>
      </div>
    `;
    const browseBtn = document.getElementById('cart-browse-btn');
    if (browseBtn) {
      browseBtn.onclick = () => {
        toggleCart(false);
        const catalogSec = document.getElementById('katalog');
        if (catalogSec) catalogSec.scrollIntoView({ behavior: 'smooth' });
      };
    }
    return;
  }

  // Render Baris Produk
  cartItemsContainer.innerHTML = '';
  cartState.items.forEach(item => {
    const itemCard = document.createElement('div');
    itemCard.className = 'cart-item-card';

    // Thumbnail
    const thumbDiv = document.createElement('div');
    thumbDiv.className = 'cart-item-thumb';
    const thumbImg = document.createElement('img');
    thumbImg.className = 'cart-item-img';
    thumbImg.src = item.product.image;
    thumbImg.alt = item.product.name;
    thumbDiv.appendChild(thumbImg);
    itemCard.appendChild(thumbDiv);

    // Detail & Kontrol
    const detailDiv = document.createElement('div');
    detailDiv.className = 'cart-item-details';

    const brandSpan = document.createElement('span');
    brandSpan.className = 'cart-item-brand';
    brandSpan.textContent = item.product.brand;

    const titleEl = document.createElement('h4');
    titleEl.className = 'cart-item-title';
    titleEl.textContent = item.product.name;

    const unitPriceEl = document.createElement('div');
    unitPriceEl.className = 'cart-item-unit-price tabular-nums';
    unitPriceEl.textContent = `${formatIDR(item.product.price)} / unit`;

    // Actions & Stepper
    const actionsRow = document.createElement('div');
    actionsRow.className = 'cart-item-actions-row';

    // Quantity Stepper
    const stepper = document.createElement('div');
    stepper.className = 'qty-stepper';

    const decBtn = document.createElement('button');
    decBtn.type = 'button';
    decBtn.className = 'qty-btn';
    decBtn.setAttribute('aria-label', `Kurangi jumlah ${item.product.name}`);
    decBtn.textContent = '−';
    decBtn.disabled = item.quantity <= 1;
    decBtn.onclick = () => {
      const res = cart.updateQuantity(item.product.id, item.quantity - 1);
      if (!res.success) showToast(res.message, 'error');
    };

    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.className = 'qty-input tabular-nums';
    qtyInput.value = item.quantity.toString();
    qtyInput.min = '1';
    qtyInput.max = '99';
    qtyInput.setAttribute('aria-label', `Jumlah untuk ${item.product.name}`);

    qtyInput.onchange = (e) => {
      const val = parseInt(e.target.value, 10);
      if (isNaN(val) || val < 1 || val > 99) {
        showToast('Masukkan jumlah produk antara 1 dan 99.', 'error');
        e.target.value = item.quantity.toString();
        return;
      }
      const res = cart.updateQuantity(item.product.id, val);
      if (!res.success) {
        showToast(res.message, 'error');
        e.target.value = item.quantity.toString();
      }
    };

    const incBtn = document.createElement('button');
    incBtn.type = 'button';
    incBtn.className = 'qty-btn';
    incBtn.setAttribute('aria-label', `Tambah jumlah ${item.product.name}`);
    incBtn.textContent = '+';
    incBtn.disabled = item.quantity >= 99;
    incBtn.onclick = () => {
      const res = cart.updateQuantity(item.product.id, item.quantity + 1);
      if (!res.success) showToast(res.message, 'error');
    };

    stepper.appendChild(decBtn);
    stepper.appendChild(qtyInput);
    stepper.appendChild(incBtn);

    const subtotalEl = document.createElement('span');
    subtotalEl.className = 'cart-item-subtotal tabular-nums';
    subtotalEl.textContent = item.subtotalFormatted;

    actionsRow.appendChild(stepper);
    actionsRow.appendChild(subtotalEl);

    // Remove Item Link
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'cart-item-remove-btn';
    removeBtn.textContent = 'Hapus';
    removeBtn.onclick = () => {
      cart.removeItem(item.product.id);
      showToast(`${item.product.name} dihapus dari keranjang.`, 'info');
    };

    detailDiv.appendChild(brandSpan);
    detailDiv.appendChild(titleEl);
    detailDiv.appendChild(unitPriceEl);
    detailDiv.appendChild(actionsRow);
    detailDiv.appendChild(removeBtn);

    itemCard.appendChild(detailDiv);
    cartItemsContainer.appendChild(itemCard);
  });
}

/* ==========================================================================
   Checkout & WhatsApp Form Submission
   ========================================================================== */
function handleOrderSubmit(e) {
  if (e) e.preventDefault();

  const cartState = cart.getState();
  if (cartState.isEmpty) {
    showToast('Keranjang masih kosong. Pilih helm terlebih dahulu.', 'error');
    return;
  }

  const nameInput = document.getElementById('customer-name');
  const phoneInput = document.getElementById('customer-phone');
  const notesInput = document.getElementById('customer-notes');
  const nameErrorEl = document.getElementById('name-error');
  const phoneErrorEl = document.getElementById('phone-error');

  const customerName = nameInput ? nameInput.value : '';
  const customerPhone = phoneInput ? phoneInput.value : '';
  const customerNotes = notesInput ? notesInput.value : '';

  // Validasi form
  const validation = validateCustomerForm(customerName, customerPhone);

  if (nameErrorEl) {
    if (validation.errors.name) {
      nameErrorEl.textContent = validation.errors.name;
      nameInput.classList.add('has-error');
    } else {
      nameErrorEl.textContent = '';
      nameInput.classList.remove('has-error');
    }
  }

  if (phoneErrorEl) {
    if (validation.errors.phone) {
      phoneErrorEl.textContent = validation.errors.phone;
      phoneInput.classList.add('has-error');
    } else {
      phoneErrorEl.textContent = '';
      phoneInput.classList.remove('has-error');
    }
  }

  if (!validation.isValid) {
    // Fokus ke field pertama yang bermasalah sesuai SOP
    if (validation.errors.name && nameInput) {
      nameInput.focus();
    } else if (validation.errors.phone && phoneInput) {
      phoneInput.focus();
    }
    showToast('Mohon lengkapi formulir kontak dengan benar.', 'error');
    return;
  }

  // Bentuk pesan dan tautan WhatsApp
  const message = generateWhatsAppMessage(customerName, customerPhone, customerNotes);
  const waUrl = buildWhatsAppLink(message);

  if (!waUrl) {
    showToast('Nomor WhatsApp toko belum aktif. Silakan hubungi langsung via email/telepon.', 'error');
    return;
  }

  // Buka tautan WhatsApp di tab baru dengan rel safe
  window.open(waUrl, '_blank', 'noopener,noreferrer');

  showToast('Draf pemesanan dibuka di WhatsApp. Silakan tekan tombol Kirim untuk konfirmasi pesanan.', 'success');
}

/* ==========================================================================
   Inisialisasi Event Listener
   ========================================================================== */
function initEventListeners() {
  // Search Input Handler (Live Filter)
  const searchInput = document.getElementById('search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = state.searchQuery ? 'flex' : 'none';
      }
      renderCatalog();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        state.searchQuery = '';
        searchClearBtn.style.display = 'none';
        renderCatalog();
        searchInput.focus();
      }
    });
  }

  // Reset Filters Button
  const resetBtn = document.getElementById('reset-filters-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetFilters);
  }

  // Cart Drawer Toggles
  const openCartBtns = document.querySelectorAll('.cart-open-btn');
  openCartBtns.forEach(btn => {
    btn.addEventListener('click', () => toggleCart(true));
  });

  const closeCartBtn = document.getElementById('cart-close-btn');
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => toggleCart(false));
  }

  const drawerOverlay = document.getElementById('cart-drawer-overlay');
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', () => toggleCart(false));
  }

  // Modal Close
  const modalCloseBtn = document.getElementById('modal-close-btn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProductModal);
  }

  const modalOverlay = document.getElementById('product-modal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProductModal();
    });
  }

  // Keyboard navigation: Escape key closes modal & drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (state.selectedProductForModal) {
        closeProductModal();
      } else if (state.isCartOpen) {
        toggleCart(false);
      }
    }
  });

  // Order Submission Form
  const orderForm = document.getElementById('customer-order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', handleOrderSubmit);
  }

  // Hubungkan store configuration ke elemen DOM teks
  const storeNameEls = document.querySelectorAll('.bind-store-name');
  storeNameEls.forEach(el => el.textContent = STORE_CONFIG.storeName);

  const phoneEls = document.querySelectorAll('.bind-store-phone');
  phoneEls.forEach(el => el.textContent = STORE_CONFIG.displayPhone);

  const emailEls = document.querySelectorAll('.bind-store-email');
  emailEls.forEach(el => el.textContent = STORE_CONFIG.email);

  const addressEls = document.querySelectorAll('.bind-store-address');
  addressEls.forEach(el => el.textContent = STORE_CONFIG.address);

  const hoursEls = document.querySelectorAll('.bind-store-hours');
  hoursEls.forEach(el => el.textContent = STORE_CONFIG.operationalHours);
}

/* ==========================================================================
   Bootstrapping
   ========================================================================== */
function bootstrap() {
  initBrandSelect();
  renderCategoryTabs();
  renderCatalog();
  initEventListeners();

  // Subscribe cart changes to update UI
  cart.subscribe(renderCartView);
}

// Jalankan ketika DOM siap
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
