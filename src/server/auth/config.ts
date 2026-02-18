const required = [
  "COGNITO_USER_POOL_ID",
  "COGNITO_CLIENT_ID",
  "COGNITO_CLIENT_SECRET",
  "COGNITO_REGION",
  "COGNITO_DOMAIN",
  "COGNITO_REDIRECT_URI",
] as const;

export interface CognitoConfig {
  userPoolId: string;
  clientId: string;
  clientSecret: string;
  region: string;
  domain: string;
  redirectUri: string;
  googleIdentityProviderName: string;
}

export function getCognitoConfig(): CognitoConfig {
  for (const key of required) {
    if (!process.env[key]) throw new Error(`Missing required auth env var: ${key}`);
  }

  return {
    userPoolId: process.env.COGNITO_USER_POOL_ID!,
    clientId: process.env.COGNITO_CLIENT_ID!,
    clientSecret: process.env.COGNITO_CLIENT_SECRET!,
    region: process.env.COGNITO_REGION!,
    domain: process.env.COGNITO_DOMAIN!,
    redirectUri: process.env.COGNITO_REDIRECT_URI!,
    googleIdentityProviderName: process.env.COGNITO_GOOGLE_IDP_NAME ?? "Google",
  };
}
