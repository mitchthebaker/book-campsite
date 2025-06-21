import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { userManager } from '~/oidc/oidcClient'

type SocketContextType = {
  socket: Socket | null
}

const SocketContext = createContext<SocketContextType>({ socket: null })