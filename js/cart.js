/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modul Keranjang Belanja (cart.js)
 * Sesuai arsitektur.md & prd.md:
 * - State tunggal dalam memori
 * - Menghitung subtotal & total dari harga katalog terkini (bukan DOM / storage)
 * - Format uang via Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })
 * - Mengembalikan state kaya untuk render UI
 */

import { getProductById } from './data.js';
import { loadCartFromStorage, saveCartToStorage } from './storage.js';

// Format mata uang rupiah sesuai SOP
export const idrFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
});

/**
 * Format angka ke mata uang Rupiah
 * @param {number} amount
 * @returns {string}
 */
export function formatIDR(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return 'Rp 0';
  return idrFormatter.format(amount);
}

/**
 * Kelas Keranjang Belanja (Single Source of Truth)
 */
class CartStore {
  constructor() {
    /** @type {Map<string, number>} Map dari productId -> quantity */
    this.items = new Map();
    /** @type {Set<(state: CartState) => void>} */
    this.listeners = new Set();
    /** @type {string | null} */
    this.lastStorageNotice = null;

    this.init();
  }

  /**
   * Inisialisasi awal dari localStorage
   */
  init() {
    const { items, error } = loadCartFromStorage();
    this.items.clear();

    for (const item of items) {
      this.items.set(item.productId, item.quantity);
    }

    if (error) {
      this.lastStorageNotice = error;
    }
  }

  /**
   * Subscribe ke perubahan keranjang
   * @param {(state: CartState) => void} listener
   */
  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  /**
   * Beri tahu semua listener jika state berubah
   */
  notify() {
    const state = this.getState();
    for (const listener of this.listeners) {
      listener(state);
    }
  }

  /**
   * Simpan state saat ini ke storage
   */
  persist() {
    const payload = [];
    for (const [productId, quantity] of this.items.entries()) {
      payload.push({ productId, quantity });
    }
    const result = saveCartToStorage(payload);
    if (!result.success && result.message) {
      this.lastStorageNotice = result.message;
    } else {
      this.lastStorageNotice = null;
    }
  }

  /**
   * Tambah item ke keranjang atau tambah jumlah jika sudah ada
   * @param {string} productId
   * @param {number} quantityToAdd
   * @returns {{ success: boolean, message?: string }}
   */
  addItem(productId, quantityToAdd = 1) {
    const product = getProductById(productId);
    if (!product) {
      return { success: false, message: 'Produk tidak ditemukan dalam katalog.' };
    }

    const qty = Number(quantityToAdd);
    if (!Number.isInteger(qty) || qty < 1) {
      return { success: false, message: 'Masukkan jumlah produk minimal 1 unit.' };
    }

    const currentQty = this.items.get(productId) || 0;
    const newQty = currentQty + qty;

    if (newQty > 99) {
      return {
        success: false,
        message: 'Maksimum jumlah pemesanan per item adalah 99 unit.'
      };
    }

    this.items.set(productId, newQty);
    this.persist();
    this.notify();

    return {
      success: true,
      message: `${product.name} berhasil ditambahkan ke keranjang.`
    };
  }

  /**
   * Perbarui jumlah pasti suatu item
   * @param {string} productId
   * @param {number} targetQuantity
   * @returns {{ success: boolean, message?: string }}
   */
  updateQuantity(productId, targetQuantity) {
    if (!this.items.has(productId)) {
      return { success: false, message: 'Produk tidak ada dalam keranjang.' };
    }

    const product = getProductById(productId);
    const qty = Number(targetQuantity);

    // SOP: Jumlah 0, negatif, desimal, atau >=100 ditolak dengan pesan jelas
    if (!Number.isInteger(qty) || qty < 1 || qty > 99) {
      return {
        success: false,
        message: 'Masukkan jumlah produk antara 1 dan 99 unit.'
      };
    }

    this.items.set(productId, qty);
    this.persist();
    this.notify();

    return {
      success: true,
      message: `Jumlah ${product?.name || 'produk'} diperbarui menjadi ${qty}.`
    };
  }

  /**
   * Hapus item dari keranjang
   * @param {string} productId
   */
  removeItem(productId) {
    if (this.items.has(productId)) {
      const product = getProductById(productId);
      this.items.delete(productId);
      this.persist();
      this.notify();
      return {
        success: true,
        message: `${product?.name || 'Item'} dihapus dari keranjang.`
      };
    }
    return { success: false };
  }

  /**
   * Bersihkan semua item
   */
  clear() {
    this.items.clear();
    this.persist();
    this.notify();
  }

  /**
   * Dapatkan representasi state keranjang lengkap dengan data produk terkini
   * @returns {CartState}
   */
  getState() {
    const detailedItems = [];
    let totalItemsCount = 0;
    let totalAmount = 0;

    for (const [productId, quantity] of this.items.entries()) {
      const product = getProductById(productId);
      if (!product) {
        // Jika produk sudah dihapus dari katalog, abaikan secara aman
        continue;
      }

      const subtotal = product.price * quantity;
      totalItemsCount += quantity;
      totalAmount += subtotal;

      detailedItems.push({
        product,
        quantity,
        subtotal,
        subtotalFormatted: formatIDR(subtotal)
      });
    }

    return {
      items: detailedItems,
      totalCount: totalItemsCount,
      uniqueCount: detailedItems.length,
      totalAmount,
      totalFormatted: formatIDR(totalAmount),
      isEmpty: detailedItems.length === 0,
      storageNotice: this.lastStorageNotice
    };
  }
}

/**
 * @typedef {Object} CartDetailedItem
 * @property {object} product
 * @property {number} quantity
 * @property {number} subtotal
 * @property {string} subtotalFormatted
 */

/**
 * @typedef {Object} CartState
 * @property {CartDetailedItem[]} items
 * @property {number} totalCount
 * @property {number} uniqueCount
 * @property {number} totalAmount
 * @property {string} totalFormatted
 * @property {boolean} isEmpty
 * @property {string | null} storageNotice
 */

// Singleton instance
export const cart = new CartStore();
