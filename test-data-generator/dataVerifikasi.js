const columns = ["nim", "nama ibu"];
const generate = (count, { nim, namaIbu }) => {
  const records = [];
  for (let i = 0; i < count; i++) {
    records.push({
      nim: nim(i),
      "nama ibu": namaIbu(i),
    });
  }
  return records;
};

export default {
  columns,
  generate,
};
