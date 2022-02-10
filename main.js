const express = require("express");
const {Server} = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const port = 8080

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

io.on('connection',(socket)=>{
    socket.on('chat message',(name,msg) => {
        io.emit('chat message',name + ": " + msg)
   })
})

server.listen(port,()=>{
    console.log('servidor rodando em http://localhost:' + port)
})
