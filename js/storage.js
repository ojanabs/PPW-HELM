/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modul Penyimpanan Lokal (storage.js)
 * Sesuai arsitektur.md & instruction.md:
 * - Menggunakan skema berversi (schemaVersion: 1)
 * - Validasi tipe data ketat, ID produk valid, dan jumlah bilangan bulat 1-99
 * - Safe read/write dalam try/catch
 * - Tangani kegagalan storage atau kuota penuh tanpa menghentikan aplikasi
 */

import { getProductById } from './data.js';

const STORAGE_KEY = 'ojank_helmet_cart_v1';
const CURRENT_SCHEMA_VERSION = 1;

/**
 * Validasi dan sanitasi item keranjang
 * @param {any} item
 * @returns {{ productId: string, quantity: number } | null}
 */
function validateCartItem(item) {
  if (!item || typeof item !== 'object') return null;
  if (typeof item.productId !== 'string' || !item.productId.trim()) return null;

  // Pastikan produk benar-benar terdaftar di katalog saat ini
  const product = getProductById(item.productId);
  if (!product) return null;

  // Validasi jumlah harus bilangan bulat antara 1 dan 99
  const qty = Number(item.quantity);
  if (!Number.isInteger(qty) || qty < 1 || qty > 99) return null;

  return {
    productId: item.productId,
    quantity: qty
  };
}

/**
 * Membaca data keranjang dari localStorage dengan aman
 * @returns {{ items: Array<{ productId: string, quantity: number }>, error?: string }}
 */
export function loadCartFromStorage() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return { items: [], error: 'Penyimpanan lokal tidak tersedia di lingkungan ini.' };
    }

    const rawData = window.localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      return { items: [] };
    }

    let parsed;
    try {
      parsed = JSON.parse(rawData);
    } catch {
      // JSON rusak - kembalikan array kosong dengan aman
      return { items: [], error: 'Data keranjang tersimpan rusak dan telah diatur ulang.' };
    }

    // Validasi versi skema
    if (!parsed || parsed.schemaVersion !== CURRENT_SCHEMA_VERSION || !Array.isArray(parsed.items)) {
      // Skema tidak cocok - reset secara aman
      return { items: [], error: 'Versi data tidak kompatibel dan telah diperbarui.' };
    }

    // Filter dan validasi setiap item
    const validItems = [];
    const seenIds = new Set();

    for (const rawItem of parsed.items) {
      const validated = validateCartItem(rawItem);
      if (validated && !seenIds.has(validated.productId)) {
        seenIds.add(validated.productId);
        validItems.push(validated);
      }
    }

    return { items: validItems };
  } catch (err) {
    return {
      items: [],
      error: 'Tidak dapat mengakses memori browser: ' + (err instanceof Error ? err.message : 'Akses ditolak.')
    };
  }
}

/**
 * Menyimpan keranjang ke localStorage
 * Hanya menyimpan schemaVersion, productId, dan quantity
 * @param {Array<{ productId: string, quantity: number }>} items
 * @returns {{ success: boolean, message?: string }}
 */
export function saveCartToStorage(items) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return { success: false, message: 'Keranjang tetap bisa digunakan, tetapi belum bisa disimpan pada browser ini.' };
    }

    // Validasi dan siapkan payload minimal
    const cleanedItems = [];
    for (const item of items) {
      const valid = validateCartItem(item);
      if (valid) {
        cleanedItems.push(valid);
      }
    }

    const payload = {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      items: cleanedItems
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: 'Keranjang tetap bisa digunakan, tetapi belum bisa disimpan pada browser ini.'
    };
  }
}

/**
 * Mengosongkan keranjang dari storage (jika pengguna sengaja menghapus semua)
 */
export function clearCartStorage() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // abaikan kegagalan non-kritis
  }
}
