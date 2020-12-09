import moment from "moment";

export const fakultasValues = [
  "Fakultas Hukum",
  "Fakultas Ekonomi dan Bisnis",
  "Fakultas Pertanian",
  "Fakultas Teknik",
  "Fakultas Ilmu Sosial dan Ilmu Budaya",
  "Fakultas Ilmu Pendidikan",
  "Fakultas Keislaman",
];
export const startDate = new Date(2020, 11, 18, 8, 0, 0);
export const endDate = new Date(2020, 11, 18, 13, 0, 0);

export const formatDate = (v) =>
  moment(v).format("YYYY/MM/DD H:mm:ss A") + " GMT+7";

export const alphabetOnly = (v) => v.replace(/[^a-zA-Z]+/g, "");
export const last3Letters = (v) => v.substr(v.length - 3);
export const presmaValues = [
  "Pasangan calon nomor urut 1",
  "Pasangan calon nomor urut 2",
  "Pasangan calon nomor urut 3",
];

export const dpmValues = [
  "Calon DPM nomor urut 1",
  "Calon DPM nomor urut 2",
  "Calon DPM nomor urut 3",
  "Calon DPM nomor urut 4",
];
