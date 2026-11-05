# Panduan Pengembangan — Website Penjualan Helm Premium

## 1. Cakupan dan urutan kerja

Dokumentasi ini menjadi dasar implementasi website statis HTML, CSS, dan JavaScript. Tinjau kebutuhan sebelum membuat fitur. Website belum dinyatakan selesai atau ter-deploy hanya karena dokumen tersedia.

Baca berurutan: `prd.md` → `tech_stack.md` → `arsitektur.md` → `ui.ux.md`. Gunakan nama sementara OJANK HELMET sampai identitas toko dikonfirmasi.

## 2. Prasyarat

- Editor kode seperti VS Code dan browser modern.
- Python 3 untuk server pengembangan lokal.
- Git opsional untuk kontrol versi.
- Data usaha sebelum peluncuran: nama toko, nomor WhatsApp, alamat, jam operasional, katalog dan harga, foto yang diizinkan, serta kebijakan pembayaran, pengiriman, garansi, dan pengembalian.
- Jangan menggunakan nomor contoh sebagai penerima pengajuan aktif. Jika nomor asli belum tersedia, nonaktifkan pengajuan.

## 3. Langkah implementasi

1. **Siapkan struktur:** buat berkas dan direktori sesuai `arsitektur.md`; mulai dari `index.html`, `css/styles.css`, dan modul `js/`.
2. **Definisikan konfigurasi:** masukkan nama usaha dan nomor WhatsApp publik di `js/config.js`. Nomor WhatsApp menggunakan kode negara dan digit saja, tanpa tanda `+`, spasi, atau awalan nol lokal.
3. **Buat katalog:** tambahkan minimal 8 produk contoh dari kategori yang relevan. Setiap item memiliki ID unik, nama, merek, kategori, deskripsi, spesifikasi, harga satuan positif, path gambar lokal, dan teks alternatif. Tandai data sebagai contoh sampai diverifikasi.
4. **Bangun HTML semantik:** header, hero, kategori, katalog, detail produk, keranjang, formulir, ringkasan, cara pembelian, FAQ, kontak, footer, dan `noscript`. Muat `js/app.js` dengan `type="module"`.
5. **Terapkan CSS mobile-first:** token warna, tipografi, grid kartu, kontrol formulir, status/error, dan `focus-visible`. Pada layar kecil gunakan satu kolom; tambah kolom berdasarkan ruang.
6. **Implementasikan katalog:** pencarian tanpa membedakan huruf besar/kecil, filter kategori, jumlah hasil, dan keadaan kosong. Pencarian dan filter harus dapat digabungkan.
7. **Implementasikan keranjang:** satu sumber state; tambah, ubah, dan hapus berdasarkan ID. Tolak jumlah selain bilangan bulat 1–99.
8. **Implementasikan harga:** hitung subtotal dan total berdasarkan harga katalog terbaru. Format uang menggunakan `Intl.NumberFormat`.
9. **Implementasikan penyimpanan:** simpan hanya ID produk, jumlah, dan versi skema. Tangani JSON rusak, versi tidak dikenal, item hilang, dan akses storage yang ditolak tanpa membuat aplikasi berhenti.
10. **Implementasikan pengajuan:** validasi nama dan kontak, tampilkan ringkasan, lalu bentuk tautan WhatsApp dari state terbaru menggunakan `encodeURIComponent`. Jangan mengirim otomatis atau mengosongkan keranjang.
11. **Lengkapi konten:** tambahkan informasi konfirmasi stok, metode pembayaran, biaya pengiriman, garansi, dan kebijakan pengembalian hanya setelah dikonfirmasi pemilik toko. Jangan mengarang alamat, stok, testimoni, atau ketentuan transaksi.
12. **Verifikasi:** jalankan pemeriksaan di bawah, perbaiki masalah, dan catat hasil sebelum deployment.

## 4. Menjalankan lokal

Dari direktori proyek setelah berkas aplikasi dibuat, jalankan:

```bash
python3 -m http.server 5500 --bind 127.0.0.1
```

Buka `http://localhost:5500`. Hentikan server dengan `Ctrl+C`. Jangan mengandalkan membuka `index.html` melalui `file://` karena ES modules perlu dilayani melalui HTTP. Tidak perlu `npm install` atau proses build untuk MVP ini.

## 5. Aturan penulisan kode

