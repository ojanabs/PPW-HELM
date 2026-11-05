# Panduan UI/UX — Website Penjualan Helm Premium

## 1. Arah desain

Tampilan bersih, modern, premium, dan sedikit sporty. Fokus utama adalah membantu pengunjung menemukan helm, membaca spesifikasi, membandingkan harga, dan menyusun pembelian. Semua teks antarmuka menggunakan bahasa Indonesia. Nama merek sementara: OJANK HELMET, dan dapat diganti sesuai keputusan pemilik toko.

## 2. Token visual awal

| Elemen | Nilai/pedoman |
|---|---|
| Latar utama | `#111111` atau putih netral pada bagian tertentu |
| Permukaan kartu | `#1D1D1D` atau `#FFFFFF` sesuai tema |
| Teks utama | Putih pada latar gelap; hitam pada latar terang |
| Teks sekunder | Abu-abu dengan kontras yang cukup |
| Warna utama | Hitam |
| Aksen | Emas `#D8A441` |
| Kesalahan | `#B42318`, selalu disertai teks |
| Font | `system-ui, sans-serif` |
| Teks dasar | 16 px, line-height 1.5–1.6 |
| Radius | Kartu 12–16 px, input/tombol 8–10 px |
| Spasi | Kelipatan 4/8 px |
| Lebar konten | Maksimum sekitar 1200 px, padding sisi minimal 16 px |

Periksa kontras warna, hover, fokus, dan status disabled. Jangan menggunakan aksen emas sebagai teks kecil pada latar yang membuatnya sulit dibaca.

## 3. Susunan halaman

Header → hero/banner → kategori produk → katalog → detail produk → keranjang dan formulir → cara pembelian → syarat/FAQ → kontak dan footer. Pada desktop, keranjang dapat ditampilkan sebagai panel di samping katalog. Pada ponsel, tampilkan keranjang setelah katalog dengan tombol menuju keranjang yang menampilkan jumlah item. Hindari modal yang tidak diperlukan agar alur keyboard lebih sederhana.

## 4. User journey

| Tahap | Tujuan pengguna | Respons antarmuka |
|---|---|---|
| Mengenal | Memahami identitas toko | Judul, banner, produk unggulan, tombol “Lihat koleksi” |
| Menemukan | Memilih helm sesuai kebutuhan | Pencarian, filter, foto, merek, spesifikasi, harga |
| Membandingkan | Memahami perbedaan produk | Detail ukuran, bahan, fitur, dan keterangan produk |
| Menyusun | Mengatur belanja | Tambah produk, ubah jumlah, hapus, indikator keranjang |
| Memeriksa | Menghindari kesalahan | Ringkasan produk, jumlah, harga, dan total |
| Menghubungi | Meminta konfirmasi toko | Tombol “Lanjutkan via WhatsApp” dengan penjelasan |

## 5. Wireframe

### Desktop

```text
┌──────────────────────────────────────────────────────────────┐
│ OJANK HELMET       Beranda  Koleksi  Tentang  FAQ  Kontak     │
├──────────────────────────────────────────────────────────────┤
│ Helm premium untuk perjalanan penuh gaya   [Foto helm besar] │
│ [Lihat koleksi]                                               │
├─────────────────────────────────────┬────────────────────────┤
│ Katalog helm                         │ Keranjang              │
│ [Cari helm atau merek...]            │ Produk / jumlah        │
│ [Semua] [Full face] [Modular] [...]  │ Subtotal dan total     │
│ [Kartu produk] [Kartu produk]        │ Nama / WhatsApp        │
│ [Kartu produk] [Kartu produk]        │ [Lanjutkan WhatsApp]   │
├─────────────────────────────────────┴────────────────────────┤
│ Cara pembelian → FAQ → Kontak → Footer                       │
└──────────────────────────────────────────────────────────────┘
```

### Ponsel

