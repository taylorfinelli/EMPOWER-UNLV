import { Button } from "@/components/ui/button";
import { useState } from "react";
import Plot from "react-plotly.js";

// Choropleth map data (you can replace this with your own dataset)
const globalData: any = {
  type: "choropleth",
  locationmode: "country names",
  locations: ["United States", "Canada", "Mexico", "Brazil", "Argentina"],
  z: [10, 20, 30, 40, 50], // Data for coloring the countries
  colorscale: "Viridis", // You can change the colorscale
  colorbar: {
    title: "Value", // Title of the color scale bar
  },
};

const globalLayout = {
  geo: {
    projection: {
      type: "natural earth", // You can adjust the map projection here
    },
    showcoastlines: true, // Show coastlines
    coastlinecolor: "rgb(255, 255, 255)", // Coastline color
    showland: true, // Show land
    landcolor: "rgb(242, 242, 242)", // Land color
    subunitwidth: 1, // Width of country borders
    countrywidth: 2, // Width of country borders
  },
  title: "Global Visitors", // Title of the map
  displayModeBar: false,
};

const natlData: any = {
  type: "choropleth", // Use choroplethmapbox for detailed maps
  locations: ["CA", "TX", "FL" /* Add more state abbreviations */], // State abbreviations
  z: [39.51, 29.14, 21.48 /* Add more values */], // Corresponding values
  locationmode: "USA-states", // Specify state-level visualization
  colorscale: "Viridis",
  colorbar: {
    title: "Number of visitors",
  },
  marker: {
    line: {
      color: "rgb(255, 255, 255)",
      width: 1,
    },
  },
};

const natlLayout = {
  geo: {
    projection: {
      type: "albers usa", // U.S.-focused projection
    },
    center: {
      lat: 37.0902, // Approximate center of the U.S.
      lon: -95.7129, // Approximate center of the U.S.
    },
    scope: "usa", // Limit the map to the United States
    showcoastlines: true,
    coastlinecolor: "rgb(255, 255, 255)", // Coastline color
    showland: true,
    landcolor: "rgb(242, 242, 242)", // Land color
    subunitwidth: 1, // State borders width
    countrywidth: 2, // Country borders width
    lakecolor: "rgb(255, 255, 255)", // Lake color
  },
  title: "United States Visitors", // Map title
  displayModeBar: false,
};

export default function VisitorMap() {
  const [viewGlobalMap, setViewGlobalMap] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setViewGlobalMap(!viewGlobalMap)}>Swap</Button>
      <Plot
        className="w-full h-[75vh]"
        data={viewGlobalMap ? [globalData] : [natlData]}
        layout={viewGlobalMap ? globalLayout : natlLayout}
        config={{ displayModeBar: false }}
        useResizeHandler
      />
    </>
  );
}
