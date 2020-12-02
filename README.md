# Catatan

## Install dependencies

```bash
go get github.com/frm-adiputra/csv2postgres
```

## Filtering

- Isian suara yang dilakukan setelah waktu yang ditentukan dianggap tidak sah
- Isian suara yang berasal dari luar data pemilih dianggap tidak sah
- Isian suara yang salah dalam mengisikan data verifikasi dianggap tidak sah
- Isian suara yang salah dalam memilih fakultas/prodi dianggap tidak sah

## Usaha menjaga kerahasiaan

### Penghilangan identitas

- NIM akan di-hash hasil hash yang akan disimpan dalam database
- Melalui kode dalam NIM akan dikonversi menjadi data Fakultas dan Prodi

- WARNING: ternyata hash tidak dapat digunakan, karena bila ingin mencari pilihan dari suatu NIM cukup me-hash NIM tersebut dan mencari hasil hash-nya pada database. Kecuali pakai salt yang dirandom.

- salt.go harus dihapus tanpa pernah melihat isinya

### Penghilangan data privacy

- Data nama ibu dari SIAKAD akan dihash
- Data nama ibu dari inputan akan dihash
- Hasil hash yang akan dibandingkan untuk menentukan validitas data. Serupa dengan mekanisme standard pengecekan password

### Penghapusan data input

- Setelah data pilihan diolah, data input pemungutan suara akan dihapus untuk menjaga kerahasiaan pemilih
- Data dasar validasi tetap dipertahankan, sampai tahap terakhir pemilu raya

## Live stream

- Sebelum eksekusi, tunjukkan bahwa database tidak berisi tabel, dengan kata lain masih kosong.
