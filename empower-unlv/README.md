# Nevada EMPOWER Website v2

This is the frontend repo of the NV EMPOWER website. It contains the code that displays data about viral counts and emerging variants of the SARS-CoV-2 virus collected through wastewater surveillance.

This version boasts improvements on performance, scalability, and availability by using TypeScript + React for the frontend and AWS services for the backend. Using React also has the added benefit of unlocking access to many graph and chart libraries that are easier to use compared to raw HTML/CSS/JS.

## Environment

### Dependencies
Ensure that Git, Node, and NPM are installed. Initial development on this website had the following versions:
- Git (2.44.0)
- Node (20.12.0)
- NPM (10.9.0)

Note that some versions are cross-compatible.

### Cloning the Repo
Navigate to the desired parent folder in which you want to create a copy of the repository hosted on GitHub. Then, run the following commands:
```
git clone <REPO_LINK>
npm i
```
The command `git clone` copies the remote repository to your local Git directory. Next, running `npm install` is necessary to install package dependencies.

### .env File
For local development, you will need a `.env` file. Since the website is now hosted using AWS Amplify, you must remember to keep the environment variables up-to-date in Amplify if you change them or add more. You can find the documentation for that [here](https://docs.aws.amazon.com/amplify/latest/userguide/setting-env-vars.html).

**You must guard the env file with your life because if this file becomes public then anyone can have access to the AWS account and resources. Ensure that it stays in the `.gitignore` file and _never_ makes its way into the repo.**

With that being said, the previous developer will have to provide the file to you.  

# Backend (AWS)

This website uses AWS services for the backend. Keep in mind that there is a cost associated with the usage of each of the services, so efficiency should be your primary goal when working with AWS architecture. 

**It is recommended that new developers on this project have a comfortable understanding of AWS services and best practices before starting development. Mistakes can be very expensive.**

There also exists a Cloud Development Kit (CDK) repo. A CDK is a way to provision and deploy AWS resources using code, improving flexibility and scalability. 

### DynamoDB
Amazon DynamoDB (DDB) is a fully managed, serverless NoSQL database service provided by AWS that offers fast and predictable performance with seamless scalability. It stores data in key-value pairs and supports both document and key-value data models. DynamoDB automatically scales to handle large amounts of traffic and storage, and it offers features like automatic backups, encryption, and global replication.

DDB is used for storing information related to all of the graphs and charts on the NV EMPOWER website. Since it is a remote database, whatever data is accessible in production can also be accessed locally. This means that **when you are testing locally, you should be using the `LocalDev` table unless you want to overwrite data in production.** To use the `LocalDev` table, simply change the data table name variable in the `.env` file to `LocalDev`.

### Simple Email Service
Amazon Simple Email Service (SES) is a scalable, cost-effective email sending service provided by AWS. It allows businesses and developers to send transactional, marketing, and notification emails quickly and reliably. SES can be used for both inbound and outbound email communications, offering features like email tracking, bounce and complaint handling, and sender identity verification. 

SES is used on the Contact page to send emails to the developer email address. It is currently in Sandbox mode, which means that emails can only be sent to verified accounts. There's a daily limit of 200 emails, which should be more than enough as the site currently stands. The account can stay in Sandbox mode to avoid going over any limits and accruing charges. 

### Cognito
Amazon Cognito is a fully managed service that simplifies user authentication, authorization, and user management for web and mobile apps. It enables developers to easily add sign-up, sign-in, and access control features to applications. Cognito supports social identity providers (like Facebook, Google, and Amazon) and enterprise identity providers (like Active Directory) through SAML, as well as custom identity solutions. It also includes features for multi-factor authentication (MFA), user directory management, and secure access to AWS resources.

Cognito is used for a single administrator account. The data team can log into this account and upload CSV files to the DDB tables, which updates the graphs on the website. 

### Amplify
AWS Amplify is a development platform that simplifies building, deploying, and managing full-stack web and mobile applications. It offers a suite of tools for both front-end and back-end development, including pre-built services for authentication, databases, APIs, file storage, and real-time capabilities.

Amplify is used to build and deploy the EMPOWER website. It connects directly with the GitHub repo so that any changes that are made on the **main** branch will be **automatically built and deployed into production.**

### Route53
Amazon Route 53 is a scalable, highly available Domain Name System (DNS) web service provided by AWS. Route 53 offers domain registration, DNS routing, and health checking services, ensuring reliable and low-latency access to your website or application. It supports routing traffic based on geographic location, latency, and health status, and can be integrated with other AWS services for seamless management and scaling of global applications.

Since EMPOWER is being hosted on AWS servers, it must have access to the domain information. It gets access via a hosted zone. A hosted zone in Amazon Route 53 is a container for DNS records that defines how traffic is routed for a specific domain or subdomain.