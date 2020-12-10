import fs from "fs";
import stringify from "csv-stringify/lib/sync.js";

import faker from "./fakerInit.js";
import {
  startDate,
  middleDate,
  wrongStartDate,
  wrongEndDate,
  formatDate,
  alphabetOnly,
  last3Letters,
  presmaValues,
  dpmValues,
  fakultasValues,
  zigZagMod,
} from "./common.js";

import gDaftarPemilih from "./daftarPemilih.js";
import gDataVerifikasi from "./dataVerifikasi.js";
import gDaftarPilihan from "./daftarPilihan.js";

const daftarPemilihFile = "./test-data/daftar-pemilih.csv";
const dataVerifikasiFile = "./test-data/data-verifikasi.csv";
const daftarPilihanFile =
  "./test-data/PEMILIHAN UMUM MAHASISWA ELECTRONIC VOTE UNIVERSITAS TRUNOJOYO MADURA 2020.csv";

const generateBasedOnFixturesMatrix = (fakultas) => {
  const daftarPemilih = gDaftarPemilih.generate(64, {
    nim: (i) => faker.random.alphaNumeric(12),
    prodi: (i) => "-",
    fakultas: (i) => fakultas,
  });

  const dataVerifikasi = gDataVerifikasi.generate(daftarPemilih.length, {
    nim: (i) => daftarPemilih[i].NIM,
    namaIbu: (i) => faker.name.firstName("female"),
  });

  const fakultasList = [];
  for (let i = 0; i < 64; i++) {
    fakultasList.push(
      zigZagMod(i, 32)
        ? fakultas
        : faker.random.arrayElement(
            fakultasValues.filter((x) => x !== fakultas)
          )
    );
  }

  const dapilList = [];
  for (let i = 0; i < 64; i++) {
    dapilList.push(
      zigZagMod(i, 64)
        ? fakultas
        : faker.random.arrayElement(
            fakultasValues.filter((x) => x !== fakultas)
          )
    );
  }

  const chooseDPMValue = (fakultasDapil, i) => {
    if (zigZagMod(i, 64)) {
      if (fakultas === fakultasDapil) {
        return faker.random.arrayElement(dpmValues);
      } else {
        return "";
      }
    } else {
      if (dapilList[i] === fakultasDapil) {
        return faker.random.arrayElement(dpmValues);
      } else {
        return "";
      }
    }
  };

  const daftarPilihan = gDaftarPilihan.generate(64, {
    email: (i) =>
      (zigZagMod(i, 2) ? daftarPemilih[i].NIM : faker.random.alphaNumeric(12)) +
      (zigZagMod(i, 4) ? "@student.trunojoyo.ac.id" : "@trunojoyo.ac.id"),
    namaIbu: (i) =>
      zigZagMod(i, 8)
        ? last3Letters(alphabetOnly(dataVerifikasi[i]["nama ibu"]))
        : last3Letters(alphabetOnly(dataVerifikasi[i]["nama ibu"]) + "x"),
    waktu: (i) =>
      zigZagMod(i, 16)
        ? formatDate(faker.date.between(startDate, middleDate))
        : formatDate(faker.date.between(wrongStartDate, wrongEndDate)),
    fakultas: (i) => fakultasList[i],
    persetujuan: (i) => "Setuju",
    presma: (i) => faker.random.arrayElement(presmaValues),
    dpmFH: (i) => chooseDPMValue("Fakultas Hukum", i),
    dpmFEB: (i) => chooseDPMValue("Fakultas Ekonomi dan Bisnis", i),
    dpmFP: (i) => chooseDPMValue("Fakultas Pertanian", i),
    dpmFT: (i) => chooseDPMValue("Fakultas Teknik", i),
    dpmFISIB: (i) => chooseDPMValue("Fakultas Ilmu Sosial dan Ilmu Budaya", i),
    dpmFIP: (i) => chooseDPMValue("Fakultas Ilmu Pendidikan", i),
    dpmFkis: (i) => chooseDPMValue("Fakultas Keislaman", i),
  });

  return {
    daftarPemilih,
    dataVerifikasi,
    daftarPilihan,
  };
};

const generateSah = (count) => {
  const daftarPemilih = gDaftarPemilih.generate(count, {
    nim: (i) => faker.random.alphaNumeric(12),
    prodi: (i) => "-",
    fakultas: (i) => faker.random.arrayElement(fakultasValues),
  });

  const dataVerifikasi = gDataVerifikasi.generate(daftarPemilih.length, {
    nim: (i) => daftarPemilih[i].NIM,
    namaIbu: (i) => faker.name.firstName("female"),
  });

  const daftarPilihan = gDaftarPilihan.generate(daftarPemilih.length, {
    waktu: (i) => formatDate(faker.date.between(startDate, middleDate)),
    email: (i) => daftarPemilih[i].NIM + "@student.trunojoyo.ac.id", // + faker.internet.domainName(),
    persetujuan: (i) => "Setuju",
    fakultas: (i) => daftarPemilih[i].FAKULTAS,
    namaIbu: (i) => last3Letters(alphabetOnly(dataVerifikasi[i]["nama ibu"])),
    presma: (i) => faker.random.arrayElement(presmaValues),
    dpmFH: (i) =>
      daftarPemilih[i].FAKULTAS === "Fakultas Hukum"
        ? faker.random.arrayElement(dpmValues)
        : "",
    dpmFEB: (i) =>
      daftarPemilih[i].FAKULTAS == "Fakultas Ekonomi dan Bisnis"
        ? faker.random.arrayElement(dpmValues)
        : "",
    dpmFP: (i) =>
      daftarPemilih[i].FAKULTAS == "Fakultas Pertanian"
        ? faker.random.arrayElement(dpmValues)
        : "",
    dpmFT: (i) =>
      daftarPemilih[i].FAKULTAS == "Fakultas Teknik"
        ? faker.random.arrayElement(dpmValues)
        : "",
    dpmFISIB: (i) =>
      daftarPemilih[i].FAKULTAS == "Fakultas Ilmu Sosial dan Ilmu Budaya"
        ? faker.random.arrayElement(dpmValues)
        : "",
    dpmFIP: (i) =>
      daftarPemilih[i].FAKULTAS == "Fakultas Ilmu Pendidikan"
        ? faker.random.arrayElement(dpmValues)
        : "",
    dpmFkis: (i) =>
      daftarPemilih[i].FAKULTAS == "Fakultas Keislaman"
        ? faker.random.arrayElement(dpmValues)
        : "",
  });

  return {
    daftarPemilih,
    dataVerifikasi,
    daftarPilihan,
  };
};

let allDaftarPemilih = [];
let allDataVerifikasi = [];
let allDaftarPilihan = [];
for (let i = 0; i < fakultasValues.length; i++) {
  const o = generateBasedOnFixturesMatrix(fakultasValues[i]);
  allDaftarPemilih.push(...o.daftarPemilih);
  allDataVerifikasi.push(...o.dataVerifikasi);
  allDaftarPilihan.push(...o.daftarPilihan);
  break;
}

try {
  fs.writeFileSync(
    daftarPemilihFile,
    stringify(allDaftarPemilih, {
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
    stringify(allDataVerifikasi, {
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
    stringify(allDaftarPilihan, {
      columns: gDaftarPilihan.columns,
      header: true,
      quoted: true,
      quoted_empty: true,
    })
  );
} catch (err) {
  console.error(err);
}
