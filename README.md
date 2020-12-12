# Aplikasi Penghitung Suara | Pemilu Mahasiswa UTM

Aplikasi ini adalah aplikasi penghitung suara yang digunakan dalam Pemilu mahasiswa UTM 2020.

Aplikasi ini dikembangkan dengan menggunakan tool [frm-adiputra/csv2postgres](https://github.com/frm-adiputra/csv2postgres).
Sehingga pada dasarnya, aplikasi ini adalah aplikasi untuk membuat _table_ dan _view_ pada PostgreSQL serta mengimpor data ke dalamnya.

Untuk melakukan penghitungan suara, aplikasi ini akan melakukan hal-hal sebagai berikut:

1. Inisiasi: generate _salt_, generate kode program untuk mengolah database.
1. Membuat berbagai _table_ dan _view_ pada database.
2. Mengimpor berbagai data pemilu ke dalam database.

Hasil penghitungan akan dapat dilihat melalui berbagai _view_ yang ada pada
database.

## Dokumen-Dokumen Pendukung

Dokumen ini adalah petunjuk penggunaan dari aplikasi penghitung suara.
Dokumen-dokumen lainnya terkait aplikasi ini dapat dilihat melalui link berikut:

- [Analisis](docs/analisis.md)
- [Rancangan](docs/rancangan.md)
- [Implementasi](docs/implementasi.md)
- [Prosedur Live Streaming](docs/live-streaming.md)

## Requirements

- Go 1.15+
- Node 14+
- PostgreSQL 9+

## Petunjuk Penggunaan

### Setup

Clone repository ini.
Buat file `db.yaml` pada project root.
File `db.yaml` berisi konfigurasi koneksi database, dengan contoh pengisiannya dapat dilihat pada file `db.example.yaml`.

Secara default, aplikasi ini berjalan dalam mode testing.
Untuk menjalankan dalam mode production, baca penjelasan pada bab [Production](#production).

Buat _schema_ pada database dengan nama `tahap1`.

#### Testing/Ujicoba

Selama berjalan dalam mode testing, aplikasi ini akan menggunakan data-data yang ada pada folder `test-data`.
Folder `test-data` pada awalnya tidak akan berisi seluruh data yang dibutuhkan untuk testing.
Untuk meng-generate data testing pada folder tersebut, jalankan perintah berikut:

```bash
# instalasi dependency
# (membutuhkan koneksi internet untuk mengunduh dependency)
npm install

# generate data ujicoba
npm run gen
```

#### Production

Untuk menjalankan dalam mode production ada beberapa hal yang harus dilakukan.

Dalam folder `data` sediakan file-file berikut ini:

- `daftar-pemilih.csv`: berisi daftar pemilih
- `data-verifikasi.csv`: berisi data yang dibutuhkan untuk memverifikasi pemilih
- `PEMILIHAN UMUM MAHASISWA ELECTRONIC VOTE UNIVERSITAS TRUNOJOYO MADURA 2020.csv`: berisi data respon yang diunduh dari Google Forms
- `ref-paslon-presma.csv`: berisi daftar paslon presma
- `ref-calon-dpm-fh.csv`: berisi daftar calon DPM dapil FH
- `ref-calon-dpm-feb.csv`: berisi daftar calon DPM dapil FEB
- `ref-calon-dpm-fp.csv`: berisi daftar calon DPM dapil FP
- `ref-calon-dpm-ft.csv`: berisi daftar calon DPM dapil FT
- `ref-calon-dpm-fisib.csv`: berisi daftar calon DPM dapil FISIB
- `ref-calon-dpm-fip.csv`: berisi daftar calon DPM dapil FIP
- `ref-calon-dpm-fkis.csv`: berisi daftar calon DPM dapil FKis

Edit file-file berikut ini dengan cara mengganti isian pada field `csv` yang awalnya merujuk ke file yang ada dalam folder `test-data` dengan merujuk ke file yang ada dalam folder `data`:

- `tables/daftar_pemilih.yaml`
- `tables/daftar_pilihan.yaml`
- `tables/data_verifikasi.yaml`
- `tables/ref_paslon_presma.yaml`
- `tables/ref_calon_dpm_fh.yaml`
- `tables/ref_calon_dpm_feb.yaml`
- `tables/ref_calon_dpm_fp.yaml`
- `tables/ref_calon_dpm_ft.yaml`
- `tables/ref_calon_dpm_fisib.yaml`
- `tables/ref_calon_dpm_fip.yaml`
- `tables/ref_calon_dpm_fkis.yaml`

Setelah melakukan hal-hal di atas, silahkan melanjutkan ke proses inisiasi.

### Inisiasi

Sebelum melakukan langkah inisiasi, ikuti terlebih dahulu langkah-langkah yang ada pada bab [Setup](#setup) sesuai dengan mode eksekusi yang diinginkan (testing atau production).

```bash
# Kedua perintah berikut ini membutuhkan koneksi internet
# untuk mengunduh dependency

# Meng-generate kode program untuk mengolah database
go generate .

# Perintah ini akan mengeksekusi program tanpa benar-benar
# melakukan impor data ke database.
# Pastikan perintah ini berjalan tanpa ada error
go run . --dry-run allUp
```

### Impor Data

Jalankan perintah berikut ini untuk mengimpor data ke dalam database.
_Database schema_ yang menjadi target dari impor data ini adalah _schema_ dengan
nama `tahap1` yang ada pada database yang ditentukan dalam file `db.yaml`.
Apabila database telah berisi data maka, data yang ada akan dihapus terlebih
dahulu.

```bash
go run . allUp
```

Setelah menjalankan perintah di atas, semua data akan berada dalam database dan
hasil penghitungan dapat dilihat melalui berbagai _view_ yang ada.

### Hasil Penghitungan

Setelah impor data dilakukan, maka hasil penghitungan akan dapat dilihat pada
beberapa _database view_ berikut ini (dalam _schema_ `tahap1`):

#### `vw_pilihan`

`vw_pilihan` adalah _view_ yang mempresentasikan data pilihan setiap pemilih.
Dalam _view_ ini juga ditampilkan status dari setiap persyaratan sahnya suara.
_View_ ini juga diekspor ke dalam file dalam format CSV dengan nama `out/vw_pilihan.csv`.

Berikut ini adalah penjelasan setiap _field_ yang ada di dalamnya:

- `suara_presma_sah`: akan bernilai `true` bila semua persyaratan suara sah
untuk pilihan Presma terpenuhi.
- `alasan_suara_presma_tidak_sah`: berisi alasan suara pilihan Presma ini
dianggap tidak sah.
- `suara_dpm_sah`: akan bernilai `true` bila semua persyaratan suara sah
untuk pilihan Presma terpenuhi.
- `alasan_suara_dpm_tidak_sah`: berisi alasan suara pilihan DPM ini dianggap
tidak sah.
- `waktu`: waktu pemilih men-submit pilihannya.
- `dalam_waktu_pemungutan`: akan bernilai `true` jika pemilih men-submit
pilihannya dalam rentang waktu yang ditentukan.
- `nim_email_hashed`: nilai _hash_ dari alamat email pemilih (email mahasiswa adalah NIM dengan domain @student.trunojoyo.ac.id)
- `jenis_email`: berisi nilai `student` apabila domain email yang digunakan
pemilih adalah domain email untuk student. Selain itu akan bernilai `bukan student`
- `input_fakultas`: nama fakultas yang diinputkan oleh pemilih (oleh aplikasi
dikonversi menjadi singkatannya).
- `fakultas_tercatat`: nama fakultas yang tercatat pada daftar pemilih (oleh
aplikasi dikonversi menjadi singkatannya).
- `terdaftar`: akan bernilai `true` jika dan hanya jika NIM tercatat pada daftar pemilih dan email yang digunakan adalah email student.
- `fakultas_benar`: akan bernilai `true` jika dan hanya jika fakultas yang diinputkan oleh pemilih sama dengan fakultas yang tercatat pada daftar pemilih.
- `input_verifikasi_hashed`: berisi data yang diinputkan oleh pemilih untuk kebutuhan verifikasi yang telah di-_hash_.
- `sumber_verifikasi_hashed`: berisi data yang disediakan oleh KPUM untuk kebutuhan verifikasi pemilih (data telah di-_hash_).
- `verified`: akan bernilai `true` jika dan hanya jika `input_verifikasi_hashed` berisi data yang sama dengan `sumber_verifikasi_hashed`.
- `dapil_sesuai`: akan bernilai `true` jika dan hanya jika pemilih memberikan suara pilihan DPM-nya pada dapil yang sesuai dengan fakultas yang tercatat pada daftar pemilih.
- `pilihan_presma`: berisi paslon Presma yang dipilih.
- `pilihan_dpm_fh`: berisi calon DPM yang dipilih.
- `pilihan_dpm_feb`: berisi calon DPM yang dipilih.
- `pilihan_dpm_fp`: berisi calon DPM yang dipilih.
- `pilihan_dpm_ft`: berisi calon DPM yang dipilih.
- `pilihan_dpm_fisib`: berisi calon DPM yang dipilih.
- `pilihan_dpm_fip`: berisi calon DPM yang dipilih.
- `pilihan_dpm_fkis`: berisi calon DPM yang dipilih.

#### `vw_hasil_presma`

_View_ ini mempresentasikan data hasil penghitungan suara untuk Presma.
Dalam _view_ ini akan ditampilkan dua kategori suara, yaitu suara sah dan suara
tidak sah.
Pada kategori suara sah, akan ditunjukkan daftar nama paslon serta jumlah dan persentase suaranya.
Pada kategori suara tidak sah, akan ditunjukkan daftar alasan serta jumlah dan persentase suaranya.
_View_ ini juga diekspor ke dalam file dalam format CSV dengan nama `out/vw_hasil_presma.csv`.

Berikut ini adalah penjelasan setiap _field_ yang ada di dalamnya:

- `sah`: bernilai `true` untuk kategori suara sah, dan `false` untuk kategori suara tidak sah.
- `suara`: untuk kategori suara sah akan berisi nama-nama paslon dan untuk kategori suara tidak sah berisi alasan suara tidak sah.
- `jumlah`: jumlah suara yang masuk dalam kategori
- `persentase_dari_suara_sah`: persentase jumlah suara bila dihitung berdasarkan jumlah suara sah.
- `persentase_dari_seluruh_suara`: persentase jumlah suara bila dihitung berdasarkan jumlah total suara (baik sah maupun tidak).

#### `vw_hasil_dpm`

_View_ ini mempresentasikan data hasil penghitungan suara untuk DPM.
Dalam _view_ ini, untuk setiap dapil akan ditampilkan dua kategori suara, yaitu suara sah dan suara
tidak sah.
Pada kategori suara sah, akan ditunjukkan daftar nama calon serta jumlah dan persentase suaranya.
Pada kategori suara tidak sah, akan ditunjukkan daftar alasan serta jumlah dan persentase suaranya.

Khusus untuk kategori suara tidak sah dengan alasan "(a) Tidak terdaftar dalam daftar pemilih", tidak akan ditampilkan per fakultas.
Karena pemilih yang tidak terdaftar tidak dapat diverifikasi kebenaran dapilnya.

_View_ ini juga diekspor ke dalam file dalam format CSV dengan nama `out/vw_hasil_dpm.csv`.

Berikut ini adalah penjelasan setiap _field_ yang ada di dalamnya:

- `fakultas`: dapil fakultas
- `sah`: bernilai `true` untuk kategori suara sah, dan `false` untuk kategori suara tidak sah.
- `suara`: untuk kategori suara sah akan berisi nama-nama calon dan untuk kategori suara tidak sah berisi alasan suara tidak sah.
- `jumlah`: jumlah suara yang masuk dalam kategori
- `persentase_dari_suara_sah_dalam_dapil`: persentase jumlah suara bila dihitung berdasarkan jumlah suara sah dalam dapil.
- `persentase_dari_seluruh_suara_dalam_dapil`: persentase jumlah suara bila dihitung berdasarkan jumlah total suara dalam dapil (baik sah maupun tidak).
