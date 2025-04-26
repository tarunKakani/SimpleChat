import { createServer } from 'http'
import { Server } from 'socket.io'


const httpServer = createServer()

const io = new Server(httpServer, {

    // normally we do cors and allow it for everything is accepted no one is blocked and anyone can access it from anywhere
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"] // 5500 is for the live server port
    } 
})

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

    socket.on('message', data => {
        console.log(data) // to see what we have recieved
        
        io.emit('message', `${socket.id.substring(0,5)} : ${data}`) // instead of send, emit will 'emit' the message to everyone in the server
    })
})

httpServer.listen(3500, () => console.log("Listening on port 3500"))