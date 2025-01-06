import { DynamoDB } from "aws-sdk";
import iso from "iso-3166-1";

const region = import.meta.env.VITE_AWS_REGION;
const empowerVisitorsTableName = import.meta.env.VITE_DDB_VISITOR_TABLE_NAME;
const empowerCountryCountsTableName = import.meta.env.VITE_DDB_COUNTRY_TABLE_NAME;

const awsAccessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY;
const awsSecretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

const dynamoDB = new DynamoDB.DocumentClient({
  region: region,
  credentials: {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
  },
});

export async function getData() {
  // fetch IP address
  const response = await fetch("https://api.ipify.org?format=json");
  const ipAddress = (await response.json()).ip;
  // capture geolocation information
  const ipInfo = await (await fetch(`https://ipapi.co/${ipAddress}/json/`)).json();
  return ipInfo;
}

export async function handleData(data: any) {
  const getParams = {
    TableName: empowerVisitorsTableName,
    Key: { ip: data.ip },
    ConsistentRead: false,
  };

  try {
    const response = await dynamoDB.get(getParams).promise();
    // if client IP does not exist in DB, log it
    if (!response.Item) {
      logData(data);
    }
  } catch (error) {
    console.error("Error fetching item: ", error);
    throw error;
  }
}

export async function logData(data: any) {
  const info = await data;
  const country = iso.whereAlpha2(info.country_code);

  const putParams = {
    TableName: empowerVisitorsTableName,
    Item: {
      ip: info.ip,
      countryCode: info.country_code,
      country: country?.country,
      regionName: info.region_code,
    },
  };

  try {
    // log client data
    await dynamoDB.put(putParams).promise();
    handleCountryData(info.country_code);
  } catch (error) {
    console.error("Error writing item: ", error);
    throw error;
  }
}

export async function handleCountryData(countryCode: string) {
  const updateParams = {
    TableName: empowerCountryCountsTableName,
    Key: { countryCode },
    UpdateExpression: "SET amount = if_not_exists(amount, :start) + :increment",
    ExpressionAttributeValues: {
      ":increment": 1,
      ":start": 0,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    // DDB's update() will insert the item if it doesn't exist
    await dynamoDB.update(updateParams).promise();
  } catch (error: any) {
    if (error.code === "ConditionalCheckFailedException") {
      // in case of a conditional failure, meaning item doesn't exist, perform a put
      const putParamsDNE = {
        TableName: empowerCountryCountsTableName,
        Item: {
          countryCode: countryCode,
          amount: 1,
        },
      };
      await dynamoDB.put(putParamsDNE).promise();
    } else {
      console.error("Error handling country data:", error);
      throw error;
    }
  }
}
