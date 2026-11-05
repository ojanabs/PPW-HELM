# Teknologi — Website Penjualan Helm Premium

## 1. Prinsip pemilihan

Versi awal menggunakan website statis HTML, CSS, dan JavaScript murni. Prioritasnya adalah mudah dipelajari, ringan, dan dapat dijalankan tanpa proses build. Layanan hosting belum dianggap dibuat atau dipublikasikan hanya karena dokumen ini tersedia.

## 2. Stack yang dipilih

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Struktur halaman | HTML5 semantik | Mendukung struktur konten dan aksesibilitas |
| Tampilan | CSS3, Flexbox, Grid, media query | Membuat tampilan responsif tanpa framework UI |
| Logika browser | JavaScript ES modules | Memisahkan katalog, keranjang, dan formulir |
| Framework | Tidak digunakan | Mengurangi kompleksitas MVP |
| Katalog | Array objek di `js/data.js` | Mudah ditinjau dan diperbarui melalui kode |
| Penyimpanan browser | `localStorage` | Memulihkan keranjang pada browser dan origin yang sama |
| Database server | Tidak digunakan pada MVP | Belum ada akun, stok tersinkron, atau transaksi server |
| Integrasi pengajuan | Tautan WhatsApp `wa.me` | Membuka draf pesan yang dikirim sendiri oleh pengguna |
| Hosting rencana | Hosting statis melalui HTTPS | Sesuai untuk berkas HTML, CSS, JavaScript, dan gambar |
| Kontrol versi | Git (opsional) | Meninjau perubahan dan mengembalikan versi |
| Server pengembangan | Python 3 `http.server` | Menjalankan ES modules melalui HTTP tanpa paket tambahan |
| Pemeriksaan | Browser DevTools; Node.js opsional | Memeriksa interaksi, responsivitas, dan kesalahan JavaScript |

Prosedur dan ketersediaan fitur hosting harus diperiksa saat deployment. Tidak ada SDK cloud yang diperlukan dalam kode MVP.

## 3. Kompatibilitas

Targetkan browser modern seperti Chrome, Edge, Firefox, dan Safari pada perangkat yang masih didukung. Gunakan kontrol formulir HTML native dengan label serta validasi JavaScript. Internet Explorer tidak menjadi target. Jika memungkinkan, uji setidaknya satu browser Chromium dan satu browser lain sebelum rilis.

## 4. Pengelolaan data

- `localStorage` hanya menyimpan versi skema, ID produk, dan jumlah produk dalam keranjang.
- Nama dan nomor kontak hanya berada di memori formulir sampai pengguna membuka WhatsApp.
- Katalog sumber menjadi acuan harga; jangan mempercayai harga atau total yang disimpan pada browser.
- Penyimpanan browser bukan database bersama dan tidak menyediakan stok real-time atau transaksi.
- Jangan menyimpan API key, password, token, atau rahasia di frontend. Nomor WhatsApp toko merupakan informasi kontak publik.

## 5. Aset dan performa

Gunakan gambar lokal yang hak penggunaannya jelas. Gunakan WebP atau AVIF bila tersedia, tentukan dimensi gambar, dan terapkan lazy loading pada gambar di bawah area awal. Font sistem dapat digunakan agar tidak bergantung pada CDN font. Target awal ukuran aset halaman dibuat sekecil mungkin dan tidak menimbulkan kesalahan console pada alur utama.

## 6. Pengembangan berikutnya

Jika toko membutuhkan stok bersama, akun pelanggan, panel admin, pembayaran, dan pencatatan transaksi, tambahkan backend serta database relasional, autentikasi admin, dan validasi di server. Pilihan teknologi ditentukan pada fase tersebut; `localStorage` tidak boleh menjadi dasar konfirmasi transaksi atau pembayaran.
