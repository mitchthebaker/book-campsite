import { Router } from 'express'

import { exchangeKeycloakToken } from '~/middleware/exchangeKeycloakToken'

const loginRouter = Router()

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body

  try {
    const data = await exchangeKeycloakToken({
      grant_type: 'password',
      username: email,
      password,
    })

    res.status(200).json({
      status: 'success',
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
      token_type: data.token_type,
      scope: data.scope,
    })
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Failed authentication',
      error: error instanceof Error ? error.message : String(error),
    })
  }
})

export default loginRouter
