export function parseData(data: any[][]) {
  const result: any[][] = [];

  for (const row of data) {
    const parsedRow: any[] = [];

    for (const col of row) {
      const parsedValue = Number(col);
      if (col === "") {
        parsedRow.push(NaN);
      } else if (!isNaN(parsedValue)) {
        parsedRow.push(parsedValue);
      } else {
        parsedRow.push(col); // Keep original value if not a number
      }
    }

    result.push(parsedRow);
  }

  return result;
}
