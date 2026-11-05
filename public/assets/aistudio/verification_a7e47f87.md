# Catatan Verifikasi — Website Penjualan Helm Premium

**Status:** Dokumen rencana verifikasi untuk proyek website penjualan helm. Dokumen ini tidak menyatakan bahwa website telah dibuat, diuji, atau dipublikasikan.

## 1. Hasil pemeriksaan yang harus dicatat

Isi bagian ini setelah implementasi benar-benar dijalankan.

| Pemeriksaan | Status | Catatan |
|---|---|---|
| Katalog dan kategori | Belum diuji | Periksa jumlah dan isi produk |
| Pencarian dan filter gabungan | Belum diuji | Uji nama, merek, kategori, dan reset |
| Keranjang dan jumlah produk | Belum diuji | Tambah, ubah, hapus, dan batas jumlah |
| Perhitungan subtotal dan total | Belum diuji | Bandingkan dengan hitungan manual |
| Validasi nama dan kontak | Belum diuji | Uji data kosong dan format tidak valid |
| Pemulihan `localStorage` | Belum diuji | Uji reload, JSON rusak, dan storage ditolak |
| Encoding tautan WhatsApp | Belum diuji | Uji nama dengan tanda baca |
| Responsif | Belum diuji | Periksa 320, 360, 768, dan 1280 CSS px |
| Keyboard | Belum diuji | Uji Tab, Shift+Tab, Enter, dan Space |
| Aset gambar | Belum diuji | Pastikan gambar tidak gagal dimuat |
| Console browser | Belum diuji | Pastikan tidak ada exception JavaScript |
| Hosting HTTPS | Belum diuji | Periksa setelah deployment |

## 2. Skenario uji

1. Buka katalog dan pastikan produk serta kategori tampil.
2. Cari nama atau merek produk, lalu kombinasikan dengan filter kategori.
3. Tambahkan satu produk dua kali dan pastikan produk berada dalam satu baris dengan jumlah dua.
4. Ubah jumlah, hapus produk, dan pastikan total ikut berubah.
5. Uji jumlah 0, negatif, desimal, dan lebih dari 99; aplikasi harus menolaknya.
6. Uji keranjang kosong; pengajuan tidak boleh dilanjutkan.
7. Uji nama dan nomor kontak kosong atau tidak valid; tampilkan pesan yang jelas.
8. Muat ulang halaman dan pastikan keranjang valid dipulihkan.
9. Uji data JSON rusak dan akses `localStorage` yang gagal; aplikasi tidak boleh crash.
10. Uji teks yang berisi `<`, `&`, tanda kutip, dan baris baru; teks harus ditampilkan aman dan URL di-encode.
11. Pastikan nomor WhatsApp yang belum dikonfigurasi membuat tombol pengajuan nonaktif.
12. Buka draf WhatsApp dan pastikan pesan memuat rincian produk dan total estimasi. Jangan mengirim pesan uji ke pihak lain.
13. Periksa halaman pada lebar 320, 360, 768, dan 1280 CSS px serta zoom browser 200%.
14. Jalankan semua alur utama menggunakan keyboard tanpa mouse.

## 3. Batas verifikasi

- Jangan menyatakan audit aksesibilitas formal telah dilakukan jika belum.
- Jangan menyatakan kompatibilitas semua browser atau perangkat tanpa pengujian.
- Harga, spesifikasi, garansi, foto, dan stok harus diverifikasi terhadap data toko.
- Belum ada backend, stok real-time, pembayaran, atau penyimpanan transaksi pada MVP statis.
- Belum ada URL hosting sampai proses deployment selesai dan diuji.
- Pesan yang dibuka di WhatsApp belum berarti pesanan berhasil atau pembayaran diterima.

## 4. Catatan rilis

Lengkapi setelah verifikasi:

- Tanggal pemeriksaan:
- Versi atau commit:
- Browser dan perangkat yang diuji:
- Hasil uji fungsi:
- Hasil uji responsif:
- Masalah yang ditemukan:
- Perbaikan yang dilakukan:
- URL deployment (jika sudah ada):
- Hasil smoke test produksi:

## 5. Kriteria siap rilis

Website dapat dipertimbangkan siap rilis setelah seluruh kriteria penerimaan pada `prd.md` terpenuhi, data usaha dan foto telah disetujui, nomor kontak benar, tidak ada error utama, alur keyboard serta tampilan responsif diperiksa, dan hasil pengujian dicatat. Publikasi baru dianggap selesai setelah URL HTTPS dapat diakses dan smoke test produksi lulus.
