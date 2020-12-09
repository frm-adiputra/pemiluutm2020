# Catatan

## PENTING

__Yang harus dilakukan sebelum rilis ke publik__

Ganti referensi ke file dalam folder `test-data` menjadi ke folder `data`.
File-file yang harus di-edit adalah:

- tables/daftar_pemilih.yaml
- tables/daftar_pilihan.yaml
- tables/data_verifikasi.yaml

Daftar nama fakultas pada file-file berikut ini harus disesuaikan dengan daftar nama
fakultas yang ada pada daftar pemilih:

- views/vw_pilihan.yaml

Filter batas waktu harus diperbarui pada file:

- views/vw_pilihan.yaml

__Pengecekan terhadap data hasil pemungutan suara__

- Adakah yang tidak menyetujui pernyataan?
- Berapa banyak yang data verifikasinya tidak sesuai?
- Berapa banyak yang melakukan pengisian di luar waktu pemungutan?
-

## Install dependencies

```bash
go get github.com/frm-adiputra/csv2postgres
```

## Penentuan sahnya suara

Secara berurutan dilakukan pengecekan kondisi pada data, jika menemukan kondisi
yang tidak terpenuhi maka suara dianggap tidak sah dan kodisi berikutnya tidak
akan dicek.

Berikut ini adalah urutan pengecekan untuk pemilihan Presma:

1. Pengisi Google Forms terdaftar dalam daftar pemilih. NIM pada alamat email
tercatat pada daftar pemilih dan alamat email menggunakan domain
student.trunojoyo.ac.id
2. Data verifikasi yang diisikan sama dengan data yang ada pada sumber data verifikasi
3. Pengisi mengisikan Google Forms dilakukan dalam rentang waktu yang telah ditentukan

Berikut ini adalah urutan pengecekan untuk pemilihan DPM:

1. Pengisi Google Forms terdaftar dalam daftar pemilih. NIM pada alamat email
tercatat pada daftar pemilih dan alamat email menggunakan domain
student.trunojoyo.ac.id
2. Data verifikasi yang diisikan sama dengan data yang ada pada sumber data verifikasi
3. Pengisi Google Forms mengisikan data fakultas sesuai dengan yang tercatat
dalam daftar pemilih
4. Pengisi mengisikan Google Forms dalam rentang waktu yang telah ditentukan

## Usaha menjaga kerahasiaan

### Penghilangan identitas

#### NIM akan di-hash

NIM akan di-hash dan hasil hash-nya yang akan disimpan dalam database.
NIM tidak akan pernah disimpan dalam database.
Proses hash juga akan menerapkan _salt_.
Nilai hash dari suatu NIM tidak akan diketahui tanpa juga mengetahui nilai dari _salt_.
Nilai _salt_ akan di-generate otomatis sesaat sebelum data disimpan ke database.
Nilai _salt_ disimpan pada file `.salt` dan harus segera dihapus (tanpa melihat isinya) sesaat setelah data disimpan ke database.

- Melalui kode dalam NIM akan dikonversi menjadi data Fakultas dan Prodi

### Penghilangan data privacy

Data nama ibu dari SIAKAD hanya akan diambil tiga huruf terakhir (tanda baca dan spasi dihilangkan)

### Penghapusan data input

- Setelah data pilihan diolah, data input pemungutan suara akan dihapus untuk menjaga kerahasiaan pemilih
- Data dasar validasi tetap dipertahankan, sampai tahap terakhir pemilu raya

## Live stream

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
14. Commit data ke Github, agar hasil tersimpan di forum publik. Data yang di-commit sudah dipastikan tidak membuka rahasia dan data privacy.
15. Hapus data dari Google Forms untuk menjaga kerahasiaan suara.
16. Matikan koneksi internet
17. Jalankan aplikasi penampil
