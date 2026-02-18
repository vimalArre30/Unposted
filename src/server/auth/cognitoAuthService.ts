import crypto from "node:crypto";
import {
  InitiateAuthCommand,
  SignUpCommand,
  type AuthenticationResultType,
} from "@aws-sdk/client-cognito-identity-provider";
import { getCognitoClient } from "@/server/auth/cognitoClient";
import { getCognitoConfig } from "@/server/auth/config";

function computeSecretHash(username: string, clientId: string, clientSecret: string): string {
  return crypto.createHmac("sha256", clientSecret).update(`${username}${clientId}`).digest("base64");
}

export async function signUpWithEmailPassword(input: { email: string; password: string }) {
  const client = getCognitoClient();
  const config = getCognitoConfig();

  return client.send(
    new SignUpCommand({
      ClientId: config.clientId,
      Username: input.email,
      Password: input.password,
      UserAttributes: [{ Name: "email", Value: input.email }],
      SecretHash: computeSecretHash(input.email, config.clientId, config.clientSecret),
    }),
  );
}

export async function signInWithEmailPassword(input: { email: string; password: string }): Promise<AuthenticationResultType | undefined> {
  const client = getCognitoClient();
  const config = getCognitoConfig();

  const response = await client.send(
    new InitiateAuthCommand({
      ClientId: config.clientId,
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: input.email,
        PASSWORD: input.password,
        SECRET_HASH: computeSecretHash(input.email, config.clientId, config.clientSecret),
      },
    }),
  );

  return response.AuthenticationResult;
}

export function getGoogleOAuthAuthorizeUrl() {
  const config = getCognitoConfig();
  const query = new URLSearchParams({
    identity_provider: config.googleIdentityProviderName,
    redirect_uri: config.redirectUri,
    response_type: "code",
    client_id: config.clientId,
    scope: "email openid profile",
  });

  return `https://${config.domain}/oauth2/authorize?${query.toString()}`;
}
