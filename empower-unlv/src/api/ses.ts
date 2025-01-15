import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const region = import.meta.env.VITE_AWS_REGION;
const accessKey = import.meta.env.VITE_AWS_ACCESS_KEY;
const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
const sesEmail = import.meta.env.VITE_SES_EMAIL;

const ses = new SESClient({
  region: region,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
});

export async function sendEmail(name: string, email: string, message: string) {
  const subject = name + ", " + email;
  const params = {
    Destination: {
      ToAddresses: [sesEmail],
    },
    Message: {
      Body: {
        Text: { Data: message },
      },
      Subject: { Data: subject },
    },
    Source: sesEmail,
  };

  try {
    const command = new SendEmailCommand(params);
    const data = await ses.send(command);
    console.log("Email sent", data);
  } catch (error) {
    console.error("Error sending email", error);
  }
}
