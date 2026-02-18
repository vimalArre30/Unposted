import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { getCognitoConfig } from "@/server/auth/config";

let cognitoClient: CognitoIdentityProviderClient | null = null;

export function getCognitoClient() {
  if (!cognitoClient) {
    const { region } = getCognitoConfig();
    cognitoClient = new CognitoIdentityProviderClient({ region });
  }
  return cognitoClient;
}