- Gunakan indentasi 2 spasi, UTF-8, nama file huruf kecil, dan kebab-case untuk kelas CSS serta ID HTML.
- Variabel/fungsi JavaScript memakai camelCase; konstanta konfigurasi dapat memakai UPPER_SNAKE_CASE.
- Gunakan `const` secara default dan `let` saat perlu perubahan nilai; hindari `var` dan inline handler seperti `onclick`.
- Pisahkan data, state, logika, dan render.
- Jangan menghitung total dengan membaca teks harga dari DOM.
- Gunakan `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })`.
- Render input/data dinamis melalui `textContent` atau DOM API; jangan memasukkan input pengguna ke `innerHTML`.
- Tangani kegagalan `localStorage` dan validasi input secara eksplisit.
- Jangan mencatat nama atau nomor kontak pembeli ke console.
- Gunakan aset lokal dengan nama deskriptif dan catat asal/lisensinya jika diperlukan.
- Jangan memasukkan token, rahasia, atau data pelanggan ke repository dan paket deployment.

## 6. Pemeriksaan sebelum rilis

| Skenario | Hasil yang diharapkan |
|---|---|
| Katalog dibuka | Produk tampil tanpa error console atau aset hilang |
| Cari nama dan pilih kategori | Hasil memenuhi kedua kondisi; reset mengembalikan katalog |
| Tambah produk sama dua kali | Satu baris dengan jumlah 2 |
| Jumlah 0, negatif, desimal, atau 100 | Ditolak dengan pesan jelas |
| Harga Rp500.000 × 2 unit | Subtotal Rp1.000.000 |
| Keranjang kosong | Pengajuan ditolak |
| Nama atau kontak tidak valid | Fokus menuju masalah pertama dan ada penjelasan |
| Reload, JSON rusak, atau storage ditolak | State valid dipulihkan atau aplikasi pulih dengan aman |
| Produk dihapus atau harga diubah di katalog | ID hilang diabaikan; harga terkini dipakai |
| Nama mengandung `<`, `&`, tanda kutip, atau baris baru | Ditampilkan sebagai teks dan URL tetap ter-encode |
| Nomor toko kosong | Tombol pengajuan tidak aktif |
| WhatsApp dibuka | Draf lengkap; pengguna masih perlu menekan kirim |
| Keranjang berubah setelah ringkasan | Ringkasan harus diperiksa ulang |
| Lebar 360, 768, 1280 px dan zoom 200% | Konten terbaca dan kontrol tidak terpotong |
| Keyboard tanpa mouse | Urutan fokus masuk akal dan semua aksi dapat dijalankan |

Periksa juga reflow pada 320 CSS px, kontras, alt gambar, label formulir, dan reduced motion. Jika browser atau perangkat tertentu tidak tersedia, catat keterbatasan pemeriksaan.

## 7. Proses deployment statis

1. Pastikan data usaha benar, aset berizin, nomor tujuan valid, dan pemeriksaan penerimaan lulus.
2. Siapkan folder publik yang hanya berisi `index.html`, `css/`, `js/`, dan `assets/`. Jangan sertakan dokumentasi internal atau data pribadi.
3. Jalankan server lokal dari folder paket dan periksa seluruh tautan serta path aset.
4. Buat proyek hosting statis dan unggah paket melalui fasilitas yang tersedia.
5. Gunakan URL HTTPS hasil hosting untuk menguji halaman, pencarian, keranjang, perhitungan total, dan draf WhatsApp tanpa mengirim pesan uji kepada pihak lain.
6. Jika memakai domain sendiri, atur DNS sesuai instruksi penyedia, periksa HTTPS, lalu ulangi smoke test.
7. Catat URL, tanggal rilis, versi sumber, paket yang diunggah, dan hasil pemeriksaan.

## 8. Rollback dan pemeliharaan

Simpan paket rilis sebelumnya. Jika rilis baru bermasalah, unggah ulang paket sebelumnya dan periksa alur utama. Untuk pembaruan katalog, jaga ID produk tetap stabil, periksa harga, spesifikasi, dan foto, lalu ulangi pemeriksaan perhitungan. Jika skema penyimpanan berubah, naikkan versi dan sediakan reset atau migrasi yang aman.

## 9. Definition of Done

Implementasi dianggap selesai setelah fitur dan kriteria penerimaan pada `prd.md` terpenuhi, data usaha dikonfirmasi, aksesibilitas dasar diperiksa, aset serta console bersih dari error, dan hasil pengujian dicatat. Deployment baru dianggap selesai setelah URL hosting dapat diakses dan smoke test lulus. Perbarui dokumentasi jika keputusan teknis atau aturan bisnis berubah.
