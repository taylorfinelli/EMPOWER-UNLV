import { DynamoDB } from "aws-sdk";
import iso from "iso-3166-1";

const region = import.meta.env.VITE_AWS_REGION;
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
    await dynamoDB.put(putParams).promise();
  } catch (error) {
    console.error("Error fetching item: ", error);
    throw error;
  }
}
