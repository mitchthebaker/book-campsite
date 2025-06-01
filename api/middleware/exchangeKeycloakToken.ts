type TokenRequestParams = {
  grant_type: string;
  client_id?: string;
  refresh_token?: string;
  username?: string;
  password?: string;
  [key: string]: string | undefined;
};

export async function exchangeKeycloakToken(params: TokenRequestParams) {
  const searchParams = new URLSearchParams({
    client_id: process.env.KEYCLOAK_CLIENT_ID!,
    ...params,
  });

  const response = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: searchParams,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error_description || "Token exchange failed");
    }
    
    return response.json();
}