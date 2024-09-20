import { DynamoDB } from "aws-sdk";

const region = import.meta.env.VITE_AWS_REGION;
const tableName = import.meta.env.VITE_DDB_TABLE_NAME;

const awsAccessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY;
const awsSecretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

const dynamoDB = new DynamoDB.DocumentClient({
  region: region,
  credentials: {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
  },
});

export const writeData = async (item: any) => {
  console.log(item);
  const params = {
    TableName: tableName,
    Item: item,
  };

  try {
    await dynamoDB.put(params).promise();
    console.log("Data written successfully: ", item);
  } catch (error) {
    console.error("Error writing data: ", error);
    throw error;
  }
};

/*
for reading a specific item
  const params = {
    TableName: tableName,
    Key: { id: item.id, graphId: item.graphId },
  };
  try {
    const response = await dynamoDB.get(params).promise();
    console.log("Data written successfully: ", item);
  } catch (error) {
    console.error("Error writing data: ", error);
    throw error;
  }
*/

// https://dynobase.dev/dynamodb-batch-write-update-delete/
