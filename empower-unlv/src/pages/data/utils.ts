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

  const formattedData = result[0].map((_: unknown, index: number) => ({
    x: result.map((row) => row[0]),
    y: result.map((row) => (!Number.isNaN(row[index + 1]) ? row[index + 1] : null)),
    mode: "lines+markers",
    name: result[0][index + 1],
  }));

  return formattedData;
}

// export function slice2DArrayIntoCols<T>(array: T[][]): T[][] {
//   if (array.length === 0) return [];

//   const numCols = array[0].length;
//   const cols: T[][] = Array.from({ length: numCols }, () => []);

//   for (const row of array) {
//     for (let colIndex = 0; colIndex < numCols; colIndex++) {
//       cols[colIndex].push(row[colIndex]);
//     }
//   }

//   return cols;
// }

export function getMarkerColors(columns: any[]): Map<string, string> {
  const colorMap = new Map<string, string>();

  for (const col of columns) {
    const location = col.name; // Get the location name
    const color = getMarkerColor(col.y); // Get the marker color using the previous function
    colorMap.set(location, color); // Map the location to its color
  }

  return colorMap;
}

// Assuming getMarkerColor function is defined as before
export function getMarkerColor(col: any[]): string {
  const numbers = col.filter((item) => item !== null);

  const [secondLast, last] = numbers.slice(-2);

  if (last > secondLast) {
    return "red";
  } else if (last < secondLast) {
    return "green";
  } else {
    return "yellow";
  }
}

export function filterOutDataForLine(location: string, data: any[]) {
  return data.filter((item) => item.name === location);
}

export const locations: { name: string; center: [number, number]; radius: number }[] = [
  { name: "CH1", center: [35.998879, -115.093735], radius: 3000 },
  { name: "CH2", center: [36.0707022, -115.0555679], radius: 3000 },
  { name: "CH3", center: [36.088366, -114.992332], radius: 2000 },
  { name: "BC", center: [35.968555, -114.845233], radius: 2000 },
  { name: "CC", center: [36.125958, -115.226552], radius: 3500 },
  { name: "CLV", center: [36.174935, -115.155059], radius: 3500 },
  { name: "NLV", center: [36.23991, -115.0971], radius: 4000 },
  { name: "BD", center: [36.043714, -115.404379], radius: 3000 },
  { name: "SL", center: [35.464653, -114.919915], radius: 1500 },
  { name: "LAU", center: [35.167244, -114.577071], radius: 1000 },
  { name: "PR1", center: [36.284049, -115.980921], radius: 3000 },
  { name: "PR2", center: [36.251197, -115.811174], radius: 3000 },
  { name: "PR3", center: [36.163895, -115.903833], radius: 3000 },
  { name: "IS", center: [36.573276, -115.673188], radius: 2000 },
  { name: "MV", center: [36.549854, -114.453287], radius: 3500 },
  { name: "BEA", center: [36.9084, -116.759308], radius: 1500 },
  { name: "CAR", center: [39.173345, -119.743899], radius: 3000 },
  { name: "TMWRF", center: [39.534101, -119.752967], radius: 2500 },
  // TODO: which buildings are the UNR buildings?
];

export const locationNamesMap: Map<string, string> = new Map([
  ["CH1", "City of Henderson 1"],
  ["CH2", "City of Henderson 2"],
  ["CH3", "City of Henderson 3"],
  ["BC", "Boulder City"],
  ["CC", "Clark County"],
  ["CLV", "City of Las Vegas"],
  ["NLV", "North Las Vegas"],
  ["BD", "Blue Diamond"],
  ["SL", "Searchlight"],
  ["LAU", "Laughlin"],
  ["PR1", "Pahrump 1"],
  ["PR2", "Pahrump 2"],
  ["PR3", "Pahrump 3"],
  ["IS", "Indian Springs"],
  ["MV", "Moapa Valley"],
  ["BEA", "Beatty"],
  ["CAR", "Carson City"],
  ["TMWRF", "Sparks"],
]);
