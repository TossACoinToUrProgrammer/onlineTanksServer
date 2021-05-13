const express = require("express")
const app = express()
const WSserver = require("express-ws")(app)
const aWss = WSserver.getWss()

const PORT = process.env.PORT || 5000

Set.prototype.forEach = function(callback) {
  Array.from(this).forEach(callback)
}

const rooms = []

app.ws("/", (ws, req) => {
  ws.on("message", (msg) => {
    msg = JSON.parse(msg)
    switch (msg.method) {
      case "rooms":
        ws.send(JSON.stringify({ method: "rooms", rooms }))
        break
      case "create-room":
        rooms.push(msg.room)
        ws.send(JSON.stringify({ method: "create-room", id: msg.room.id }))
        broadcastMessage(ws, { method: "rooms", rooms })
        break
      case "enter-room":
        enterRoomHandler(ws, msg)
        break
      case "exit-room":
        exitRoomHandler(ws, msg)
        break
      case "kill":
        updateScoreHandler(ws, msg)
        break
      case "event":
        broadcastMessage(ws, msg)
        break
    }
  })
})

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`)
})

const enterRoomHandler = (ws, msg) => {
  ws.roomId = msg.roomId
  ws.id = msg.id

  const room = rooms.find(room => room.id === msg.roomId)
  if(!room.players || !room.clients) {
    room.players = new Set()
    room.clients = new Set()
  }

  room.players.add(ws.id)
  room.clients.add(ws)

  room.clients.forEach(client => {
      client.send(JSON.stringify({ method: "enter-room", payload: Array.from(room.players) }))
  })
}

const updateScoreHandler = (ws, msg) => {
  const room = rooms.find(room => room.id === msg.roomId)
  room.clients.forEach(client => {
    client.send(JSON.stringify({ method: "update-score", playerId: msg.id, scoreChange: msg.score }))
  })
}

const exitRoomHandler = (ws, msg) => {
  ws.roomId = null
  
  const room = rooms.find(room => room.id === msg.roomId)
  room.clients.delete(ws)
  room.players.delete(ws.id)

  room.clients.forEach(client => {
    client.send(JSON.stringify({ method: "enter-room", payload: Array.from(room.players) }))
  })

  if (room.clients.size === 0) {
    rooms.splice(
      rooms.findIndex((el) => el.id === msg.roomId),
      1
    )
    broadcastMessage(ws, { method: "rooms", rooms })
  }
}

const broadcastMessage = (ws, msg) => {
  aWss.clients.forEach((client) => {
    client.send(JSON.stringify(msg))
  })
}
