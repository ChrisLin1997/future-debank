import { useEffect, useState } from 'react'
import { createContainer } from 'unstated-next'

type WebSocketServer = WebSocket | null
const WS_URL = import.meta.env.DEV ? 'wss://strategle-214abd57532a.herokuapp.com/' : `wss://${location.host}`

const useWebSocketServer = () => {
  const [webSocketServer, setServer] = useState<WebSocketServer>(null)

  const createWebSocket = () => {
    try { setServer(new WebSocket(WS_URL)) }
    catch { setTimeout(() => createWebSocket(), 3000) }
  }

  useEffect(() => {
    createWebSocket()
  }, [])

  useEffect(() => {
    if (webSocketServer === null) return

    webSocketServer.onopen = function(event) {
      console.warn('WebSocket Open.', event)
    }

    webSocketServer.onerror = function (event) {
      console.warn('WebSocket Error:', event)
    }

    webSocketServer.onclose = async function (event) {
      if (event.wasClean) console.warn(`Websocket Manual Closed: ${event.code}, Reason: ${event.reason}`)
      else {
        console.warn('WebSocket Error Closed.', event)
        setTimeout(() => createWebSocket(), 10 * 1000)
      }
    }
  }, [webSocketServer])

  return { webSocketServer }
}

const WebSocketServerContainer = createContainer(useWebSocketServer)

export default WebSocketServerContainer
