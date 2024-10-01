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

export function slice2DArrayIntoCols<T>(array: T[][]): T[][] {
  if (array.length === 0) return [];

  const numCols = array[0].length;
  const cols: T[][] = Array.from({ length: numCols }, () => []);

  for (const row of array) {
    for (let colIndex = 0; colIndex < numCols; colIndex++) {
      cols[colIndex].push(row[colIndex]);
    }
  }

  return cols;
}

export function getMarkerColors(columns: any[][]): Map<string, string> {
  const colorMap = new Map<string, string>();

  for (const col of columns) {
    const location = col[0]; // Get the location name
    const color = getMarkerColor(col); // Get the marker color using the previous function
    colorMap.set(location, color); // Map the location to its color
  }

  return colorMap;
}

// Assuming getMarkerColor function is defined as before
export function getMarkerColor(col: any[]): string {
  const numbers = col.filter((item) => !Number.isNaN(Number(item)));

  const [secondLast, last] = numbers.slice(-2);

  if (last > secondLast) {
    return "red";
  } else if (last < secondLast) {
    return "green";
  } else {
    return "yellow";
  }
}

export function filterOutDataForLine(location: string, data: any[][]) {
  const columnIndex = data[0].findIndex((item) => item === location);

  if (columnIndex === -1) {
    // Location not found, handle accordingly
    return []; // or any default value you'd like
  }

  // Filter out the data for the specified column
  return data.map((row, i) => [data[i][0], row[columnIndex]]);
}
