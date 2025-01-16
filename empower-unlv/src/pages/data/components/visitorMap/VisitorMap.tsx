import { useGetGlobalMapData, useGetUSMapData } from "@/api/visitors";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Plot from "react-plotly.js";

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
  const USMapData = useGetUSMapData();
  const globalMapData = useGetGlobalMapData();

  const natlData: any = {
    type: "choropleth", // Use choroplethmapbox for detailed maps
    locations: USMapData.locations,
    z: USMapData.z,
    locationmode: "USA-states", // Specify state-level visualization
    colorscale: "Blues",
    colorbar: {
      title: "Visitors",
      tickformat: ".0f", // Display only integers (no decimals)
    },
    marker: {
      line: {
        color: "rgb(255, 255, 255)",
        width: 1,
      },
    },
  };

  const globalData: any = {
    type: "choropleth",
    locationmode: "country names",
    locations: globalMapData.locations,
    z: globalMapData.z, // Data for coloring the countries
    colorscale: "Blues", // You can change the colorscale
    colorbar: {
      title: "Visitors", // Title of the color scale bar
      tickformat: ".0f", // Display only integers (no decimals)
    },
  };

  return (
    <>
      <Button onClick={() => setViewGlobalMap(!viewGlobalMap)}>
        Show {viewGlobalMap ? "US" : "Global"}
      </Button>
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
