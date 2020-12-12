# Implementasi

Aplikasi penghitung suara ini diimplementasikan berdasarkan rancangan yang telah dibuat.
Database yang digunakan adalah PostgreSQL.
Untuk pengelolaan database digunakan tool yaitu [frm-adiputra/csv2postgres](https://github.com/frm-adiputra/csv2postgres).
Tool tersebut berguna untuk menghasilkan program yang akan membuat _table_ dan _view_ pada PostgreSQL, serta melakukan import data dari sumber data dalam format CSV ke dalam database.

## Struktur Direktori Program

Berikut ini adalah direktori-direktori yang mengelompokkan file-file program ini:

- `data`: direktori ini berisi file sumber-sumber data dalam format CSV yang akan diimpor ke dalam database.
- `docs`: direktori ini berisi file dokumentasi dalam format Markdown.
- `helper`: direktori ini berisi kode program untuk membantu tool [frm-adiputra/csv2postgres](https://github.com/frm-adiputra/csv2postgres) dalam melakukan konversi data sebelum data disimpan ke database. Kode program dalam direktori ini menggunakan bahasa pemrograman Go. Silahkan dibaca komentar-komentar yang ada dalam kode program tersebut untuk mendapatkan penjelasan lebih detail.
- `internal`: direktori ini berisi kode-kode program yang di-_generate_ oleh [frm-adiputra/csv2postgres](https://github.com/frm-adiputra/csv2postgres) untuk melakukan pengelolaan database dan impor data. Direktori ini hanya akan ada setelah langkah inisiasi dilakukan (baca penjelasan dalam [Petunjuk Penggunaan | Inisiasi](../README.md#inisiasi)).
- `node_modules`: direktori ini berisi _library_/_package_ yang dibutuhkan oleh program generator data untuk testing. Direktori ini hanya akan ada setelah langkah testing/ujicoba dilakukan (baca penjelasan dalam [Petunjuk Penggunaan | Testing/Ujicoba](../README.md#testing-ujicoba))

## Implementasi Impor Data

Sumber data yang berupa file dalam format CSV akan diimpor ke database oleh tool [frm-adiputra/csv2postgres](https://github.com/frm-adiputra/csv2postgres).
File sumber data disimpan dalam foler `data`.
Konfigurasi impor data ini ditentukan melalui file konfigurasi yang ada dalam folder `tables`.
Setiap file YAML yang ada dalam folder tersebut akan menghasilkan sebuah table pada database dan menentukan bagaimana data dalam format  
