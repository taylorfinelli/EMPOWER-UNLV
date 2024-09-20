import { writeData } from "@/api/dynamo";
import { useState } from "react";

export default function Data() {
  const [field1, setfield1] = useState("");
  const [field2, setfield2] = useState("");
  const [field3, setfield3] = useState("");
  let item: any = { id: field1, graphId: field2, other: field3 };
  let count = 0;
  const itemArray = Array.from({ length: 10 }, () => ({ ...item, id: count++ }));

  return (
    <div>
      <input
        type="text"
        placeholder="id"
        value={field1}
        onChange={(e) => setfield1(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="graphId"
        value={field2}
        onChange={(e) => setfield2(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="other"
        value={field3}
        onChange={(e) => setfield3(e.target.value)}
      ></input>
      <button onClick={() => writeData(itemArray)}>Write</button>
    </div>
  );
}
