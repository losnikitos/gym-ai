import { promises as fs } from "fs";

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export default async function readTsv(path) {
  const fileContent = await fs.readFile(path, "utf-8");
  const rows = fileContent.trim().split("\n");
  const columnNames = rows[0].split("\t");
  const firstDataRow = rows[1].split("\t");
  const columnTypes = firstDataRow.map((value) =>
    isNumeric(value) ? "number" : "string"
  );

  return rows.slice(1).map((row) => {
    const values = row.split("\t");
    return columnNames.reduce((obj, col, index) => {
      const rawValue = values[index];
      const parsedValue =
        columnTypes[index] === "number" ? parseFloat(rawValue) : rawValue;
      obj[col] = parsedValue;
      return obj;
    }, {});
  });
}
