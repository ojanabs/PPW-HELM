# Product Requirement Document — Website Penjualan Helm Premium

**Status:** Dokumen kebutuhan untuk pengembangan awal. Nama toko, harga, stok, merek, spesifikasi, foto, alamat, dan nomor WhatsApp harus diverifikasi sebelum website dipublikasikan.

## 1. Visi produk

Memudahkan calon pembeli menemukan, membandingkan, dan mengajukan pembelian helm premium melalui website berbahasa Indonesia yang ringan, mudah digunakan, dan nyaman dibuka melalui ponsel maupun komputer.

## 2. Masalah yang dipecahkan

- Calon pembeli kesulitan membandingkan jenis, merek, ukuran, fitur, dan harga helm jika informasi tersebar.
- Pembeli perlu melihat detail produk sebelum menghubungi toko.
- Rincian barang dan jumlah pesanan melalui percakapan dapat tidak lengkap.
- Pengelola toko membutuhkan ringkasan permintaan pembelian agar bisa menindaklanjuti pesanan dengan lebih mudah.

## 3. Target pengguna

| Pengguna | Kebutuhan utama |
|---|---|
| Pengendara motor | Menemukan helm sesuai kebutuhan dan anggaran |
| Pembeli helm premium | Membandingkan merek, bahan, fitur, ukuran, dan desain |
| Pembeli aksesori | Menemukan visor, aksesori, atau produk perawatan helm |
| Pengelola toko | Menerima ringkasan permintaan untuk diperiksa dan ditindaklanjuti |

## 4. Ruang lingkup MVP

1. Beranda yang menjelaskan toko, menampilkan produk unggulan, dan mengarahkan pengunjung ke katalog.
2. Katalog dengan nama produk, kategori, merek, deskripsi, spesifikasi, foto, dan harga.
3. Pencarian berdasarkan nama atau merek serta filter kategori.
4. Detail produk untuk menampilkan informasi produk secara lebih lengkap.
5. Keranjang belanja untuk menambah, mengubah jumlah, menghapus produk, dan melihat subtotal.
6. Formulir pembeli dan ringkasan belanja sebelum membuka WhatsApp toko.
7. Penyimpanan keranjang pada browser yang sama menggunakan `localStorage`.
8. Informasi cara pembelian, kebijakan toko, FAQ, dan kontak.
9. Tampilan responsif dan interaksi yang dapat dioperasikan menggunakan keyboard.

### Di luar MVP

Akun pelanggan, panel admin, stok real-time, transaksi yang tersimpan di server, pembayaran online, pelacakan pengiriman, dan sistem ulasan belum termasuk versi awal. Data katalog diperbarui melalui berkas sumber.

## 5. Aturan bisnis

- Mata uang menggunakan rupiah (IDR).
- Harga disimpan sebagai bilangan bulat rupiah dan ditampilkan menggunakan format Indonesia.
- Subtotal produk = harga satuan × jumlah.
- Total estimasi = jumlah seluruh subtotal produk.
- Jumlah teknis per produk dibatasi 1–99 unit; batas ini bukan informasi stok.
- Harga, stok, garansi, keaslian, dan spesifikasi harus diverifikasi oleh pengelola toko sebelum dipublikasikan.
- Total pada website merupakan ringkasan belanja dan belum menjamin stok atau keberhasilan transaksi.
- Pengajuan melalui WhatsApp bukan bukti pembayaran atau konfirmasi pesanan. Pengelola harus mengonfirmasi ketersediaan, biaya pengiriman, metode pembayaran, dan ketentuan transaksi.
- Pengguna harus menekan tombol kirim sendiri di WhatsApp; website tidak dapat memastikan pesan terkirim atau diterima.

## 6. Alur utama

Buka beranda → telusuri katalog → cari atau filter produk → lihat detail → tambahkan produk ke keranjang → atur jumlah → periksa ringkasan → isi kontak → buka WhatsApp → kirim pesan → toko mengonfirmasi pesanan secara manual.

## 7. Kriteria penerimaan

- Pencarian dan filter bekerja bersamaan; hasil kosong menampilkan pesan dan pilihan untuk mengatur ulang filter.
- Produk dengan ID yang sama digabung dalam satu baris keranjang.
- Keranjang kosong tidak dapat diajukan.
- Jumlah tidak valid ditolak dengan pesan yang jelas.
- Harga dan subtotal dihitung ulang berdasarkan data katalog.
- Pesan WhatsApp berisi nama pembeli, kontak, nama produk, jumlah, harga satuan, subtotal, dan total estimasi.
- Jika nomor WhatsApp toko belum diatur, pengajuan dinonaktifkan.
- Muat ulang halaman dapat memulihkan keranjang yang valid; kegagalan `localStorage` tidak menghentikan penggunaan katalog.
- Pada layar ponsel, halaman tidak mengalami gulir horizontal yang tidak diperlukan dan seluruh kontrol utama dapat digunakan dengan keyboard.

## 8. Metrik keberhasilan

Target berikut merupakan sasaran awal, bukan hasil pengukuran:

| Metrik | Target awal | Cara ukur |
|---|---|---|
| Keberhasilan tugas | Minimal 4 dari 5 peserta dapat menyusun pengajuan tanpa bantuan | Uji tugas dengan calon pengguna |
| Waktu menyusun pengajuan | Median maksimal 3 menit | Uji dari katalog hingga ringkasan |
| Kelengkapan permintaan | Minimal 90% permintaan mencantumkan produk, jumlah, dan kontak | Rekap manual selama 30 hari |
| Akurasi estimasi | Seluruh skenario hitung yang disepakati lolos | Pemeriksaan kasus hitung sebelum rilis |
| Kemudahan seluler | Alur utama berhasil pada lebar 360, 768, dan 1280 px | Pemeriksaan responsif |

Website MVP tidak memasang analitik atau pelacak. Membuka WhatsApp tidak dihitung sebagai transaksi berhasil.

## 9. Risiko dan dependensi

Katalog dapat tidak sesuai dengan stok sebenarnya; tampilkan keterangan bahwa stok harus dikonfirmasi. Foto produk harus memiliki izin penggunaan. Harga, ukuran, merek, spesifikasi, garansi, alamat, jam operasional, nomor WhatsApp, biaya pengiriman, dan kebijakan pengembalian harus disediakan atau disetujui pengelola sebelum rilis.
