import { GraphIDs } from "@/graphIds";
import { Chart, GoogleDataTableColumnRoleType } from "react-google-charts";
import { useGetDataForGraph } from "../admin/utils";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { parseData } from "./utils";

export default function Data() {
  const [graphData, setGraphData] = useState<any>([]);
  const [locations, setLocations] = useState<any>([]);
  const { data, loading } = useGetDataForGraph(GraphIDs.SC_V2);

  useEffect(() => {
    if (data[0]) {
      setGraphData(parseData(data[0].content));
    }
  }, [data]);

  useEffect(() => {
    if (graphData.length > 1) {
      setLocations(graphData[0].slice(1));
    }
  }, [graphData]);

  console.log(locations);

  return (
    <div>
      {loading && data ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <div>
          <Chart chartType="LineChart" data={graphData} width="100%" height="800px" />
        </div>
      )}
    </div>
  );
}
