const express = require('express')
const { Server } = require('socket.io')
const { createServer } = require('http')

const app = express()
const server = createServer()
const io = new Server(server, {
    //配置跨域
    cors: {
        origin: '*'
    }
})
app.get('/', (req, res) => {
    return res.send("Hello")
})
io.on('connection', (sock) => {
    console.log("连接成功...");
    //向客户端发送连接成功消息
    sock.emit('connectionSuccess')

    //监听加入房间事件
    sock.on('joinRoom', (roomId) => {
        sock.join(roomId)
    })

    sock.on('callRemote', roomId => {
        io.to(roomId).emit('callRemote')
    })

    sock.on('acceptCall', roomId => {
        io.to(roomId).emit('acceptCall')
    })

    //接收offer
    sock.on('sendOffer', ({ offer, roomId }) => {
        //在当前房间触发事件
        io.to(roomId).emit('sendOffer', offer)
    })

    //接收answer
    sock.on('sendAnswer', ({ answer, roomId }) => {
        //在当前房间触发事件
        io.to(roomId).emit('sendAnswer', answer)
    })
    //接收icecandidate
    sock.on('sendcandidate',({roomId,candidate})=>{
        //在当前房间触发事件
        io.to(roomId).emit('sendcandidate', candidate)
    })
    //关闭
    sock.on('hangup',(roomId)=>{
        //在当前房间触发事件
        io.to(roomId).emit('hangup', )
    })
})

//加入房间

server.listen("8081", () => {
    console.log('server running at http://localhost:8081');
})