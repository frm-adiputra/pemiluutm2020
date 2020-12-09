import fs from "fs";
import stringify from "csv-stringify/lib/sync.js";

import faker from "./fakerInit.js";
import {
  startDate,
  middleDate,
  endDate,
  formatDate,
  alphabetOnly,
  last3Letters,
  presmaValues,
  dpmValues,
  fakultasValues,
} from "./common.js";

import gDaftarPemilih from "./daftarPemilih.js";
import gDataVerifikasi from "./dataVerifikasi.js";
import gDaftarPilihan from "./daftarPilihan.js";

const daftarPemilihFile = "./test-data/daftar-pemilih.csv";
const dataVerifikasiFile = "./test-data/data-verifikasi.csv";
const daftarPilihanFile =
  "./test-data/PEMILIHAN UMUM MAHASISWA ELECTRONIC VOTE UNIVERSITAS TRUNOJOYO MADURA 2020.csv";

const daftarPemilih = gDaftarPemilih.generate(200, {
  nim: (i) => faker.random.alphaNumeric(12),
  prodi: (i) => "-",
  fakultas: (i) => faker.random.arrayElement(fakultasValues),
});

const dataVerifikasi = gDataVerifikasi.generate(daftarPemilih.length, {
  nim: (i) => daftarPemilih[i].nim,
  namaIbu: (i) => faker.name.firstName("female"),
});

const daftarPilihan = [].concat(
  gDaftarPilihan.generate(daftarPemilih.length, {
    waktu: (i) => formatDate(faker.date.between(startDate, middleDate)),
    email: (i) => daftarPemilih[i].nim + "@student.trunojoyo.ac.id", // + faker.internet.domainName(),
    persetujuan: (i) => "Setuju",
    fakultas: (i) => daftarPemilih[i].fakultas,
    namaIbu: (i) => last3Letters(alphabetOnly(dataVerifikasi[i]["nama ibu"])),
    presma: (i) => faker.random.arrayElement(presmaValues),
    dpmFH: (i) =>
      daftarPemilih[i].fakultas === "Fakultas Hukum"
        ? faker.random.arrayElement(dpmValues)
        : "",
    dpmFEB: (i) =>
      daftarPemilih[i].fakultas == "Fakultas Ekonomi dan Bisnis"
        ? faker.random.arrayElement(dpmValues)
        : "",
    dpmFP: (i) =>
      daftarPemilih[i].fakultas == "Fakultas Pertanian"
        ? faker.random.arrayElement(dpmValues)
        : "",
    dpmFT: (i) =>
      daftarPemilih[i].fakultas == "Fakultas Teknik"
        ? faker.random.arrayElement(dpmValues)
        : "",
    dpmFISIB: (i) =>
      daftarPemilih[i].fakultas == "Fakultas Ilmu Sosial dan Ilmu Budaya"
        ? faker.random.arrayElement(dpmValues)
        : "",
    dpmFIP: (i) =>
      daftarPemilih[i].fakultas == "Fakultas Ilmu Pendidikan"
        ? faker.random.arrayElement(dpmValues)
        : "",
    dpmFkis: (i) =>
      daftarPemilih[i].fakultas == "Fakultas Keislaman"
        ? faker.random.arrayElement(dpmValues)
        : "",
  }),

  // Tidak terdaftar (bukan student)
  gDaftarPilihan.generate(10, {
    waktu: (i) => formatDate(new Date(2020, 11, 18, 10, 0, 0)),
    email: (i) => daftarPemilih[i].nim + "@trunojoyo.ac.id",
    persetujuan: (i) => "Setuju",
    fakultas: (i) => daftarPemilih[i].fakultas,
    namaIbu: (i) => last3Letters(alphabetOnly(dataVerifikasi[i]["nama ibu"])),
    presma: (i) => faker.random.arrayElement(presmaValues),
    dpmFH: (i) =>
      daftarPemilih[i].fakultas === "Fakultas Hukum"
        ? faker.random.arrayElement(dpmValues)
        : "",
    dpmFEB: (i) =>
      daftarPemilih[i].fakultas == "Fakultas Ekonomi dan Bisnis"
        ? faker.random.arrayElement(dpmValues)
        : "",
    dpmFP: (i) =>
      daftarPemilih[i].fakultas == "Fakultas Pertanian"
        ? faker.random.arrayElement(dpmValues)
        : "",
    dpmFT: (i) =>
      daftarPemilih[i].fakultas == "Fakultas Teknik"
        ? faker.random.arrayElement(dpmValues)
        : "",
    dpmFISIB: (i) =>
      daftarPemilih[i].fakultas == "Fakultas Ilmu Sosial dan Ilmu Budaya"
        ? faker.random.arrayElement(dpmValues)
        : "",
    dpmFIP: (i) =>
      daftarPemilih[i].fakultas == "Fakultas Ilmu Pendidikan"
        ? faker.random.arrayElement(dpmValues)
        : "",
    dpmFkis: (i) =>
      daftarPemilih[i].fakultas == "Fakultas Keislaman"
        ? faker.random.arrayElement(dpmValues)
        : "",
  })
);

try {
  fs.writeFileSync(
    daftarPemilihFile,
    stringify(daftarPemilih, {
      columns: gDaftarPemilih.columns,
      header: true,
      quoted: true,
      quoted_empty: true,
    })
  );
} catch (err) {
  console.error(err);
}

try {
  fs.writeFileSync(
    dataVerifikasiFile,
    stringify(dataVerifikasi, {
      columns: gDataVerifikasi.columns,
      header: true,
      quoted: true,
      quoted_empty: true,
    })
  );
} catch (err) {
  console.error(err);
}

try {
  fs.writeFileSync(
    daftarPilihanFile,
    stringify(daftarPilihan, {
      columns: gDaftarPilihan.columns,
      header: true,
      quoted: true,
      quoted_empty: true,
    })
  );
} catch (err) {
  console.error(err);
}
