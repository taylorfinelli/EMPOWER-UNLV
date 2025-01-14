import { CognitoJwtVerifier } from "aws-jwt-verify";

export default async function verifyToken() {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: import.meta.env.VITE_USER_POOL_ID,
    tokenUse: "access",
    clientId: String(import.meta.env.VITE_CLIENT_ID),
  });

  try {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      await verifier.verify(token);
      return true;
    }
  } catch {
    console.error("Login required!");
    return false;
  }
}
