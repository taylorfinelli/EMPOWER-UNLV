import { getDataForGraph, getItem, writeItem } from "@/api/dynamo";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Data() {
  const [field1, setfield1] = useState("");
  const [field2, setfield2] = useState("");
  const [field3, setfield3] = useState("");
  let item: any = { graphId: field1, itemId: field2, other: field3 };
  const getItems = async () => {
    const tableData = await getDataForGraph(item.graphId);
    console.log(tableData);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="graphId"
        value={field1}
        onChange={(e) => setfield1(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="itemId"
        value={field2}
        onChange={(e) => setfield2(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="other"
        value={field3}
        onChange={(e) => setfield3(e.target.value)}
      ></input>
      <Button onClick={() => writeItem(item)}>Write</Button>
      <div> </div>
      <Button onClick={() => console.log(getItem(item))}>Get</Button>
      <div> </div>
      <Button onClick={() => getItems()}>Get Batch</Button>
    </div>
  );
}
