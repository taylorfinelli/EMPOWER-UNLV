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

export const writeItem = async (item: any) => {
  const params = {
    TableName: tableName,
    Item: item,
  };

  try {
    await dynamoDB.put(params).promise();
  } catch (error) {
    console.error("Error writing data: ", error);
  }
};

export const getItem = async (item: any) => {
  const params = {
    TableName: tableName,
    Key: { graphId: item.graphId, itemId: item.itemId },
  };
  try {
    const response = await dynamoDB.get(params).promise();
    return response.Item;
  } catch (error) {
    console.error("Error fetching item: ", error);
    throw error;
  }
};

export const getDataForGraph = async (graphId: string) => {
  const params = {
    TableName: tableName,
    KeyConditionExpression: "graphId = :graphId",
    ExpressionAttributeValues: {
      ":graphId": graphId,
    },
  };

  try {
    const response = await dynamoDB.query(params).promise();
    return response.Items;
  } catch (error) {
    console.error("Error fetching graph data: ", error);
  }
};
