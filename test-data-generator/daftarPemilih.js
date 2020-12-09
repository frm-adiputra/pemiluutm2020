const columns = ["nim", "prodi", "fakultas"];
const generate = (count, { nim, prodi, fakultas }) => {
  const records = [];
  for (let i = 0; i < count; i++) {
    records.push({
      nim: nim(i),
      prodi: prodi(i),
      fakultas: fakultas(i),
    });
  }
  return records
};

export default {
  columns,
  generate
}
