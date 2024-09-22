import { batchDelete, batchWrite, getItemIdsForGraph, writeItem } from "@/api/dynamo";
import { UploadMethod } from "@/enum";

/*
  This handles the action of taking the file from the user and uploading it to DynamoDB.
  It works like this: 
    - If the file being uploaded is less than 390KB, write it to the DB as a single item (most common case)
    - If the file being uploaded is greater than 390KB, split the file into multiple items and batch
      write them to the DB
    + If the user wishes to overwrite the graph data, query the previous items and take their itemIds 
      and graphIds and delete them
    + We write first before deleting to ensure unnecessary data loss does not occur
*/

const MAX_ENTRY_SIZE = 390000;

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
      const content = await file.text();
      const itemId = uploadMethod + "#" + "put" + "#" + now;
      const item = { graphId: graphId, itemId: itemId, content: content };
      excludedItems.push(item);
      await writeItem(item);
    }
    // Uploading multiple entries
    else if (file.size > MAX_ENTRY_SIZE) {
      let fileText = await file.text();
      const items = [];
      let count = 1;
      while (fileText.length > 0) {
        const content = fileText.substring(0, MAX_ENTRY_SIZE);
        fileText = fileText.slice(MAX_ENTRY_SIZE);
        const itemId = uploadMethod + "#" + "batchPut" + "#" + now + "#" + count;
        count++;
        const item = { graphId: graphId, itemId: itemId, content: content };
        items.push(item);
      }
      excludedItems.push(items);
      await batchWrite(items);
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
  } catch (error) {
    setUploading(false);
    throw error;
  }
}

export function truncateText(text: string, maxLength: number, suffix: string = "..."): string {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength - suffix.length);
  return `${truncated}${suffix}`;
}
