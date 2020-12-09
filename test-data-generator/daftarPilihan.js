const columns = [
  "Cap waktu",
  "Nama pengguna",
  "SAYA MENGGUNAKAN HAK PILIH DALAM PEMILU E-VOTE SECARA SADAR DAN TANPA TEKANAN DARI SIAPAPUN.",
  "Asal Fakultas",
  "Masukkan tiga huruf terakhir nama ibu",
  "Silahkan pilih calon Presiden dan Wakil Presiden Mahasiswa 2020",
  "Silahkan pilih calon DPM Dapil Fakultas Hukum",
  "Silahkan pilih calon DPM Dapil Fakultas Ekonomi dan Bisnis",
  "Silahkan pilih calon DPM Dapil Fakultas Pertanian",
  "Silahkan pilih calon DPM Dapil Fakultas Teknik",
  "Silahkan pilih calon DPM Dapil Fakultas Ilmu Sosial dan Ilmu Budaya",
  "Silahkan pilih calon DPM Dapil Fakultas Ilmu Pendidikan",
  "Silahkan pilih calon DPM Dapil Fakultas Keislaman",
];

const generate = (
  count,
  {
    waktu,
    email,
    persetujuan,
    fakultas,
    namaIbu,
    presma,
    dpmFH,
    dpmFEB,
    dpmFP,
    dpmFT,
    dpmFISIB,
    dpmFIP,
    dpmFkis,
  }
) => {
  const records = [];
  for (let i = 0; i < count; i++) {
    records.push({
      "Cap waktu": waktu(i),
      "Nama pengguna": email(i),
      "SAYA MENGGUNAKAN HAK PILIH DALAM PEMILU E-VOTE SECARA SADAR DAN TANPA TEKANAN DARI SIAPAPUN.": persetujuan(
        i
      ),
      "Asal Fakultas": fakultas(i),
      "Masukkan tiga huruf terakhir nama ibu": namaIbu(i),
      "Silahkan pilih calon Presiden dan Wakil Presiden Mahasiswa 2020": presma(
        i
      ),
      "Silahkan pilih calon DPM Dapil Fakultas Hukum": dpmFH(i),
      "Silahkan pilih calon DPM Dapil Fakultas Ekonomi dan Bisnis": dpmFEB(i),
      "Silahkan pilih calon DPM Dapil Fakultas Pertanian": dpmFP(i),
      "Silahkan pilih calon DPM Dapil Fakultas Teknik": dpmFT(i),
      "Silahkan pilih calon DPM Dapil Fakultas Ilmu Sosial dan Ilmu Budaya": dpmFISIB(
        i
      ),
      "Silahkan pilih calon DPM Dapil Fakultas Ilmu Pendidikan": dpmFIP(i),
      "Silahkan pilih calon DPM Dapil Fakultas Keislaman": dpmFkis(i),
    });
  }
  return records
};

export default {
  columns,
  generate,
};
