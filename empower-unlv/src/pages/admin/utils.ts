import { batchDelete, getDataForGraph, getItemIdsForGraph, writeItem } from "@/api/dynamo";
import { UploadMethod } from "@/enum";
import { GraphIDs } from "@/graphIds";
import { useEffect, useState } from "react";

async function hashPassword(password: string) {
  return Crypto;
}

export async function storeUser(username: any, password: any) {
  console.log(hashPassword(password));
}

/*
  This handles the action of taking the file from the user and uploading it to DynamoDB.
  It works like this: 
    - If the file being uploaded is less than 390KB, write it to the DB as a single item (most common case)
    Stretch: 
      - If the file being uploaded is greater than 390KB, split the file into multiple items and batch
        write them to the DB
      - Current batch upload works, it's retrieving and parsing that's a headache
    + If the user wishes to overwrite the graph data, query the previous items and take their itemIds 
      and graphIds and delete them
    + We write first before deleting to ensure unnecessary data loss does not occur
*/

const MAX_ENTRY_SIZE = 399000;

export async function uploadFileToDDB(
  file: File,
  uploadMethod: UploadMethod,
  graphId: string,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const excludedItems = [];
  try {
    const now = new Date().toISOString();
    // Uploading single entry
    if (file.size <= MAX_ENTRY_SIZE) {
      const content = formatCSV(await file.text());
      const itemId = uploadMethod + "#" + "put" + "#" + now;
      const item = { graphId: graphId, itemId: itemId, content: content };
      excludedItems.push(item);
      await writeItem(item);
    }
    // Uploading multiple entries
    // Future addition, for now only support files under 390KB
    // else if (file.size > MAX_ENTRY_SIZE) {
    //   let fileText = await file.text();
    //   const items = [];
    //   let count = 1;
    //   while (fileText.length > 0) {
    //     const content = formatCSV(fileText.substring(0, MAX_ENTRY_SIZE));
    //     fileText = fileText.slice(MAX_ENTRY_SIZE);
    //     const itemId = uploadMethod + "#" + "batchPut" + "#" + now + "#" + count;
    //     count++;
    //     const item = { graphId: graphId, itemId: itemId, content: content };
    //     items.push(item);
    //   }
    //   excludedItems.push(items);
    //   await batchWrite(items);
    // }
    else if (file.size > MAX_ENTRY_SIZE) {
      let error = new Error("File size is too large. Max size is " + MAX_ENTRY_SIZE / 1000 + "KB");
      error.name = "SIZE_ERROR";
      throw error;
    }
    // If the user chose to overwrite the data, erase previous data for graph
    if (uploadMethod === UploadMethod.OVERWRITE) {
      const dataToOverwrite = await getItemIdsForGraph(graphId);
      if (dataToOverwrite) {
        await batchDelete(
          dataToOverwrite.map((item) => ({ graphId: graphId, itemId: item.itemId })),
          excludedItems.flat().map((item) => ({ graphId: item.graphId, itemId: item.itemId }))
        );
      }
    }
    setUploading(false);
  } catch (error: any) {
    setUploading(false);
    // throw specific size error
    if (error.name === "SIZE_ERROR") {
      throw error;
    }
    // else throw generic error
    throw new Error("There was a problem uploading your file. Please try again.");
  }
}

export function truncateText(text: string, maxLength: number, suffix: string = "..."): string {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength - suffix.length);
  return `${truncated}${suffix}`;
}

export function formatCSV(text: string): string[][] {
  const rows = text.split("\n");
  const result: string[][] = [];

  for (const row of rows) {
    // Split the row by commas and trim each column
    const cols = row.split(",").map((cell) => cell.trim().replace(/\r$/, ""));
    result.push(cols);
  }

  return result;
}

export function useGetDataForGraph(graphId: GraphIDs) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataForGraph(graphId);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [graphId]);

  return { data, loading, error };
}
