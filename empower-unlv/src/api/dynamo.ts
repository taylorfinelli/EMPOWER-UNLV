import { DynamoDB } from "aws-sdk";
import axios from "axios";

const region = import.meta.env.VITE_AWS_REGION;
const empowerDataTableName = import.meta.env.VITE_DDB_DATA_TABLE_NAME;
const empowerVisitorsTableName = import.meta.env.VITE_DDB_VISITOR_TABLE_NAME;

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
    TableName: empowerDataTableName,
    Item: item,
  };

  try {
    await dynamoDB.put(params).promise();
  } catch (error) {
    console.error("Error writing data: ", error);
    throw error;
  }
};

export const batchWrite = async (items: any[]) => {
  const requestItems: DynamoDB.DocumentClient.BatchWriteItemRequestMap = {};

  requestItems[empowerDataTableName] = items.map((item) => ({
    PutRequest: {
      Item: item,
    },
  }));

  const params = {
    RequestItems: requestItems,
  };

  try {
    await dynamoDB.batchWrite(params).promise();
  } catch (error) {
    console.error("Error writing data: ", error);
    throw error;
  }
};

export const getItem = async (item: any) => {
  const params = {
    TableName: empowerDataTableName,
    Key: { graphId: item.graphId, itemId: item.itemId },
    ConsistentRead: false,
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
    TableName: empowerDataTableName,
    KeyConditionExpression: "graphId = :graphId",
    ExpressionAttributeValues: {
      ":graphId": graphId,
    },
    ConsistentRead: false,
  };

  try {
    const response = await dynamoDB.query(params).promise();
    return response.Items;
  } catch (error) {
    console.error("Error fetching graph data: ", error);
    throw error;
  }
};

export const getItemIdsForGraph = async (graphId: string) => {
  const params = {
    TableName: empowerDataTableName,
    KeyConditionExpression: "graphId = :graphId",
    ExpressionAttributeValues: {
      ":graphId": graphId,
    },
    ProjectionExpression: "itemId",
    ConsistentRead: false,
  };

  try {
    const response = await dynamoDB.query(params).promise();
    return response.Items;
  } catch (error) {
    console.error("Error fetching graph data: ", error);
    throw error;
  }
};

export const batchDelete = async (items: any[], exclude?: any[]) => {
  try {
    const excludeIds = exclude?.map((item) => item.itemId);
    const itemsToDelete = items.filter((item) => !excludeIds?.includes(item.itemId));

    if (itemsToDelete.length > 0) {
      const deleteRequests = itemsToDelete.map((item) => ({
        DeleteRequest: {
          Key: {
            graphId: item.graphId,
            itemId: item.itemId,
          },
        },
      }));

      const params = {
        RequestItems: {
          [empowerDataTableName]: deleteRequests,
        },
      };

      await dynamoDB.batchWrite(params).promise();
    }
  } catch (error) {
    console.error("Error during batch delete: ", error);
    throw error;
  }
};

export const handleVisitor = async (ip: string) => {
  const ipInfoToken = import.meta.env.VITE_IPINFO_API_KEY;
  const getParams = {
    TableName: empowerVisitorsTableName,
    Key: { ip: ip },
    ConsistentRead: false,
  };
  try {
    const response = await dynamoDB.get(getParams).promise();
    if (!response.Item) {
      const geoData: any = await axios.get(`https://api.ipdata.co/${ip}?api-key=${ipInfoToken}`);
      const country = geoData.data.country_name;
      const putParams = {
        TableName: empowerVisitorsTableName,
        Item: {
          ip: ip,
          country: country,
        },
      };
      await dynamoDB.put(putParams).promise();
    }
  } catch (error) {
    console.error("Error fetching item: ", error);
    throw error;
  }
};
