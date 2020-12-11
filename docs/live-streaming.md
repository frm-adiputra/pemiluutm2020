# Live Streaming

1. Sebelum eksekusi, tunjukkan bahwa database tidak berisi tabel, dengan kata lain masih kosong.
2. Clone aplikasi penghitung
3. Clone aplikasi penampil
4. Download data dari Google Form. Letakkan dalam aplikasi penghitung. Insights yang ditampilkan pada Google Forms bukanlah hasil akhir, karena belum diverifikasi.
5. Letakkan data daftar pemilih dan letakkan dalam aplikasi penghitung.
6. Setup koneksi database aplikasi penghitung
7. Setup koneksi database aplikasi penampil
8. Jalankan dan tunjukkan aplikasi penampil hasil penghitungan suara yang masih error karena tidak bisa mengakses database.
9. Inisiasi aplikasi penghitung
10. Matikan koneksi internet
11. Jalankan aplikasi penghitung. Pastikan tidak ada error.
12. Jalankan script untuk melakukan pembersihan inputan data. Data pilihan pemilih dan file _salt_ dihapus agar kerahasiaan pemilih tetap terjaga (data ini tetap ada pada database hanya saja sudah di-hash). Data sumber verifikasi dihapus untuk menjaga data pribadi pemilih tetap aman (data ini tetap ada pada database hanya saja sudah dalam bentuk yang sulit ditebak isi data aslinya).
13. Hidupkan koneksi internet
14. Commit data ke Github, agar hasil tersimpan di forum publik. Data yang di-commit sudah dipastikan tidak membuka rahasia dan data privacy. JANGAN LUPA pada .gitignore hapus /out/
15. Hapus data dari Google Forms untuk menjaga kerahasiaan suara.
16. Matikan koneksi internet
17. Jalankan aplikasi penampil
