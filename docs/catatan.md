# Catatan

> DOKUMEN INI ADALAH DOKUMEN PENDUKUNG PENGEMBANGAN PERANGKAT LUNAK.
> ISI DARI DOKUMEN INI HANYA UNTUK KEPENTINGAN PENGEMBANGAN PERANGKAT LUNAK.

## PENTING

__Yang harus dilakukan sebelum rilis ke publik__

Ganti referensi ke file dalam folder `test-data` menjadi ke folder `data`.
File-file yang harus di-edit adalah:

- tables/daftar_pemilih.yaml
- tables/daftar_pilihan.yaml
- tables/data_verifikasi.yaml
- tables/ref_paslon_presma.yaml
- tables/ref_calon_dpm_fh.yaml
- tables/ref_calon_dpm_feb.yaml
- tables/ref_calon_dpm_fp.yaml
- tables/ref_calon_dpm_ft.yaml
- tables/ref_calon_dpm_fisib.yaml
- tables/ref_calon_dpm_fip.yaml
- tables/ref_calon_dpm_fkis.yaml

Daftar nama fakultas pada file-file berikut ini harus disesuaikan dengan daftar nama
fakultas yang ada pada daftar pemilih:

- views/vw_pilihan.yaml

Filter batas waktu harus diperbarui pada file:

- views/vw_pilihan.yaml

Daftar nama paslon presma dan calon DPM harus disesuaikan dengan data aktual

- data/ref-paslon-presma.csv
- data/ref-calon-dpm-fh.csv
- data/ref-calon-dpm-feb.csv
- data/ref-calon-dpm-fp.csv
- data/ref-calon-dpm-ft.csv
- data/ref-calon-dpm-fisib.csv
- data/ref-calon-dpm-fip.csv
- data/ref-calon-dpm-fkis.csv

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
3. Pengisi Google Forms mengisikan pilihan DPM pada dapil yang benar (fakultas sesuai dengan yang tercatat
dalam daftar pemilih)
4. Pengisi mengisikan Google Forms dalam rentang waktu yang telah ditentukan

## Usaha menjaga kerahasiaan

### Penghilangan identitas

#### NIM akan di-hash

Data email yang berisi NIM akan di-hash dan hasil hash-nya yang akan disimpan dalam database.
Data NIM dan email tidak akan pernah disimpan dalam database.
Proses hash juga akan menerapkan _salt_.
Nilai hash dari suatu email tidak akan diketahui tanpa juga mengetahui nilai dari _salt_.
Nilai _salt_ akan di-generate otomatis sesaat sebelum data disimpan ke database.
Nilai _salt_ disimpan pada file `.salt` dan harus segera dihapus (tanpa melihat isinya) sesaat setelah data disimpan ke database.

### Penghilangan data privacy

Data nama ibu dari SIAKAD hanya akan diambil tiga huruf terakhir (tanda baca dan spasi dihilangkan).
Tiga huruf terakhir tersebut juga akan ditambahi _salt_ dan di-hash.

### Penghapusan data input

- Setelah data pilihan diolah, data input pemungutan suara akan dihapus untuk menjaga kerahasiaan pemilih
- Data dasar validasi tetap dipertahankan, sampai tahap terakhir pemilu raya
