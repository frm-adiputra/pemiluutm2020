# Penghitung Suara | Pemilu Mahasiswa UTM

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
- [Prosedur Live Streaming](docs/live-streaming.md)

## Requirements

- Go 1.15+
- Node 14+
- PostgreSQL 9+

## Setup

Clone repository ini.
Buat file `db.yaml` pada project root.
File `db.yaml` berisi konfigurasi koneksi database, dengan contoh pengisiannya dapat dilihat pada file `db.example.yaml`.

Secara default, aplikasi ini berjalan dalam mode testing.
Untuk menjalankan dalam mode production, baca penjelasan pada bab [Production](#production).

### Testing/Ujicoba

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

### Production

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

## Inisiasi

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

## Impor Data

Jalankan perintah berikut ini untuk mengimpor data ke dalam database.
Apabila database telah berisi data maka data yang ada akan dihapus terlebih dahulu.

```bash
go run . allUp
```

Setelah menjalankan perintah di atas, semua data akan berada dalam database dan hasil penghitungan dapat dilihat melalui berbagai _view_ yang ada.
