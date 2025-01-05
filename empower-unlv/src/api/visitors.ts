import { DynamoDB } from "aws-sdk";

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
  console.log(ipInfo);
  return ipInfo;
}

export async function checkIfLogged() {
  const data = await getData();

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

async function logData(data: any) {
  const country = iso_3166_1.whereAlpha2(countryAlpha2);
  const countryAlpha3 = country.alpha3;
  const countryName = country.country;
  const regionName = geoData.region;
  const putParams = {
    TableName: empowerVisitorsTableName,
    Item: {
      ip: data.ip,
      country: data.country_code,
    },
  };
}
