import { GraphIDs } from "@/graphIds";
import { useGetDataForGraph } from "../admin/utils";
import { useEffect, useState } from "react";
import {
  filterOutDataForLine,
  getMarkerColors,
  locationNamesMap,
  locations,
  locationToCoordinatesMap,
  parseData,
} from "./utils";
import { Circle, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import "@/index.css";
import Separator from "@/components/separator";
import "./SmoothWheelZoom.js";
import Plot from "react-plotly.js";
import { SelectCity } from "./components/SelectCity.js";
import VisitorMap from "./components/visitorMap/VisitorMap.js";

export default function Data() {
  const [graphData, setGraphData] = useState<any[]>([]);
  const [markerColors, setMarkerColors] = useState<any>(new Map());
  const { data } = useGetDataForGraph(GraphIDs.SC_V2);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [lineToShow, setLineToShow] = useState<string>("");
  const [value, setValue] = useState<any>("");

  // TODO: make this work with multi-file fetches

  ////////////////////////////// Data processing
  useEffect(() => {
    if (data[0]) {
      setParsedData(parseData(data[0].content));
    }
  }, [data]);

  useEffect(() => {
    if (lineToShow && parsedData) {
      setGraphData(filterOutDataForLine(lineToShow, parsedData));
    } else if (parsedData) {
      setGraphData(parsedData);
    }
  }, [parsedData, lineToShow]);

  ////////////////////////////// Map marker processing

  useEffect(() => {
    if (graphData) {
      setMarkerColors(getMarkerColors(graphData));
    }
  }, [graphData]);

  const handleClick = (e: string) => {
    setLineToShow(e);
    setValue(locationNamesMap.get(e));
  };
  const handleClose = () => {
    setLineToShow("");
    setValue("");
  };

  return (
    <div className="flex flex-col items-center gap-y-12">
      <div className="w-[95%] mt-12">
        <Separator title="Map of Nevada" />
      </div>
      {markerColors.size > 0 && (
        <div className="w-[95%] flex flex-col gap-y-12">
          <div className="flex flex-col md:grid md:grid-flow-col md:grid-cols-12">
            <div className="col-span-6 items-center gap-y-4 flex flex-col">
              <h2>Select a region to filter data</h2>
              <SelectCity setLineToShow={setLineToShow} setValue={setValue} value={value} />
              <Plot
                className="w-full"
                data={graphData}
                layout={{
                  title: `Data for ${lineToShow ? locationNamesMap.get(lineToShow) : "Nevada"}`,
                  xaxis: { title: "Date" },
                  yaxis: { title: "Viral counts in wastewater (log10 gene copies/mm)" },
                  autosize: true,
                  showlegend: false,
                  font: { family: "Inter, sans-serif" },
                }}
                useResizeHandler
              />
            </div>
            <MapContainer
              center={[38.0818112, -117.4048923]}
              zoom={6}
              className={`w-full h-[calc(100vh-10rem)] z-0 col-span-6`}
              scrollWheelZoom={false}
              smoothWheelZoom={true}
              smoothSensitivity={10}
              maxZoom={11}
              minZoom={6}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {lineToShow && <FlyToMarker cityTag={lineToShow} handleClose={handleClose} />}
              {locations.map((item) => (
                <Circle
                  key={item.name}
                  center={item.center}
                  radius={item.radius}
                  color={markerColors.get(item.name)}
                  eventHandlers={{ click: () => handleClick(item.name) }}
                />
              ))}
            </MapContainer>
          </div>
          <div>
            <Separator title="Our Visitors" />
            <VisitorMap />
          </div>
        </div>
      )}
    </div>
  );
}

const FlyToMarker: React.FC<{ cityTag: any; handleClose: any }> = ({ cityTag, handleClose }) => {
  const map = useMap();
  const city = locationNamesMap.get(cityTag);
  const position = locationToCoordinatesMap.get(cityTag);
  console.log(city);

  useEffect(() => {
    if (position) {
      map.flyTo(position, 10, {
        animate: true,
        duration: 1,
      });
    }
  }, [position, map]);

  return (
    <Popup
      key={cityTag}
      interactive
      position={position}
      eventHandlers={{
        remove: handleClose,
      }}
      content={city}
    />
  );
};
