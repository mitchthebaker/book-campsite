import express from 'express'
import dotenv from 'dotenv'
import { expressjwt } from 'express-jwt'
import JwksRsa from 'jwks-rsa'
import http from 'http'
import { Server as webSocket } from 'socket.io'

import apiRouter from './routes/api'
import { apiLimiter, jwtErrorHandler } from './middleware'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new webSocket(server, {
  cors: {
    origin: [
      "http://localhost:8081",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
})

app.set('trust proxy', 1)
app.set('io', io)

io.on('connection', (socket) => {
  const userId = socket.handshake.auth.userId
  if (userId) {
    socket.join(userId)
    console.log(`Socket ${socket.id} joined room ${userId}`)
  }
})

const port = process.env.PORT || 3101
const host = process.env.HOST || '0.0.0.0'

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'no-referrer')
  next()
})

app.use(
  '/api',
  expressjwt({
    secret: JwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.KEYCLOAK_JWKS_URI!,
    }),
    audience: process.env.KEYCLOAK_CLIENT_ID,
    issuer: process.env.KEYCLOAK_ISSUER,
    algorithms: ['RS256'],
  }).unless({
    path: ['/api/v1/health', '/api/v1/login'],
  }),
  apiLimiter,
  apiRouter,
)

app.use(jwtErrorHandler)

server.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`)
})
