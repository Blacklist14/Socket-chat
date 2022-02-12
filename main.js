const express = require("express");
const {Server} = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const port = 8080

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    const idUser = socket.id
    const users = io.engine.clientsCount
    const count = parseInt(users)

    io.emit('onlines', "conectados : " + count)

    socket.on("disconnect", () => {
        io.emit('onlines', "conectados : " + [count - 1])
        console.log(idUser)
    })
    //CAPTURA MENSAGEM E EMITE PARA OS USUARIOS
    socket.on('chatMessage', (name, msg) => {
        io.emit('chatMessage', name + ": " + msg)
    })
    socket.on('usersOnline',(name,id,statusUser) => {
        io.emit('usersOnline',name,id.value = idUser,statusUser.value = "online")
        socket.on('disconnect',() => {
            io.emit('usersOnline',name,id.value = idUser,statusUser.value = "offline")
        })
    })
})
server.listen(port, () => {
    console.log('servidor rodando em http://localhost:' + port)
})