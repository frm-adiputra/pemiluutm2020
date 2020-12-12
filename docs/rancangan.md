# Rancangan

> DOKUMEN INI ADALAH DOKUMEN PENDUKUNG PENGEMBANGAN PERANGKAT LUNAK.
> ISI DARI DOKUMEN INI HANYA UNTUK KEPENTINGAN PENGEMBANGAN PERANGKAT LUNAK.

Rancangan yang akan dibahas secara detail dalam dokumen ini adalah rancangan
untuk aplikasi penghitung suara.

## Arsitektur

Ada tiga komponen utama dalam sistem e-Vote ini, yaitu:

- Media pemungut suara
- Aplikasi penghitung suara
- Aplikasi penampil hasil penghitungan

### Media Pemungut Suara

Dalam sistem ini akan digunakan Google Forms sebagai media pemungut suara.
Beberapa hal yang menjadi dasar pertimbangan ini adalah:

1. Kemampuan server UTM masih kurang untuk menangani jumlah peserta yang banyak
dalam waktu yang singkat. Google terbukti memiliki infrastruktur yang dapat 
digunakan oleh sangat banyak pengguna namun tetap aman dan nyaman.
2. Netralitas Google. Google tidak memiliki kepentingan dalam pemungutan suara
ini, sehingga akan lebih aman dari kepentingan pihak-pihak tertentu.

Google Forms yang akan digunakan untuk pemungutan suara adalah form yang dibuat
melalui akun milik KPUM UTM.
Form pemungutan suara tersebut akan dibatasi hanya dapat diakses oleh civitas
akademik UTM.
Sehingga untuk dapat mengakses form pemungutan suara tersebut, pemilih harus
menggunakan akun email kampus miliknya.
Form pemungutan suara akan dibuka dan ditutup secara manual oleh KPUM UTM.

### Aplikasi Penghitung Suara

Aplikasi penghitung suara memiliki fungsi sebagai berikut:

- Memfilter dan memverifikasi bahwa suara diberikan oleh pemilih yang ada
dalam daftar pemilih dan dilakukan pada rentang waktu pemungutan suara.
- Melakukan penghitungan suara.
- Menjamin kerahasiaan suara dan data pribadi.

Rancangan detail dari aplikasi ini dibahas pada bagian
[ini](#rancangan-aplikasi-penghitung-suara)

### Aplikasi Penampil Hasil Penghitungan

Sesuai dengan namanya, aplikasi ini berfungsi sebagai frontend yang menampilkan
hasil penghitungan suara.
Data yang ditampilkan oleh aplikasi ini adalah data yang dihasilkan oleh
aplikasi penghitung.

## Rancangan Aplikasi Penghitung Suara

### Strategi Penghitungan

Hal yang menjadi pertimbangan utama dalam mekanisme penghitungan adalah
prosesnya harus minim intervensi manusia (semi-automatic).
Dengan minimnya intervensi manusia, diharapkan kerahasiaan dapat terjamin.
Untuk dapat mengakomodir pertimbangan tersebut, maka strategi penghitungan suara
dalam aplikasi ini adalah sebagai berikut:

- Menggunakan database sebagai penampung data. Semua data yang dibutuhkan dalam
penghitungan harus dimasukkan/diimpor ke dalam database.
- Penghitungan dilakukan melalui fungsi-fungsi aggregasi pada database dan
disajikan dalam bentuk _database view_.
- Aplikasi yang akan menampilkan hasil penghitungan cukup mengakses
_database view_ yang ada

### Sumber-Sumber Data

Aplikasi penghitung suara ini membutuhkan data-data sebagai berikut:

- __Daftar Pemilih__ adalah data yang berisi identitas pemilih. Suara dianggap
sah apabila pemilihnya tercatat pada daftar tersebut.
- __Data Verifikasi__ adalah data yang akan digunakan untuk memverifikasi
akun yang digunakan untuk memilih suara benar dilakukan oleh pemilik akun
sebenarnya.
- __Daftar Pilihan__ adalah data hasil pemungutan suara yang dilakukan melalui
Google Forms
- __Daftar Paslon Presma dan Calon DPM__

### Perlindungan Kerahasiaan Suara dan Data Pribadi

Dalam aplikasi penghitung suara, ada beberapa hal yang menjadi pertimbangan
untuk melindungi kerahasiaan dan data pribadi pemilih.
Pertimbangan-pertimbangan tersebut adalah sebagai berikut:

- Identitas pemilih harus dirahasiakan, namun harus tetap dapat dibuktikan
bahwa pemilih tersebut ada pada daftar pemilih.
- Data pribadi yang digunakan untuk memverifikasi identitas pemilih juga harus
dirahasiakan, namun juga tetap harus dapat digunakan untuk memverifikasi.

Strategi yang digunakan serupa dengan strategi pengamanan database yang
menyimpan data password pengguna.
Password dalam database tidak disimpan apa adanya, namun terlebih dahulu
di-_hash_.
Sehingga database administrator walaupun dapat mengakses data tersebut tetap
tidak dapat menebak apa password sebenarnya.

Pada aplikasi ini, yang akan di-_hash_ adalah identitas dan data pribadi
pemilih.
Namun penggunaan _hash_ saja tidak cukup.
_Hash_ hanya dapat menyembunyikan data.
Apabila data yang di-_hash_ sudah diketahui sebelumnya, misal NIM dari pemilih,
maka siapapun yang mengetahui NIM tersebut akan dapat mengetahui nilai
_hash_-nya.
Oleh karena itu, pada aplikasi ini, tidak sekedar menggunakan _hash_ saja.
Aplikasi akan menambahkan dengan _salt_ (teks rahasia) sebelum data di-_hash_.

_Salt_ akan dibangkitkan secara acak oleh aplikasi dan kemudian akan dihapus
setelah digunakan pada seluruh data yang akan di-_hash_.
Selama _salt_ belum dihapus oleh aplikasi (sedang digunakan), siapapun dan
dengan alasan apapun tidak diperkenankan membuka file yang berisi data _salt_
tersebut.
Oleh karena itu, selama proses penghitungan suara, harus dipastikan agar jangan
sampai nilai _salt_ diketahui oleh siapapun.

Proses pemberian _salt_ dan penghasilan nilai _hash_ tersebut harus dilakukan
sebelum data disimpan ke dalam database.
Pada database, data identitas dan data pribadi akan disimpan sebagai nilai
_hash_-nya.
Artinya dalam database sudah tidak ada lagi data yang perlu dirahasiakan.

Setelah semua data berada dalam database, sumber-sumber data yang berisi data
identitas dan data pribadi harus dihapus.
Sehingga tidak ada lagi data rahasia yang tertinggal.

### Algoritme Penentuan Suara Sah

Algoritme ini dibuat berdasarkan rules yang telah dijelaskan pada bagian
[analisis](analisis#penentuan-suara-sah)

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
3. Pengisi Google Forms mengisikan pilihan DPM pada dapil yang benar (fakultas sesuai dengan yang tercatat
dalam daftar pemilih)
4. Pengisi mengisikan Google Forms dalam rentang waktu yang telah ditentukan
