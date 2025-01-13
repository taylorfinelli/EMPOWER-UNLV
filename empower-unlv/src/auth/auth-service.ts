import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  AuthenticationResultType,
  CognitoIdentityProviderServiceException,
} from "@aws-sdk/client-cognito-identity-provider";
import { config } from "./config";

export const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});

interface ISignInResponse {
  auth: AuthenticationResultType | undefined;
  error: string | null;
}

export const signIn = async (username: string, password: string): Promise<ISignInResponse> => {
  const signInParams: InitiateAuthCommandInput = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: config.clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };
  let AuthenticationResult: AuthenticationResultType | undefined = undefined;

  try {
    const command = new InitiateAuthCommand(signInParams);
    const response = await cognitoClient.send(command);
    AuthenticationResult = response.AuthenticationResult;
    if (AuthenticationResult) {
      sessionStorage.setItem("idToken", AuthenticationResult.IdToken || "");
      sessionStorage.setItem("accessToken", AuthenticationResult.AccessToken || "");
      sessionStorage.setItem("refreshToken", AuthenticationResult.RefreshToken || "");
    }
  } catch (error: unknown) {
    if (error instanceof CognitoIdentityProviderServiceException) {
      return { auth: undefined, error: error.message };
    }
    return { auth: undefined, error: "An unknown error occurred" };
  }

  return { auth: AuthenticationResult, error: null };
};
