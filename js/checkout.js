/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modul Checkout & Pemesanan WhatsApp (checkout.js)
 * Sesuai arsitektur.md & prd.md:
 * - Validasi nama dan kontak pembeli
 * - Membentuk draf pesan WhatsApp yang rapi dan ter-encode sempurna
 * - Membuka tautan wa.me secara aman (rel="noopener noreferrer")
 * - TIDAK mengosongkan keranjang (keranjang dipertahankan)
 * - TIDAK menyatakan status palsu "pesanan berhasil"
 */

import { STORE_CONFIG } from './config.js';
import { cart, formatIDR } from './cart.js';

/**
 * Validasi form data pembeli
 * @param {string} customerName
 * @param {string} customerPhone
 * @param {string} notes
 * @returns {{ isValid: boolean, errors: { name?: string, phone?: string } }}
 */
export function validateCustomerForm(customerName, customerPhone) {
  const errors = {};
  const trimmedName = (customerName || '').trim();
  const trimmedPhone = (customerPhone || '').trim();

  // Validasi Nama: minimal 2 karakter
  if (!trimmedName) {
    errors.name = 'Nama lengkap pemesan wajib diisi.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Nama pemesan minimal terdiri dari 2 karakter.';
  } else if (trimmedName.length > 80) {
    errors.name = 'Nama pemesan maksimal 80 karakter.';
  }

  // Validasi Nomor WhatsApp: minimal 9 digit angka (bisa awalan 08 atau 62 atau +62)
  const digitsOnly = trimmedPhone.replace(/\D/g, '');
  if (!trimmedPhone) {
    errors.phone = 'Nomor WhatsApp aktif wajib diisi.';
  } else if (digitsOnly.length < 9 || digitsOnly.length > 15) {
    errors.phone = 'Masukkan nomor WhatsApp yang valid (9–15 digit angka).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Format nomor WhatsApp pembeli untuk ditampilkan di ringkasan
 * @param {string} rawPhone
 * @returns {string}
 */
export function formatCustomerPhone(rawPhone) {
  const digits = (rawPhone || '').replace(/\D/g, '');
  if (digits.startsWith('0')) {
    return '+62 ' + digits.substring(1);
  } else if (digits.startsWith('62')) {
    return '+62 ' + digits.substring(2);
  }
  return digits;
}

/**
 * Menyusun pesan draf pemesanan resmi untuk WhatsApp
 * @param {string} customerName
 * @param {string} customerPhone
 * @param {string} notes
 * @returns {string} Teks pesan mentah
 */
export function generateWhatsAppMessage(customerName, customerPhone, notes = '') {
  const state = cart.getState();
  const dateStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const lines = [];
  lines.push(`*PERMINTAAN PEMESANAN HELMET — ${STORE_CONFIG.storeName}*`);
  lines.push(`Tanggal: ${dateStr}`);
  lines.push('----------------------------------------');
  lines.push('*DATA PEMESAN:*');
  lines.push(`• Nama: ${customerName.trim()}`);
  lines.push(`• Kontak WA: ${customerPhone.trim()}`);
  if (notes && notes.trim()) {
    lines.push(`• Catatan Ukuran / Khusus: ${notes.trim()}`);
  }
  lines.push('----------------------------------------');
  lines.push('*RINCIAN BARANG:*');

  state.items.forEach((item, index) => {
    lines.push(`${index + 1}. *${item.product.name}*`);
    lines.push(`   Merek: ${item.product.brand} | Kategori: ${item.product.category}`);
    lines.push(`   Harga: ${formatIDR(item.product.price)} × ${item.quantity} unit`);
    lines.push(`   Subtotal: ${item.subtotalFormatted}`);
  });

  lines.push('----------------------------------------');
  lines.push(`*TOTAL ESTIMASI: ${state.totalFormatted}*`);
  lines.push(`(Jumlah Total: ${state.totalCount} unit)`);
  lines.push('----------------------------------------');
  lines.push('_Catatan: Permintaan ini dikirim melalui website resmi OJANK HELMET._');
  lines.push('Mohon konfirmasi ketersediaan stok, panduan ukuran helm, estimasi ongkos kirim, dan metode pembayaran resmi. Terima kasih!');

  return lines.join('\n');
}

/**
 * Membentuk URL tautan WhatsApp
 * @param {string} messageText
 * @returns {string | null} URL lengkap atau null jika nomor toko tidak valid
 */
export function buildWhatsAppLink(messageText) {
  const storeNumber = (STORE_CONFIG.whatsappNumber || '').replace(/\D/g, '');
  if (!storeNumber) {
    return null;
  }

  const encodedMessage = encodeURIComponent(messageText);
  return `https://wa.me/${storeNumber}?text=${encodedMessage}`;
}

/**
 * Memeriksa apakah nomor WhatsApp toko telah dikonfigurasi dengan benar
 * @returns {boolean}
 */
export function isStoreWhatsAppConfigured() {
  const storeNumber = (STORE_CONFIG.whatsappNumber || '').replace(/\D/g, '');
  return storeNumber.length >= 10;
}
