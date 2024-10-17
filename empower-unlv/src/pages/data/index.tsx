import { GraphIDs } from "@/graphIds";
import { useGetDataForGraph } from "../admin/utils";
import { LoaderCircle, Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useState } from "react";
import { filterOutDataForLine, getMarkerColors, parseData } from "./utils";
import { Circle, MapContainer, TileLayer } from "react-leaflet";
import "@/index.css";
import Separator from "@/components/separator";
import "./SmoothWheelZoom.js";
import Plot from "react-plotly.js";

export default function Data() {
  const [graphData, setGraphData] = useState<any[]>([]);
  const [markerColors, setMarkerColors] = useState<any>(new Map());
  const [maximized, setMaximized] = useState<boolean>(true);
  const { data, loading } = useGetDataForGraph(GraphIDs.SC_V2);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [lineToShow, setLineToShow] = useState<string>("");

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

  const height = maximized ? "h-[calc(100vh-10rem)]" : "h-[20rem]";

  const handleClick = (e: string) => {
    if (lineToShow === e) {
      setLineToShow("");
    } else {
      setLineToShow(e);
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-12">
      <div className="w-[80%] mt-12">
        <Separator title="Map of Nevada" />
      </div>
      <div className={`w-[80%] ${height} relative transition-all duration-200`}>
        {/* <div
          className="absolute right-0 z-[1] cursor-pointer p-1 bg-white bg-opacity-90 
          m-2 border-solid border-gray-500 border-2 border-opacity-65 rounded-sm
          hover:bg-gray-100 hover:bg-opacity-90"
          onClick={() => setMaximized(!maximized)}
        >
          {maximized ? <Minimize2 /> : <Maximize2 />}
        </div> */}
        {markerColors.size > 0 && (
          <MapContainer
            center={[38.0818112, -117.4048923]}
            zoom={6}
            className={`w-full h-[calc(100vh-10rem)] z-0`}
            scrollWheelZoom={false}
            smoothWheelZoom={true}
            smoothSensitivity={10}
            maxZoom={11}
            minZoom={6}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
        )}
      </div>
      {loading && data ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <div className="w-[80%] flex justify-center">
          <Plot
            className="w-full"
            data={graphData}
            layout={{
              title: `Data for ${lineToShow ? locationNames.get(lineToShow) : "Nevada"}`,
              xaxis: { title: "Date" },
              yaxis: { title: "Values" },
              autosize: true,
            }}
            useResizeHandler
          />
        </div>
      )}
    </div>
  );
}

const locations: { name: string; center: [number, number]; radius: number }[] = [
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

const locationNames: Map<string, string> = new Map([
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
