import { userManager } from './oidcClient'

export const handleCallback = async () => {
  const user = await userManager.signinRedirectCallback()
  return user
}

export const getUser = () => userManager.getUser()
