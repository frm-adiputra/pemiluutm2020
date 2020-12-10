const columns = ["NIM", "PRODI", "FAKULTAS"];
const generate = (count, { nim, prodi, fakultas }) => {
  const records = [];
  for (let i = 0; i < count; i++) {
    records.push({
      NIM: nim(i),
      PRODI: prodi(i),
      FAKULTAS: fakultas(i),
    });
  }
  return records
};

export default {
  columns,
  generate
}
