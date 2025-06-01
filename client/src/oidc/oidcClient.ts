import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

export const oidcConfig = {
  authority: import.meta.env.VITE_KEYCLOAK_AUTHORITY,
  client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  redirect_uri: `${import.meta.env.VITE_BASE_URL}/callback`,
  response_type: 'code',
  scope: 'openid profile email',
  post_logout_redirect_uri: `${import.meta.env.VITE_BASE_URL}/`,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

export const userManager = new UserManager(oidcConfig);