```text
┌──────────────────────────────┐
│ OJANK HELMET       [Keranjang]│
│ Banner dan pengantar          │
│ [Lihat koleksi]               │
│ [Cari helm atau merek...]     │
│ [Kategori ▼]                  │
│ [Kartu produk]                │
│ [Kartu produk]                │
│ Keranjang dan jumlah          │
│ Ringkasan total               │
│ Formulir dan kontak           │
│ [Lanjutkan via WhatsApp]      │
│ FAQ / kontak / footer         │
└──────────────────────────────┘
```

## 6. Komponen dan keadaan

- **Navigasi:** tautan anchor, fokus terlihat, dan skip link menuju konten utama.
- **Kartu produk:** foto dengan rasio konsisten, nama, merek, kategori, harga, ringkasan spesifikasi, dan tombol “Tambah ke keranjang”.
- **Pencarian/filter:** label jelas, jumlah hasil, kategori aktif, dan tombol reset saat hasil kosong.
- **Kontrol jumlah:** tombol kurang/tambah dan input bilangan berlabel; minimum 1, maksimum 99. Sediakan tombol hapus.
- **Detail produk:** gambar, nama, merek, harga, ukuran, bahan, fitur, dan keterangan yang telah diverifikasi.
- **Ringkasan:** nama produk, jumlah, harga satuan, subtotal, dan total. Jika keranjang kosong, tampilkan “Keranjang masih kosong. Pilih helm untuk mulai belanja.”
- **Formulir kontak:** nama dan nomor WhatsApp dengan label dan validasi. Validasi format tidak memastikan nomor benar-benar terdaftar.
- **Pemeriksaan pesanan:** tampilkan ringkasan dalam halaman dan sediakan tindakan untuk mengubah keranjang atau melanjutkan ke WhatsApp.
- **Pemberitahuan:** perubahan keranjang dan kegagalan penyimpanan memakai area status yang tidak merebut fokus.
- **FAQ:** gunakan elemen native `details` dan `summary`.

## 7. Contoh microcopy

- Keranjang kosong: “Keranjang masih kosong. Pilih helm untuk mulai belanja.”
- Hasil kosong: “Produk tidak ditemukan. Coba kata lain atau atur ulang filter.”
- Jumlah tidak valid: “Masukkan jumlah produk antara 1 dan 99.”
- Penyimpanan gagal: “Keranjang tetap bisa digunakan, tetapi belum bisa disimpan pada browser ini.”
- Sebelum WhatsApp: “Rincian pesanan akan dibuka di WhatsApp. Kirim pesan untuk meminta konfirmasi stok, harga akhir, dan pengiriman.”
- Pengajuan belum dikonfigurasi: “Pengajuan melalui WhatsApp belum tersedia. Silakan gunakan kontak toko yang telah dicantumkan.”

## 8. Aksesibilitas

Targetkan prinsip aksesibilitas WCAG 2.2 AA dan lakukan pemeriksaan sebelum menyatakan kepatuhan.

- Gunakan `lang="id"`, landmark semantik, satu `h1`, dan urutan heading yang logis.
- Semua fungsi dapat digunakan melalui keyboard; jangan menjadikan `div` biasa sebagai tombol.
- Setiap input memiliki `label`; pesan kesalahan dihubungkan dengan field terkait.
- Setelah validasi gagal, fokuskan ke field salah pertama.
- Target kontras teks normal minimal 4.5:1 dan teks besar 3:1.
- Target sentuh minimal 44 × 44 CSS px dan fokus terlihat jelas.
- Gambar informatif memiliki teks alternatif yang sesuai.
- Dukung pembesaran teks dan zoom 200%; periksa reflow hingga 320 CSS px.
- Hormati `prefers-reduced-motion`; animasi tidak boleh diperlukan untuk menjalankan fungsi.

## 9. Validasi pengalaman

Uji pencarian, filter, tambah beberapa produk, ubah jumlah, hapus produk, perhitungan total, validasi kontak, dan pembukaan WhatsApp. Ulangi menggunakan keyboard serta layar kecil. Catat hambatan calon pengguna dan perbaiki masalah utama sebelum peluncuran.
