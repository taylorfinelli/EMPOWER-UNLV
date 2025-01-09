import { DynamoDB } from "aws-sdk";
import iso from "iso-3166-1";
import { states } from "./utils";

const AWS_region = import.meta.env.VITE_AWS_REGION;
const empowerVisitorsTableName = import.meta.env.VITE_DDB_VISITOR_TABLE_NAME;
const empowerCountryCountsTableName = import.meta.env.VITE_DDB_COUNTRY_TABLE_NAME;
const empowerRegionCountsTableName = import.meta.env.VITE_DDB_REGION_TABLE_NAME;

const awsAccessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY;
const awsSecretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

const IPINFO_API_KEY = import.meta.env.VITE_IPINFO_API_KEY;

const dynamoDB = new DynamoDB.DocumentClient({
  region: AWS_region,
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
  const ipInfo = await (
    await fetch(`https://ipinfo.io/${ipAddress}/json?token=${IPINFO_API_KEY}`)
  ).json();
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
  const country = iso.whereAlpha2(info.country);

  const putParams = {
    TableName: empowerVisitorsTableName,
    Item: {
      ip: info.ip,
      countryCode: country?.alpha3,
      country: country?.country,
      regionName: info.region_code,
    },
  };

  try {
    // log client data
    await dynamoDB.put(putParams).promise();
    handleCountryData(country?.alpha3);
    if (info.country == "US") {
      const region = states.get(info.region);
      const updateParams = {
        TableName: empowerRegionCountsTableName,
        Key: { region },
        UpdateExpression: "SET amount = if_not_exists(amount, :start) + :increment",
        ExpressionAttributeValues: {
          ":increment": 1,
          ":start": 0,
        },
        ReturnValues: "ALL_NEW",
      };
      await dynamoDB.update(updateParams).promise();
    }
  } catch (error) {
    console.error("Error writing item: ", error);
    throw error;
  }
}

export async function handleCountryData(countryCode: string | undefined) {
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
    console.error("Error handling country data:", error);
    throw error;
  }
}
