import { Server } from 'socket.io'
import express from 'express'
import path  from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3500
const expressServer = app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})

app.use(express.static(path.join(__dirname, "public")))

const io = new Server(expressServer, {

    // when you host the frontend, replace the false part (which is actually true) with the frontend hosting address
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
    } 
})

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

    socket.on('message', data => {
        console.log(data)
        
        io.emit('message', `${socket.id.substring(0,5)} : ${data}`)
    })
})