import { userManager } from "./oidcClient";

export const login = () => userManager.signinRedirect();
export const logout = () => userManager.signoutRedirect();

export const handleCallback = async () => {
  const user = await userManager.signinRedirectCallback();
  return user;
};

export const getUser = () => userManager.getUser();